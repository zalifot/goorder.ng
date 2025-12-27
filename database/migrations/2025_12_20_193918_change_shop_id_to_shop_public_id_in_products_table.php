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

        // Migrate existing data: convert shop_id to shop_public_id
        DB::statement('
            UPDATE products p
            INNER JOIN shops s ON p.shop_id = s.id
            SET p.shop_public_id = s.public_id
        ');

        // Drop the old shop_id column
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('shop_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add back the shop_id column
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('shop_id')->nullable()->after('category_id');
        });

        // Migrate data back: convert shop_public_id to shop_id
        DB::statement('
            UPDATE products p
            INNER JOIN shops s ON p.shop_public_id = s.public_id
            SET p.shop_id = s.id
        ');

        // Drop the shop_public_id column
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('shop_public_id');
        });
    }
};
