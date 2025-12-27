<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class StaffController extends Controller
{
    /**
     * Display the staff management page.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Get all shops owned by the user
        $shops = $user->shops()->select('id', 'name', 'public_id')->get();

        // Get all staff members assigned to user's shops
        $shopIds = $shops->pluck('id');
        
        $staffMembers = User::whereHas('staffShops', function ($query) use ($shopIds) {
            $query->whereIn('shop_id', $shopIds);
        })
        ->with(['staffShops' => function ($query) use ($shopIds) {
            $query->whereIn('shop_id', $shopIds)->select('shops.id', 'shops.name', 'shops.public_id');
        }])
        ->get()
        ->map(function ($staff) {
            return [
                'id' => $staff->id,
                'name' => $staff->name,
                'email' => $staff->email,
                'phone' => $staff->phone,
                'username' => $staff->username,
                'role' => $staff->role,
                'created_at' => $staff->created_at,
                'assigned_shops' => $staff->staffShops->map(function ($shop) {
                    return [
                        'id' => $shop->id,
                        'name' => $shop->name,
                        'public_id' => $shop->public_id,
                        'role' => $shop->pivot->role,
                    ];
                }),
            ];
        });

        return Inertia::render('staff', [
            'staff' => $staffMembers,
            'shops' => $shops,
        ]);
    }

    /**
     * Store a new staff member.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $shopIds = $user->shops()->pluck('id');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'role' => ['required', 'string', 'in:manager,cashier,inventory_clerk'],
            'shop_ids' => ['required', 'array', 'min:1'],
            'shop_ids.*' => ['required', 'integer', Rule::in($shopIds)],
        ]);

        // Create the staff user
        $staff = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'username' => Str::slug($validated['name']) . '-' . Str::random(4),
            'password' => Hash::make(Str::random(16)), // Temporary password
            'role' => 'staff',
        ]);

        // Assign to shops
        foreach ($validated['shop_ids'] as $shopId) {
            $staff->staffShops()->attach($shopId, ['role' => $validated['role']]);
        }

        return back()->with('success', 'Staff member added successfully.');
    }

    /**
     * Update a staff member.
     */
    public function update(Request $request, User $staff)
    {
        $user = $request->user();
        $shopIds = $user->shops()->pluck('id');

        // Verify this staff is assigned to one of user's shops
        $staffShopIds = $staff->staffShops()->pluck('shop_id');
        if (!$staffShopIds->intersect($shopIds)->count()) {
            abort(403, 'You do not have permission to edit this staff member.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($staff->id)],
            'phone' => ['nullable', 'string', 'max:20'],
            'role' => ['required', 'string', 'in:manager,cashier,inventory_clerk'],
            'shop_ids' => ['required', 'array', 'min:1'],
            'shop_ids.*' => ['required', 'integer', Rule::in($shopIds)],
        ]);

        $staff->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
        ]);

        // Sync shop assignments (only for shops owned by this user)
        $staff->staffShops()->detach($shopIds);
        foreach ($validated['shop_ids'] as $shopId) {
            $staff->staffShops()->attach($shopId, ['role' => $validated['role']]);
        }

        return back()->with('success', 'Staff member updated successfully.');
    }

    /**
     * Remove a staff member from shops.
     */
    public function destroy(Request $request, User $staff)
    {
        $user = $request->user();
        $shopIds = $user->shops()->pluck('id');

        // Remove staff from all shops owned by this user
        $staff->staffShops()->detach($shopIds);

        // If staff has no other shop assignments, optionally delete the user
        // For now, we just remove the assignments
        
        return back()->with('success', 'Staff member removed successfully.');
    }
}
