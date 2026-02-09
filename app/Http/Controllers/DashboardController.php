<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Shop;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();

        $isStaff = $user->role === 'staff';

        // Dashboard is always vendor-focused — scoped to the user's own shops.
        // Platform-wide stats live in /platform/analytics.
        if ($isStaff) {
            $userShopIds = $user->staffShops()->pluck('shops.id')->toArray();
            $userShopPublicIds = $user->staffShops()->pluck('shops.public_id')->toArray();
            $shopsQuery = Shop::whereIn('id', $userShopIds);
        } else {
            // admin, super_admin, shop_owner — all see their own shops
            $userShopIds = $user->shops()->pluck('id')->toArray();
            $userShopPublicIds = $user->shops()->pluck('public_id')->toArray();
            $shopsQuery = Shop::where('user_id', $user->id);
        }

        $ordersQuery = Order::whereIn('shop_id', $userShopIds);
        $productsQuery = Product::whereIn('shop_public_id', $userShopPublicIds);

        $stats = [
            // Revenue & Sales
            'total_revenue' => (clone $ordersQuery)->where('payment_status', 'paid')->sum('total'),
            'today_revenue' => (clone $ordersQuery)->where('payment_status', 'paid')->whereDate('created_at', $today)->sum('total'),
            'monthly_revenue' => (clone $ordersQuery)->where('payment_status', 'paid')->where('created_at', '>=', $startOfMonth)->sum('total'),

            // Orders
            'total_orders' => (clone $ordersQuery)->count(),
            'pending_orders' => (clone $ordersQuery)->where('status', 'pending')->count(),
            'completed_orders' => (clone $ordersQuery)->whereIn('status', ['completed', 'delivered'])->count(),
            'today_orders' => (clone $ordersQuery)->whereDate('created_at', $today)->count(),

            // Products (Inventory)
            'total_products' => (clone $productsQuery)->count(),
            'active_products' => (clone $productsQuery)->where('is_active', true)->count(),
            'out_of_stock' => (clone $productsQuery)->where('stock_status', 'out_of_stock')->count(),
            'low_stock' => (clone $productsQuery)->where('stock_status', 'low_stock')->count(),

            // Shops
            'total_shops' => (clone $shopsQuery)->count(),
            'active_shops' => (clone $shopsQuery)->where('is_active', true)->count(),
        ];

        // Weekly charts
        $startOfWeek = Carbon::now()->startOfWeek();
        $weeklyRevenue = [];
        $weeklyOrders = [];
        for ($i = 0; $i < 7; $i++) {
            $date = $startOfWeek->copy()->addDays($i);
            $weeklyRevenue[] = [
                'name' => $date->format('D'),
                'value' => (float) ((clone $ordersQuery)->where('payment_status', 'paid')->whereDate('created_at', $date)->sum('total') ?? 0),
            ];
            $weeklyOrders[] = [
                'name' => $date->format('D'),
                'orders' => (clone $ordersQuery)->whereDate('created_at', $date)->count(),
            ];
        }

        // Recent activity
        $recentOrders = (clone $ordersQuery)
            ->with('shop:id,name,public_id')
            ->latest()
            ->take(5)
            ->get(['id', 'order_number', 'shop_id', 'customer_name', 'total', 'status', 'payment_status', 'created_at']);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'weeklyRevenue' => $weeklyRevenue,
            'weeklyOrders' => $weeklyOrders,
            'recentOrders' => $recentOrders,
        ]);
    }
}
