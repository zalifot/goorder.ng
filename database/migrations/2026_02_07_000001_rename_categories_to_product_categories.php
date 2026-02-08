<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop the foreign key constraint first
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
        });

        // Rename the table
        Schema::rename('categories', 'product_categories');

        // Re-add the foreign key constraint with the new table name
        Schema::table('products', function (Blueprint $table) {
            $table->foreign('category_id')
                ->references('id')
                ->on('product_categories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the foreign key constraint first
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
        });

        // Rename the table back
        Schema::rename('product_categories', 'categories');

        // Re-add the foreign key constraint with the original table name
        Schema::table('products', function (Blueprint $table) {
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade');
        });
    }
};
