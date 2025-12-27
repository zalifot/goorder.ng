<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use App\Models\Shop;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->string('public_id', 12)->unique()->nullable()->after('id');
        });

        // Generate public_id for existing shops
        Shop::whereNull('public_id')->each(function ($shop) {
            $shop->update(['public_id' => $this->generateUniquePublicId()]);
        });

        // Make it non-nullable after populating
        Schema::table('shops', function (Blueprint $table) {
            $table->string('public_id', 12)->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('shops', function (Blueprint $table) {
            $table->dropColumn('public_id');
        });
    }

    private function generateUniquePublicId(): string
    {
        do {
            $publicId = strtoupper(Str::random(8));
        } while (Shop::where('public_id', $publicId)->exists());

        return $publicId;
    }
};
