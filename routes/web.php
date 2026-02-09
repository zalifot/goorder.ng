<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WhatsAppController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\GeneralCategoryController;
use App\Http\Controllers\ProductCategoryController;
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

// Legal Pages
Route::get('/privacy-policy', function () {
    return Inertia::render('legal/privacy-policy');
})->name('privacy-policy');

Route::get('/data-protection', function () {
    return Inertia::render('legal/data-protection');
})->name('data-protection');

Route::get('/terms-and-conditions', function () {
    return Inertia::render('legal/terms-and-conditions');
})->name('terms-and-conditions');

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

// Forgot Password Page (GET - show form)
Route::get('/forgot-password', function () {
    return Inertia::render('auth/forgot-password');
})->middleware('guest')->name('password.request');

// Email Verification Notice Route
Route::get('/email/verify', function () {
    return Inertia::render('auth/verify-email');
})->middleware('auth')->name('verification.notice');

// Public shop page
Route::get('/shop/{publicId}', function (string $publicId) {
    $shop = Shop::where('public_id', $publicId)->firstOrFail();
    $products = \App\Models\Product::where('shop_public_id', $publicId)
        ->with('category')
        ->where('is_active', true)
        ->get();
    $categories = \App\Models\ProductCategory::whereIn('id', $products->pluck('category_id')->unique())
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
})->name('shop.show');

// Vendor Auth Routes
Route::middleware('guest')->group(function () {
    Route::get('vendor-login', function () {
        return Inertia::render('auth/vendor-login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
        ]);
    })->name('vendor.login');

    Route::post('vendor-login', function (Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        // Allow admin, super_admin, shop_owner, and staff to login through vendor area
        if ($user && in_array($user->role, ['admin', 'super_admin', 'shop_owner', 'staff']) && Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended('/vendor/dashboard');
        }

        // If user exists but has customer role, show appropriate message
        if ($user && $user->role === 'user') {
            return back()->withErrors([
                'email' => 'Please use the customer login page to access your account.',
            ]);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
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

        return redirect('/vendor/dashboard');
    });

    // Customer Auth Routes
    Route::get('customer-login', function () {
        return Inertia::render('auth/customer-login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
        ]);
    })->name('customer.login');

    // Keep /login as alias for customer-login (for Laravel's default auth)
    Route::get('login', function () {
        return redirect('/customer-login');
    })->name('login');

    Route::post('customer-login', function (Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        // Only allow users with 'user' role to login through customer area
        if ($user && $user->role === 'user' && Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended('/customer/dashboard');
        }

        // If user exists but has vendor role, show appropriate message
        if ($user && in_array($user->role, ['admin', 'super_admin', 'shop_owner'])) {
            return back()->withErrors([
                'email' => 'Please use the vendor login page to access your account.',
            ]);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    });

    Route::get('customer-register', function () {
        return Inertia::render('auth/customer-register');
    })->name('customer.register');

    // Keep /register as alias for customer-register
    Route::get('register', function () {
        return redirect('/customer-register');
    })->name('register');

    Route::post('customer-register', function (Request $request) {
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

        return redirect('/customer/dashboard');
    });
});

Route::post('logout', function (Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
})->name('logout');

// Customer Routes
Route::middleware(['auth'])->prefix('customer')->group(function () {
    Route::get('dashboard', [CustomerController::class, 'dashboard'])->name('customer.dashboard');

    // Orders
    Route::get('orders', [OrderController::class, 'index'])->name('customer.orders');
    Route::get('orders/{order}', [OrderController::class, 'show'])->name('customer.orders.show');

    // Transactions
    Route::get('transactions', [OrderController::class, 'transactions'])->name('customer.transactions');

    // Cart
    Route::get('cart', [CartController::class, 'index'])->name('customer.cart');
    Route::post('cart/add', [CartController::class, 'addItem'])->name('customer.cart.add');
    Route::patch('cart/items/{cartItem}', [CartController::class, 'updateItem'])->name('customer.cart.update');
    Route::delete('cart/items/{cartItem}', [CartController::class, 'removeItem'])->name('customer.cart.remove');
    Route::delete('cart/{cart}', [CartController::class, 'clearCart'])->name('customer.cart.clear');

    // Checkout
    Route::get('checkout', [OrderController::class, 'checkout'])->name('customer.checkout');
    Route::post('checkout', [OrderController::class, 'store'])->name('customer.checkout.store');
});

// API for cart (vendor/show.tsx)
Route::middleware(['auth'])->prefix('api')->group(function () {
    Route::get('cart/shop/{shop}', [CartController::class, 'getShopCart'])->name('api.cart.shop');
});

// Vendor Routes
Route::middleware(['auth', 'role:admin,super_admin,shop_owner,staff'])->prefix('vendor')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('vendor.dashboard');

    // Product Categories routes
    Route::get('product-categories', [ProductCategoryController::class, 'index'])->name('product-categories');
    Route::post('product-categories', [ProductCategoryController::class, 'store'])->name('product-categories.store');
    Route::put('product-categories/{productCategory}', [ProductCategoryController::class, 'update'])->name('product-categories.update');
    Route::patch('product-categories/{productCategory}/toggle-status', [ProductCategoryController::class, 'toggleStatus'])->name('product-categories.toggle-status');
    Route::delete('product-categories/{productCategory}', [ProductCategoryController::class, 'destroy'])->name('product-categories.destroy');

    // General Categories routes (Admin Only)
    Route::middleware('role:admin,super_admin')->group(function () {
        Route::get('general-categories', [GeneralCategoryController::class, 'index'])->name('general-categories');
        Route::post('general-categories', [GeneralCategoryController::class, 'store'])->name('general-categories.store');
        Route::put('general-categories/{generalCategory}', [GeneralCategoryController::class, 'update'])->name('general-categories.update');
        Route::patch('general-categories/{generalCategory}/toggle-status', [GeneralCategoryController::class, 'toggleStatus'])->name('general-categories.toggle-status');
        Route::delete('general-categories/{generalCategory}', [GeneralCategoryController::class, 'destroy'])->name('general-categories.destroy');
    });

    Route::get('orders', [ShopController::class, 'allOrders'])->name('orders');

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

    // Owner/Admin-only routes (staff cannot access these)
    Route::middleware('role:admin,super_admin,shop_owner')->group(function () {
        Route::get('integrations', function () {
            $whatsapp = \App\Models\WhatsappIntegration::where('user_id', auth()->id())->first();
            $shops = \App\Models\Shop::where('user_id', auth()->id())
                ->withCount(['products' => fn ($q) => $q->where('is_active', true)])
                ->get(['id', 'name', 'public_id', 'image']);
            return Inertia::render('integrations', [
                'whatsapp' => $whatsapp ? [
                    'connected'            => true,
                    'display_phone_number' => $whatsapp->display_phone_number,
                    'verified_name'        => $whatsapp->verified_name,
                    'waba_name'            => $whatsapp->waba_name,
                    'quality_rating'       => $whatsapp->quality_rating,
                    'catalog_id'           => $whatsapp->catalog_id,
                    'catalog_name'         => $whatsapp->catalog_name,
                    'commerce_enabled'     => $whatsapp->commerce_enabled,
                    'last_synced_at'       => $whatsapp->last_synced_at?->diffForHumans(),
                ] : ['connected' => false],
                'shops' => $shops,
            ]);
        })->name('integrations');
        Route::get('integrations/whatsapp/redirect', [WhatsAppController::class, 'redirect'])->name('integrations.whatsapp.redirect');
        Route::get('integrations/whatsapp/callback', [WhatsAppController::class, 'callback'])->name('integrations.whatsapp.callback');
        Route::delete('integrations/whatsapp/disconnect', [WhatsAppController::class, 'disconnect'])->name('integrations.whatsapp.disconnect');
        Route::post('integrations/whatsapp/catalog/setup', [WhatsAppController::class, 'setupCatalog'])->name('integrations.whatsapp.catalog.setup');
        Route::post('integrations/whatsapp/catalog/sync', [WhatsAppController::class, 'syncProducts'])->name('integrations.whatsapp.catalog.sync');
        Route::post('integrations/whatsapp/send', [WhatsAppController::class, 'sendMessage'])->name('integrations.whatsapp.send');

        Route::get('transactions', [ShopController::class, 'allTransactions'])->name('transactions');

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
        Route::post('manage/staff/{staff}/reset-password', [StaffController::class, 'resetPassword'])->name('staff.reset-password');

        // Staff Role Management routes
        Route::get('manage/roles', [StaffController::class, 'rolesIndex'])->name('roles.index');
        Route::post('manage/roles', [StaffController::class, 'storeRole'])->name('roles.store');
        Route::put('manage/roles/{role}', [StaffController::class, 'updateRole'])->name('roles.update');
        Route::delete('manage/roles/{role}', [StaffController::class, 'destroyRole'])->name('roles.destroy');
    });

    // Global Inventory Dashboard
    Route::get('inventory', [ProductController::class, 'dashboard'])->name('inventory.dashboard');

    // Shop routes
    Route::get('/shops', [ShopController::class, 'index'])->name('shops.index');
    Route::get('/manage/shop/{publicId}', [ShopController::class, 'show'])->name('shops.show');
    Route::get('/manage/shop/{publicId}/analytics', [ShopController::class, 'analytics'])->name('shops.analytics');
    Route::get('/manage/shop/{publicId}/orders', [ShopController::class, 'shopOrders'])->name('shops.orders');
    Route::get('/manage/shop/{publicId}/transactions', [ShopController::class, 'shopTransactions'])->name('shops.transactions');
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

// WhatsApp Webhooks (public — Meta sends these without auth)
Route::get('/webhooks/whatsapp', [WhatsAppController::class, 'webhookVerify'])->name('webhooks.whatsapp.verify');
Route::post('/webhooks/whatsapp', [WhatsAppController::class, 'webhookHandle'])->name('webhooks.whatsapp.handle');

require __DIR__.'/settings.php';
