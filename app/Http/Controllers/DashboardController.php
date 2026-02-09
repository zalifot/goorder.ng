<?php

namespace App\Http\Controllers;

use App\Models\GeneralCategory;
use App\Models\ProductCategory;
use App\Models\Order;
use App\Models\Product;
use App\Models\Shop;
use App\Models\User;
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

        // Check if user is admin (can see all data)
        $isAdmin = $user->isAdmin();
        $isStaff = $user->role === 'staff';

        // Get the user's shop IDs for scoping queries
        if ($isAdmin) {
            $userShopIds = null;
            $userShopPublicIds = null;
        } elseif ($isStaff) {
            // Staff can only see shops they're assigned to
            $userShopIds = $user->staffShops()->pluck('shops.id')->toArray();
            $userShopPublicIds = $user->staffShops()->pluck('shops.public_id')->toArray();
        } else {
            $userShopIds = $user->shops()->pluck('id')->toArray();
            $userShopPublicIds = $user->shops()->pluck('public_id')->toArray();
        }

        // Build scoped queries
        $ordersQuery = Order::query();
        $productsQuery = Product::query();
        $shopsQuery = Shop::query();

        if (!$isAdmin) {
            $ordersQuery->whereIn('shop_id', $userShopIds ?? []);
            $productsQuery->whereIn('shop_public_id', $userShopPublicIds ?? []);
            if ($isStaff) {
                $shopsQuery->whereIn('id', $userShopIds ?? []);
            } else {
                $shopsQuery->where('user_id', $user->id);
            }
        }

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

            // Products (Inventory) - scoped to vendor's shops
            'total_products' => (clone $productsQuery)->count(),
            'active_products' => (clone $productsQuery)->where('is_active', true)->count(),
            'out_of_stock' => (clone $productsQuery)->where('stock_status', 'out_of_stock')->count(),
            'low_stock' => (clone $productsQuery)->where('stock_status', 'low_stock')->count(),

            // Users - only show for admins
            'total_users' => $isAdmin ? User::count() : 0,
            'new_users_today' => $isAdmin ? User::whereDate('created_at', $today)->count() : 0,
            'new_users_month' => $isAdmin ? User::where('created_at', '>=', $startOfMonth)->count() : 0,

            // Shops - scoped to vendor's own shops
            'total_shops' => (clone $shopsQuery)->count(),
            'active_shops' => (clone $shopsQuery)->where('is_active', true)->count(),

            // Product Categories - show all active categories (they're shared)
            'total_categories' => ProductCategory::count(),
            'active_categories' => ProductCategory::where('is_active', true)->count(),

            // General Categories - only show for admins
            'total_general_categories' => $isAdmin ? GeneralCategory::count() : 0,
            'active_general_categories' => $isAdmin ? GeneralCategory::where('is_active', true)->count() : 0,
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
        $recentProducts = [];

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'weeklyRevenue' => $weeklyRevenue,
            'weeklyOrders' => $weeklyOrders,
            'recentOrders' => $recentOrders,
            'recentProducts' => $recentProducts,
        ]);
    }
}
