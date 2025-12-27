<?php

namespace App\Http\Controllers;

use App\Imports\ProductsImport;
use App\Models\Category;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    /**
     * Global inventory dashboard showing all products across all shops owned by the user.
     */
    public function dashboard(Request $request)
    {
        $user = Auth::user();
        
        // Get all shops owned by the current user
        $shops = Shop::where('user_id', $user->id)->get();
        $shopPublicIds = $shops->pluck('public_id')->toArray();
        
        // Build query for products across all user's shops
        $query = Product::with(['category', 'shop'])
            ->whereIn('shop_public_id', $shopPublicIds)
            ->latest();

        // Search by name
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by shop
        if ($request->filled('shop_public_id')) {
            $query->where('shop_public_id', $request->shop_public_id);
        }

        // Filter by stock status
        if ($request->filled('stock_status')) {
            $query->where('stock_status', $request->stock_status);
        }

        $products = $query->paginate(20)->withQueryString();

        // Calculate stats
        $allProductsQuery = Product::whereIn('shop_public_id', $shopPublicIds);
        $stats = [
            'total_products' => $allProductsQuery->count(),
            'low_stock_count' => (clone $allProductsQuery)->where('stock_status', 'low_stock')->count(),
            'out_of_stock_count' => (clone $allProductsQuery)->where('stock_status', 'out_of_stock')->count(),
            'total_shops' => $shops->count(),
        ];

        return Inertia::render('inventory-dashboard', [
            'products' => $products,
            'shops' => $shops,
            'stats' => $stats,
            'filters' => [
                'search' => $request->search,
                'shop_public_id' => $request->shop_public_id,
                'stock_status' => $request->stock_status,
            ],
        ]);
    }

    public function index(Request $request, string $publicId)
    {
        $shop = Shop::where('public_id', $publicId)->firstOrFail();
        
        $query = Product::with('category')
            ->where('shop_public_id', $publicId)
            ->latest();

        // Search by name
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Filter by category if provided
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $products = $query->paginate(20)->withQueryString();
        $categories = Category::where('is_active', true)->get();

        return Inertia::render('products', [
            'shop' => $shop,
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'category_id' => $request->category_id,
            ],
        ]);
    }

    public function store(Request $request, string $publicId)
    {
        $shop = Shop::where('public_id', $publicId)->firstOrFail();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_url' => 'nullable|url|max:500',
            'price' => 'required|numeric|min:0',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'stock_quantity' => 'required|integer|min:0',
            'delivery_fee' => 'nullable|numeric|min:0',
            'delivery_time' => 'nullable|string|max:255',
            'payment_on_delivery' => 'boolean',
            'description' => 'nullable|string',
        ]);

        // Generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Handle image - prefer uploaded file over URL
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('products', 'public');
        } elseif (!empty($validated['image_url'])) {
            $validated['image'] = $validated['image_url'];
        }
        unset($validated['image_url']);

        // Set shop_public_id from route
        $validated['shop_public_id'] = $publicId;

        $validated['discount_percentage'] = $validated['discount_percentage'] ?? 0;
        $validated['delivery_fee'] = $validated['delivery_fee'] ?? 0;
        $validated['payment_on_delivery'] = $validated['payment_on_delivery'] ?? true;

        Product::create($validated);

        return redirect()->back()->with('success', 'Product added to inventory successfully.');
    }

    public function update(Request $request, string $publicId, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug,' . $product->id,
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_url' => 'nullable|url|max:500',
            'price' => 'required|numeric|min:0',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'stock_quantity' => 'required|integer|min:0',
            'delivery_fee' => 'nullable|numeric|min:0',
            'delivery_time' => 'nullable|string|max:255',
            'payment_on_delivery' => 'boolean',
            'description' => 'nullable|string',
            'remove_image' => 'boolean',
        ]);

        // Slugify the slug if provided
        if (!empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        // Handle image removal
        if ($request->boolean('remove_image') && $product->image) {
            // Only delete if it's a local file, not a URL
            if (!filter_var($product->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = null;
        } elseif ($request->hasFile('image')) {
            if ($product->image && !filter_var($product->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $request->file('image')->store('products', 'public');
        } elseif (!empty($validated['image_url'])) {
            if ($product->image && !filter_var($product->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($product->image);
            }
            $validated['image'] = $validated['image_url'];
        } else {
            unset($validated['image']);
        }

        unset($validated['remove_image'], $validated['image_url']);
        $validated['discount_percentage'] = $validated['discount_percentage'] ?? 0;
        $validated['delivery_fee'] = $validated['delivery_fee'] ?? 0;

        $product->update($validated);

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function import(Request $request, string $publicId)
    {
        $shop = Shop::where('public_id', $publicId)->firstOrFail();
        
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:10240',
        ]);

        Excel::import(new ProductsImport($publicId), $request->file('file'));

        return redirect()->back()->with('success', 'Products imported successfully.');
    }

    public function downloadTemplate(string $publicId)
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="products_template.csv"',
        ];

        $columns = ['name', 'category', 'price', 'discount_percentage', 'stock_quantity', 'delivery_fee', 'delivery_time', 'payment_on_delivery', 'image_url', 'description'];
        
        $callback = function() use ($columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);
            fputcsv($file, ['Sample Product', 'Electronics', '15000', '10', '50', '500', '2-3 days', 'true', 'https://example.com/image.jpg', 'Product description here']);
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function destroy(string $publicId, Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }
}
