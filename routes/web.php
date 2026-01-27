<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryOptionController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\StaffController;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Public Marketplace - List all active shops
Route::get('/marketplace', function () {
    $shops = Shop::where('is_active', true)
        ->where('is_under_construction', false)
        ->withCount(['products' => function ($query) {
            $query->where('is_active', true);
        }])
        ->with('user:id,username')
        ->latest()
        ->get();
    
    return Inertia::render('marketplace', [
        'shops' => $shops,
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('marketplace');

// Google OAuth Routes
Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');

// Public vendor page
Route::get('/vendor/{publicId}', function (string $publicId) {
    $shop = Shop::where('public_id', $publicId)->firstOrFail();
    $products = \App\Models\Product::where('shop_public_id', $publicId)
        ->with('category')
        ->where('is_active', true)
        ->get();
    $categories = \App\Models\Category::whereIn('id', $products->pluck('category_id')->unique())
        ->where('is_active', true)
        ->get();
    
    // Check if current user is the shop owner
    $isOwner = Auth::check() && Auth::id() === $shop->user_id;
    
    // Get delivery slots for this specific shop (prefer shop-specific, fallback to global)
    $deliverySlots = \App\Models\DeliverySlot::where('user_id', $shop->user_id)
        ->where('shop_id', $shop->id)
        ->where('is_active', true)
        ->orderByRaw("FIELD(day_of_week, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')")
        ->get();
    
    // If no shop-specific slots, fall back to global slots
    if ($deliverySlots->isEmpty()) {
        $deliverySlots = \App\Models\DeliverySlot::where('user_id', $shop->user_id)
            ->whereNull('shop_id')
            ->where('is_active', true)
            ->orderByRaw("FIELD(day_of_week, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')")
            ->get();
    }
    
    // Get delivery states for this specific shop (prefer shop-specific, fallback to global)
    $deliveryStates = \App\Models\DeliveryState::where('user_id', $shop->user_id)
        ->where('shop_id', $shop->id)
        ->where('is_active', true)
        ->with(['locations' => function ($query) use ($shop) {
            $query->where('is_active', true)
                ->where('shop_id', $shop->id);
        }])
        ->get();
    
    // If no shop-specific states, fall back to global states
    if ($deliveryStates->isEmpty()) {
        $deliveryStates = \App\Models\DeliveryState::where('user_id', $shop->user_id)
            ->whereNull('shop_id')
            ->where('is_active', true)
            ->with(['locations' => function ($query) {
                $query->where('is_active', true)
                    ->whereNull('shop_id');
            }])
            ->get();
    }
    
    return Inertia::render('vendor/show', [
        'shop' => $shop,
        'products' => $products,
        'categories' => $categories,
        'isOwner' => $isOwner,
        'deliverySlots' => $deliverySlots,
        'deliveryStates' => $deliveryStates,
    ]);
})->name('vendor.show');

// Admin Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('vendor-login', function () {
        return Inertia::render('admin/auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
        ]);
    })->name('admin.login');

    Route::post('vendor-login', function (Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if ($user && in_array($user->role, ['admin', 'super_admin']) && Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records or you do not have admin access.',
        ]);
    });

    // Vendor Registration (shop_owner role)
    Route::get('vendor-register', function () {
        return Inertia::render('auth/vendor-register');
    })->name('vendor.register');

    Route::post('vendor-register', function (Request $request) {
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'shop_owner',
        ]);

        Auth::login($user);

        return redirect('/dashboard');
    });

    // User Auth Routes
    Route::get('login', function () {
        return Inertia::render('auth/user-login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
        ]);
    })->name('login');

    Route::post('login', function (Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            $user = Auth::user();
            
            if (in_array($user->role, ['admin', 'super_admin'])) {
                return redirect()->intended('/dashboard');
            }
            
            return redirect()->intended('/user-dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    });

    Route::get('register', function () {
        return Inertia::render('auth/user-register');
    })->name('register');

    Route::post('register', function (Request $request) {
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'user',
        ]);

        Auth::login($user);

        return redirect('/user-dashboard');
    });
});

Route::post('logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
})->name('logout');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('user-dashboard', function () {
        return Inertia::render('user-dashboard');
    })->name('user.dashboard');

    // Admin Categories routes
    Route::get('categories', [CategoryController::class, 'index'])->name('categories');
    Route::post('categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::patch('categories/{category}/toggle-status', [CategoryController::class, 'toggleStatus'])->name('categories.toggle-status');
    Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('orders', function () {
        return Inertia::render('orders');
    })->name('orders');

    // Delivery Options routes
    Route::get('delivery-options', [DeliveryOptionController::class, 'index'])->name('delivery-options');
    Route::post('delivery-options/states', [DeliveryOptionController::class, 'storeState'])->name('delivery-options.states.store');
    Route::put('delivery-options/states/{state}', [DeliveryOptionController::class, 'updateState'])->name('delivery-options.states.update');
    Route::delete('delivery-options/states/{state}', [DeliveryOptionController::class, 'destroyState'])->name('delivery-options.states.destroy');
    Route::post('delivery-options/locations', [DeliveryOptionController::class, 'storeLocation'])->name('delivery-options.locations.store');
    Route::put('delivery-options/locations/{location}', [DeliveryOptionController::class, 'updateLocation'])->name('delivery-options.locations.update');
    Route::delete('delivery-options/locations/{location}', [DeliveryOptionController::class, 'destroyLocation'])->name('delivery-options.locations.destroy');
    Route::post('delivery-options/slots', [DeliveryOptionController::class, 'storeSlot'])->name('delivery-options.slots.store');
    Route::put('delivery-options/slots/{slot}', [DeliveryOptionController::class, 'updateSlot'])->name('delivery-options.slots.update');
    Route::delete('delivery-options/slots/{slot}', [DeliveryOptionController::class, 'destroySlot'])->name('delivery-options.slots.destroy');

    Route::get('integrations', function () {
        return Inertia::render('integrations');
    })->name('integrations');

    Route::get('transactions', function () {
        return Inertia::render('transactions');
    })->name('transactions');

    Route::get('wallet', function () {
        return Inertia::render('wallet');
    })->name('wallet');

    Route::get('users', [PlatformController::class, 'users'])->name('users');
    Route::patch('users/{user}/toggle-status', [PlatformController::class, 'toggleUserStatus'])->name('users.toggle-status');

    Route::get('systems', function () {
        return Inertia::render('systems');
    })->name('systems');

    // Staff Management routes
    Route::get('manage/staff', [StaffController::class, 'index'])->name('staff.index');
    Route::post('manage/staff', [StaffController::class, 'store'])->name('staff.store');
    Route::put('manage/staff/{staff}', [StaffController::class, 'update'])->name('staff.update');
    Route::delete('manage/staff/{staff}', [StaffController::class, 'destroy'])->name('staff.destroy');

    // Staff Role Management routes
    Route::get('manage/roles', [StaffController::class, 'rolesIndex'])->name('roles.index');
    Route::post('manage/roles', [StaffController::class, 'storeRole'])->name('roles.store');
    Route::put('manage/roles/{role}', [StaffController::class, 'updateRole'])->name('roles.update');
    Route::delete('manage/roles/{role}', [StaffController::class, 'destroyRole'])->name('roles.destroy');

    // Global Inventory Dashboard
    Route::get('inventory', [ProductController::class, 'dashboard'])->name('inventory.dashboard');

    // User routes
    Route::get('user/orders', function () {
        return Inertia::render('user/orders');
    })->name('user.orders');

    Route::get('user/cart', function () {
        return Inertia::render('user/cart');
    })->name('user.cart');

    Route::get('user/favorites', function () {
        return Inertia::render('user/favorites');
    })->name('user.favorites');

    // Shop routes
    Route::get('/shops', [ShopController::class, 'index'])->name('shops.index');
    Route::get('/manage/shop/{publicId}', [ShopController::class, 'show'])->name('shops.show');
    Route::post('/shops', [ShopController::class, 'store'])->name('shops.store');
    Route::put('/shops/{shop}', [ShopController::class, 'update'])->name('shops.update');
    Route::patch('/shops/{shop}/toggle-active', [ShopController::class, 'toggleActive'])->name('shops.toggle-active');
    Route::patch('/shops/{shop}/toggle-construction', [ShopController::class, 'toggleConstruction'])->name('shops.toggle-construction');
    Route::delete('/shops/{shop}', [ShopController::class, 'destroy'])->name('shops.destroy');

    // Shop-scoped Inventory (Products) routes
    Route::get('/manage/shop/{publicId}/inventory', [ProductController::class, 'index'])->name('shop.inventory');
    Route::post('/manage/shop/{publicId}/inventory', [ProductController::class, 'store'])->name('shop.inventory.store');
    Route::post('/manage/shop/{publicId}/inventory/import', [ProductController::class, 'import'])->name('shop.inventory.import');
    Route::get('/manage/shop/{publicId}/inventory/template', [ProductController::class, 'downloadTemplate'])->name('shop.inventory.template');
    Route::put('/manage/shop/{publicId}/inventory/{product}', [ProductController::class, 'update'])->name('shop.inventory.update');
    Route::delete('/manage/shop/{publicId}/inventory/{product}', [ProductController::class, 'destroy'])->name('shop.inventory.destroy');

    // Platform Admin Routes (admin only)
    Route::get('/platform/analytics', [PlatformController::class, 'analytics'])->name('platform.analytics');
    Route::get('/platform/shops', [PlatformController::class, 'shops'])->name('platform.shops');
    Route::patch('/platform/shops/{shop}/toggle-status', [PlatformController::class, 'toggleShopStatus'])->name('platform.shops.toggle-status');
    Route::get('/platform/users', [PlatformController::class, 'users'])->name('platform.users');
    Route::patch('/platform/users/{user}/toggle-status', [PlatformController::class, 'toggleUserStatus'])->name('platform.users.toggle-status');
    
    // Super Admin Only - Admin Management
    Route::post('/platform/admins', [PlatformController::class, 'createAdmin'])->name('platform.admins.store');
    Route::delete('/platform/admins/{user}', [PlatformController::class, 'deleteAdmin'])->name('platform.admins.destroy');
});

require __DIR__.'/settings.php';
