<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Shop;
use App\Models\User;
use App\Models\WhatsappIntegration;
use App\Services\WhatsAppService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class OrderStatusUpdateTest extends TestCase
{
    use RefreshDatabase;

    private function createVendorWithShopAndOrder(): array
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

        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'shop_id' => $shop->id,
            'customer_name' => 'John Doe',
            'customer_phone' => '08012345678',
            'subtotal' => 5000,
            'total' => 5000,
            'status' => 'pending',
            'payment_status' => 'paid',
        ]);

        return [$vendor, $shop, $order];
    }

    public function test_vendor_can_update_order_status(): void
    {
        [$vendor, $shop, $order] = $this->createVendorWithShopAndOrder();

        $response = $this->actingAs($vendor)->patch(
            "/vendor/manage/shop/{$shop->public_id}/orders/{$order->id}/status",
            ['status' => 'confirmed']
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'confirmed',
        ]);
    }

    public function test_vendor_cannot_update_other_shops_order(): void
    {
        [$vendor, $shop, $order] = $this->createVendorWithShopAndOrder();

        $otherVendor = User::factory()->create(['role' => 'shop_owner']);
        $otherShop = Shop::create([
            'user_id' => $otherVendor->id,
            'name' => 'Other Shop',
            'slug' => 'other-shop',
            'public_id' => Str::random(8),
            'is_active' => true,
            'is_under_construction' => false,
        ]);

        $response = $this->actingAs($otherVendor)->patch(
            "/vendor/manage/shop/{$otherShop->public_id}/orders/{$order->id}/status",
            ['status' => 'confirmed']
        );

        $response->assertStatus(403);
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'pending',
        ]);
    }

    public function test_invalid_status_is_rejected(): void
    {
        [$vendor, $shop, $order] = $this->createVendorWithShopAndOrder();

        $response = $this->actingAs($vendor)->patch(
            "/vendor/manage/shop/{$shop->public_id}/orders/{$order->id}/status",
            ['status' => 'invalid_status']
        );

        $response->assertSessionHasErrors('status');
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'pending',
        ]);
    }

    public function test_guest_cannot_update_order_status(): void
    {
        [$vendor, $shop, $order] = $this->createVendorWithShopAndOrder();

        $response = $this->patch(
            "/vendor/manage/shop/{$shop->public_id}/orders/{$order->id}/status",
            ['status' => 'confirmed']
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'pending',
        ]);
    }

    public function test_status_update_triggers_whatsapp_notification(): void
    {
        [$vendor, $shop, $order] = $this->createVendorWithShopAndOrder();

        WhatsappIntegration::create([
            'user_id' => $vendor->id,
            'waba_id' => 'test_waba_123',
            'access_token' => encrypt('test_token'),
            'phone_number_id' => 'test_phone_123',
            'display_phone_number' => '+2348012345678',
            'is_active' => true,
        ]);

        $mock = $this->mock(WhatsAppService::class);
        $mock->shouldReceive('sendOrderStatusUpdate')->once();

        $response = $this->actingAs($vendor)->patch(
            "/vendor/manage/shop/{$shop->public_id}/orders/{$order->id}/status",
            ['status' => 'confirmed']
        );

        $response->assertRedirect();
    }

    public function test_all_valid_statuses_are_accepted(): void
    {
        [$vendor, $shop, $order] = $this->createVendorWithShopAndOrder();

        $statuses = ['confirmed', 'processing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];

        foreach ($statuses as $status) {
            $response = $this->actingAs($vendor)->patch(
                "/vendor/manage/shop/{$shop->public_id}/orders/{$order->id}/status",
                ['status' => $status]
            );

            $response->assertRedirect();
            $this->assertDatabaseHas('orders', [
                'id' => $order->id,
                'status' => $status,
            ]);
        }
    }
}
