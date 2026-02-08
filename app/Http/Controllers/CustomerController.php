<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Carbon\Carbon;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();

        // Customer's order stats
        $ordersQuery = Order::where('user_id', $user->id);

        $cartItemCount = Cart::where('user_id', $user->id)
            ->withSum('items', 'quantity')
            ->get()
            ->sum('items_sum_quantity');

        $stats = [
            'total_orders' => (clone $ordersQuery)->count(),
            'pending_orders' => (clone $ordersQuery)->where('status', 'pending')->count(),
            'completed_orders' => (clone $ordersQuery)->where('status', 'completed')->count(),
            'total_spent' => (clone $ordersQuery)->where('status', 'completed')->sum('total') ?? 0,
            'this_month_spent' => (clone $ordersQuery)
                ->where('status', 'completed')
                ->where('created_at', '>=', $startOfMonth)
                ->sum('total') ?? 0,
            'cart_item_count' => (int) $cartItemCount,
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
