<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Shop;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();
        $startOfWeek = Carbon::now()->startOfWeek();

        $isStaff = $user->role === 'staff';

        // Dashboard is always vendor-focused — scoped to the user's own shops.
        // Platform-wide stats live in /platform/analytics.
        if ($isStaff) {
            $userShopIds = $user->staffShops()->pluck('shops.id')->toArray();
            $userShopPublicIds = $user->staffShops()->pluck('shops.public_id')->toArray();
        } else {
            $userShopIds = $user->shops()->pluck('id')->toArray();
            $userShopPublicIds = $user->shops()->pluck('public_id')->toArray();
        }

        // Single query for all order stats using conditional aggregation
        $orderStats = Order::whereIn('shop_id', $userShopIds)
            ->select([
                DB::raw('COUNT(*) as total_orders'),
                DB::raw("SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_orders"),
                DB::raw("SUM(CASE WHEN status IN ('completed', 'delivered') THEN 1 ELSE 0 END) as completed_orders"),
                DB::raw("SUM(CASE WHEN DATE(created_at) = ? THEN 1 ELSE 0 END) as today_orders"),
                DB::raw("SUM(CASE WHEN payment_status = 'paid' THEN total ELSE 0 END) as total_revenue"),
                DB::raw("SUM(CASE WHEN payment_status = 'paid' AND DATE(created_at) = ? THEN total ELSE 0 END) as today_revenue"),
                DB::raw("SUM(CASE WHEN payment_status = 'paid' AND created_at >= ? THEN total ELSE 0 END) as monthly_revenue"),
            ])
            ->addBinding([$today, $today, $startOfMonth], 'select')
            ->first();

        // Single query for all product stats
        $productStats = Product::whereIn('shop_public_id', $userShopPublicIds)
            ->select([
                DB::raw('COUNT(*) as total_products'),
                DB::raw("SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_products"),
                DB::raw("SUM(CASE WHEN stock_status = 'out_of_stock' THEN 1 ELSE 0 END) as out_of_stock"),
                DB::raw("SUM(CASE WHEN stock_status = 'low_stock' THEN 1 ELSE 0 END) as low_stock"),
            ])
            ->first();

        // Single query for shop stats
        $shopStats = Shop::query()
            ->when($isStaff, fn ($q) => $q->whereIn('id', $userShopIds), fn ($q) => $q->where('user_id', $user->id))
            ->select([
                DB::raw('COUNT(*) as total_shops'),
                DB::raw("SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_shops"),
            ])
            ->first();

        $stats = [
            'total_revenue' => (float) ($orderStats->total_revenue ?? 0),
            'today_revenue' => (float) ($orderStats->today_revenue ?? 0),
            'monthly_revenue' => (float) ($orderStats->monthly_revenue ?? 0),
            'total_orders' => (int) ($orderStats->total_orders ?? 0),
            'pending_orders' => (int) ($orderStats->pending_orders ?? 0),
            'completed_orders' => (int) ($orderStats->completed_orders ?? 0),
            'today_orders' => (int) ($orderStats->today_orders ?? 0),
            'total_products' => (int) ($productStats->total_products ?? 0),
            'active_products' => (int) ($productStats->active_products ?? 0),
            'out_of_stock' => (int) ($productStats->out_of_stock ?? 0),
            'low_stock' => (int) ($productStats->low_stock ?? 0),
            'total_shops' => (int) ($shopStats->total_shops ?? 0),
            'active_shops' => (int) ($shopStats->active_shops ?? 0),
        ];

        // Single query for weekly charts (grouped by date)
        $weeklyData = Order::whereIn('shop_id', $userShopIds)
            ->where('created_at', '>=', $startOfWeek)
            ->where('created_at', '<', $startOfWeek->copy()->addDays(7))
            ->select([
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as orders'),
                DB::raw("SUM(CASE WHEN payment_status = 'paid' THEN total ELSE 0 END) as revenue"),
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
            $weeklyRevenue[] = [
                'name' => $date->format('D'),
                'value' => (float) ($dayData->revenue ?? 0),
            ];
            $weeklyOrders[] = [
                'name' => $date->format('D'),
                'orders' => (int) ($dayData->orders ?? 0),
            ];
        }

        // Recent orders
        $recentOrders = Order::whereIn('shop_id', $userShopIds)
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
