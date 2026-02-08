<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('whatsapp_integrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('waba_id')->unique();
            $table->string('waba_name')->nullable();
            $table->text('access_token'); // Encrypted
            $table->string('phone_number_id');
            $table->string('display_phone_number');
            $table->string('verified_name')->nullable();
            $table->string('quality_rating')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('whatsapp_integrations');
    }
};
