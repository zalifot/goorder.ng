<?php

namespace App\Imports;

use App\Models\ProductCategory;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ProductsImport implements ToCollection, WithHeadingRow
{
    protected string $shopPublicId;

    public function __construct(string $shopPublicId)
    {
        $this->shopPublicId = $shopPublicId;
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            // Skip empty rows
            if (empty($row['name'])) {
                continue;
            }

            // Find or create category
            $categoryName = $row['category'] ?? 'Uncategorized';
            $category = ProductCategory::firstOrCreate(
                ['name' => $categoryName],
                ['slug' => Str::slug($categoryName), 'is_active' => true]
            );

            // Check if product already exists by name in this shop
            $existingProduct = Product::where('name', $row['name'])
                ->where('shop_public_id', $this->shopPublicId)
                ->first();
            if ($existingProduct) {
                continue; // Skip duplicates within the same shop
            }

            Product::create([
                'name' => $row['name'],
                'slug' => Str::slug($row['name']),
                'category_id' => $category->id,
                'shop_public_id' => $this->shopPublicId,
                'image' => $row['image_url'] ?? null,
                'price' => floatval($row['price'] ?? 0),
                'discount_percentage' => floatval($row['discount_percentage'] ?? 0),
                'stock_quantity' => intval($row['stock_quantity'] ?? 0),
                'delivery_fee' => floatval($row['delivery_fee'] ?? 0),
                'delivery_time' => $row['delivery_time'] ?? '2-3 days',
                'payment_on_delivery' => filter_var($row['payment_on_delivery'] ?? true, FILTER_VALIDATE_BOOLEAN),
                'description' => $row['description'] ?? null,
            ]);
        }
    }
}
