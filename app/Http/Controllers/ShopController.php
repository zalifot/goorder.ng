<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::where('user_id', auth()->id())->latest()->get();
        return Inertia::render('shops', [
            'shops' => $shops,
        ]);
    }

    public function show(Request $request, string $publicId)
    {
        $shop = Shop::where('public_id', $publicId)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $query = Product::where('shop_public_id', $publicId)
            ->with(['category']);

        // Apply search filter
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Apply category filter
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Apply stock status filter
        if ($request->filled('stock_status')) {
            $query->where('stock_status', $request->stock_status);
        }

        $products = $query->latest()->paginate(15)->withQueryString();
        $categories = Category::orderBy('name')->get();

        return Inertia::render('shops/manage', [
            'shop' => $shop,
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category_id' => $request->category_id,
                'stock_status' => $request->stock_status,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_url' => 'nullable|url|max:500',
        ]);

        // Handle image
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('shops', 'public');
        } elseif (!empty($validated['image_url'])) {
            $validated['image'] = $validated['image_url'];
        }
        unset($validated['image_url']);

        Shop::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']) . '-' . uniqid(),
            'description' => $validated['description'] ?? null,
            'address' => $validated['address'] ?? null,
            'image' => $validated['image'] ?? null,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, Shop $shop)
    {
        $this->authorize('update', $shop);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_url' => 'nullable|url|max:500',
            'remove_image' => 'boolean',
        ]);

        // Handle image removal
        if ($request->boolean('remove_image') && $shop->image) {
            if (!filter_var($shop->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($shop->image);
            }
            $validated['image'] = null;
        } elseif ($request->hasFile('image')) {
            if ($shop->image && !filter_var($shop->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($shop->image);
            }
            $validated['image'] = $request->file('image')->store('shops', 'public');
        } elseif (!empty($validated['image_url'])) {
            if ($shop->image && !filter_var($shop->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($shop->image);
            }
            $validated['image'] = $validated['image_url'];
        } else {
            unset($validated['image']);
        }

        unset($validated['remove_image'], $validated['image_url']);

        $shop->update($validated);

        return redirect()->back();
    }

    public function destroy(Shop $shop)
    {
        $this->authorize('delete', $shop);

        if ($shop->image && !filter_var($shop->image, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($shop->image);
        }

        $shop->delete();
        return redirect()->back();
    }

    public function toggleActive(Request $request, Shop $shop)
    {
        $this->authorize('update', $shop);

        $validated = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $shop->update(['is_active' => $validated['is_active']]);

        return redirect()->back();
    }

    public function toggleConstruction(Request $request, Shop $shop)
    {
        $this->authorize('update', $shop);

        $validated = $request->validate([
            'is_under_construction' => 'required|boolean',
        ]);

        $shop->update(['is_under_construction' => $validated['is_under_construction']]);

        return redirect()->back();
    }
}
