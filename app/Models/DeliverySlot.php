<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeliverySlot extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'shop_id',
        'day_of_week',
        'start_time',
        'end_time',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'formatted_start_time',
        'formatted_end_time',
        'day_name',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class);
    }

    /**
     * Format time for display (e.g., "9:00 AM")
     */
    public function getFormattedStartTimeAttribute(): string
    {
        return date('g:i A', strtotime($this->start_time));
    }

    public function getFormattedEndTimeAttribute(): string
    {
        return date('g:i A', strtotime($this->end_time));
    }

    /**
     * Get day name capitalized
     */
    public function getDayNameAttribute(): string
    {
        return ucfirst($this->day_of_week);
    }
}
