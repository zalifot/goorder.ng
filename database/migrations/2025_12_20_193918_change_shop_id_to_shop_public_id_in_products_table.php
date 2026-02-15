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
        // First, add the new column if it doesn't exist
        if (! Schema::hasColumn('products', 'shop_public_id')) {
            Schema::table('products', function (Blueprint $table) {
                $table->string('shop_public_id', 12)->nullable()->after('category_id');
            });
        }

        // Migrate existing data: convert shop_id to shop_public_id (cross-database compatible)
        if (Schema::hasColumn('products', 'shop_id')) {
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
                    try {
                        $table->dropForeign(['shop_id']);
                    } catch (\Exception $e) {
                        // Foreign key might not exist
                    }
                }
            });

            if (DB::getDriverName() === 'sqlite') {
                // SQLite can't drop columns with FK references in the schema.
                // Rebuild the table without the shop_id column.
                DB::statement('PRAGMA foreign_keys=off');

                $columns = Schema::getColumnListing('products');
                $columns = array_filter($columns, fn ($col) => $col !== 'shop_id');
                $columnList = implode(', ', array_map(fn ($c) => '"'.$c.'"', $columns));

                DB::statement('CREATE TABLE "products_new" AS SELECT '.$columnList.' FROM "products"');
                DB::statement('DROP TABLE "products"');
                DB::statement('ALTER TABLE "products_new" RENAME TO "products"');

                DB::statement('PRAGMA foreign_keys=on');
            } else {
                Schema::table('products', function (Blueprint $table) {
                    $table->dropColumn('shop_id');
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add back the shop_id column if it doesn't exist
        if (! Schema::hasColumn('products', 'shop_id')) {
            Schema::table('products', function (Blueprint $table) {
                $table->unsignedBigInteger('shop_id')->nullable()->after('category_id');
            });
        }

        // Migrate data back: convert shop_public_id to shop_id (cross-database compatible)
        if (Schema::hasColumn('products', 'shop_public_id')) {
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
    }
};
