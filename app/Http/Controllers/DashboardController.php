<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\Shop;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();

        $stats = [
            // Revenue & Sales
            'total_revenue' => 0,
            'today_revenue' => 0,
            'monthly_revenue' => 0,
            
            // Orders
            'total_orders' => 0,
            'pending_orders' => 0,
            'completed_orders' => 0,
            'today_orders' => 0,
            
            // Products (Inventory)
            'total_products' => Product::count(),
            'active_products' => Product::where('is_active', true)->count(),
            'out_of_stock' => Product::where('stock_status', 'out_of_stock')->count(),
            'low_stock' => Product::where('stock_status', 'low_stock')->count(),
            
            // Users
            'total_users' => User::count(),
            'new_users_today' => User::whereDate('created_at', $today)->count(),
            'new_users_month' => User::where('created_at', '>=', $startOfMonth)->count(),
            
            // Shops
            'total_shops' => Shop::count(),
            'active_shops' => Shop::where('is_active', true)->count(),
            
            // Categories
            'total_categories' => 0,
            'active_categories' => 0,
        ];

        // Recent activity (empty for now)
        $recentOrders = [];
        $recentProducts = [];

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'recentProducts' => $recentProducts,
        ]);
    }
}
