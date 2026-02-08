<?php

namespace Database\Seeders;

use App\Models\GeneralCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GeneralCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Pharmacy', 'icon' => 'local_pharmacy', 'description' => 'Pharmacies and drugstores', 'sort_order' => 1],
            ['name' => 'Fashion & Clothing', 'icon' => 'checkroom', 'description' => 'Clothing, apparel, and fashion accessories', 'sort_order' => 2],
            ['name' => 'Electronics', 'icon' => 'devices', 'description' => 'Electronics, gadgets, and tech products', 'sort_order' => 3],
            ['name' => 'Grocery & Supermarket', 'icon' => 'local_grocery_store', 'description' => 'Groceries, food items, and household essentials', 'sort_order' => 4],
            ['name' => 'Restaurant & Food', 'icon' => 'restaurant', 'description' => 'Restaurants, cafes, and food delivery', 'sort_order' => 5],
            ['name' => 'Health & Beauty', 'icon' => 'spa', 'description' => 'Beauty products, skincare, and wellness', 'sort_order' => 6],
            ['name' => 'Home & Furniture', 'icon' => 'chair', 'description' => 'Furniture, home decor, and interior items', 'sort_order' => 7],
            ['name' => 'Sports & Outdoors', 'icon' => 'sports_soccer', 'description' => 'Sports equipment and outdoor gear', 'sort_order' => 8],
            ['name' => 'Books & Stationery', 'icon' => 'menu_book', 'description' => 'Books, office supplies, and stationery', 'sort_order' => 9],
            ['name' => 'Automotive', 'icon' => 'directions_car', 'description' => 'Auto parts, accessories, and services', 'sort_order' => 10],
            ['name' => 'Baby & Kids', 'icon' => 'child_care', 'description' => 'Baby products, toys, and children\'s items', 'sort_order' => 11],
            ['name' => 'Jewelry & Watches', 'icon' => 'diamond', 'description' => 'Jewelry, watches, and luxury accessories', 'sort_order' => 12],
            ['name' => 'Pet Supplies', 'icon' => 'pets', 'description' => 'Pet food, accessories, and supplies', 'sort_order' => 13],
            ['name' => 'Art & Crafts', 'icon' => 'palette', 'description' => 'Art supplies, crafts, and creative materials', 'sort_order' => 14],
            ['name' => 'Services', 'icon' => 'build', 'description' => 'Professional services and repairs', 'sort_order' => 15],
            ['name' => 'Other', 'icon' => 'category', 'description' => 'Other business categories', 'sort_order' => 99],
        ];

        foreach ($categories as $category) {
            GeneralCategory::firstOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'icon' => $category['icon'],
                    'description' => $category['description'],
                    'sort_order' => $category['sort_order'],
                    'is_active' => true,
                ]
            );
        }
    }
}
