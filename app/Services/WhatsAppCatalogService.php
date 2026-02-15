<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Shop;
use App\Models\WhatsappIntegration;
use Illuminate\Support\Facades\Http;

class WhatsAppCatalogService
{
    private string $version;

    private string $baseUrl;

    public function __construct()
    {
        $this->version = config('services.meta.graph_version', 'v21.0');
        $this->baseUrl = "https://graph.facebook.com/{$this->version}";
    }

    /**
     * Full catalog setup: create catalog → connect to WABA → enable commerce.
     */
    public function setup(WhatsappIntegration $integration, string $catalogName): void
    {
        $token = decrypt($integration->access_token);

        // Step 1: Create catalog under the business account
        $catalogId = $this->createCatalog($integration, $catalogName, $token);

        // Step 2: Connect catalog to the WABA's phone number (enable commerce)
        $this->enableCommerce($integration, $catalogId, $token);

        // Step 3: Persist
        $integration->update([
            'catalog_id' => $catalogId,
            'catalog_name' => $catalogName,
            'commerce_enabled' => true,
        ]);
    }

    /**
     * Create a product catalog under the business account.
     * Returns the new catalog_id.
     */
    public function createCatalog(WhatsappIntegration $integration, string $name, string $token): string
    {
        // Try business-owned catalog endpoint first
        $parentId = $integration->business_id ?? $integration->waba_id;

        $response = Http::withToken($token)
            ->post("{$this->baseUrl}/{$parentId}/owned_product_catalogs", [
                'name' => $name,
                'vertical' => 'commerce',
            ]);

        if ($response->failed() || ! $response->json('id')) {
            throw new \Exception('Failed to create catalog: '.($response->json('error.message') ?? $response->body()));
        }

        return $response->json('id');
    }

    /**
     * Connect catalog to the phone number and enable the WhatsApp cart.
     */
    public function enableCommerce(WhatsappIntegration $integration, string $catalogId, string $token): void
    {
        $response = Http::withToken($token)
            ->post("{$this->baseUrl}/{$integration->phone_number_id}/whatsapp_commerce_settings", [
                'is_cart_enabled' => true,
                'is_catalog_visible' => true,
                'catalog_id' => $catalogId,
            ]);

        if ($response->failed()) {
            // Non-fatal: log but don't block
            \Log::warning('WhatsApp commerce settings update failed', [
                'error' => $response->json('error.message') ?? $response->body(),
            ]);
        }
    }

    /**
     * Sync all active products of a shop to the Facebook Catalog.
     * Returns the number of products successfully queued.
     */
    public function syncShopProducts(WhatsappIntegration $integration, Shop $shop): int
    {
        $token = decrypt($integration->access_token);
        $catalogId = $integration->catalog_id;

        $products = $shop->products()
            ->where('is_active', true)
            ->where('stock_status', '!=', 'out_of_stock')
            ->get();

        if ($products->isEmpty()) {
            return 0;
        }

        // Build batch payload (max 1000 per request)
        $items = $products->map(fn (Product $p) => $this->buildProductPayload($p, $shop, 'CREATE'))->values()->all();

        $chunks = array_chunk($items, 100);
        $synced = 0;

        foreach ($chunks as $chunk) {
            $response = Http::withToken($token)
                ->post("{$this->baseUrl}/{$catalogId}/items_batch", [
                    'allow_upsert' => true,
                    'requests' => $chunk,
                ]);

            if ($response->successful()) {
                $synced += count($chunk);
            } else {
                \Log::error('WhatsApp catalog batch failed', [
                    'catalog' => $catalogId,
                    'shop' => $shop->id,
                    'error' => $response->json('error.message') ?? $response->body(),
                ]);
            }
        }

        // Update last synced timestamp
        $integration->update(['last_synced_at' => now()]);

        return $synced;
    }

    /**
     * Build the catalog item payload for a single product.
     */
    private function buildProductPayload(Product $product, Shop $shop, string $method = 'CREATE'): array
    {
        $availability = match ($product->stock_status) {
            'in_stock' => 'in stock',
            'low_stock' => 'in stock',
            default => 'out of stock',
        };

        $productUrl = config('app.url').'/shop/'.$shop->public_id.'?product='.$product->id;

        return [
            'method' => $method,
            'retailer_id' => 'product-'.$product->id,
            'data' => [
                'name' => $product->name,
                'description' => $product->description ?? $product->name,
                'availability' => $availability,
                'condition' => 'new',
                'price' => (int) ($product->sale_price * 100), // minor units (kobo)
                'currency' => 'NGN',
                'image_url' => $product->image_url ?: '',
                'url' => $productUrl,
                'brand' => $shop->name,
                'category' => $product->category?->name ?? 'General',
            ],
        ];
    }
}
