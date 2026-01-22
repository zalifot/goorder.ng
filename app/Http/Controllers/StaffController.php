<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\StaffRole;
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

        // Get all staff roles created by the user
        $roles = $user->staffRoles()->select('id', 'name', 'slug', 'description')->get();

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
            'roles' => $roles,
        ]);
    }

    /**
     * Display the roles management page.
     */
    public function rolesIndex(Request $request)
    {
        $user = $request->user();
        
        $roles = $user->staffRoles()
            ->get()
            ->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'slug' => $role->slug,
                    'description' => $role->description,
                    'permissions' => $role->permissions ?? [],
                    'created_at' => $role->created_at,
                ];
            });

        return Inertia::render('roles', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a new staff member.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $shopIds = $user->shops()->pluck('id');
        $roleIds = $user->staffRoles()->pluck('id');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'role_id' => ['required', 'integer', Rule::in($roleIds)],
            'shop_ids' => ['required', 'array', 'min:1'],
            'shop_ids.*' => ['required', 'integer', Rule::in($shopIds)],
        ]);

        // Get the role for storing in pivot
        $role = StaffRole::find($validated['role_id']);

        // Create new staff user account
        $staff = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'username' => Str::slug($validated['name']) . '-' . Str::random(4),
            'password' => Hash::make(Str::random(16)), // Temporary password - user should reset
            'role' => 'staff',
        ]);

        // Assign to shops
        foreach ($validated['shop_ids'] as $shopId) {
            $staff->staffShops()->attach($shopId, ['role' => $role->slug]);
        }

        return back()->with('success', 'Staff member added successfully. They will receive login credentials via email.');
    }

    /**
     * Update a staff member.
     */
    public function update(Request $request, User $staff)
    {
        $user = $request->user();
        $shopIds = $user->shops()->pluck('id');
        $roleIds = $user->staffRoles()->pluck('id');

        // Verify this staff is assigned to one of user's shops
        $staffShopIds = $staff->staffShops()->pluck('shop_id');
        if (!$staffShopIds->intersect($shopIds)->count()) {
            abort(403, 'You do not have permission to edit this staff member.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($staff->id)],
            'phone' => ['nullable', 'string', 'max:20'],
            'role_id' => ['required', 'integer', Rule::in($roleIds)],
            'shop_ids' => ['required', 'array', 'min:1'],
            'shop_ids.*' => ['required', 'integer', Rule::in($shopIds)],
        ]);

        // Get the role name for storing in pivot
        $role = StaffRole::find($validated['role_id']);

        $staff->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
        ]);

        // Sync shop assignments (only for shops owned by this user)
        $staff->staffShops()->detach($shopIds);
        foreach ($validated['shop_ids'] as $shopId) {
            $staff->staffShops()->attach($shopId, ['role' => $role->slug]);
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

    /**
     * Store a new staff role.
     */
    public function storeRole(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        // Check if role with same name already exists for this user
        $exists = $user->staffRoles()->where('name', $validated['name'])->exists();
        if ($exists) {
            return back()->withErrors(['name' => 'A role with this name already exists.']);
        }

        $user->staffRoles()->create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);

        return back()->with('success', 'Role created successfully.');
    }

    /**
     * Update a staff role.
     */
    public function updateRole(Request $request, StaffRole $role)
    {
        $user = $request->user();

        // Verify ownership
        if ($role->user_id !== $user->id) {
            abort(403, 'You do not have permission to edit this role.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        // Check if role with same name already exists for this user (excluding current)
        $exists = $user->staffRoles()
            ->where('name', $validated['name'])
            ->where('id', '!=', $role->id)
            ->exists();
        if ($exists) {
            return back()->withErrors(['name' => 'A role with this name already exists.']);
        }

        $role->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']) . '-' . Str::random(4),
            'description' => $validated['description'] ?? null,
        ]);

        return back()->with('success', 'Role updated successfully.');
    }

    /**
     * Delete a staff role.
     */
    public function destroyRole(Request $request, StaffRole $role)
    {
        $user = $request->user();

        // Verify ownership
        if ($role->user_id !== $user->id) {
            abort(403, 'You do not have permission to delete this role.');
        }

        $role->delete();

        return back()->with('success', 'Role deleted successfully.');
    }
}
