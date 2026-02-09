<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\WhatsappIntegration;
use App\Services\WhatsAppCatalogService;
use App\Services\WhatsAppService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppController extends Controller
{
    /**
     * Redirect the user to Facebook's OAuth page for Embedded Signup.
     * No JS SDK needed — server-side redirect.
     */
    public function redirect()
    {
        $appId = config('services.meta.app_id');
        $configId = config('services.meta.config_id');
        $redirectUri = url('/vendor/integrations/whatsapp/callback');
        $version = config('services.meta.graph_version', 'v21.0');

        $params = http_build_query([
            'client_id'     => $appId,
            'config_id'     => $configId,
            'redirect_uri'  => $redirectUri,
            'response_type' => 'code',
            'scope'         => 'whatsapp_business_management,whatsapp_business_messaging,business_management',
        ]);

        return redirect("https://www.facebook.com/{$version}/dialog/oauth?{$params}");
    }

    /**
     * Handle the OAuth callback from Facebook after Embedded Signup.
     */
    public function callback(Request $request)
    {
        if ($request->has('error')) {
            Log::warning('WhatsApp OAuth error', [
                'error' => $request->error,
                'reason' => $request->error_reason,
                'description' => $request->error_description,
            ]);
            return redirect('/vendor/integrations')->with('error', 'WhatsApp connection cancelled or failed.');
        }

        $code = $request->query('code');
        if (!$code) {
            return redirect('/vendor/integrations')->with('error', 'No authorization code received from Facebook.');
        }

        $version = config('services.meta.graph_version', 'v21.0');
        $redirectUri = url('/vendor/integrations/whatsapp/callback');

        // Step 1: Exchange code for access token
        $tokenResponse = Http::get(
            "https://graph.facebook.com/{$version}/oauth/access_token",
            [
                'client_id'     => config('services.meta.app_id'),
                'client_secret' => config('services.meta.app_secret'),
                'redirect_uri'  => $redirectUri,
                'code'          => $code,
            ]
        );

        if ($tokenResponse->failed()) {
            Log::error('WhatsApp token exchange failed', ['body' => $tokenResponse->body()]);
            return redirect('/vendor/integrations')->with('error', 'Failed to connect WhatsApp. Please try again.');
        }

        $accessToken = $tokenResponse->json('access_token');

        // Step 2: List shared WABAs accessible with this token
        $sharedWabas = Http::withToken($accessToken)
            ->get("https://graph.facebook.com/{$version}/me/whatsapp_business_accounts", [
                'fields' => 'id,name,currency,message_template_namespace',
            ]);

        $waba = $sharedWabas->json('data.0');

        if (!$waba) {
            return redirect('/vendor/integrations')->with('error', 'No WhatsApp Business Account found. Please ensure you completed the signup.');
        }

        // Step 3: Get the owning business ID for catalog creation
        $wabaDetails = Http::withToken($accessToken)
            ->get("https://graph.facebook.com/{$version}/{$waba['id']}", [
                'fields' => 'id,name,business',
            ]);
        $businessId = $wabaDetails->json('business.id');

        // Step 4: Get the phone number(s) under this WABA
        $phonesResponse = Http::withToken($accessToken)
            ->get("https://graph.facebook.com/{$version}/{$waba['id']}/phone_numbers", [
                'fields' => 'id,display_phone_number,verified_name,quality_rating',
            ]);

        $phone = $phonesResponse->json('data.0');

        if (!$phone) {
            return redirect('/vendor/integrations')->with('error', 'No phone number found under your WhatsApp Business Account.');
        }

        // Step 5: Store or update the integration
        WhatsappIntegration::updateOrCreate(
            ['user_id' => auth()->id()],
            [
                'waba_id'              => $waba['id'],
                'business_id'          => $businessId,
                'waba_name'            => $waba['name'] ?? null,
                'access_token'         => encrypt($accessToken),
                'phone_number_id'      => $phone['id'],
                'display_phone_number' => $phone['display_phone_number'],
                'verified_name'        => $phone['verified_name'] ?? null,
                'quality_rating'       => $phone['quality_rating'] ?? null,
                'is_active'            => true,
            ]
        );

        // Step 6: Subscribe to webhooks for this WABA
        Http::withToken($accessToken)->post(
            "https://graph.facebook.com/{$version}/{$waba['id']}/subscribed_apps",
            []
        );

        return redirect('/vendor/integrations')->with('success', 'WhatsApp Business Account connected successfully!');
    }

    /**
     * Disconnect the WhatsApp integration for the current user.
     */
    public function disconnect()
    {
        WhatsappIntegration::where('user_id', auth()->id())->delete();

        return back()->with('success', 'WhatsApp Business Account disconnected.');
    }

    /**
     * Create a Facebook Product Catalog, connect it to the WABA, and enable commerce.
     */
    public function setupCatalog(Request $request, WhatsAppCatalogService $catalog)
    {
        $integration = WhatsappIntegration::where('user_id', auth()->id())->firstOrFail();

        $catalogName = $request->input('catalog_name', auth()->user()->username . ' Catalog');

        try {
            $catalog->setup($integration, $catalogName);
        } catch (\Exception $e) {
            Log::error('WhatsApp catalog setup failed', ['error' => $e->getMessage()]);
            return back()->with('error', 'Failed to set up catalog: ' . $e->getMessage());
        }

        return back()->with('success', 'Catalog created and connected to WhatsApp successfully!');
    }

    /**
     * Sync a shop's active products to the Facebook Catalog.
     */
    public function syncProducts(Request $request, WhatsAppCatalogService $catalog)
    {
        $request->validate(['shop_id' => 'required|integer']);

        $integration = WhatsappIntegration::where('user_id', auth()->id())->firstOrFail();

        if (!$integration->catalog_id) {
            return back()->with('error', 'Please set up your catalog first.');
        }

        $shop = Shop::where('id', $request->shop_id)
            ->where('user_id', auth()->id())
            ->with('products')
            ->firstOrFail();

        try {
            $synced = $catalog->syncShopProducts($integration, $shop);
        } catch (\Exception $e) {
            Log::error('WhatsApp catalog sync failed', ['shop' => $shop->id, 'error' => $e->getMessage()]);
            return back()->with('error', 'Sync failed: ' . $e->getMessage());
        }

        return back()->with('success', "Synced {$synced} products from \"{$shop->name}\" to your WhatsApp catalog.");
    }

    /**
     * Send a message to a customer via WhatsApp Cloud API.
     */
    public function sendMessage(Request $request, WhatsAppService $whatsapp)
    {
        $request->validate([
            'to'   => 'required|string',
            'text' => 'required|string|max:4096',
        ]);

        $integration = WhatsappIntegration::where('user_id', auth()->id())
            ->where('is_active', true)
            ->firstOrFail();

        try {
            $whatsapp->sendTextMessage($integration, $request->to, $request->text);
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to send message: ' . $e->getMessage());
        }

        return back()->with('success', 'Message sent successfully!');
    }

    /**
     * Verify webhook from Meta (GET request).
     */
    public function webhookVerify(Request $request)
    {
        $verifyToken = config('services.meta.webhook_verify_token');

        if ($request->query('hub_mode') === 'subscribe'
            && $request->query('hub_verify_token') === $verifyToken) {
            return response($request->query('hub_challenge'), 200);
        }

        return response('Forbidden', 403);
    }

    /**
     * Handle incoming webhook events from Meta (POST request).
     */
    public function webhookHandle(Request $request, WhatsAppService $whatsapp)
    {
        $payload = $request->all();

        Log::info('WhatsApp webhook received', ['payload' => $payload]);

        // Process each entry
        $entries = $payload['entry'] ?? [];
        foreach ($entries as $entry) {
            $changes = $entry['changes'] ?? [];
            foreach ($changes as $change) {
                if ($change['field'] !== 'messages') {
                    continue;
                }

                $value = $change['value'] ?? [];
                $messages = $value['messages'] ?? [];
                $metadata = $value['metadata'] ?? [];
                $phoneNumberId = $metadata['phone_number_id'] ?? null;

                if (!$phoneNumberId) {
                    continue;
                }

                // Find the integration by phone number ID
                $integration = WhatsappIntegration::where('phone_number_id', $phoneNumberId)
                    ->where('is_active', true)
                    ->first();

                if (!$integration) {
                    continue;
                }

                foreach ($messages as $message) {
                    $whatsapp->handleIncomingMessage($integration, $message, $value['contacts'] ?? []);
                }
            }
        }

        return response('OK', 200);
    }
}
