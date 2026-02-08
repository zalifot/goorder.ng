# WhatsApp Business API — E-Commerce Flow Implementation Guide

**Stack:** Laravel (Backend) + React (Frontend)
**API:** Meta WhatsApp Cloud API (Graph API v21.0+)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites & Meta App Setup](#2-prerequisites--meta-app-setup)
3. [Embedded Signup — Authenticating Businesses](#3-embedded-signup--authenticating-businesses)
4. [Laravel Backend Setup](#4-laravel-backend-setup)
5. [Webhook Configuration & Handling](#5-webhook-configuration--handling)
6. [Catalog & Product Management](#6-catalog--product-management)
7. [The Commerce Conversation Flow](#7-the-commerce-conversation-flow)
8. [Sending Product Messages](#8-sending-product-messages)
9. [Handling Customer Orders via Webhooks](#9-handling-customer-orders-via-webhooks)
10. [Redirecting to Payment / Checkout](#10-redirecting-to-payment--checkout)
11. [Database Schema](#11-database-schema)
12. [React Admin Dashboard](#12-react-admin-dashboard)
13. [Security & Compliance](#13-security--compliance)
14. [Testing & Going Live](#14-testing--going-live)
15. [Common Pitfalls & Troubleshooting](#15-common-pitfalls--troubleshooting)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR PLATFORM                            │
│                                                                 │
│  ┌──────────────────┐         ┌──────────────────────────────┐  │
│  │   React Frontend  │         │      Laravel Backend          │  │
│  │                  │         │                              │  │
│  │ • Business Admin │ ◄─────► │ • WhatsApp Service           │  │
│  │   Dashboard      │  API    │ • Webhook Controller         │  │
│  │ • Embedded Signup│         │ • Catalog Manager            │  │
│  │   (FB JS SDK)    │         │ • Order Processor            │  │
│  │ • Product CRUD   │         │ • Conversation State Machine │  │
│  └──────────────────┘         └───────────┬──────────────────┘  │
│                                           │                     │
└───────────────────────────────────────────┼─────────────────────┘
                                            │ HTTPS
                                            ▼
                              ┌──────────────────────────┐
                              │   Meta WhatsApp Cloud API │
                              │   graph.facebook.com      │
                              └──────────┬───────────────┘
                                         │
                                         ▼
                              ┌──────────────────────────┐
                              │    WhatsApp Customers      │
                              │    (End Users on Mobile)   │
                              └──────────────────────────┘
```

**The Flow in Brief:**

1. A **business owner** authenticates via Embedded Signup on your React app — you obtain their WhatsApp Business Account (WABA) and phone number ID.
2. You register **webhooks** for that phone number so your Laravel backend receives all inbound messages.
3. When a **customer** messages the business phone number on WhatsApp, your webhook fires.
4. Your backend sends an **interactive product list** (catalog) back to the customer.
5. The customer **selects items** and adds them to their WhatsApp cart.
6. On checkout, your backend receives the **order webhook** and generates a **payment link** to the business's website.
7. The customer taps the link and **completes payment** on the business's own website/payment gateway.

---

## 2. Prerequisites & Meta App Setup

### 2.1 Create a Meta Developer Account & App

1. Go to [developers.facebook.com](https://developers.facebook.com) and register as a developer.
2. Create a new app → Select **"Business"** type.
3. Add the **WhatsApp** product to your app (click "Set up" on the WhatsApp tile).
4. Add the **Facebook Login for Business** product to your app.
5. In **App Settings > Basic**, note your `App ID` and `App Secret`.
6. Set the **Privacy Policy URL** and **Terms of Service URL**.
7. Switch App Mode to **Live** when ready for production.

### 2.2 Business Verification

- Go to [business.facebook.com](https://business.facebook.com) and verify your Meta Business Portfolio.
- Business verification is required to go beyond the test phone number and to access production features.
- Verification typically takes 1–14 business days depending on region.

### 2.3 Generate a System User Token

For your own platform's API calls (not on behalf of businesses), create a **System User** under your Business Portfolio:

1. Go to Business Settings → Users → System Users → Add.
2. Assign the `whatsapp_business_management` and `whatsapp_business_messaging` permissions.
3. Generate a token — this is your **platform token** for managing WABA assets.

### 2.4 Environment Variables

```env
# .env (Laravel)
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_GRAPH_API_VERSION=v21.0
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_random_secret_string
WHATSAPP_PLATFORM_TOKEN=your_system_user_token

# Embedded Signup
META_CONFIG_ID=your_embedded_signup_configuration_id
```

---

## 3. Embedded Signup — Authenticating Businesses

Embedded Signup is Meta's OAuth-based flow that lets businesses connect their WhatsApp Business Account to your platform directly from your React app. When a business completes the flow, you receive a short-lived code which you exchange for a token — giving you access to send/receive messages on their behalf.

### 3.1 Create an Embedded Signup Configuration

1. In your Meta App Dashboard, go to **WhatsApp > Embedded Signup**.
2. Click **Create configuration**.
3. For **Permissions**, select:
   - `whatsapp_business_management`
   - `whatsapp_business_messaging`
4. For **Assets**, select **WhatsApp accounts**.
5. Save and copy the resulting `Configuration ID`.

### 3.2 Configure Facebook Login for Business

1. Go to **Facebook Login for Business > Settings** in your app dashboard.
2. Enable:
   - Client OAuth Login: **Yes**
   - Web OAuth Login: **Yes**
   - Enforce HTTPS: **Yes**
3. Add your domain to **Valid OAuth Redirect URIs** (e.g., `https://yourdomain.com/auth/callback`).
4. Add your domain to **Allowed Domains for the JavaScript SDK**.

### 3.3 React — Embedded Signup Component

```jsx
// src/components/WhatsAppConnect.jsx
import React, { useEffect, useCallback } from 'react';

const WhatsAppConnect = ({ onSuccess }) => {
  useEffect(() => {
    // Load Facebook JS SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_META_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v21.0',
      });
    };

    // Inject SDK script
    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      d.getElementsByTagName('head')[0].appendChild(js);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const launchEmbeddedSignup = useCallback(() => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const { code } = response.authResponse;

          // Send the code to your Laravel backend to exchange for a token
          fetch('/api/whatsapp/auth/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
            },
            body: JSON.stringify({ code }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                onSuccess(data);
              }
            })
            .catch(console.error);
        }
      },
      {
        config_id: import.meta.env.VITE_META_CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {
            // Optional: Pre-fill business info
            // business: { name: 'My Store', email: 'store@example.com' },
          },
          featureType: '',
          sessionInfoVersion: '3',
        },
      }
    );
  }, [onSuccess]);

  // Listen for the session-info message event from the popup
  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.origin !== 'https://www.facebook.com' &&
        event.origin !== 'https://web.facebook.com'
      ) {
        return;
      }

      try {
        const data = JSON.parse(event.data);
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          // data.data contains:
          // { phone_number_id, waba_id, current_step }
          console.log('Embedded signup event:', data.data);

          if (data.data.current_step === 'SUCCESS') {
            // Optionally store phone_number_id and waba_id immediately
          }
        }
      } catch (e) {
        // Not a JSON message, ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <button
      onClick={launchEmbeddedSignup}
      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold 
                 hover:bg-green-700 transition-colors"
    >
      Connect WhatsApp Business
    </button>
  );
};

export default WhatsAppConnect;
```

### 3.4 Laravel — Token Exchange Endpoint

```php
// routes/api.php
Route::post('/whatsapp/auth/callback', [WhatsAppAuthController::class, 'handleCallback']);
```

```php
// app/Http/Controllers/WhatsAppAuthController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\BusinessWhatsApp;

class WhatsAppAuthController extends Controller
{
    /**
     * Exchange the short-lived code from Embedded Signup for a long-lived token.
     * Then fetch the WABA ID and phone number ID.
     */
    public function handleCallback(Request $request)
    {
        $request->validate(['code' => 'required|string']);

        // Step 1: Exchange code for access token
        $tokenResponse = Http::get(
            "https://graph.facebook.com/" . config('services.meta.graph_version') . "/oauth/access_token",
            [
                'client_id'     => config('services.meta.app_id'),
                'client_secret' => config('services.meta.app_secret'),
                'code'          => $request->code,
            ]
        );

        if ($tokenResponse->failed()) {
            return response()->json([
                'success' => false,
                'error'   => 'Token exchange failed',
            ], 400);
        }

        $accessToken = $tokenResponse->json('access_token');

        // Step 2: Get debug info to find the WABA ID
        // The token grants access to the business's WABA
        $wabaResponse = Http::withToken($accessToken)
            ->get("https://graph.facebook.com/" . config('services.meta.graph_version') . "/debug_token", [
                'input_token' => $accessToken,
            ]);

        // Step 3: List shared WABAs accessible with this token
        $sharedWabas = Http::withToken($accessToken)
            ->get("https://graph.facebook.com/" . config('services.meta.graph_version') 
                  . "/me/whatsapp_business_accounts", [
                'fields' => 'id,name,currency,message_template_namespace',
            ]);

        $waba = $sharedWabas->json('data.0'); // First WABA

        if (!$waba) {
            return response()->json([
                'success' => false,
                'error'   => 'No WhatsApp Business Account found',
            ], 400);
        }

        // Step 4: Get the phone number(s) under this WABA
        $phonesResponse = Http::withToken($accessToken)
            ->get("https://graph.facebook.com/" . config('services.meta.graph_version') 
                  . "/{$waba['id']}/phone_numbers", [
                'fields' => 'id,display_phone_number,verified_name,quality_rating',
            ]);

        $phone = $phonesResponse->json('data.0');

        // Step 5: Store everything in your database
        $businessWa = BusinessWhatsApp::updateOrCreate(
            ['waba_id' => $waba['id']],
            [
                'business_id'          => auth()->user()->business_id,
                'access_token'         => encrypt($accessToken),
                'waba_id'              => $waba['id'],
                'waba_name'            => $waba['name'],
                'phone_number_id'      => $phone['id'],
                'display_phone_number' => $phone['display_phone_number'],
                'verified_name'        => $phone['verified_name'],
                'quality_rating'       => $phone['quality_rating'] ?? null,
                'is_active'            => true,
            ]
        );

        // Step 6: Subscribe your app to the WABA webhooks
        $this->subscribeToWebhooks($waba['id'], $accessToken);

        return response()->json([
            'success'              => true,
            'waba_id'              => $waba['id'],
            'phone_number_id'      => $phone['id'],
            'display_phone_number' => $phone['display_phone_number'],
        ]);
    }

    /**
     * Subscribe your app to receive webhook notifications for this WABA.
     */
    private function subscribeToWebhooks(string $wabaId, string $accessToken): void
    {
        Http::withToken($accessToken)->post(
            "https://graph.facebook.com/" . config('services.meta.graph_version') 
            . "/{$wabaId}/subscribed_apps",
            []
        );
    }
}
```

### 3.5 Laravel Config

```php
// config/services.php
'meta' => [
    'app_id'        => env('META_APP_ID'),
    'app_secret'    => env('META_APP_SECRET'),
    'graph_version' => env('META_GRAPH_API_VERSION', 'v21.0'),
    'webhook_verify_token' => env('WHATSAPP_WEBHOOK_VERIFY_TOKEN'),
    'platform_token' => env('WHATSAPP_PLATFORM_TOKEN'),
    'config_id'      => env('META_CONFIG_ID'),
],
```

---

## 4. Laravel Backend Setup

### 4.1 Install Dependencies

```bash
composer require guzzlehttp/guzzle
# Laravel's HTTP client uses Guzzle under the hood, but ensure it's present
```

### 4.2 WhatsApp Service Class

This is the core service for all outbound WhatsApp messaging.

```php
// app/Services/WhatsAppService.php
namespace App\Services;

use App\Models\BusinessWhatsApp;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    private string $baseUrl;

    public function __construct()
    {
        $version = config('services.meta.graph_version');
        $this->baseUrl = "https://graph.facebook.com/{$version}";
    }

    /**
     * Send a text message.
     */
    public function sendText(BusinessWhatsApp $business, string $to, string $body): array
    {
        return $this->sendMessage($business, $to, [
            'messaging_product' => 'whatsapp',
            'to'                => $to,
            'type'              => 'text',
            'text'              => ['body' => $body],
        ]);
    }

    /**
     * Send an interactive list message (e.g., product categories).
     */
    public function sendInteractiveList(
        BusinessWhatsApp $business,
        string $to,
        string $headerText,
        string $bodyText,
        string $footerText,
        string $buttonText,
        array $sections
    ): array {
        return $this->sendMessage($business, $to, [
            'messaging_product' => 'whatsapp',
            'to'                => $to,
            'type'              => 'interactive',
            'interactive'       => [
                'type'   => 'list',
                'header' => ['type' => 'text', 'text' => $headerText],
                'body'   => ['text' => $bodyText],
                'footer' => ['text' => $footerText],
                'action' => [
                    'button'   => $buttonText,
                    'sections' => $sections,
                ],
            ],
        ]);
    }

    /**
     * Send a single product message.
     */
    public function sendSingleProduct(
        BusinessWhatsApp $business,
        string $to,
        string $catalogId,
        string $productRetailerId,
        string $bodyText = 'Check out this product!'
    ): array {
        return $this->sendMessage($business, $to, [
            'messaging_product' => 'whatsapp',
            'to'                => $to,
            'type'              => 'interactive',
            'interactive'       => [
                'type'   => 'product',
                'body'   => ['text' => $bodyText],
                'action' => [
                    'catalog_id'          => $catalogId,
                    'product_retailer_id' => $productRetailerId,
                ],
            ],
        ]);
    }

    /**
     * Send a multi-product message (up to 30 products).
     */
    public function sendMultiProduct(
        BusinessWhatsApp $business,
        string $to,
        string $catalogId,
        string $headerText,
        string $bodyText,
        array $sections
    ): array {
        return $this->sendMessage($business, $to, [
            'messaging_product' => 'whatsapp',
            'to'                => $to,
            'type'              => 'interactive',
            'interactive'       => [
                'type'   => 'product_list',
                'header' => ['type' => 'text', 'text' => $headerText],
                'body'   => ['text' => $bodyText],
                'action' => [
                    'catalog_id' => $catalogId,
                    'sections'   => $sections,
                    // Each section: { "title": "Category", "product_items": [{ "product_retailer_id": "SKU-001" }, ...] }
                ],
            ],
        ]);
    }

    /**
     * Send an interactive button message (e.g., "View Cart", "Checkout").
     */
    public function sendButtons(
        BusinessWhatsApp $business,
        string $to,
        string $bodyText,
        array $buttons
    ): array {
        return $this->sendMessage($business, $to, [
            'messaging_product' => 'whatsapp',
            'to'                => $to,
            'type'              => 'interactive',
            'interactive'       => [
                'type'   => 'button',
                'body'   => ['text' => $bodyText],
                'action' => [
                    'buttons' => array_map(fn($btn) => [
                        'type'  => 'reply',
                        'reply' => [
                            'id'    => $btn['id'],
                            'title' => $btn['title'],
                        ],
                    ], $buttons),
                ],
            ],
        ]);
    }

    /**
     * Send a CTA URL button message (for redirecting to checkout).
     */
    public function sendCtaUrlButton(
        BusinessWhatsApp $business,
        string $to,
        string $bodyText,
        string $buttonText,
        string $url
    ): array {
        return $this->sendMessage($business, $to, [
            'messaging_product' => 'whatsapp',
            'to'                => $to,
            'type'              => 'interactive',
            'interactive'       => [
                'type'   => 'cta_url',
                'body'   => ['text' => $bodyText],
                'action' => [
                    'name'       => 'cta_url',
                    'parameters' => [
                        'display_text' => $buttonText,
                        'url'          => $url,
                    ],
                ],
            ],
        ]);
    }

    /**
     * Send a catalog message (opens the full catalog in WhatsApp).
     */
    public function sendCatalogMessage(
        BusinessWhatsApp $business,
        string $to,
        string $bodyText,
        string $thumbnailProductId = null
    ): array {
        $action = ['name' => 'catalog_message'];
        if ($thumbnailProductId) {
            $action['parameters'] = [
                'thumbnail_product_retailer_id' => $thumbnailProductId,
            ];
        }

        return $this->sendMessage($business, $to, [
            'messaging_product' => 'whatsapp',
            'to'                => $to,
            'type'              => 'interactive',
            'interactive'       => [
                'type'   => 'catalog_message',
                'body'   => ['text' => $bodyText],
                'action' => $action,
            ],
        ]);
    }

    /**
     * Core message sender.
     */
    private function sendMessage(BusinessWhatsApp $business, string $to, array $payload): array
    {
        $url = "{$this->baseUrl}/{$business->phone_number_id}/messages";

        $response = Http::withToken(decrypt($business->access_token))
            ->post($url, $payload);

        if ($response->failed()) {
            Log::error('WhatsApp message failed', [
                'to'       => $to,
                'status'   => $response->status(),
                'response' => $response->json(),
            ]);
        }

        return $response->json();
    }

    /**
     * Mark a message as read.
     */
    public function markAsRead(BusinessWhatsApp $business, string $messageId): void
    {
        $url = "{$this->baseUrl}/{$business->phone_number_id}/messages";

        Http::withToken(decrypt($business->access_token))
            ->post($url, [
                'messaging_product' => 'whatsapp',
                'status'            => 'read',
                'message_id'        => $messageId,
            ]);
    }
}
```

---

## 5. Webhook Configuration & Handling

### 5.1 Register the Webhook URL in Meta

1. In your Meta App Dashboard, go to **WhatsApp > Configuration**.
2. Set **Callback URL** to: `https://yourdomain.com/api/whatsapp/webhook`
3. Set **Verify token** to the value of your `WHATSAPP_WEBHOOK_VERIFY_TOKEN` env var.
4. Subscribe to these webhook fields:
   - `messages` — inbound messages and order notifications
   - `message_template_status_update` — template status changes

### 5.2 Laravel Webhook Routes

```php
// routes/api.php

// IMPORTANT: Exclude these routes from CSRF verification
Route::get('/whatsapp/webhook', [WhatsAppWebhookController::class, 'verify']);
Route::post('/whatsapp/webhook', [WhatsAppWebhookController::class, 'handle']);
```

```php
// app/Http/Middleware/VerifyCsrfToken.php
protected $except = [
    'api/whatsapp/webhook',
];
```

### 5.3 Webhook Controller

```php
// app/Http/Controllers/WhatsAppWebhookController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Jobs\ProcessWhatsAppMessage;
use App\Jobs\ProcessWhatsAppOrder;
use App\Jobs\ProcessWhatsAppStatus;

class WhatsAppWebhookController extends Controller
{
    /**
     * GET — Webhook verification (Meta sends this during setup).
     */
    public function verify(Request $request)
    {
        $mode      = $request->query('hub_mode');
        $token     = $request->query('hub_verify_token');
        $challenge = $request->query('hub_challenge');

        if ($mode === 'subscribe' && $token === config('services.meta.webhook_verify_token')) {
            Log::info('Webhook verified successfully');
            return response($challenge, 200)->header('Content-Type', 'text/plain');
        }

        return response('Forbidden', 403);
    }

    /**
     * POST — Incoming webhook events from WhatsApp.
     * 
     * CRITICAL: Always respond 200 quickly. Process asynchronously via jobs.
     */
    public function handle(Request $request)
    {
        $payload = $request->all();

        // Optional: Verify webhook signature
        $this->verifySignature($request);

        // Iterate through entries and changes
        foreach ($payload['entry'] ?? [] as $entry) {
            foreach ($entry['changes'] ?? [] as $change) {
                if ($change['field'] !== 'messages') {
                    continue;
                }

                $value = $change['value'];
                $phoneNumberId = $value['metadata']['phone_number_id'] ?? null;

                // Process inbound messages
                foreach ($value['messages'] ?? [] as $message) {
                    ProcessWhatsAppMessage::dispatch(
                        $phoneNumberId,
                        $message,
                        $value['contacts'][0] ?? null
                    );
                }

                // Process order messages
                if (isset($value['messages'])) {
                    foreach ($value['messages'] as $message) {
                        if ($message['type'] === 'order') {
                            ProcessWhatsAppOrder::dispatch($phoneNumberId, $message);
                        }
                    }
                }

                // Process status updates (sent, delivered, read)
                foreach ($value['statuses'] ?? [] as $status) {
                    ProcessWhatsAppStatus::dispatch($phoneNumberId, $status);
                }
            }
        }

        // ALWAYS return 200 immediately
        return response('OK', 200);
    }

    /**
     * Verify the X-Hub-Signature-256 header to ensure the request is from Meta.
     */
    private function verifySignature(Request $request): void
    {
        $signature = $request->header('X-Hub-Signature-256');
        if (!$signature) {
            return; // Optionally abort(403) in production
        }

        $expectedHash = hash_hmac('sha256', $request->getContent(), config('services.meta.app_secret'));

        if (!hash_equals("sha256={$expectedHash}", $signature)) {
            abort(403, 'Invalid signature');
        }
    }
}
```

---

## 6. Catalog & Product Management

WhatsApp product catalogs are managed via **Meta Commerce Manager** and synced to your WABA. You have two approaches:

### 6.1 Option A: Use Meta Commerce Manager Directly

Businesses manage their catalog via the Meta Commerce Manager UI. Your platform just references the `catalog_id` and `product_retailer_id` (SKU) values when sending product messages. This is the simplest approach.

**Steps for the business:**
1. Go to [commerce.facebook.com](https://commerce.facebook.com).
2. Create a catalog → Choose "E-commerce" type.
3. Add products manually, via data feed (CSV/spreadsheet), or via Shopify/WooCommerce sync.
4. Connect the catalog to the WhatsApp Business Account.

### 6.2 Option B: Manage Catalog via Graph API

Your platform can create and manage catalogs programmatically on behalf of the business.

```php
// app/Services/CatalogService.php
namespace App\Services;

use App\Models\BusinessWhatsApp;
use Illuminate\Support\Facades\Http;

class CatalogService
{
    private string $baseUrl;

    public function __construct()
    {
        $version = config('services.meta.graph_version');
        $this->baseUrl = "https://graph.facebook.com/{$version}";
    }

    /**
     * Create a product catalog for a business.
     */
    public function createCatalog(BusinessWhatsApp $business, string $name): array
    {
        // Catalogs are created under the business's Business Portfolio
        $response = Http::withToken(decrypt($business->access_token))
            ->post("{$this->baseUrl}/{$business->waba_id}/product_catalogs", [
                'name' => $name,
            ]);

        return $response->json();
    }

    /**
     * Add a product to the catalog.
     */
    public function addProduct(string $catalogId, string $accessToken, array $product): array
    {
        $response = Http::withToken($accessToken)
            ->post("{$this->baseUrl}/{$catalogId}/products", [
                'retailer_id'       => $product['sku'],
                'name'              => $product['name'],
                'description'       => $product['description'],
                'availability'      => $product['in_stock'] ? 'in stock' : 'out of stock',
                'price'             => $product['price'] * 100, // in cents
                'currency'          => $product['currency'] ?? 'NGN',
                'image_url'         => $product['image_url'],
                'url'               => $product['product_url'],
                'category'          => $product['category'] ?? '',
            ]);

        return $response->json();
    }

    /**
     * List products in a catalog.
     */
    public function listProducts(string $catalogId, string $accessToken): array
    {
        $response = Http::withToken($accessToken)
            ->get("{$this->baseUrl}/{$catalogId}/products", [
                'fields' => 'id,retailer_id,name,description,price,currency,availability,image_url',
            ]);

        return $response->json();
    }

    /**
     * Enable commerce settings for a phone number.
     * This allows the phone number to send product/catalog messages.
     */
    public function enableCommerce(BusinessWhatsApp $business): array
    {
        $response = Http::withToken(decrypt($business->access_token))
            ->post("{$this->baseUrl}/{$business->phone_number_id}/whatsapp_commerce_settings", [
                'is_cart_enabled'    => true,
                'is_catalog_visible' => true,
            ]);

        return $response->json();
    }

    /**
     * Connect a catalog to a WABA.
     */
    public function connectCatalogToWaba(
        BusinessWhatsApp $business,
        string $catalogId
    ): array {
        $response = Http::withToken(decrypt($business->access_token))
            ->post("{$this->baseUrl}/{$business->phone_number_id}/whatsapp_commerce_settings", [
                'catalog_id'         => $catalogId,
                'is_cart_enabled'    => true,
                'is_catalog_visible' => true,
            ]);

        return $response->json();
    }
}
```

### 6.3 Product Data Requirements

Each product in the catalog must have:

| Field | Required | Description |
|-------|----------|-------------|
| `retailer_id` | Yes | Your unique SKU identifier (max 100 chars) |
| `name` | Yes | Product name (max 200 chars) |
| `description` | Yes | Product description (max 9999 chars) |
| `availability` | Yes | `in stock` or `out of stock` |
| `price` | Yes | Price in cents (e.g., 150000 for ₦1,500.00) |
| `currency` | Yes | ISO 4217 currency code (e.g., `NGN`) |
| `image_url` | Yes | Public HTTPS URL for the product image |
| `url` | Yes | Link to the product page on the business website |
| `category` | No | Product category string |

---

## 7. The Commerce Conversation Flow

This is the conversational state machine that drives the customer experience. When a customer messages the business phone number, your backend guides them through a structured shopping flow.

### 7.1 Flow Diagram

```
Customer sends "Hi" or any message
        │
        ▼
┌─────────────────────────────┐
│  WELCOME                     │
│  "Welcome to {Business}!     │
│   What would you like to do?"│
│                              │
│  [🛍 Browse Products]        │
│  [📞 Talk to Support]        │
│  [📦 Track Order]            │
└──────────┬──────────────────┘
           │ User taps "Browse Products"
           ▼
┌─────────────────────────────┐
│  CATALOG / PRODUCT LIST      │
│                              │
│  Send Multi-Product Message  │
│  or Catalog Message with     │
│  product sections & prices   │
│                              │
│  Customer browses, taps      │
│  products, adds to cart      │
└──────────┬──────────────────┘
           │ Customer submits order from cart
           ▼
┌─────────────────────────────┐
│  ORDER RECEIVED (Webhook)    │
│                              │
│  Parse order items, qty,     │
│  calculate total             │
│  Create order in your DB     │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│  CHECKOUT REDIRECT           │
│                              │
│  "Your order total is ₦X."   │
│  "Tap below to pay:"         │
│                              │
│  [🔗 Complete Payment]  ────►  business-website.com/checkout?order=xxx
└─────────────────────────────┘
```

### 7.2 Conversation State Machine (Laravel Job)

```php
// app/Jobs/ProcessWhatsAppMessage.php
namespace App\Jobs;

use App\Models\BusinessWhatsApp;
use App\Models\ConversationState;
use App\Services\WhatsAppService;
use App\Services\OrderService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessWhatsAppMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private string $phoneNumberId,
        private array $message,
        private ?array $contact
    ) {}

    public function handle(WhatsAppService $whatsApp, OrderService $orderService): void
    {
        $business = BusinessWhatsApp::where('phone_number_id', $this->phoneNumberId)->first();
        if (!$business) {
            Log::warning("No business found for phone_number_id: {$this->phoneNumberId}");
            return;
        }

        $customerPhone = $this->message['from'];
        $messageType   = $this->message['type'];
        $messageId     = $this->message['id'];

        // Mark message as read
        $whatsApp->markAsRead($business, $messageId);

        // Handle ORDER type messages separately
        if ($messageType === 'order') {
            ProcessWhatsAppOrder::dispatch($this->phoneNumberId, $this->message);
            return;
        }

        // Get or create conversation state
        $state = ConversationState::firstOrCreate(
            [
                'business_whatsapp_id' => $business->id,
                'customer_phone'       => $customerPhone,
            ],
            ['state' => 'welcome', 'data' => []]
        );

        // Extract the user's text or button reply
        $userInput = $this->extractUserInput();

        // Route based on current state + input
        match (true) {
            // Any greeting or new conversation → Welcome
            $state->state === 'welcome',
            $this->isGreeting($userInput)
                => $this->sendWelcome($whatsApp, $business, $customerPhone, $state),

            // User selected "Browse Products"
            $userInput === 'browse_products'
                => $this->sendProductCatalog($whatsApp, $business, $customerPhone, $state),

            // User selected "Track Order"
            $userInput === 'track_order'
                => $this->handleOrderTracking($whatsApp, $business, $customerPhone, $state),

            // User selected "Talk to Support"
            $userInput === 'talk_to_support'
                => $this->handleSupport($whatsApp, $business, $customerPhone, $state),

            // Product inquiry (customer tapped a product)
            $messageType === 'interactive' && ($this->message['interactive']['type'] ?? '') === 'product_inquiry'
                => $this->handleProductInquiry($whatsApp, $business, $customerPhone, $state),

            // Default: resend welcome
            default => $this->sendWelcome($whatsApp, $business, $customerPhone, $state),
        };
    }

    private function sendWelcome(
        WhatsAppService $whatsApp,
        BusinessWhatsApp $business,
        string $to,
        ConversationState $state
    ): void {
        $businessName = $business->verified_name ?? 'our store';

        $whatsApp->sendInteractiveList(
            business:   $business,
            to:         $to,
            headerText: "Welcome! 👋",
            bodyText:   "Hello! Welcome to {$businessName}. How can we help you today?",
            footerText: "Powered by YourPlatform",
            buttonText: "Choose an option",
            sections:   [
                [
                    'title' => 'What would you like to do?',
                    'rows'  => [
                        [
                            'id'          => 'browse_products',
                            'title'       => '🛍 Browse Products',
                            'description' => 'View our catalog and prices',
                        ],
                        [
                            'id'          => 'track_order',
                            'title'       => '📦 Track Order',
                            'description' => 'Check the status of your order',
                        ],
                        [
                            'id'          => 'talk_to_support',
                            'title'       => '📞 Talk to Support',
                            'description' => 'Chat with our team',
                        ],
                    ],
                ],
            ]
        );

        $state->update(['state' => 'menu_shown']);
    }

    private function sendProductCatalog(
        WhatsAppService $whatsApp,
        BusinessWhatsApp $business,
        string $to,
        ConversationState $state
    ): void {
        // Option A: Send the full catalog message
        // (customer sees "View catalog" button which opens the entire catalog)
        $whatsApp->sendCatalogMessage(
            business: $business,
            to:       $to,
            bodyText: "Browse our products below! Add items to your cart and tap checkout when ready. 🛒",
        );

        // Option B: Send a curated multi-product message with sections
        // Uncomment below and comment out Option A if you want curated selections.
        //
        // $catalogId = $business->catalog_id; // Stored during catalog setup
        //
        // $whatsApp->sendMultiProduct(
        //     business:   $business,
        //     to:         $to,
        //     catalogId:  $catalogId,
        //     headerText: "Our Products",
        //     bodyText:   "Browse our latest items! Tap any product to see details. Add to cart and checkout.",
        //     sections:   [
        //         [
        //             'title'         => '🔥 Popular Items',
        //             'product_items' => [
        //                 ['product_retailer_id' => 'SKU-001'],
        //                 ['product_retailer_id' => 'SKU-002'],
        //                 ['product_retailer_id' => 'SKU-003'],
        //             ],
        //         ],
        //         [
        //             'title'         => '🆕 New Arrivals',
        //             'product_items' => [
        //                 ['product_retailer_id' => 'SKU-010'],
        //                 ['product_retailer_id' => 'SKU-011'],
        //             ],
        //         ],
        //     ]
        // );

        $state->update(['state' => 'browsing_catalog']);
    }

    private function handleOrderTracking(
        WhatsAppService $whatsApp,
        BusinessWhatsApp $business,
        string $to,
        ConversationState $state
    ): void {
        $whatsApp->sendText(
            $business,
            $to,
            "Please send your order number and we'll look it up for you."
        );
        $state->update(['state' => 'awaiting_order_number']);
    }

    private function handleSupport(
        WhatsAppService $whatsApp,
        BusinessWhatsApp $business,
        string $to,
        ConversationState $state
    ): void {
        $whatsApp->sendText(
            $business,
            $to,
            "A support agent will be with you shortly. Please describe your issue."
        );
        $state->update(['state' => 'support']);
    }

    private function handleProductInquiry(
        WhatsAppService $whatsApp,
        BusinessWhatsApp $business,
        string $to,
        ConversationState $state
    ): void {
        // When a customer taps a product and clicks "Message Business"
        $whatsApp->sendText(
            $business,
            $to,
            "Great choice! You can add this item to your cart. When you're ready, tap the checkout button in your cart. 🛒"
        );
    }

    private function extractUserInput(): string
    {
        return match ($this->message['type']) {
            'text'        => strtolower(trim($this->message['text']['body'] ?? '')),
            'interactive' => $this->message['interactive']['list_reply']['id']
                            ?? $this->message['interactive']['button_reply']['id']
                            ?? '',
            default       => '',
        };
    }

    private function isGreeting(string $input): bool
    {
        $greetings = ['hi', 'hello', 'hey', 'start', 'menu', 'help', 'good morning', 'good afternoon'];
        return in_array($input, $greetings);
    }
}
```

---

## 8. Sending Product Messages

### 8.1 Message Types Summary

| Message Type | Use Case | Max Products |
|---|---|---|
| **Catalog Message** | Opens the full business catalog in WhatsApp | Entire catalog |
| **Multi-Product Message** | Curated list with sections (categories) | 30 per message |
| **Single Product Message** | Highlight one specific product | 1 |
| **Interactive List** | Text-based menu for navigation | 10 rows per section |
| **Interactive Buttons** | Quick replies (e.g., Checkout, Cancel) | 3 buttons |
| **CTA URL Button** | Redirect to external website | 1 URL |

### 8.2 Payload Formats

**Catalog Message** (opens full catalog):
```json
{
  "messaging_product": "whatsapp",
  "to": "234XXXXXXXXXX",
  "type": "interactive",
  "interactive": {
    "type": "catalog_message",
    "body": {
      "text": "Browse our products and add items to your cart!"
    },
    "action": {
      "name": "catalog_message",
      "parameters": {
        "thumbnail_product_retailer_id": "SKU-001"
      }
    }
  }
}
```

**Multi-Product Message** (curated selection):
```json
{
  "messaging_product": "whatsapp",
  "to": "234XXXXXXXXXX",
  "type": "interactive",
  "interactive": {
    "type": "product_list",
    "header": { "type": "text", "text": "Our Menu 🍕" },
    "body": { "text": "Browse our offerings. Tap any item for details!" },
    "footer": { "text": "Add to cart and checkout when ready" },
    "action": {
      "catalog_id": "CATALOG_ID",
      "sections": [
        {
          "title": "🍕 Pizzas",
          "product_items": [
            { "product_retailer_id": "PIZZA-001" },
            { "product_retailer_id": "PIZZA-002" },
            { "product_retailer_id": "PIZZA-003" }
          ]
        },
        {
          "title": "🥤 Drinks",
          "product_items": [
            { "product_retailer_id": "DRINK-001" },
            { "product_retailer_id": "DRINK-002" }
          ]
        }
      ]
    }
  }
}
```

**Single Product Message:**
```json
{
  "messaging_product": "whatsapp",
  "to": "234XXXXXXXXXX",
  "type": "interactive",
  "interactive": {
    "type": "product",
    "body": { "text": "Check out this item!" },
    "action": {
      "catalog_id": "CATALOG_ID",
      "product_retailer_id": "SKU-001"
    }
  }
}
```

**CTA URL Button** (redirect to checkout):
```json
{
  "messaging_product": "whatsapp",
  "to": "234XXXXXXXXXX",
  "type": "interactive",
  "interactive": {
    "type": "cta_url",
    "body": {
      "text": "Your order #ORD-12345 is ready! Total: ₦15,500.00\n\nTap below to complete payment on our website."
    },
    "action": {
      "name": "cta_url",
      "parameters": {
        "display_text": "💳 Pay Now",
        "url": "https://business-website.com/checkout?order=ORD-12345&token=abc123"
      }
    }
  }
}
```

### 8.3 Important Constraints

- Product and multi-product messages can **only be sent within a 24-hour customer service window** (i.e., after the customer messages you first).
- You **cannot** initiate a conversation with a product message. Use a **template message** to start.
- Maximum 30 products per multi-product message.
- Maximum 10 sections per multi-product message.
- The catalog must be **connected to the WABA** and **commerce settings enabled** on the phone number.
- Product images are reviewed by Meta for compliance.

---

## 9. Handling Customer Orders via Webhooks

When a customer adds products to their cart and submits the order, Meta sends an **order webhook** to your endpoint.

### 9.1 Order Webhook Payload Structure

```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "WABA_ID",
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "16505551234",
              "phone_number_id": "PHONE_NUMBER_ID"
            },
            "contacts": [
              {
                "profile": { "name": "Customer Name" },
                "wa_id": "234XXXXXXXXXX"
              }
            ],
            "messages": [
              {
                "from": "234XXXXXXXXXX",
                "id": "wamid.xxxxx",
                "timestamp": "1699000000",
                "type": "order",
                "order": {
                  "catalog_id": "CATALOG_ID",
                  "product_items": [
                    {
                      "product_retailer_id": "SKU-001",
                      "quantity": 2,
                      "item_price": 1500.00,
                      "currency": "NGN"
                    },
                    {
                      "product_retailer_id": "SKU-003",
                      "quantity": 1,
                      "item_price": 3500.00,
                      "currency": "NGN"
                    }
                  ],
                  "text": "Please deliver to 123 Main Street, Lagos"
                }
              }
            ]
          },
          "field": "messages"
        }
      ]
    }
  ]
}
```

### 9.2 Order Processing Job

```php
// app/Jobs/ProcessWhatsAppOrder.php
namespace App\Jobs;

use App\Models\BusinessWhatsApp;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\WhatsAppService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class ProcessWhatsAppOrder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private string $phoneNumberId,
        private array $message
    ) {}

    public function handle(WhatsAppService $whatsApp): void
    {
        $business = BusinessWhatsApp::where('phone_number_id', $this->phoneNumberId)->first();
        if (!$business) return;

        $customerPhone = $this->message['from'];
        $orderData     = $this->message['order'];
        $catalogId     = $orderData['catalog_id'];
        $customerNote  = $orderData['text'] ?? '';

        // Calculate order total
        $totalAmount = 0;
        $items = [];
        foreach ($orderData['product_items'] as $item) {
            $lineTotal = $item['quantity'] * $item['item_price'];
            $totalAmount += $lineTotal;
            $items[] = $item;
        }

        // Create order in database
        $orderNumber = 'ORD-' . strtoupper(Str::random(8));
        $order = Order::create([
            'business_whatsapp_id' => $business->id,
            'order_number'         => $orderNumber,
            'customer_phone'       => $customerPhone,
            'customer_name'        => $this->message['contacts'][0]['profile']['name'] ?? 'Customer',
            'catalog_id'           => $catalogId,
            'total_amount'         => $totalAmount,
            'currency'             => $items[0]['currency'] ?? 'NGN',
            'customer_note'        => $customerNote,
            'status'               => 'pending_payment',
            'whatsapp_message_id'  => $this->message['id'],
        ]);

        foreach ($items as $item) {
            OrderItem::create([
                'order_id'             => $order->id,
                'product_retailer_id'  => $item['product_retailer_id'],
                'quantity'             => $item['quantity'],
                'unit_price'           => $item['item_price'],
                'currency'             => $item['currency'],
            ]);
        }

        // Generate a signed checkout URL
        $checkoutToken = encrypt("{$order->id}:{$order->order_number}:{$customerPhone}");
        $checkoutUrl = $this->buildCheckoutUrl($business, $order, $checkoutToken);

        // Format the total for display
        $formattedTotal = number_format($totalAmount, 2);
        $currency = $items[0]['currency'] ?? 'NGN';
        $itemCount = count($items);

        // Send order confirmation + checkout link
        $whatsApp->sendCtaUrlButton(
            business:   $business,
            to:         $customerPhone,
            bodyText:   "✅ *Order Received!*\n\n"
                      . "Order: *{$orderNumber}*\n"
                      . "Items: {$itemCount}\n"
                      . "Total: *{$currency} {$formattedTotal}*\n\n"
                      . ($customerNote ? "Note: {$customerNote}\n\n" : "")
                      . "Tap the button below to complete your payment on our secure checkout page.",
            buttonText: "💳 Complete Payment",
            url:        $checkoutUrl,
        );
    }

    /**
     * Build the checkout URL pointing to the business's website.
     */
    private function buildCheckoutUrl(BusinessWhatsApp $business, Order $order, string $token): string
    {
        // Option A: Redirect to your platform's hosted checkout page
        $baseUrl = config('app.url') . "/checkout/{$order->order_number}";
        return $baseUrl . "?token=" . urlencode($token);

        // Option B: Redirect to the business's own website
        // $businessCheckoutUrl = $business->checkout_url; // Stored during onboarding
        // return $businessCheckoutUrl . "?order=" . $order->order_number . "&token=" . urlencode($token);
    }
}
```

---

## 10. Redirecting to Payment / Checkout

### 10.1 Checkout Page (Laravel Controller)

```php
// app/Http/Controllers/CheckoutController.php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page for a WhatsApp order.
     */
    public function show(string $orderNumber, Request $request)
    {
        $order = Order::where('order_number', $orderNumber)
            ->where('status', 'pending_payment')
            ->with('items')
            ->firstOrFail();

        // Verify the token
        $token = $request->query('token');
        if ($token) {
            try {
                $decrypted = decrypt($token);
                [$orderId, $orderNum, $phone] = explode(':', $decrypted);
                if ((int) $orderId !== $order->id || $orderNum !== $order->order_number) {
                    abort(403, 'Invalid checkout token');
                }
            } catch (\Exception $e) {
                abort(403, 'Invalid checkout token');
            }
        }

        // Return checkout view (or JSON for React SPA)
        return response()->json([
            'order_number'  => $order->order_number,
            'items'         => $order->items->map(fn($item) => [
                'sku'        => $item->product_retailer_id,
                'quantity'   => $item->quantity,
                'unit_price' => $item->unit_price,
                'total'      => $item->quantity * $item->unit_price,
            ]),
            'total_amount'  => $order->total_amount,
            'currency'      => $order->currency,
            'customer_name' => $order->customer_name,
            'customer_note' => $order->customer_note,
        ]);
    }

    /**
     * Process payment (integrate with Paystack, Flutterwave, etc.).
     */
    public function processPayment(string $orderNumber, Request $request)
    {
        $order = Order::where('order_number', $orderNumber)
            ->where('status', 'pending_payment')
            ->firstOrFail();

        // Integrate with your payment gateway
        // Example: Paystack, Flutterwave, Stripe

        // After successful payment:
        $order->update(['status' => 'paid']);

        // Notify customer on WhatsApp
        $this->sendPaymentConfirmation($order);

        return response()->json(['success' => true, 'message' => 'Payment successful!']);
    }

    private function sendPaymentConfirmation(Order $order): void
    {
        $whatsApp = app(\App\Services\WhatsAppService::class);
        $business = $order->businessWhatsApp;

        $whatsApp->sendText(
            $business,
            $order->customer_phone,
            "🎉 *Payment Confirmed!*\n\n"
            . "Order: *{$order->order_number}*\n"
            . "Amount: *{$order->currency} " . number_format($order->total_amount, 2) . "*\n\n"
            . "Thank you for your purchase! Your order is now being processed.\n"
            . "We'll update you when it's ready. 📦"
        );
    }
}
```

### 10.2 React Checkout Page

```jsx
// src/pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const Checkout = () => {
  const { orderNumber } = useParams();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    fetch(`/api/checkout/${orderNumber}?token=${encodeURIComponent(token)}`)
      .then(res => res.json())
      .then(data => { setOrder(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [orderNumber, searchParams]);

  const handlePayment = async () => {
    setPaying(true);
    // Integrate with Paystack/Flutterwave inline JS
    // Example with Paystack:
    const handler = window.PaystackPop.setup({
      key: 'pk_test_xxxxx',
      email: 'customer@email.com', // Collect via form or from order
      amount: order.total_amount * 100, // Paystack uses kobo
      currency: order.currency,
      ref: order.order_number,
      callback: async (response) => {
        // Verify payment on backend
        await fetch(`/api/checkout/${orderNumber}/pay`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: response.reference }),
        });
        alert('Payment successful! Check WhatsApp for confirmation.');
      },
      onClose: () => setPaying(false),
    });
    handler.openIframe();
  };

  if (loading) return <div className="p-8 text-center">Loading order...</div>;
  if (!order) return <div className="p-8 text-center">Order not found</div>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="text-gray-600 mb-4">Order: {order.order_number}</p>

      <div className="border rounded-lg p-4 mb-4">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between py-2 border-b last:border-0">
            <div>
              <p className="font-medium">{item.sku}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">
              {order.currency} {item.total.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-lg font-bold mb-6">
        <span>Total</span>
        <span>{order.currency} {order.total_amount.toLocaleString()}</span>
      </div>

      <button
        onClick={handlePayment}
        disabled={paying}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold 
                   hover:bg-green-700 disabled:opacity-50"
      >
        {paying ? 'Processing...' : `Pay ${order.currency} ${order.total_amount.toLocaleString()}`}
      </button>
    </div>
  );
};

export default Checkout;
```

### 10.3 Checkout Routes

```php
// routes/api.php
Route::get('/checkout/{orderNumber}', [CheckoutController::class, 'show']);
Route::post('/checkout/{orderNumber}/pay', [CheckoutController::class, 'processPayment']);

// routes/web.php (for the React SPA to handle)
Route::get('/checkout/{orderNumber}', function () {
    return view('app'); // Your React SPA entry point
});
```

---

## 11. Database Schema

### 11.1 Migrations

```php
// database/migrations/xxxx_create_business_whatsapps_table.php
Schema::create('business_whatsapps', function (Blueprint $table) {
    $table->id();
    $table->foreignId('business_id')->constrained()->onDelete('cascade');
    $table->string('waba_id')->unique();
    $table->string('waba_name');
    $table->text('access_token'); // Encrypted
    $table->string('phone_number_id');
    $table->string('display_phone_number');
    $table->string('verified_name')->nullable();
    $table->string('quality_rating')->nullable();
    $table->string('catalog_id')->nullable();
    $table->string('checkout_url')->nullable(); // Business's own checkout URL
    $table->boolean('is_active')->default(true);
    $table->boolean('commerce_enabled')->default(false);
    $table->timestamps();
});

// database/migrations/xxxx_create_conversation_states_table.php
Schema::create('conversation_states', function (Blueprint $table) {
    $table->id();
    $table->foreignId('business_whatsapp_id')->constrained()->onDelete('cascade');
    $table->string('customer_phone');
    $table->string('state')->default('welcome');
    $table->json('data')->nullable();
    $table->timestamps();

    $table->unique(['business_whatsapp_id', 'customer_phone']);
});

// database/migrations/xxxx_create_orders_table.php
Schema::create('orders', function (Blueprint $table) {
    $table->id();
    $table->foreignId('business_whatsapp_id')->constrained()->onDelete('cascade');
    $table->string('order_number')->unique();
    $table->string('customer_phone');
    $table->string('customer_name')->nullable();
    $table->string('catalog_id');
    $table->decimal('total_amount', 12, 2);
    $table->string('currency', 3)->default('NGN');
    $table->text('customer_note')->nullable();
    $table->enum('status', [
        'pending_payment', 'paid', 'processing',
        'shipped', 'delivered', 'cancelled', 'refunded'
    ])->default('pending_payment');
    $table->string('whatsapp_message_id')->nullable();
    $table->string('payment_reference')->nullable();
    $table->timestamps();
});

// database/migrations/xxxx_create_order_items_table.php
Schema::create('order_items', function (Blueprint $table) {
    $table->id();
    $table->foreignId('order_id')->constrained()->onDelete('cascade');
    $table->string('product_retailer_id'); // SKU
    $table->integer('quantity');
    $table->decimal('unit_price', 12, 2);
    $table->string('currency', 3)->default('NGN');
    $table->timestamps();
});

// database/migrations/xxxx_create_whatsapp_messages_table.php
Schema::create('whatsapp_messages', function (Blueprint $table) {
    $table->id();
    $table->foreignId('business_whatsapp_id')->constrained()->onDelete('cascade');
    $table->string('whatsapp_message_id')->unique();
    $table->string('customer_phone');
    $table->enum('direction', ['inbound', 'outbound']);
    $table->string('message_type'); // text, interactive, order, image, etc.
    $table->json('payload')->nullable();
    $table->string('status')->nullable(); // sent, delivered, read
    $table->timestamps();
});
```

---

## 12. React Admin Dashboard

The admin dashboard lets business owners manage their WhatsApp commerce settings.

### 12.1 Key Pages

```
/dashboard
  ├── /whatsapp/connect       → Embedded Signup (WhatsAppConnect component)
  ├── /whatsapp/settings      → Commerce settings, catalog connection
  ├── /whatsapp/orders        → Order management (list, status updates)
  ├── /whatsapp/conversations → View customer conversations
  └── /whatsapp/analytics     → Message stats, order volume, revenue
```

### 12.2 API Routes for Admin

```php
// routes/api.php (authenticated, for business admins)
Route::middleware('auth:sanctum')->prefix('admin/whatsapp')->group(function () {
    Route::get('/status', [WhatsAppAdminController::class, 'status']);
    Route::post('/enable-commerce', [WhatsAppAdminController::class, 'enableCommerce']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::patch('/orders/{order}/status', [OrderController::class, 'updateStatus']);
    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::get('/analytics', [AnalyticsController::class, 'dashboard']);
});
```

### 12.3 Orders List Component

```jsx
// src/pages/admin/Orders.jsx
import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/admin/whatsapp/orders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(data => setOrders(data.data));
  }, []);

  const updateStatus = async (orderId, status) => {
    await fetch(`/api/admin/whatsapp/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ status }),
    });
    // Refresh orders
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">WhatsApp Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Order #</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="p-3 font-mono">{order.order_number}</td>
                <td className="p-3">
                  <div>{order.customer_name}</div>
                  <div className="text-sm text-gray-500">{order.customer_phone}</div>
                </td>
                <td className="p-3">{order.items_count} items</td>
                <td className="p-3 font-semibold">
                  {order.currency} {parseFloat(order.total_amount).toLocaleString()}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    order.status === 'paid' ? 'bg-green-100 text-green-800' :
                    order.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3">
                  {order.status === 'paid' && (
                    <button
                      onClick={() => updateStatus(order.id, 'processing')}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Mark Processing
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
```

---

## 13. Security & Compliance

### 13.1 Webhook Signature Verification

Always verify that webhook requests come from Meta by checking the `X-Hub-Signature-256` header (shown in section 5.3).

### 13.2 Token Storage

- **Never** store access tokens in plaintext. Use Laravel's `encrypt()` / `decrypt()`.
- **Never** expose tokens to the React frontend. All API calls to Meta go through your Laravel backend.

### 13.3 24-Hour Messaging Window

- You can only send **free-form messages** (text, interactive, product messages) within **24 hours** of the customer's last message.
- After 24 hours, you must use **pre-approved template messages** to re-engage the customer.
- Template messages require approval from Meta and incur per-message charges.

### 13.4 Opt-In Requirements

- Customers must **opt in** before receiving marketing messages.
- Product/catalog messages sent in response to a customer's message are fine (they initiated).
- Store consent records in your database.

### 13.5 Rate Limits & Messaging Tiers

| Tier | Unique Customers per 24h | Requirement |
|------|--------------------------|-------------|
| Unverified | 250 | Default |
| Tier 1 | 1,000 | Business verified |
| Tier 2 | 10,000 | Good quality + volume |
| Tier 3 | 100,000 | Good quality + volume |
| Tier 4 | Unlimited | Good quality + volume |

### 13.6 Meta Commerce Policy

Products in the catalog must comply with Meta's Commerce Policy. Prohibited categories include alcohol, tobacco, drugs, weapons, adult content, and more. Review the full policy at [whatsapp.com/legal/commerce-policy](https://www.whatsapp.com/legal/commerce-policy).

---

## 14. Testing & Going Live

### 14.1 Testing with the Test Phone Number

1. Meta provides a **test phone number** in your app dashboard (WhatsApp > API Setup).
2. Add your personal phone number as a **test recipient**.
3. Use this to test the full flow without going through business verification.

### 14.2 Testing Webhooks Locally

Use a tunneling service to expose your local Laravel instance:

```bash
# Using ngrok
ngrok http 8000
# Copy the HTTPS URL and set it as your webhook callback URL in Meta

# Or use Laravel Expose
expose share http://localhost:8000
```

### 14.3 Test Checklist

- [ ] Business can complete Embedded Signup and see their phone number connected.
- [ ] Webhook verification (GET) succeeds.
- [ ] Customer sends "Hi" → receives welcome menu.
- [ ] Customer taps "Browse Products" → receives product catalog/list.
- [ ] Customer browses products, adds to cart, submits order.
- [ ] Order webhook received → order created in database.
- [ ] Customer receives order confirmation with checkout link.
- [ ] Customer taps checkout link → lands on payment page with correct order details.
- [ ] Payment completed → customer receives confirmation on WhatsApp.
- [ ] Business admin can see orders in dashboard.

### 14.4 Going Live

1. Complete **Meta Business Verification** for your platform.
2. Submit your app for **App Review** with the following permissions:
   - `whatsapp_business_management`
   - `whatsapp_business_messaging`
3. Set App Mode to **Live**.
4. Set up a **production webhook URL** (not ngrok).
5. Configure **queue workers** for processing webhooks asynchronously:
   ```bash
   php artisan queue:work --queue=default --tries=3 --backoff=30
   ```

---

## 15. Common Pitfalls & Troubleshooting

### Product Messages Not Sending
- Ensure the catalog is **connected to the WABA** (not just created in Commerce Manager).
- Ensure `is_cart_enabled` and `is_catalog_visible` are both `true` on the phone number's commerce settings.
- Products must be **approved** by Meta (check Commerce Manager for rejected items).

### "This message type is not supported" Error
- You're likely trying to send a product message **outside the 24-hour window**. Use a template message first.

### Webhooks Not Firing
- Verify your webhook URL is reachable via HTTPS.
- Check that you subscribed the app to the WABA (the `subscribed_apps` call in section 3.4).
- Check the **Webhooks** section in your Meta App Dashboard for failed deliveries.

### Token Expiration
- Tokens from Embedded Signup can expire. Implement token refresh logic or use **System User tokens** which are long-lived.
- For long-lived tokens, exchange the short-lived token:
  ```
  GET /oauth/access_token?grant_type=fb_exchange_token
      &client_id={app-id}
      &client_secret={app-secret}
      &fb_exchange_token={short-lived-token}
  ```

### Order Webhook Not Received
- Make sure you're subscribed to the `messages` field in your webhook configuration.
- The order type only fires when the customer uses WhatsApp's native cart and checkout flow. If you're using interactive buttons instead of product messages, you'll get button replies, not order webhooks.

### Duplicate Webhooks
- Meta may send the same webhook multiple times. Use the `message_id` as an idempotency key — check if you've already processed it before creating a new order.

```php
// In ProcessWhatsAppOrder.php
$exists = Order::where('whatsapp_message_id', $this->message['id'])->exists();
if ($exists) {
    Log::info("Duplicate order webhook ignored: {$this->message['id']}");
    return;
}
```

---

## Quick Reference: API Endpoints Used

| Purpose | Method | Endpoint |
|---------|--------|----------|
| Send message | POST | `/{phone_number_id}/messages` |
| Token exchange | GET | `/oauth/access_token` |
| List WABAs | GET | `/me/whatsapp_business_accounts` |
| List phone numbers | GET | `/{waba_id}/phone_numbers` |
| Subscribe webhooks | POST | `/{waba_id}/subscribed_apps` |
| Commerce settings | POST | `/{phone_number_id}/whatsapp_commerce_settings` |
| Create catalog | POST | `/{business_id}/owned_product_catalogs` |
| Add product | POST | `/{catalog_id}/products` |
| List products | GET | `/{catalog_id}/products` |

All endpoints use base URL: `https://graph.facebook.com/v21.0`

---

**Last updated:** February 2026
**Meta API Version:** v21.0
**Author:** Generated as implementation guide for Laravel + React WhatsApp Commerce integration
