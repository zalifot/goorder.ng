<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Shop;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
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

        // Platform-wide statistics
        $stats = [
            // Revenue (all shops combined)
            'total_revenue' => Order::sum('total') ?? 0,
            'today_revenue' => Order::whereDate('created_at', $today)->sum('total') ?? 0,
            'monthly_revenue' => Order::where('created_at', '>=', $startOfMonth)->sum('total') ?? 0,
            'last_month_revenue' => Order::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->sum('total') ?? 0,
            
            // Orders
            'total_orders' => Order::count(),
            'today_orders' => Order::whereDate('created_at', $today)->count(),
            'monthly_orders' => Order::where('created_at', '>=', $startOfMonth)->count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            
            // Users breakdown
            'total_users' => User::count(),
            'total_customers' => User::where('role', 'user')->count(),
            'total_shop_owners' => User::whereHas('shops')->count(),
            'total_admins' => User::whereIn('role', ['admin', 'super_admin'])->count(),
            'new_users_today' => User::whereDate('created_at', $today)->count(),
            'new_users_month' => User::where('created_at', '>=', $startOfMonth)->count(),
            
            // Shops
            'total_shops' => Shop::count(),
            'active_shops' => Shop::where('is_active', true)->count(),
            'inactive_shops' => Shop::where('is_active', false)->count(),
            'shops_under_construction' => Shop::where('is_construction', true)->count(),
            'new_shops_month' => Shop::where('created_at', '>=', $startOfMonth)->count(),
            
            // Products (all shops combined)
            'total_products' => Product::count(),
            'active_products' => Product::where('is_active', true)->count(),
            'out_of_stock' => Product::where('stock_status', 'out_of_stock')->count(),
            'low_stock' => Product::where('stock_status', 'low_stock')->count(),
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
            ->get(['id', 'name', 'email', 'role', 'created_at']);

        // Recent shops
        $recentShops = Shop::with('user:id,name,email')
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'public_id', 'is_active', 'is_construction', 'user_id', 'created_at']);

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

        $query = Shop::with(['user:id,name,email', 'products'])
            ->withCount('products');

        // Search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('public_id', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($uq) use ($search) {
                        $uq->where('name', 'like', "%{$search}%")
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
                $query->where('is_construction', true);
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
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%");
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()],
            'role' => ['required', 'in:admin,super_admin'],
        ]);

        User::create([
            'name' => $validated['name'],
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
