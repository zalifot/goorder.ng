<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Shop;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PlatformController extends Controller
{
    /**
     * Platform Analytics - Admin Only
     */
    public function analytics()
    {
        $user = auth()->user();
        
        // Only admins can view platform analytics
        if (!$user->isAdmin()) {
            abort(403, 'Unauthorized access');
        }

        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();
        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        // Single query for all order stats
        $orderStats = Order::select([
            DB::raw('COUNT(*) as total_orders'),
            DB::raw("SUM(CASE WHEN DATE(created_at) = ? THEN 1 ELSE 0 END) as today_orders"),
            DB::raw("SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) as monthly_orders"),
            DB::raw("SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_orders"),
            DB::raw('SUM(total) as total_revenue'),
            DB::raw("SUM(CASE WHEN DATE(created_at) = ? THEN total ELSE 0 END) as today_revenue"),
            DB::raw("SUM(CASE WHEN created_at >= ? THEN total ELSE 0 END) as monthly_revenue"),
            DB::raw("SUM(CASE WHEN created_at BETWEEN ? AND ? THEN total ELSE 0 END) as last_month_revenue"),
        ])->addBinding([$today, $startOfMonth, $today, $startOfMonth, $startOfLastMonth, $endOfLastMonth], 'select')->first();

        // Single query for all user stats
        $userStats = User::select([
            DB::raw('COUNT(*) as total_users'),
            DB::raw("SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) as total_customers"),
            DB::raw("SUM(CASE WHEN role = 'shop_owner' THEN 1 ELSE 0 END) as total_shop_owners"),
            DB::raw("SUM(CASE WHEN role IN ('admin', 'super_admin') THEN 1 ELSE 0 END) as total_admins"),
            DB::raw("SUM(CASE WHEN DATE(created_at) = ? THEN 1 ELSE 0 END) as new_users_today"),
            DB::raw("SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) as new_users_month"),
        ])->addBinding([$today, $startOfMonth], 'select')->first();

        // Single query for all shop stats
        $shopStats = Shop::select([
            DB::raw('COUNT(*) as total_shops'),
            DB::raw("SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_shops"),
            DB::raw("SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactive_shops"),
            DB::raw("SUM(CASE WHEN is_under_construction = 1 THEN 1 ELSE 0 END) as shops_under_construction"),
            DB::raw("SUM(CASE WHEN created_at >= ? THEN 1 ELSE 0 END) as new_shops_month"),
        ])->addBinding([$startOfMonth], 'select')->first();

        // Single query for all product stats
        $productStats = Product::select([
            DB::raw('COUNT(*) as total_products'),
            DB::raw("SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_products"),
            DB::raw("SUM(CASE WHEN stock_status = 'out_of_stock' THEN 1 ELSE 0 END) as out_of_stock"),
            DB::raw("SUM(CASE WHEN stock_status = 'low_stock' THEN 1 ELSE 0 END) as low_stock"),
        ])->first();

        $stats = [
            'total_revenue' => (float) ($orderStats->total_revenue ?? 0),
            'today_revenue' => (float) ($orderStats->today_revenue ?? 0),
            'monthly_revenue' => (float) ($orderStats->monthly_revenue ?? 0),
            'last_month_revenue' => (float) ($orderStats->last_month_revenue ?? 0),
            'total_orders' => (int) ($orderStats->total_orders ?? 0),
            'today_orders' => (int) ($orderStats->today_orders ?? 0),
            'monthly_orders' => (int) ($orderStats->monthly_orders ?? 0),
            'pending_orders' => (int) ($orderStats->pending_orders ?? 0),
            'total_users' => (int) ($userStats->total_users ?? 0),
            'total_customers' => (int) ($userStats->total_customers ?? 0),
            'total_shop_owners' => (int) ($userStats->total_shop_owners ?? 0),
            'total_admins' => (int) ($userStats->total_admins ?? 0),
            'new_users_today' => (int) ($userStats->new_users_today ?? 0),
            'new_users_month' => (int) ($userStats->new_users_month ?? 0),
            'total_shops' => (int) ($shopStats->total_shops ?? 0),
            'active_shops' => (int) ($shopStats->active_shops ?? 0),
            'inactive_shops' => (int) ($shopStats->inactive_shops ?? 0),
            'shops_under_construction' => (int) ($shopStats->shops_under_construction ?? 0),
            'new_shops_month' => (int) ($shopStats->new_shops_month ?? 0),
            'total_products' => (int) ($productStats->total_products ?? 0),
            'active_products' => (int) ($productStats->active_products ?? 0),
            'out_of_stock' => (int) ($productStats->out_of_stock ?? 0),
            'low_stock' => (int) ($productStats->low_stock ?? 0),
        ];

        // Top performing shops by revenue
        $topShops = Shop::withCount(['products'])
            ->withSum('products', 'price')
            ->orderByDesc('products_count')
            ->take(5)
            ->get();

        // Recent users
        $recentUsers = User::latest()
            ->take(5)
            ->get(['id', 'username', 'email', 'role', 'created_at']);

        // Recent shops
        $recentShops = Shop::with('user:id,username,email')
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'public_id', 'is_active', 'is_under_construction', 'user_id', 'created_at']);

        return Inertia::render('admin/analytics', [
            'stats' => $stats,
            'topShops' => $topShops,
            'recentUsers' => $recentUsers,
            'recentShops' => $recentShops,
        ]);
    }

    /**
     * Platform Shops Management - Admin Only
     */
    public function shops(Request $request)
    {
        $user = auth()->user();
        
        if (!$user->isAdmin()) {
            abort(403, 'Unauthorized access');
        }

        $query = Shop::with(['user:id,username,email'])
            ->withCount('products');

        // Search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('public_id', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('username', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            });
        }

        // Status filter
        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            } elseif ($request->status === 'construction') {
                $query->where('is_under_construction', true);
            }
        }

        $shops = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('admin/shops', [
            'shops' => $shops,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Toggle shop active status
     */
    public function toggleShopStatus(Shop $shop)
    {
        $user = auth()->user();
        
        if (!$user->isAdmin()) {
            abort(403, 'Unauthorized access');
        }

        $shop->update(['is_active' => !$shop->is_active]);

        return back()->with('success', 'Shop status updated successfully.');
    }

    /**
     * Platform Users Management - Admin Only
     */
    public function users(Request $request)
    {
        $user = auth()->user();
        
        if (!$user->isAdmin()) {
            abort(403, 'Unauthorized access');
        }

        $query = User::withCount('shops');

        // Search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Role filter
        if ($request->has('role') && $request->role) {
            if ($request->role === 'shop_owner') {
                $query->whereHas('shops');
            } elseif ($request->role === 'staff') {
                $query->whereHas('staffShops');
            } else {
                $query->where('role', $request->role);
            }
        }

        $users = $query->latest()->paginate(15)->withQueryString();

        // Stats
        $stats = [
            'total' => User::count(),
            'customers' => User::where('role', 'user')->count(),
            'shop_owners' => User::whereHas('shops')->count(),
            'admins' => User::whereIn('role', ['admin', 'super_admin'])->count(),
        ];

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
            'stats' => $stats,
        ]);
    }

    /**
     * Toggle user status (ban/unban)
     */
    public function toggleUserStatus(User $targetUser)
    {
        $user = auth()->user();
        
        if (!$user->isAdmin()) {
            abort(403, 'Unauthorized access');
        }

        // Prevent self-ban or banning other admins
        if ($targetUser->id === $user->id) {
            return back()->withErrors(['error' => 'You cannot ban yourself.']);
        }

        if ($targetUser->isAdmin() && $user->role !== 'super_admin') {
            return back()->withErrors(['error' => 'Only super admins can ban other admins.']);
        }

        // Toggle is_banned status (we'll need to add this column)
        $targetUser->update(['is_banned' => !$targetUser->is_banned]);

        $status = $targetUser->is_banned ? 'banned' : 'unbanned';
        return back()->with('success', "User has been {$status} successfully.");
    }

    /**
     * Create admin user - Super Admin Only
     */
    public function createAdmin(Request $request)
    {
        $user = auth()->user();
        
        if ($user->role !== 'super_admin') {
            abort(403, 'Only super admins can create admin users.');
        }

        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()],
            'role' => ['required', 'in:admin,super_admin'],
        ]);

        User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => \Illuminate\Support\Facades\Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return back()->with('success', 'Admin user created successfully.');
    }

    /**
     * Delete admin user - Super Admin Only
     */
    public function deleteAdmin(User $targetUser)
    {
        $user = auth()->user();
        
        if ($user->role !== 'super_admin') {
            abort(403, 'Only super admins can delete admin users.');
        }

        if ($targetUser->id === $user->id) {
            return back()->withErrors(['error' => 'You cannot delete yourself.']);
        }

        if (!in_array($targetUser->role, ['admin', 'super_admin'])) {
            return back()->withErrors(['error' => 'This user is not an admin.']);
        }

        $targetUser->delete();

        return back()->with('success', 'Admin user deleted successfully.');
    }
}
