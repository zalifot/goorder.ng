<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Only add column if it doesn't exist
        if (!Schema::hasColumn('shops', 'public_id')) {
            Schema::table('shops', function (Blueprint $table) {
                $table->string('public_id', 12)->unique()->nullable()->after('id');
            });
        }

        // Generate public_id for existing shops using raw DB query (avoids Eloquent model issues)
        $shops = DB::table('shops')->whereNull('public_id')->get();
        foreach ($shops as $shop) {
            DB::table('shops')
                ->where('id', $shop->id)
                ->update(['public_id' => $this->generateUniquePublicId()]);
        }

        // Make it non-nullable after populating (only if column exists)
        if (Schema::hasColumn('shops', 'public_id')) {
            Schema::table('shops', function (Blueprint $table) {
                $table->string('public_id', 12)->nullable(false)->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('shops', 'public_id')) {
            Schema::table('shops', function (Blueprint $table) {
                $table->dropColumn('public_id');
            });
        }
    }

    private function generateUniquePublicId(): string
    {
        do {
            $publicId = strtoupper(Str::random(8));
        } while (DB::table('shops')->where('public_id', $publicId)->exists());

        return $publicId;
    }
};
