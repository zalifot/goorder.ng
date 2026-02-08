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
        Schema::table('shops', function (Blueprint $table) {
            // General category relationship
            $table->foreignId('general_category_id')
                ->nullable()
                ->after('user_id')
                ->constrained('general_categories')
                ->nullOnDelete();

            // Country and State codes (from country-state-city library)
            $table->string('country_code', 2)->nullable()->after('address');
            $table->string('state_code', 10)->nullable()->after('country_code');

            // Google Places fields
            $table->decimal('latitude', 10, 8)->nullable()->after('state_code');
            $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
            $table->string('place_id')->nullable()->after('longitude');
            $table->text('formatted_address')->nullable()->after('place_id');

            // Indexes for efficient querying
            $table->index(['country_code', 'state_code']);
            $table->index(['latitude', 'longitude']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shops', function (Blueprint $table) {
            // Drop indexes first
            $table->dropIndex(['country_code', 'state_code']);
            $table->dropIndex(['latitude', 'longitude']);

            // Drop foreign key
            $table->dropForeign(['general_category_id']);

            // Drop columns
            $table->dropColumn([
                'general_category_id',
                'country_code',
                'state_code',
                'latitude',
                'longitude',
                'place_id',
                'formatted_address',
            ]);
        });
    }
};
