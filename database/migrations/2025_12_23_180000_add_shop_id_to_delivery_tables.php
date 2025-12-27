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
        Schema::table('delivery_states', function (Blueprint $table) {
            $table->foreignId('shop_id')->nullable()->after('user_id')->constrained()->cascadeOnDelete();
        });

        Schema::table('delivery_locations', function (Blueprint $table) {
            $table->foreignId('shop_id')->nullable()->after('delivery_state_id')->constrained()->cascadeOnDelete();
        });

        Schema::table('delivery_slots', function (Blueprint $table) {
            $table->foreignId('shop_id')->nullable()->after('user_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('delivery_states', function (Blueprint $table) {
            $table->dropForeign(['shop_id']);
            $table->dropColumn('shop_id');
        });

        Schema::table('delivery_locations', function (Blueprint $table) {
            $table->dropForeign(['shop_id']);
            $table->dropColumn('shop_id');
        });

        Schema::table('delivery_slots', function (Blueprint $table) {
            $table->dropForeign(['shop_id']);
            $table->dropColumn('shop_id');
        });
    }
};
