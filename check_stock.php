<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Product;

echo "Total products: " . Product::count() . "\n";
echo "In stock: " . Product::where('stock_status', 'in_stock')->count() . "\n";
echo "Low stock: " . Product::where('stock_status', 'low_stock')->count() . "\n";
echo "Out of stock: " . Product::where('stock_status', 'out_of_stock')->count() . "\n\n";

echo "Sample products:\n";
Product::take(10)->get(['id', 'name', 'stock_quantity', 'stock_status'])->each(function($p) {
    echo "ID: {$p->id}, Name: {$p->name}, Qty: {$p->stock_quantity}, Status: {$p->stock_status}\n";
});
