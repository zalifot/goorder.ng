<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\DeliveryLocation;
use App\Models\DeliveryState;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\WhatsappIntegration;
use App\Services\WhatsAppService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display customer orders grouped by shop.
     */
    public function index()
    {
        $orders = Order::with([
            'shop:id,name,public_id,image',
            'items.product:id,name,price,discount_percentage,image',
        ])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'shop' => $order->shop,
                    'status' => $order->status,
                    'payment_status' => $order->payment_status,
                    'delivery_type' => $order->delivery_type,
                    'subtotal' => $order->subtotal,
                    'delivery_fee' => $order->delivery_fee,
                    'total' => $order->total,
                    'item_count' => $order->items->sum('quantity'),
                    'items' => $order->items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'product_name' => $item->product_name,
                            'quantity' => $item->quantity,
                            'unit_price' => $item->unit_price,
                            'discount_price' => $item->discount_price,
                            'line_total' => $item->line_total,
                            'product' => $item->product,
                        ];
                    }),
                    'created_at' => $order->created_at->toISOString(),
                ];
            });

        // Group orders by shop
        $ordersByShop = $orders->groupBy('shop.id')->values();

        return Inertia::render('customer/orders', [
            'orders' => $orders,
            'ordersByShop' => $ordersByShop,
        ]);
    }

    /**
     * Display a single order.
     */
    public function show(Order $order)
    {
        // Verify ownership
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->load([
            'shop:id,name,public_id,image',
            'items.product:id,name,price,discount_percentage,image',
            'deliveryState',
            'deliveryLocation',
        ]);

        return Inertia::render('customer/order-details', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'shop' => $order->shop,
                'customer_name' => $order->customer_name,
                'customer_phone' => $order->customer_phone,
                'customer_email' => $order->customer_email,
                'delivery_type' => $order->delivery_type,
                'delivery_state' => $order->deliveryState,
                'delivery_location' => $order->deliveryLocation,
                'delivery_address' => $order->delivery_address,
                'delivery_fee' => $order->delivery_fee,
                'delivery_date' => $order->delivery_date,
                'notes' => $order->notes,
                'subtotal' => $order->subtotal,
                'total' => $order->total,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'items' => $order->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_name' => $item->product_name,
                        'quantity' => $item->quantity,
                        'unit_price' => $item->unit_price,
                        'discount_price' => $item->discount_price,
                        'line_total' => $item->line_total,
                        'product' => $item->product,
                    ];
                }),
                'created_at' => $order->created_at->toISOString(),
            ],
        ]);
    }

    /**
     * Display customer transaction history.
     */
    public function transactions()
    {
        $transactions = Order::with(['shop:id,name,public_id,image'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'shop' => $order->shop,
                    'subtotal' => $order->subtotal,
                    'delivery_fee' => $order->delivery_fee,
                    'total' => $order->total,
                    'delivery_type' => $order->delivery_type,
                    'status' => $order->status,
                    'payment_status' => $order->payment_status,
                    'created_at' => $order->created_at->toISOString(),
                ];
            });

        $summary = [
            'total_paid' => Order::where('user_id', Auth::id())->where('payment_status', 'paid')->sum('total') ?? 0,
            'total_pending' => Order::where('user_id', Auth::id())->where('payment_status', 'pending')->sum('total') ?? 0,
            'transaction_count' => $transactions->count(),
        ];

        return Inertia::render('customer/transactions', [
            'transactions' => $transactions,
            'summary' => $summary,
        ]);
    }

    /**
     * Display checkout page for a cart.
     */
    public function checkout(Request $request)
    {
        $cartId = $request->query('cart_id');

        if (! $cartId) {
            return redirect()->route('customer.cart')->with('error', 'No cart selected');
        }

        $cart = Cart::with(['shop:id,name,public_id,image', 'items.product:id,name,price,discount_percentage,image,stock_quantity'])
            ->where('id', $cartId)
            ->where('user_id', Auth::id())
            ->first();

        if (! $cart) {
            return redirect()->route('customer.cart')->with('error', 'Cart not found');
        }

        // Verify stock availability
        foreach ($cart->items as $item) {
            if ($item->quantity > $item->product->stock_quantity) {
                return redirect()->route('customer.cart')->with('error', "Not enough stock for {$item->product->name}");
            }
        }

        // Get delivery states for the shop
        $deliveryStates = DeliveryState::where('shop_id', $cart->shop_id)
            ->where('is_active', true)
            ->with(['locations' => function ($query) {
                $query->where('is_active', true);
            }])
            ->get();

        $user = Auth::user();

        return Inertia::render('customer/checkout', [
            'cart' => [
                'id' => $cart->id,
                'shop' => $cart->shop,
                'items' => $cart->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'line_total' => $item->line_total,
                        'product' => $item->product,
                    ];
                }),
                'subtotal' => $cart->subtotal,
                'item_count' => $cart->item_count,
            ],
            'deliveryStates' => $deliveryStates,
            'user' => [
                'name' => $user->username,
                'email' => $user->email,
                'phone' => $user->phone ?? '',
            ],
        ]);
    }

    /**
     * Create order from cart.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cart_id' => 'required|exists:carts,id',
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'customer_email' => 'nullable|email|max:255',
            'delivery_type' => 'required|in:pickup,delivery',
            'delivery_state_id' => 'nullable|required_if:delivery_type,delivery|exists:delivery_states,id',
            'delivery_location_id' => 'nullable|required_if:delivery_type,delivery|exists:delivery_locations,id',
            'delivery_address' => 'nullable|required_if:delivery_type,delivery|string|max:500',
            'notes' => 'nullable|string|max:1000',
        ]);

        $cart = Cart::with(['items.product'])
            ->where('id', $validated['cart_id'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Verify stock again
        foreach ($cart->items as $item) {
            if ($item->quantity > $item->product->stock_quantity) {
                return back()->with('error', "Not enough stock for {$item->product->name}");
            }
        }

        $subtotal = $cart->subtotal;
        $deliveryFee = 0;

        // Get delivery fee if delivery type
        if ($validated['delivery_type'] === 'delivery' && $validated['delivery_location_id']) {
            $location = DeliveryLocation::find($validated['delivery_location_id']);
            $deliveryFee = $location ? $location->delivery_fee : 0;
        }

        $total = $subtotal + $deliveryFee;

        try {
            DB::beginTransaction();

            // Create order
            $order = Order::create([
                'order_number' => Order::generateOrderNumber(),
                'shop_id' => $cart->shop_id,
                'user_id' => Auth::id(),
                'customer_name' => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'],
                'customer_email' => $validated['customer_email'] ?? null,
                'delivery_type' => $validated['delivery_type'],
                'delivery_state_id' => $validated['delivery_state_id'] ?? null,
                'delivery_location_id' => $validated['delivery_location_id'] ?? null,
                'delivery_address' => $validated['delivery_address'] ?? null,
                'delivery_fee' => $deliveryFee,
                'notes' => $validated['notes'] ?? null,
                'subtotal' => $subtotal,
                'total' => $total,
                'status' => 'pending',
                'payment_status' => 'paid',
            ]);

            // Create order items and decrement stock
            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'unit_price' => $item->product->price,
                    'discount_price' => $item->product->sale_price,
                    'quantity' => $item->quantity,
                    'line_total' => $item->line_total,
                ]);

                // Decrement stock
                $item->product->decrement('stock_quantity', $item->quantity);
            }

            // Delete cart
            $cart->delete();

            DB::commit();

            // Send WhatsApp notifications (non-blocking)
            $this->sendWhatsAppOrderNotifications($order);

            return redirect()->route('customer.orders')->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Order creation failed', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);

            return back()->with('error', 'Failed to place order. Please try again.');
        }
    }

    /**
     * Send WhatsApp notifications for a new order (non-blocking).
     */
    private function sendWhatsAppOrderNotifications(Order $order): void
    {
        try {
            $shop = $order->shop;
            $integration = WhatsappIntegration::where('user_id', $shop->user_id)
                ->where('is_active', true)
                ->first();

            if (! $integration) {
                return;
            }

            $order->load('items');
            $whatsapp = app(WhatsAppService::class);

            if ($order->customer_phone) {
                $whatsapp->sendOrderConfirmation($integration, $order);
            }

            $whatsapp->notifyVendorNewOrder($integration, $order);
        } catch (\Exception $e) {
            Log::warning('WhatsApp order notification failed', [
                'order' => $order->id,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
