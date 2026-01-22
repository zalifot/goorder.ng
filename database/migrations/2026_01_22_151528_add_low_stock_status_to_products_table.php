<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Modify the stock_status ENUM to include 'low_stock'
        DB::statement("ALTER TABLE products MODIFY COLUMN stock_status ENUM('in_stock', 'low_stock', 'out_of_stock') NOT NULL DEFAULT 'out_of_stock'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to original ENUM
        DB::statement("ALTER TABLE products MODIFY COLUMN stock_status ENUM('in_stock', 'out_of_stock') NOT NULL DEFAULT 'out_of_stock'");
    }
};
