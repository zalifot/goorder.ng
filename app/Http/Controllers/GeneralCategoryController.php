<?php

namespace App\Http\Controllers;

use App\Models\GeneralCategory;
use App\Services\CloudinaryService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GeneralCategoryController extends Controller
{
    protected CloudinaryService $cloudinary;

    public function __construct(CloudinaryService $cloudinary)
    {
        $this->cloudinary = $cloudinary;
    }

    public function index()
    {
        $categories = GeneralCategory::withCount('shops')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('admin/general-categories', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:general_categories,name',
            'icon' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'image_url' => 'nullable|url|max:500',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        // Handle image - prefer uploaded file over URL
        if ($request->hasFile('image')) {
            $validated['image'] = $this->cloudinary->upload($request->file('image'), 'general-categories');
        } elseif (!empty($validated['image_url'])) {
            $validated['image'] = $validated['image_url'];
        }
        unset($validated['image_url']);

        GeneralCategory::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'icon' => $validated['icon'] ?? null,
            'image' => $validated['image'] ?? null,
            'description' => $validated['description'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return redirect()->back()->with('success', 'General category created successfully.');
    }

    public function update(Request $request, GeneralCategory $generalCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:general_categories,name,' . $generalCategory->id,
            'slug' => 'nullable|string|max:255|unique:general_categories,slug,' . $generalCategory->id,
            'icon' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'image_url' => 'nullable|url|max:500',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
            'remove_image' => 'boolean',
        ]);

        // Slugify the slug if provided
        if (!empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        // Handle image removal
        if ($request->boolean('remove_image') && $generalCategory->image) {
            if ($this->cloudinary->isCloudinaryUrl($generalCategory->image)) {
                $this->cloudinary->delete($generalCategory->image);
            }
            $validated['image'] = null;
        } elseif ($request->hasFile('image')) {
            if ($generalCategory->image && $this->cloudinary->isCloudinaryUrl($generalCategory->image)) {
                $this->cloudinary->delete($generalCategory->image);
            }
            $validated['image'] = $this->cloudinary->upload($request->file('image'), 'general-categories');
        } elseif (!empty($validated['image_url'])) {
            if ($generalCategory->image && $this->cloudinary->isCloudinaryUrl($generalCategory->image)) {
                $this->cloudinary->delete($generalCategory->image);
            }
            $validated['image'] = $validated['image_url'];
        } else {
            unset($validated['image']);
        }

        unset($validated['remove_image'], $validated['image_url']);
        $generalCategory->update($validated);

        return redirect()->back()->with('success', 'General category updated successfully.');
    }

    public function destroy(GeneralCategory $generalCategory)
    {
        // Check if there are shops using this category
        if ($generalCategory->shops()->count() > 0) {
            return redirect()->back()->with('error', 'Cannot delete category with associated shops.');
        }

        if ($generalCategory->image && $this->cloudinary->isCloudinaryUrl($generalCategory->image)) {
            $this->cloudinary->delete($generalCategory->image);
        }

        $generalCategory->delete();

        return redirect()->back()->with('success', 'General category deleted successfully.');
    }

    public function toggleStatus(Request $request, GeneralCategory $generalCategory)
    {
        $generalCategory->update([
            'is_active' => !$generalCategory->is_active,
        ]);

        return redirect()->back()->with('success', 'General category status updated successfully.');
    }
}
