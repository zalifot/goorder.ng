<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Product;

echo "Recalculating stock status for all products...\n\n";

$products = Product::all();

foreach ($products as $product) {
    $oldStatus = $product->stock_status;
    
    // Manually calculate and update stock status
    if ($product->stock_quantity <= 0) {
        $newStatus = 'out_of_stock';
    } elseif ($product->stock_quantity <= 10) {
        $newStatus = 'low_stock';
    } else {
        $newStatus = 'in_stock';
    }
    
    if ($oldStatus !== $newStatus) {
        $product->stock_status = $newStatus;
        $product->save();
        echo "Updated: {$product->name} (Qty: {$product->stock_quantity}) from '{$oldStatus}' to '{$newStatus}'\n";
    } else {
        echo "Unchanged: {$product->name} (Qty: {$product->stock_quantity}) - '{$oldStatus}'\n";
    }
}

echo "\n\nFinal counts:\n";
echo "In stock: " . Product::where('stock_status', 'in_stock')->count() . "\n";
echo "Low stock: " . Product::where('stock_status', 'low_stock')->count() . "\n";
echo "Out of stock: " . Product::where('stock_status', 'out_of_stock')->count() . "\n";
