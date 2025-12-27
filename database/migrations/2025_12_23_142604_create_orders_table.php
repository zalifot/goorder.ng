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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('shop_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null'); // For logged-in customers
            
            // Customer details
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->string('customer_email')->nullable();
            
            // Delivery details
            $table->enum('delivery_type', ['pickup', 'delivery'])->default('delivery');
            $table->foreignId('delivery_state_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('delivery_location_id')->nullable()->constrained()->onDelete('set null');
            $table->text('delivery_address')->nullable(); // Customer's full address
            $table->decimal('delivery_fee', 10, 2)->default(0);
            
            // Delivery slot
            $table->date('delivery_date')->nullable();
            $table->time('delivery_start_time')->nullable();
            $table->time('delivery_end_time')->nullable();
            
            // Order notes
            $table->text('notes')->nullable();
            
            // Pricing
            $table->decimal('subtotal', 10, 2);
            $table->decimal('total', 10, 2);
            
            // Status
            $table->enum('status', ['pending', 'confirmed', 'processing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'])->default('pending');
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
