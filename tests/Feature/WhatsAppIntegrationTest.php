<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\Shop;
use App\Models\User;
use App\Models\WhatsappIntegration;
use App\Services\WhatsAppService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class WhatsAppIntegrationTest extends TestCase
{
    use RefreshDatabase;

    private function createVendorSetup(): array
    {
        $vendor = User::factory()->create(['role' => 'shop_owner']);

        $shop = Shop::create([
            'user_id' => $vendor->id,
            'name' => 'Test Shop',
            'slug' => 'test-shop',
            'public_id' => Str::random(8),
            'is_active' => true,
            'is_under_construction' => false,
        ]);

        $integration = WhatsappIntegration::create([
            'user_id' => $vendor->id,
            'waba_id' => 'test_waba_123',
            'access_token' => encrypt('test_token'),
            'phone_number_id' => 'test_phone_123',
            'display_phone_number' => '+2348012345678',
            'verified_name' => 'Test Shop',
            'is_active' => true,
        ]);

        return [$vendor, $shop, $integration];
    }

    public function test_webhook_verification_succeeds_with_valid_token(): void
    {
        config(['services.meta.webhook_verify_token' => 'test_verify_token']);

        $response = $this->get('/webhooks/whatsapp?'.http_build_query([
            'hub_mode' => 'subscribe',
            'hub_verify_token' => 'test_verify_token',
            'hub_challenge' => 'challenge_123',
        ]));

        $response->assertStatus(200);
        $response->assertSee('challenge_123');
    }

    public function test_webhook_verification_fails_with_invalid_token(): void
    {
        config(['services.meta.webhook_verify_token' => 'test_verify_token']);

        $response = $this->get('/webhooks/whatsapp?'.http_build_query([
            'hub_mode' => 'subscribe',
            'hub_verify_token' => 'wrong_token',
            'hub_challenge' => 'challenge_123',
        ]));

        $response->assertStatus(403);
    }

    public function test_webhook_handles_greeting_message(): void
    {
        [$vendor, $shop, $integration] = $this->createVendorSetup();

        $mock = $this->mock(WhatsAppService::class)->makePartial();
        $mock->shouldReceive('sendTextMessage')->once();

        $payload = $this->buildWebhookPayload($integration->phone_number_id, [
            'from' => '2348012345678',
            'type' => 'text',
            'text' => ['body' => 'hello'],
        ]);

        $response = $this->postJson('/webhooks/whatsapp', $payload);
        $response->assertStatus(200);
    }

    public function test_webhook_handles_order_lookup(): void
    {
        [$vendor, $shop, $integration] = $this->createVendorSetup();

        $order = Order::create([
            'order_number' => 'ORD-20260213-TEST',
            'shop_id' => $shop->id,
            'customer_name' => 'Jane Doe',
            'customer_phone' => '2348012345678',
            'subtotal' => 3000,
            'total' => 3000,
            'status' => 'processing',
            'payment_status' => 'paid',
        ]);

        $mock = $this->mock(WhatsAppService::class)->makePartial();
        $mock->shouldReceive('sendTextMessage')->once();

        $payload = $this->buildWebhookPayload($integration->phone_number_id, [
            'from' => '2348012345678',
            'type' => 'text',
            'text' => ['body' => 'ORD-20260213-TEST'],
        ]);

        $response = $this->postJson('/webhooks/whatsapp', $payload);
        $response->assertStatus(200);
    }

    public function test_webhook_handles_product_inquiry(): void
    {
        [$vendor, $shop, $integration] = $this->createVendorSetup();

        Product::create([
            'name' => 'Jollof Rice',
            'slug' => 'jollof-rice',
            'shop_public_id' => $shop->public_id,
            'price' => 2500,
            'stock_quantity' => 10,
            'is_active' => true,
        ]);

        $mock = $this->mock(WhatsAppService::class)->makePartial();
        $mock->shouldReceive('sendTextMessage')->once();

        $payload = $this->buildWebhookPayload($integration->phone_number_id, [
            'from' => '2348012345678',
            'type' => 'text',
            'text' => ['body' => 'how much is jollof rice'],
        ]);

        $response = $this->postJson('/webhooks/whatsapp', $payload);
        $response->assertStatus(200);
    }

    public function test_webhook_handles_help_keyword(): void
    {
        [$vendor, $shop, $integration] = $this->createVendorSetup();

        $mock = $this->mock(WhatsAppService::class)->makePartial();
        $mock->shouldReceive('sendTextMessage')->once();

        $payload = $this->buildWebhookPayload($integration->phone_number_id, [
            'from' => '2348012345678',
            'type' => 'text',
            'text' => ['body' => 'help'],
        ]);

        $response = $this->postJson('/webhooks/whatsapp', $payload);
        $response->assertStatus(200);
    }

    public function test_webhook_handles_unknown_message_with_fallback(): void
    {
        [$vendor, $shop, $integration] = $this->createVendorSetup();

        $mock = $this->mock(WhatsAppService::class)->makePartial();
        $mock->shouldReceive('sendTextMessage')->once();

        $payload = $this->buildWebhookPayload($integration->phone_number_id, [
            'from' => '2348012345678',
            'type' => 'text',
            'text' => ['body' => 'xyzzy random text'],
        ]);

        $response = $this->postJson('/webhooks/whatsapp', $payload);
        $response->assertStatus(200);
    }

    public function test_source_column_defaults_to_web(): void
    {
        [$vendor, $shop, $integration] = $this->createVendorSetup();

        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'shop_id' => $shop->id,
            'customer_name' => 'Test',
            'customer_phone' => '08012345678',
            'subtotal' => 1000,
            'total' => 1000,
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        $this->assertEquals('web', $order->fresh()->source);
    }

    public function test_whatsapp_source_is_stored(): void
    {
        [$vendor, $shop, $integration] = $this->createVendorSetup();

        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'shop_id' => $shop->id,
            'customer_name' => 'Test',
            'customer_phone' => '08012345678',
            'subtotal' => 1000,
            'total' => 1000,
            'status' => 'pending',
            'payment_status' => 'pending',
            'source' => 'whatsapp',
        ]);

        $this->assertEquals('whatsapp', $order->fresh()->source);
    }

    /**
     * Build a standard WhatsApp webhook payload.
     */
    private function buildWebhookPayload(string $phoneNumberId, array $message): array
    {
        return [
            'object' => 'whatsapp_business_account',
            'entry' => [
                [
                    'id' => 'test_entry',
                    'changes' => [
                        [
                            'field' => 'messages',
                            'value' => [
                                'messaging_product' => 'whatsapp',
                                'metadata' => [
                                    'phone_number_id' => $phoneNumberId,
                                    'display_phone_number' => '+2348012345678',
                                ],
                                'contacts' => [
                                    [
                                        'profile' => ['name' => 'Test Customer'],
                                        'wa_id' => $message['from'] ?? '2348012345678',
                                    ],
                                ],
                                'messages' => [$message],
                            ],
                        ],
                    ],
                ],
            ],
        ];
    }
}
