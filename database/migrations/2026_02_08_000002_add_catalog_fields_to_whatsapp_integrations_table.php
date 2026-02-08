<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('whatsapp_integrations', function (Blueprint $table) {
            $table->string('business_id')->nullable()->after('waba_id');
            $table->string('catalog_id')->nullable()->after('phone_number_id');
            $table->string('catalog_name')->nullable()->after('catalog_id');
            $table->boolean('commerce_enabled')->default(false)->after('catalog_name');
            $table->timestamp('last_synced_at')->nullable()->after('commerce_enabled');
        });
    }

    public function down(): void
    {
        Schema::table('whatsapp_integrations', function (Blueprint $table) {
            $table->dropColumn(['business_id', 'catalog_id', 'catalog_name', 'commerce_enabled', 'last_synced_at']);
        });
    }
};
