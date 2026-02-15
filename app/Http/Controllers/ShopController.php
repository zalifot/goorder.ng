<?php

namespace App\Http\Controllers;

use App\Models\GeneralCategory;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Shop;
use App\Models\WhatsappIntegration;
use App\Services\CloudinaryService;
use App\Services\WhatsAppService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ShopController extends Controller
{
    protected CloudinaryService $cloudinary;

    public function __construct(CloudinaryService $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }

    /**
     * Get shop IDs accessible by the current user (owner or staff).
     */
    private function getAccessibleShopIds(): array
    {
        $user = auth()->user();
        if ($user->role === 'staff') {
            return $user->staffShops()->pluck('shops.id')->toArray();
        }

        return Shop::where('user_id', $user->id)->pluck('id')->toArray();
    }

    /**
     * Get a shop by public_id, scoped to the current user's access.
     */
    private function getAccessibleShop(string $publicId): Shop
    {
        $user = auth()->user();
        if ($user->role === 'staff') {
            $staffShopIds = $user->staffShops()->pluck('shops.id');

            return Shop::where('public_id', $publicId)->whereIn('id', $staffShopIds)->firstOrFail();
        }

        return Shop::where('public_id', $publicId)->where('user_id', $user->id)->firstOrFail();
    }

    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'staff') {
            // Staff only see shops they're assigned to
            $shopIds = $user->staffShops()->pluck('shops.id');
            $shops = Shop::whereIn('id', $shopIds)
                ->with('generalCategory:id,name,icon')
                ->latest()
                ->get();
        } else {
            $shops = Shop::where('user_id', $user->id)
                ->with('generalCategory:id,name,icon')
                ->latest()
                ->get();
        }

        $generalCategories = GeneralCategory::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'name', 'icon']);

        return Inertia::render('shops', [
            'shops' => $shops,
            'generalCategories' => $generalCategories,
        ]);
    }

    public function show(Request $request, string $publicId)
    {
        $shop = $this->getAccessibleShop($publicId);

        $query = Product::where('shop_public_id', $publicId)
            ->with(['category']);

        // Apply search filter
        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        // Apply category filter
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Apply stock status filter
        if ($request->filled('stock_status')) {
            $query->where('stock_status', $request->stock_status);
        }

        $products = $query->latest()->paginate(15)->withQueryString();
        $categories = ProductCategory::orderBy('name')->get();

        return Inertia::render('shops/manage', [
            'shop' => $shop,
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category_id' => $request->category_id,
                'stock_status' => $request->stock_status,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'general_category_id' => 'required|exists:general_categories,id',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:500',
            'country_code' => 'required|string|max:2',
            'state_code' => 'required|string|max:10',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'place_id' => 'nullable|string|max:255',
            'formatted_address' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'image_url' => 'nullable|url|max:500',
        ]);

        // Handle image
        if ($request->hasFile('image')) {
            $validated['image'] = $this->cloudinary->upload($request->file('image'), 'shops');
        } elseif (! empty($validated['image_url'])) {
            $validated['image'] = $validated['image_url'];
        }
        unset($validated['image_url']);

        Shop::create([
            'user_id' => auth()->id(),
            'general_category_id' => $validated['general_category_id'],
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']).'-'.uniqid(),
            'description' => $validated['description'] ?? null,
            'address' => $validated['address'] ?? null,
            'country_code' => $validated['country_code'],
            'state_code' => $validated['state_code'],
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'place_id' => $validated['place_id'] ?? null,
            'formatted_address' => $validated['formatted_address'] ?? null,
            'image' => $validated['image'] ?? null,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, Shop $shop)
    {
        $this->authorize('update', $shop);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'general_category_id' => 'required|exists:general_categories,id',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:500',
            'country_code' => 'required|string|max:2',
            'state_code' => 'required|string|max:10',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'place_id' => 'nullable|string|max:255',
            'formatted_address' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'image_url' => 'nullable|url|max:500',
            'remove_image' => 'boolean',
        ]);

        // Handle image removal
        if ($request->boolean('remove_image') && $shop->image) {
            // Delete from Cloudinary if it's a Cloudinary URL
            if ($this->cloudinary->isCloudinaryUrl($shop->image)) {
                $this->cloudinary->delete($shop->image);
            }
            $validated['image'] = null;
        } elseif ($request->hasFile('image')) {
            // Delete old image from Cloudinary if exists
            if ($shop->image && $this->cloudinary->isCloudinaryUrl($shop->image)) {
                $this->cloudinary->delete($shop->image);
            }
            $validated['image'] = $this->cloudinary->upload($request->file('image'), 'shops');
        } elseif (! empty($validated['image_url'])) {
            // Delete old image from Cloudinary if exists
            if ($shop->image && $this->cloudinary->isCloudinaryUrl($shop->image)) {
                $this->cloudinary->delete($shop->image);
            }
            $validated['image'] = $validated['image_url'];
        } else {
            unset($validated['image']);
        }

        unset($validated['remove_image'], $validated['image_url']);

        $shop->update($validated);

        return redirect()->back();
    }

    public function destroy(Shop $shop)
    {
        $this->authorize('delete', $shop);

        // Delete image from Cloudinary if exists
        if ($shop->image && $this->cloudinary->isCloudinaryUrl($shop->image)) {
            $this->cloudinary->delete($shop->image);
        }

        $shop->delete();

        return redirect()->back();
    }

    public function toggleActive(Request $request, Shop $shop)
    {
        $this->authorize('update', $shop);

        $validated = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $shop->update(['is_active' => $validated['is_active']]);

        return redirect()->back();
    }

    public function toggleConstruction(Request $request, Shop $shop)
    {
        $this->authorize('update', $shop);

        $validated = $request->validate([
            'is_under_construction' => 'required|boolean',
        ]);

        $shop->update(['is_under_construction' => $validated['is_under_construction']]);

        return redirect()->back();
    }

    public function analytics(string $publicId)
    {
        $shop = $this->getAccessibleShop($publicId);

        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();
        $startOfWeek = Carbon::now()->startOfWeek();

        // Single query for all order stats
        $orderStats = Order::where('shop_id', $shop->id)
            ->select([
                DB::raw('COUNT(*) as total_orders'),
                DB::raw('SUM(CASE WHEN DATE(created_at) = ? THEN 1 ELSE 0 END) as today_orders'),
                DB::raw('SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) as monthly_orders'),
                DB::raw("SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_orders"),
                DB::raw("SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_orders"),
                DB::raw("SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_orders"),
                DB::raw('SUM(total) as total_revenue'),
                DB::raw('SUM(CASE WHEN DATE(created_at) = ? THEN total ELSE 0 END) as today_revenue'),
                DB::raw('SUM(CASE WHEN created_at >= ? THEN total ELSE 0 END) as monthly_revenue'),
                DB::raw('SUM(CASE WHEN created_at BETWEEN ? AND ? THEN total ELSE 0 END) as last_month_revenue'),
            ])
            ->addBinding([$today, $startOfMonth, $today, $startOfMonth, $startOfLastMonth, $endOfLastMonth], 'select')
            ->first();

        // Single query for all product stats
        $productStats = Product::where('shop_public_id', $shop->public_id)
            ->select([
                DB::raw('COUNT(*) as total_products'),
                DB::raw('SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_products'),
                DB::raw("SUM(CASE WHEN stock_status = 'out_of_stock' THEN 1 ELSE 0 END) as out_of_stock"),
                DB::raw("SUM(CASE WHEN stock_status = 'low_stock' THEN 1 ELSE 0 END) as low_stock"),
                DB::raw('SUM(views) as total_views'),
            ])
            ->first();

        $stats = [
            'total_revenue' => (float) ($orderStats->total_revenue ?? 0),
            'today_revenue' => (float) ($orderStats->today_revenue ?? 0),
            'monthly_revenue' => (float) ($orderStats->monthly_revenue ?? 0),
            'last_month_revenue' => (float) ($orderStats->last_month_revenue ?? 0),
            'total_orders' => (int) ($orderStats->total_orders ?? 0),
            'today_orders' => (int) ($orderStats->today_orders ?? 0),
            'monthly_orders' => (int) ($orderStats->monthly_orders ?? 0),
            'pending_orders' => (int) ($orderStats->pending_orders ?? 0),
            'completed_orders' => (int) ($orderStats->completed_orders ?? 0),
            'cancelled_orders' => (int) ($orderStats->cancelled_orders ?? 0),
            'total_products' => (int) ($productStats->total_products ?? 0),
            'active_products' => (int) ($productStats->active_products ?? 0),
            'out_of_stock' => (int) ($productStats->out_of_stock ?? 0),
            'low_stock' => (int) ($productStats->low_stock ?? 0),
            'total_views' => (int) ($productStats->total_views ?? 0),
        ];

        // Single query for weekly charts
        $weeklyData = Order::where('shop_id', $shop->id)
            ->where('created_at', '>=', $startOfWeek)
            ->where('created_at', '<', $startOfWeek->copy()->addDays(7))
            ->select([
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as orders'),
                DB::raw('SUM(total) as revenue'),
            ])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->keyBy('date');

        $weeklyRevenue = [];
        $weeklyOrders = [];
        for ($i = 0; $i < 7; $i++) {
            $date = $startOfWeek->copy()->addDays($i);
            $dateKey = $date->format('Y-m-d');
            $dayData = $weeklyData->get($dateKey);
            $weeklyRevenue[] = ['name' => $date->format('D'), 'value' => (float) ($dayData->revenue ?? 0)];
            $weeklyOrders[] = ['name' => $date->format('D'), 'orders' => (int) ($dayData->orders ?? 0)];
        }

        // Top products, recent orders, low stock — 3 simple queries
        $topProducts = Product::where('shop_public_id', $shop->public_id)
            ->where('is_active', true)
            ->orderByDesc('views')
            ->take(5)
            ->get(['id', 'name', 'views', 'price', 'discount_percentage', 'stock_status']);

        $recentOrders = Order::where('shop_id', $shop->id)
            ->latest()
            ->take(5)
            ->get(['id', 'order_number', 'customer_name', 'total', 'status', 'created_at']);

        $lowStockProducts = Product::where('shop_public_id', $shop->public_id)
            ->whereIn('stock_status', ['low_stock', 'out_of_stock'])
            ->orderByRaw("CASE WHEN stock_status = 'out_of_stock' THEN 0 ELSE 1 END")
            ->take(5)
            ->get(['id', 'name', 'stock_quantity', 'stock_status']);

        return Inertia::render('shops/analytics', [
            'shop' => $shop,
            'stats' => $stats,
            'weeklyRevenue' => $weeklyRevenue,
            'weeklyOrders' => $weeklyOrders,
            'topProducts' => $topProducts,
            'recentOrders' => $recentOrders,
            'lowStockProducts' => $lowStockProducts,
        ]);
    }

    public function shopOrders(string $publicId)
    {
        $shop = $this->getAccessibleShop($publicId);

        $orders = Order::with(['user:id,username,email'])
            ->where('shop_id', $shop->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'customer_name' => $o->customer_name,
                'customer_phone' => $o->customer_phone,
                'user' => $o->user,
                'status' => $o->status,
                'payment_status' => $o->payment_status,
                'delivery_type' => $o->delivery_type,
                'subtotal' => $o->subtotal,
                'delivery_fee' => $o->delivery_fee,
                'total' => $o->total,
                'created_at' => $o->created_at->toISOString(),
            ]);

        $summary = [
            'total_orders' => $orders->count(),
            'pending' => $orders->where('status', 'pending')->count(),
            'completed' => $orders->whereIn('status', ['completed', 'delivered'])->count(),
            'total_revenue' => Order::where('shop_id', $shop->id)->where('payment_status', 'paid')->sum('total'),
        ];

        return Inertia::render('shops/orders', [
            'shop' => $shop->only('id', 'name', 'public_id', 'image_url'),
            'orders' => $orders,
            'summary' => $summary,
        ]);
    }

    /**
     * Update the status of an order and notify the customer via WhatsApp.
     */
    public function updateOrderStatus(Request $request, string $publicId, Order $order, WhatsAppService $whatsapp): \Illuminate\Http\RedirectResponse
    {
        $shop = $this->getAccessibleShop($publicId);

        if ($order->shop_id !== $shop->id) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,processing,ready,out_for_delivery,delivered,cancelled',
        ]);

        $order->update(['status' => $validated['status']]);

        // Send WhatsApp status update notification
        try {
            $integration = WhatsappIntegration::where('user_id', $shop->user_id)
                ->where('is_active', true)
                ->first();

            if ($integration && $order->customer_phone) {
                $whatsapp->sendOrderStatusUpdate($integration, $order);
            }
        } catch (\Exception $e) {
            Log::warning('WhatsApp status notification failed', [
                'order' => $order->id,
                'error' => $e->getMessage(),
            ]);
        }

        return back()->with('success', "Order #{$order->order_number} status updated to {$validated['status']}.");
    }

    public function shopTransactions(string $publicId)
    {
        $shop = $this->getAccessibleShop($publicId);

        $transactions = Order::where('shop_id', $shop->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'customer_name' => $o->customer_name,
                'subtotal' => $o->subtotal,
                'delivery_fee' => $o->delivery_fee,
                'total' => $o->total,
                'delivery_type' => $o->delivery_type,
                'status' => $o->status,
                'payment_status' => $o->payment_status,
                'created_at' => $o->created_at->toISOString(),
            ]);

        $summary = [
            'total_paid' => Order::where('shop_id', $shop->id)->where('payment_status', 'paid')->sum('total'),
            'total_pending' => Order::where('shop_id', $shop->id)->where('payment_status', 'pending')->sum('total'),
            'transaction_count' => $transactions->count(),
        ];

        return Inertia::render('shops/transactions', [
            'shop' => $shop->only('id', 'name', 'public_id', 'image_url'),
            'transactions' => $transactions,
            'summary' => $summary,
        ]);
    }

    public function allOrders()
    {
        $shopIds = collect($this->getAccessibleShopIds());

        $orders = Order::with(['user:id,username,email', 'shop:id,name,public_id'])
            ->whereIn('shop_id', $shopIds)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'shop' => $o->shop ? $o->shop->only('id', 'name', 'public_id') : null,
                'customer_name' => $o->customer_name,
                'customer_phone' => $o->customer_phone,
                'status' => $o->status,
                'payment_status' => $o->payment_status,
                'delivery_type' => $o->delivery_type,
                'subtotal' => $o->subtotal,
                'delivery_fee' => $o->delivery_fee,
                'total' => $o->total,
                'created_at' => $o->created_at->toISOString(),
            ]);

        $summary = [
            'total_orders' => $orders->count(),
            'pending' => $orders->where('status', 'pending')->count(),
            'completed' => $orders->whereIn('status', ['completed', 'delivered'])->count(),
            'total_revenue' => Order::whereIn('shop_id', $shopIds)->where('payment_status', 'paid')->sum('total'),
        ];

        return Inertia::render('orders', [
            'orders' => $orders,
            'summary' => $summary,
        ]);
    }

    public function allTransactions()
    {
        $shopIds = collect($this->getAccessibleShopIds());

        $transactions = Order::with(['shop:id,name,public_id'])
            ->whereIn('shop_id', $shopIds)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'shop' => $o->shop ? $o->shop->only('id', 'name', 'public_id') : null,
                'customer_name' => $o->customer_name,
                'subtotal' => $o->subtotal,
                'delivery_fee' => $o->delivery_fee,
                'total' => $o->total,
                'delivery_type' => $o->delivery_type,
                'status' => $o->status,
                'payment_status' => $o->payment_status,
                'created_at' => $o->created_at->toISOString(),
            ]);

        $summary = [
            'total_paid' => Order::whereIn('shop_id', $shopIds)->where('payment_status', 'paid')->sum('total'),
            'total_pending' => Order::whereIn('shop_id', $shopIds)->where('payment_status', 'pending')->sum('total'),
            'transaction_count' => $transactions->count(),
        ];

        return Inertia::render('transactions', [
            'transactions' => $transactions,
            'summary' => $summary,
        ]);
    }
}
