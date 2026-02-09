<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        $startOfMonth = Carbon::now()->startOfMonth();

        // Single query for all order stats
        $orderStats = Order::where('user_id', $user->id)
            ->select([
                DB::raw('COUNT(*) as total_orders'),
                DB::raw("SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_orders"),
                DB::raw("SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_orders"),
                DB::raw("SUM(CASE WHEN status = 'completed' THEN total ELSE 0 END) as total_spent"),
                DB::raw("SUM(CASE WHEN status = 'completed' AND created_at >= ? THEN total ELSE 0 END) as this_month_spent"),
            ])
            ->addBinding([$startOfMonth], 'select')
            ->first();

        // Single query for cart count
        $cartItemCount = (int) CartItem::whereHas('cart', fn ($q) => $q->where('user_id', $user->id))->sum('quantity');

        $stats = [
            'total_orders' => (int) ($orderStats->total_orders ?? 0),
            'pending_orders' => (int) ($orderStats->pending_orders ?? 0),
            'completed_orders' => (int) ($orderStats->completed_orders ?? 0),
            'total_spent' => (float) ($orderStats->total_spent ?? 0),
            'this_month_spent' => (float) ($orderStats->this_month_spent ?? 0),
            'cart_item_count' => $cartItemCount,
        ];

        // Recent orders
        $recentOrders = Order::where('user_id', $user->id)
            ->with('shop:id,name,public_id,image')
            ->latest()
            ->take(5)
            ->get(['id', 'order_number', 'shop_id', 'total', 'status', 'created_at']);

        return Inertia::render('customer/dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
        ]);
    }
}
