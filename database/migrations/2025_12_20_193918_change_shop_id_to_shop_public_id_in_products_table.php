<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, add the new column
        Schema::table('products', function (Blueprint $table) {
            $table->string('shop_public_id', 12)->nullable()->after('category_id');
        });

        // Migrate existing data: convert shop_id to shop_public_id (cross-database compatible)
        $products = DB::table('products')->whereNotNull('shop_id')->get();
        foreach ($products as $product) {
            $shop = DB::table('shops')->where('id', $product->shop_id)->first();
            if ($shop) {
                DB::table('products')
                    ->where('id', $product->id)
                    ->update(['shop_public_id' => $shop->public_id]);
            }
        }

        // Drop foreign key first (if exists), then drop the column
        Schema::table('products', function (Blueprint $table) {
            // SQLite doesn't support dropping foreign keys, so we check the driver
            if (DB::getDriverName() !== 'sqlite') {
                $table->dropForeign(['shop_id']);
            }
        });

        // For SQLite, we need to disable foreign key checks
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys=off');
        }
        
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('shop_id');
        });

        if (DB::getDriverName() === 'sqlite') {
            DB::statement('PRAGMA foreign_keys=on');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add back the shop_id column
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('shop_id')->nullable()->after('category_id');
        });

        // Migrate data back: convert shop_public_id to shop_id (cross-database compatible)
        $products = DB::table('products')->whereNotNull('shop_public_id')->get();
        foreach ($products as $product) {
            $shop = DB::table('shops')->where('public_id', $product->shop_public_id)->first();
            if ($shop) {
                DB::table('products')
                    ->where('id', $product->id)
                    ->update(['shop_id' => $shop->id]);
            }
        }

        // Add foreign key back (only for non-SQLite)
        if (DB::getDriverName() !== 'sqlite') {
            Schema::table('products', function (Blueprint $table) {
                $table->foreign('shop_id')->references('id')->on('shops')->onDelete('set null');
            });
        }

        // Drop the shop_public_id column
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('shop_public_id');
        });
    }
};
