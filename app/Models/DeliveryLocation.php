<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeliveryLocation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'delivery_state_id',
        'shop_id',
        'name',
        'delivery_fee',
        'is_active',
    ];

    protected $casts = [
        'delivery_fee' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function state(): BelongsTo
    {
        return $this->belongsTo(DeliveryState::class, 'delivery_state_id');
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }
}
