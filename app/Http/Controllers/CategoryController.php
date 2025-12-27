<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::latest()->paginate(20);

        return Inertia::render('categories', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_url' => 'nullable|url|max:500',
            'is_active' => 'boolean',
        ]);

        // Handle image - prefer uploaded file over URL
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('categories', 'public');
        } elseif (!empty($validated['image_url'])) {
            $validated['image'] = $validated['image_url'];
        }
        unset($validated['image_url']);

        Category::create($validated);

        return redirect()->back()->with('success', 'Category created successfully.');
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'slug' => 'nullable|string|max:255|unique:categories,slug,' . $category->id,
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'image_url' => 'nullable|url|max:500',
            'is_active' => 'boolean',
            'remove_image' => 'boolean',
        ]);

        // Slugify the slug if provided
        if (!empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        // Handle image removal
        if ($request->boolean('remove_image') && $category->image) {
            // Only delete if it's a local file, not a URL
            if (!filter_var($category->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($category->image);
            }
            $validated['image'] = null;
        } elseif ($request->hasFile('image')) {
            if ($category->image && !filter_var($category->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($category->image);
            }
            $validated['image'] = $request->file('image')->store('categories', 'public');
        } elseif (!empty($validated['image_url'])) {
            if ($category->image && !filter_var($category->image, FILTER_VALIDATE_URL)) {
                Storage::disk('public')->delete($category->image);
            }
            $validated['image'] = $validated['image_url'];
        } else {
            unset($validated['image']);
        }

        unset($validated['remove_image'], $validated['image_url']);
        $category->update($validated);

        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        if ($category->image && !filter_var($category->image, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }

    public function toggleStatus(Request $request, Category $category)
    {
        $category->update([
            'is_active' => !$category->is_active,
        ]);

        return redirect()->back()->with('success', 'Category status updated successfully.');
    }
}
