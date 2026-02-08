<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WhatsappIntegration extends Model
{
    protected $fillable = [
        'user_id',
        'waba_id',
        'business_id',
        'waba_name',
        'access_token',
        'phone_number_id',
        'display_phone_number',
        'verified_name',
        'quality_rating',
        'catalog_id',
        'catalog_name',
        'commerce_enabled',
        'last_synced_at',
        'is_active',
    ];

    protected $hidden = [
        'access_token',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'commerce_enabled' => 'boolean',
        'last_synced_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
