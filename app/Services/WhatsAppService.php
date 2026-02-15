<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\WhatsappIntegration;
use Illuminate\Support\Facades\DB;
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
                'to' => $this->formatPhoneNumber($to),
                'type' => 'text',
                'text' => ['body' => $text],
            ]);

        if ($response->failed()) {
            throw new \Exception('WhatsApp API error: '.($response->json('error.message') ?? $response->body()));
        }

        return $response->json();
    }

    /**
     * Send an order confirmation message to the customer.
     */
    public function sendOrderConfirmation(WhatsappIntegration $integration, Order $order): void
    {
        $items = '';
        $order->loadMissing('items');
        foreach ($order->items as $item) {
            $name = $item->product_name ?? 'Product';
            $qty = $item->quantity;
            $lineTotal = $item->line_total;
            $items .= "- {$name} x{$qty} — ₦".number_format($lineTotal)."\n";
        }

        $message = "✅ *Order Confirmed!*\n\n"
            ."Order: #{$order->order_number}\n"
            ."Customer: {$order->customer_name}\n\n"
            .($items ? "*Items:*\n{$items}\n" : '')
            .'*Total: ₦'.number_format($order->total)."*\n\n"
            .'Thank you for your order!';

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
            ."Order: #{$order->order_number}\n"
            ."Customer: {$order->customer_name}\n"
            ."Phone: {$order->customer_phone}\n"
            .'Total: ₦'.number_format($order->total)."\n"
            ."Status: {$order->status}\n\n"
            .'Check your dashboard for details.';

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
            'pending' => 'Pending',
            'confirmed' => 'Confirmed',
            'processing' => 'Being Prepared',
            'ready' => 'Ready for Pickup/Delivery',
            'out_for_delivery' => 'Out for Delivery',
            'delivered' => 'Delivered',
            'cancelled' => 'Cancelled',
        ];

        $statusLabel = $statusLabels[$order->status] ?? ucfirst($order->status);

        $message = "📦 *Order Update*\n\n"
            ."Order: #{$order->order_number}\n"
            ."Status: *{$statusLabel}*\n\n";

        if ($order->status === 'confirmed') {
            $message .= "Your order has been confirmed! We'll start preparing it soon.";
        } elseif ($order->status === 'processing') {
            $message .= 'Your order is being prepared! 🍳';
        } elseif ($order->status === 'ready') {
            $message .= 'Your order is ready! 🎁';
        } elseif ($order->status === 'out_for_delivery') {
            $message .= 'Your order is on its way! 🚚';
        } elseif ($order->status === 'delivered') {
            $message .= 'Your order has been delivered. Enjoy! 🎉';
        } elseif ($order->status === 'cancelled') {
            $message .= 'If you have questions, please contact us.';
        }

        if (! $order->customer_phone) {
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
            'from' => $from,
            'type' => $type,
            'waba' => $integration->waba_id,
            'name' => $contactName,
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
     * Handle a text message from a customer with keyword-based routing.
     */
    private function handleTextMessage(WhatsappIntegration $integration, string $from, string $text, string $contactName): void
    {
        $lowerText = strtolower(trim($text));
        $vendorName = $integration->verified_name ?? $integration->waba_name ?? 'our store';

        try {
            // 1. Greeting detection
            $greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'hiya', 'howdy'];
            if (in_array($lowerText, $greetings)) {
                $this->sendTextMessage($integration, $from, $this->buildGreetingReply($vendorName, $contactName));

                return;
            }

            // 2. Order status lookup (detect order number patterns)
            if (preg_match('/(ORD-[\w-]+|WA-[\w]+)/i', $text, $matches)) {
                $this->handleOrderLookup($integration, $from, $matches[1]);

                return;
            }

            // 3. Help / support keywords
            $helpKeywords = ['help', 'support', 'issue', 'problem', 'complaint', 'contact', 'assist'];
            if ($this->containsAny($lowerText, $helpKeywords)) {
                $this->sendTextMessage($integration, $from, $this->buildHelpReply($vendorName));

                return;
            }

            // 4. Product inquiry keywords
            $productKeywords = ['product', 'price', 'how much', 'available', 'stock', 'menu', 'catalog', 'buy', 'order'];
            if ($this->containsAny($lowerText, $productKeywords)) {
                $this->handleProductInquiry($integration, $from, $lowerText);

                return;
            }

            // 5. Default fallback — send helpful menu
            $this->sendTextMessage($integration, $from, $this->buildFallbackReply($vendorName, $contactName));
        } catch (\Exception $e) {
            Log::warning('Failed to handle text message', ['error' => $e->getMessage()]);
        }
    }

    /**
     * Check if text contains any of the given keywords.
     */
    private function containsAny(string $text, array $keywords): bool
    {
        foreach ($keywords as $keyword) {
            if (str_contains($text, $keyword)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Build a greeting reply message.
     */
    private function buildGreetingReply(string $vendorName, string $contactName): string
    {
        return "Hello {$contactName}! 👋\n\n"
            ."Welcome to {$vendorName}. How can we help you today?\n\n"
            ."📋 Browse our catalog to see available products\n"
            ."📦 Send your order number to check order status\n"
            .'❓ Type *help* for more options';
    }

    /**
     * Build a help menu reply.
     */
    private function buildHelpReply(string $vendorName): string
    {
        return "🆘 *{$vendorName} — Help*\n\n"
            ."Here's what you can do:\n\n"
            ."📋 *Browse Products* — Open our catalog to see what's available\n"
            ."📦 *Track Order* — Send your order number (e.g. ORD-20260213-XXXX) to get status\n"
            ."🛒 *Place Order* — Browse our catalog and add items to your cart\n"
            ."💬 *Contact Us* — Our team will respond as soon as possible\n\n"
            .'Just type what you need!';
    }

    /**
     * Build a fallback reply for unrecognized messages.
     */
    private function buildFallbackReply(string $vendorName, string $contactName): string
    {
        return "Hi {$contactName}! Thanks for reaching out to {$vendorName}.\n\n"
            ."I can help you with:\n"
            ."📋 *Products* — Type \"products\" to browse\n"
            ."📦 *Order Status* — Send your order number\n"
            ."❓ *Help* — Type \"help\" for all options\n\n"
            .'Or browse our catalog to see available items!';
    }

    /**
     * Handle order status lookup by order number.
     */
    private function handleOrderLookup(WhatsappIntegration $integration, string $from, string $orderNumber): void
    {
        $user = $integration->user;
        $shopIds = $user->shops()->pluck('id');

        $order = Order::whereIn('shop_id', $shopIds)
            ->where('order_number', $orderNumber)
            ->first();

        if (! $order) {
            $this->sendTextMessage($integration, $from,
                "❌ Order *{$orderNumber}* not found.\n\n"
                .'Please double-check the order number and try again.'
            );

            return;
        }

        $statusLabels = [
            'pending' => 'Pending',
            'confirmed' => 'Confirmed',
            'processing' => 'Being Prepared',
            'ready' => 'Ready for Pickup/Delivery',
            'out_for_delivery' => 'Out for Delivery',
            'delivered' => 'Delivered',
            'cancelled' => 'Cancelled',
        ];

        $statusLabel = $statusLabels[$order->status] ?? ucfirst($order->status);

        $message = "📦 *Order Status*\n\n"
            ."Order: #{$order->order_number}\n"
            ."Status: *{$statusLabel}*\n"
            .'Total: ₦'.number_format($order->total)."\n"
            .'Placed: '.$order->created_at->format('M d, Y g:ia')."\n";

        if ($order->delivery_type === 'delivery') {
            $message .= "Delivery: {$order->delivery_address}\n";
        }

        $this->sendTextMessage($integration, $from, $message);
    }

    /**
     * Handle product inquiry — search and return matching products with store link.
     */
    private function handleProductInquiry(WhatsappIntegration $integration, string $from, string $query): void
    {
        $user = $integration->user;
        $shop = $user->shops()->first();

        if (! $shop) {
            $this->sendTextMessage($integration, $from, 'Sorry, no store is currently set up.');

            return;
        }

        $shopUrl = config('app.url').'/shop/'.$shop->public_id;

        // Remove common keywords to extract actual product search term
        $searchTerm = str_replace(
            ['product', 'price', 'how much', 'is', 'the', 'available', 'stock', 'do you have', 'buy', 'order', 'menu', 'catalog', '?'],
            '',
            $query
        );
        $searchTerm = trim($searchTerm);

        // If a specific search term exists, search for matching products
        if (strlen($searchTerm) >= 2) {
            $products = Product::where('shop_public_id', $shop->public_id)
                ->where('is_active', true)
                ->where('name', 'LIKE', "%{$searchTerm}%")
                ->limit(5)
                ->get();

            if ($products->isNotEmpty()) {
                $message = "🔍 *Search Results:*\n\n";
                foreach ($products as $product) {
                    $availability = $product->stock_status === 'out_of_stock' ? '❌ Out of stock' : '✅ In stock';
                    $price = '₦'.number_format($product->sale_price);
                    $message .= "*{$product->name}*\n"
                        ."{$price} · {$availability}\n"
                        .($product->description ? substr($product->description, 0, 80)."\n" : '')
                        ."\n";
                }
                $message .= "🛒 View & order: {$shopUrl}";
                $this->sendTextMessage($integration, $from, $message);

                return;
            }
        }

        // No specific match or generic inquiry — show top products
        $products = Product::where('shop_public_id', $shop->public_id)
            ->where('is_active', true)
            ->where('stock_status', '!=', 'out_of_stock')
            ->orderBy('views', 'desc')
            ->limit(5)
            ->get();

        if ($products->isEmpty()) {
            $this->sendTextMessage($integration, $from,
                "Our catalog is being updated. Please check back soon or visit our store:\n{$shopUrl}"
            );

            return;
        }

        $message = "📋 *Our Top Products:*\n\n";
        foreach ($products as $product) {
            $price = '₦'.number_format($product->sale_price);
            $message .= "• *{$product->name}* — {$price}\n";
        }
        $message .= "\n🛒 Browse our full catalog and order at:\n{$shopUrl}";

        $this->sendTextMessage($integration, $from, $message);
    }

    /**
     * Handle a catalog order from WhatsApp.
     * Creates proper OrderItem records and decrements product stock.
     */
    private function handleCatalogOrder(WhatsappIntegration $integration, string $from, array $orderData, string $contactName): void
    {
        $catalogItems = $orderData['product_items'] ?? [];

        if (empty($catalogItems)) {
            return;
        }

        $user = $integration->user;
        $shop = $user->shops()->first();

        if (! $shop) {
            Log::warning('No shop found for WhatsApp catalog order', ['user_id' => $user->id]);

            return;
        }

        $shopUrl = config('app.url').'/shop/'.$shop->public_id;

        try {
            DB::beginTransaction();

            $subtotal = 0;
            $itemsData = [];

            foreach ($catalogItems as $item) {
                $productId = str_replace('product-', '', $item['product_retailer_id'] ?? '');
                $product = Product::find($productId);

                $quantity = (int) ($item['quantity'] ?? 1);
                $unitPrice = $product ? $product->price : (($item['item_price'] ?? 0) / 100);
                $salePrice = $product ? $product->sale_price : $unitPrice;
                $lineTotal = $salePrice * $quantity;

                $itemsData[] = [
                    'product' => $product,
                    'product_name' => $product?->name ?? ($item['product_retailer_id'] ?? 'Unknown Product'),
                    'unit_price' => $unitPrice,
                    'discount_price' => $salePrice,
                    'quantity' => $quantity,
                    'line_total' => $lineTotal,
                ];

                $subtotal += $lineTotal;
            }

            $order = Order::create([
                'shop_id' => $shop->id,
                'order_number' => 'WA-'.strtoupper(uniqid()),
                'customer_name' => $contactName,
                'customer_phone' => $from,
                'subtotal' => $subtotal,
                'total' => $subtotal,
                'status' => 'pending',
                'payment_status' => 'pending',
                'source' => 'whatsapp',
            ]);

            foreach ($itemsData as $itemData) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $itemData['product']?->id,
                    'product_name' => $itemData['product_name'],
                    'unit_price' => $itemData['unit_price'],
                    'discount_price' => $itemData['discount_price'],
                    'quantity' => $itemData['quantity'],
                    'line_total' => $itemData['line_total'],
                ]);

                if ($itemData['product']) {
                    $itemData['product']->decrement('stock_quantity', $itemData['quantity']);
                }
            }

            DB::commit();

            // Send confirmation to customer
            $itemsList = '';
            foreach ($itemsData as $itemData) {
                $itemsList .= "- {$itemData['product_name']} x{$itemData['quantity']} — ₦".number_format($itemData['line_total'])."\n";
            }

            $confirmation = "✅ *Order Received!*\n\n"
                ."Order: #{$order->order_number}\n\n"
                ."*Items:*\n{$itemsList}\n"
                .'*Total: ₦'.number_format($subtotal)."*\n\n"
                ."Complete your payment and checkout here:\n{$shopUrl}\n\n"
                ."We'll update you when your order is being prepared. Thank you! 🙏";

            $this->sendTextMessage($integration, $from, $confirmation);

            // Notify vendor
            $this->notifyVendorNewOrder($integration, $order);

            Log::info('WhatsApp catalog order created', ['order_id' => $order->id, 'total' => $subtotal]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('WhatsApp catalog order failed', ['error' => $e->getMessage()]);

            try {
                $this->sendTextMessage($integration, $from,
                    "Sorry, we couldn't process your order right now. Please try again or visit our store:\n{$shopUrl}"
                );
            } catch (\Exception $ignored) {
            }
        }
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
            $phone = '234'.substr($phone, 1);
        }

        // Remove leading + if present
        $phone = ltrim($phone, '+');

        return $phone;
    }
}
