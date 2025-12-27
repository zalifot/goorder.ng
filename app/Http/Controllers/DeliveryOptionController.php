<?php

namespace App\Http\Controllers;

use App\Models\DeliveryLocation;
use App\Models\DeliverySlot;
use App\Models\DeliveryState;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DeliveryOptionController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $shops = Shop::where('user_id', $user->id)->get();
        
        // Get selected shop or default to first shop
        $selectedShopId = $request->query('shop_id');
        $selectedShop = $selectedShopId 
            ? $shops->firstWhere('id', $selectedShopId)
            : $shops->first();

        $states = DeliveryState::where('user_id', $user->id)
            ->where(function ($query) use ($selectedShop) {
                $query->where('shop_id', $selectedShop?->id)
                    ->orWhereNull('shop_id');
            })
            ->with('locations')
            ->orderBy('name')
            ->get();

        $slots = DeliverySlot::where('user_id', $user->id)
            ->where(function ($query) use ($selectedShop) {
                $query->where('shop_id', $selectedShop?->id)
                    ->orWhereNull('shop_id');
            })
            ->orderByRaw("FIELD(day_of_week, 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')")
            ->orderBy('start_time')
            ->get();

        return Inertia::render('delivery-options', [
            'states' => $states,
            'slots' => $slots,
            'shops' => $shops,
            'selectedShopId' => $selectedShop?->id,
        ]);
    }

    // Delivery States
    public function storeState(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'shop_id' => 'nullable|exists:shops,id',
        ]);

        DeliveryState::create([
            'user_id' => Auth::id(),
            'shop_id' => $validated['shop_id'] ?? null,
            'name' => $validated['name'],
        ]);

        return redirect()->back()->with('success', 'State added successfully.');
    }

    public function updateState(Request $request, DeliveryState $state)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);

        $state->update($validated);

        return redirect()->back()->with('success', 'State updated successfully.');
    }

    public function destroyState(DeliveryState $state)
    {
        $state->delete();

        return redirect()->back()->with('success', 'State deleted successfully.');
    }

    // Delivery Locations
    public function storeLocation(Request $request)
    {
        $validated = $request->validate([
            'delivery_state_id' => 'required|exists:delivery_states,id',
            'shop_id' => 'nullable|exists:shops,id',
            'name' => 'required|string|max:255',
            'delivery_fee' => 'required|numeric|min:0',
        ]);

        DeliveryLocation::create($validated);

        return redirect()->back()->with('success', 'Location added successfully.');
    }

    public function updateLocation(Request $request, DeliveryLocation $location)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'delivery_fee' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $location->update($validated);

        return redirect()->back()->with('success', 'Location updated successfully.');
    }

    public function destroyLocation(DeliveryLocation $location)
    {
        $location->delete();

        return redirect()->back()->with('success', 'Location deleted successfully.');
    }

    // Delivery Slots
    public function storeSlot(Request $request)
    {
        $validated = $request->validate([
            'shop_id' => 'nullable|exists:shops,id',
            'day_of_week' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        DeliverySlot::create([
            'user_id' => Auth::id(),
            'shop_id' => $validated['shop_id'] ?? null,
            'day_of_week' => $validated['day_of_week'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
        ]);

        return redirect()->back()->with('success', 'Delivery slot added successfully.');
    }

    public function updateSlot(Request $request, DeliverySlot $slot)
    {
        $validated = $request->validate([
            'day_of_week' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'is_active' => 'boolean',
        ]);

        $slot->update($validated);

        return redirect()->back()->with('success', 'Delivery slot updated successfully.');
    }

    public function destroySlot(DeliverySlot $slot)
    {
        $slot->delete();

        return redirect()->back()->with('success', 'Delivery slot deleted successfully.');
    }
}
