<?php

namespace App\Http\Controllers;

use App\Models\GeneralCategory;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Shop;
use App\Services\CloudinaryService;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
            $query->where('name', 'like', '%' . $request->search . '%');
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
        } elseif (!empty($validated['image_url'])) {
            $validated['image'] = $validated['image_url'];
        }
        unset($validated['image_url']);

        Shop::create([
            'user_id' => auth()->id(),
            'general_category_id' => $validated['general_category_id'],
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']) . '-' . uniqid(),
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
        } elseif (!empty($validated['image_url'])) {
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

        // Shop-specific order query builder
        $ordersQuery = Order::where('shop_id', $shop->id);
        $productsQuery = Product::where('shop_public_id', $shop->public_id);

        // Stats for this shop
        $stats = [
            // Revenue
            'total_revenue' => (clone $ordersQuery)->sum('total') ?? 0,
            'today_revenue' => (clone $ordersQuery)->whereDate('created_at', $today)->sum('total') ?? 0,
            'monthly_revenue' => (clone $ordersQuery)->where('created_at', '>=', $startOfMonth)->sum('total') ?? 0,
            'last_month_revenue' => (clone $ordersQuery)->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->sum('total') ?? 0,

            // Orders
            'total_orders' => (clone $ordersQuery)->count(),
            'today_orders' => (clone $ordersQuery)->whereDate('created_at', $today)->count(),
            'monthly_orders' => (clone $ordersQuery)->where('created_at', '>=', $startOfMonth)->count(),
            'pending_orders' => (clone $ordersQuery)->where('status', 'pending')->count(),
            'completed_orders' => (clone $ordersQuery)->where('status', 'completed')->count(),
            'cancelled_orders' => (clone $ordersQuery)->where('status', 'cancelled')->count(),

            // Products
            'total_products' => (clone $productsQuery)->count(),
            'active_products' => (clone $productsQuery)->where('is_active', true)->count(),
            'out_of_stock' => (clone $productsQuery)->where('stock_status', 'out_of_stock')->count(),
            'low_stock' => (clone $productsQuery)->where('stock_status', 'low_stock')->count(),

            // Views
            'total_views' => (clone $productsQuery)->sum('views') ?? 0,
        ];

        // Weekly revenue data for chart
        $weeklyRevenue = [];
        for ($i = 0; $i < 7; $i++) {
            $date = $startOfWeek->copy()->addDays($i);
            $dayName = $date->format('D');
            $revenue = (clone $ordersQuery)->whereDate('created_at', $date)->sum('total') ?? 0;
            $weeklyRevenue[] = ['name' => $dayName, 'value' => (float) $revenue];
        }

        // Weekly orders data for chart
        $weeklyOrders = [];
        for ($i = 0; $i < 7; $i++) {
            $date = $startOfWeek->copy()->addDays($i);
            $dayName = $date->format('D');
            $orders = (clone $ordersQuery)->whereDate('created_at', $date)->count();
            $weeklyOrders[] = ['name' => $dayName, 'orders' => $orders];
        }

        // Top products by views
        $topProducts = Product::where('shop_public_id', $shop->public_id)
            ->where('is_active', true)
            ->orderByDesc('views')
            ->take(5)
            ->get(['id', 'name', 'views', 'price', 'discount_percentage', 'stock_status']);

        // Recent orders
        $recentOrders = Order::where('shop_id', $shop->id)
            ->latest()
            ->take(5)
            ->get(['id', 'order_number', 'customer_name', 'total', 'status', 'created_at']);

        // Low stock products
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
