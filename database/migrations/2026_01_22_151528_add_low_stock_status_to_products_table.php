<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::getDriverName() === 'sqlite') {
            // SQLite uses CHECK constraints instead of ENUM; the column already accepts string values
            return;
        }

        DB::statement("ALTER TABLE products MODIFY COLUMN stock_status ENUM('in_stock', 'low_stock', 'out_of_stock') NOT NULL DEFAULT 'out_of_stock'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'sqlite') {
            return;
        }

        DB::statement("ALTER TABLE products MODIFY COLUMN stock_status ENUM('in_stock', 'out_of_stock') NOT NULL DEFAULT 'out_of_stock'");
    }
};
