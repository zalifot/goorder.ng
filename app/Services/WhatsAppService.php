<?php

namespace App\Services;

use App\Models\Order;
use App\Models\WhatsappIntegration;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    private string $version;
    private string $baseUrl;

    public function __construct()
    {
        $this->version = config('services.meta.graph_version', 'v21.0');
        $this->baseUrl = "https://graph.facebook.com/{$this->version}";
    }

    /**
     * Send a plain text message to a WhatsApp number.
     */
    public function sendTextMessage(WhatsappIntegration $integration, string $to, string $text): array
    {
        $token = decrypt($integration->access_token);

        $response = Http::withToken($token)
            ->post("{$this->baseUrl}/{$integration->phone_number_id}/messages", [
                'messaging_product' => 'whatsapp',
                'to'                => $this->formatPhoneNumber($to),
                'type'              => 'text',
                'text'              => ['body' => $text],
            ]);

        if ($response->failed()) {
            throw new \Exception('WhatsApp API error: ' . ($response->json('error.message') ?? $response->body()));
        }

        return $response->json();
    }

    /**
     * Send an order confirmation message to the customer.
     */
    public function sendOrderConfirmation(WhatsappIntegration $integration, Order $order): void
    {
        $items = '';
        if ($order->items) {
            foreach ($order->items as $item) {
                $items .= "- {$item['name']} x{$item['quantity']} — ₦" . number_format($item['price'] * $item['quantity']) . "\n";
            }
        }

        $message = "✅ *Order Confirmed!*\n\n"
            . "Order: #{$order->order_number}\n"
            . "Customer: {$order->customer_name}\n\n"
            . ($items ? "*Items:*\n{$items}\n" : '')
            . "*Total: ₦" . number_format($order->total) . "*\n\n"
            . "Thank you for your order!";

        try {
            $this->sendTextMessage($integration, $order->customer_phone, $message);
        } catch (\Exception $e) {
            Log::warning('Failed to send order confirmation via WhatsApp', [
                'order' => $order->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Notify the vendor about a new order.
     */
    public function notifyVendorNewOrder(WhatsappIntegration $integration, Order $order): void
    {
        $message = "🛒 *New Order Received!*\n\n"
            . "Order: #{$order->order_number}\n"
            . "Customer: {$order->customer_name}\n"
            . "Phone: {$order->customer_phone}\n"
            . "Total: ₦" . number_format($order->total) . "\n"
            . "Status: {$order->status}\n\n"
            . "Check your dashboard for details.";

        try {
            $this->sendTextMessage($integration, $integration->display_phone_number, $message);
        } catch (\Exception $e) {
            Log::warning('Failed to notify vendor via WhatsApp', [
                'order' => $order->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Send order status update to the customer.
     */
    public function sendOrderStatusUpdate(WhatsappIntegration $integration, Order $order): void
    {
        $statusLabels = [
            'pending'    => 'Pending',
            'processing' => 'Being Prepared',
            'shipped'    => 'Out for Delivery',
            'delivered'  => 'Delivered',
            'completed'  => 'Completed',
            'cancelled'  => 'Cancelled',
        ];

        $statusLabel = $statusLabels[$order->status] ?? ucfirst($order->status);

        $message = "📦 *Order Update*\n\n"
            . "Order: #{$order->order_number}\n"
            . "Status: *{$statusLabel}*\n\n";

        if ($order->status === 'shipped') {
            $message .= "Your order is on its way! 🚚";
        } elseif ($order->status === 'delivered' || $order->status === 'completed') {
            $message .= "Your order has been delivered. Enjoy! 🎉";
        } elseif ($order->status === 'cancelled') {
            $message .= "If you have questions, please contact us.";
        }

        if (!$order->customer_phone) {
            return;
        }

        try {
            $this->sendTextMessage($integration, $order->customer_phone, $message);
        } catch (\Exception $e) {
            Log::warning('Failed to send order status update via WhatsApp', [
                'order' => $order->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Handle an incoming WhatsApp message from the webhook.
     */
    public function handleIncomingMessage(WhatsappIntegration $integration, array $message, array $contacts = []): void
    {
        $type = $message['type'] ?? 'unknown';
        $from = $message['from'] ?? '';
        $contactName = $contacts[0]['profile']['name'] ?? 'Customer';

        Log::info('WhatsApp message received', [
            'from'  => $from,
            'type'  => $type,
            'waba'  => $integration->waba_id,
            'name'  => $contactName,
        ]);

        // Handle based on message type
        switch ($type) {
            case 'text':
                $text = $message['text']['body'] ?? '';
                $this->handleTextMessage($integration, $from, $text, $contactName);
                break;

            case 'order':
                // WhatsApp catalog order — customer placed order via catalog
                $this->handleCatalogOrder($integration, $from, $message['order'] ?? [], $contactName);
                break;

            case 'interactive':
                // Button or list replies
                Log::info('Interactive message received', ['message' => $message]);
                break;

            default:
                Log::info("Unhandled WhatsApp message type: {$type}");
                break;
        }
    }

    /**
     * Handle a text message from a customer.
     */
    private function handleTextMessage(WhatsappIntegration $integration, string $from, string $text, string $contactName): void
    {
        // Auto-reply with a greeting if it seems like a greeting
        $greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
        $lowerText = strtolower(trim($text));

        if (in_array($lowerText, $greetings)) {
            $vendorName = $integration->verified_name ?? $integration->waba_name ?? 'our store';
            $reply = "Hello {$contactName}! 👋\n\nWelcome to {$vendorName}. How can we help you today?\n\n"
                . "📋 Browse our catalog to see available products\n"
                . "📦 Send your order number to check order status";

            try {
                $this->sendTextMessage($integration, $from, $reply);
            } catch (\Exception $e) {
                Log::warning('Failed to send auto-reply', ['error' => $e->getMessage()]);
            }
        }
    }

    /**
     * Handle a catalog order from WhatsApp.
     * This is triggered when a customer orders through the WhatsApp catalog.
     */
    private function handleCatalogOrder(WhatsappIntegration $integration, string $from, array $orderData, string $contactName): void
    {
        $items = $orderData['product_items'] ?? [];

        if (empty($items)) {
            return;
        }

        // Find the vendor's shop
        $user = $integration->user;
        $shop = $user->shops()->first();

        if (!$shop) {
            Log::warning('No shop found for WhatsApp catalog order', ['user_id' => $user->id]);
            return;
        }

        // Build order items
        $orderItems = [];
        $total = 0;

        foreach ($items as $item) {
            $productId = str_replace('product-', '', $item['product_retailer_id'] ?? '');
            $product = \App\Models\Product::find($productId);

            $quantity = (int) ($item['quantity'] ?? 1);
            $price = $product ? $product->sale_price : (($item['item_price'] ?? 0) / 100);
            $itemTotal = $price * $quantity;

            $orderItems[] = [
                'product_id' => $product?->id,
                'name'       => $product?->name ?? ($item['product_retailer_id'] ?? 'Unknown Product'),
                'quantity'   => $quantity,
                'price'      => $price,
                'total'      => $itemTotal,
            ];

            $total += $itemTotal;
        }

        // Create the order
        $order = Order::create([
            'shop_id'        => $shop->id,
            'order_number'   => 'WA-' . strtoupper(uniqid()),
            'customer_name'  => $contactName,
            'customer_phone' => $from,
            'items'          => $orderItems,
            'total'          => $total,
            'status'         => 'pending',
            'payment_status' => 'pending',
            'source'         => 'whatsapp',
        ]);

        // Send confirmation to customer
        $itemsList = '';
        foreach ($orderItems as $item) {
            $itemsList .= "- {$item['name']} x{$item['quantity']} — ₦" . number_format($item['total']) . "\n";
        }

        $confirmation = "✅ *Order Received!*\n\n"
            . "Order: #{$order->order_number}\n\n"
            . "*Items:*\n{$itemsList}\n"
            . "*Total: ₦" . number_format($total) . "*\n\n"
            . "We'll update you when your order is being prepared. Thank you! 🙏";

        try {
            $this->sendTextMessage($integration, $from, $confirmation);
        } catch (\Exception $e) {
            Log::warning('Failed to send order confirmation', ['error' => $e->getMessage()]);
        }

        Log::info('WhatsApp catalog order created', ['order_id' => $order->id, 'total' => $total]);
    }

    /**
     * Format phone number to E.164 format.
     */
    private function formatPhoneNumber(string $phone): string
    {
        // Remove spaces, dashes, parentheses
        $phone = preg_replace('/[\s\-\(\)]/', '', $phone);

        // If starts with 0, assume Nigerian number
        if (str_starts_with($phone, '0')) {
            $phone = '234' . substr($phone, 1);
        }

        // Remove leading + if present
        $phone = ltrim($phone, '+');

        return $phone;
    }
}
