<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\WhatsappIntegration;
use App\Services\WhatsAppCatalogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WhatsAppController extends Controller
{
    /**
     * Exchange the short-lived code from Embedded Signup for a long-lived token,
     * then fetch the WABA ID and phone number.
     */
    public function connect(Request $request)
    {
        $request->validate(['code' => 'required|string']);

        $version = config('services.meta.graph_version', 'v21.0');

        // Step 1: Exchange code for access token
        $tokenResponse = Http::get(
            "https://graph.facebook.com/{$version}/oauth/access_token",
            [
                'client_id'     => config('services.meta.app_id'),
                'client_secret' => config('services.meta.app_secret'),
                'code'          => $request->code,
            ]
        );

        if ($tokenResponse->failed()) {
            return back()->with('error', 'Failed to connect WhatsApp. Please try again.');
        }

        $accessToken = $tokenResponse->json('access_token');

        // Step 2: List shared WABAs accessible with this token
        $sharedWabas = Http::withToken($accessToken)
            ->get("https://graph.facebook.com/{$version}/me/whatsapp_business_accounts", [
                'fields' => 'id,name,currency,message_template_namespace',
            ]);

        $waba = $sharedWabas->json('data.0');

        if (!$waba) {
            return back()->with('error', 'No WhatsApp Business Account found. Please ensure your account has a WABA.');
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
            return back()->with('error', 'No phone number found under your WhatsApp Business Account.');
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

        return back()->with('success', 'WhatsApp Business Account connected successfully!');
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
            \Log::error('WhatsApp catalog setup failed', ['error' => $e->getMessage()]);
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
            \Log::error('WhatsApp catalog sync failed', ['shop' => $shop->id, 'error' => $e->getMessage()]);
            return back()->with('error', 'Sync failed: ' . $e->getMessage());
        }

        return back()->with('success', "Synced {$synced} products from \"{$shop->name}\" to your WhatsApp catalog.");
    }
}
