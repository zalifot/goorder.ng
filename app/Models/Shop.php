<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Shop extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'general_category_id',
        'name',
        'slug',
        'description',
        'address',
        'country_code',
        'state_code',
        'latitude',
        'longitude',
        'place_id',
        'formatted_address',
        'image',
        'public_id',
        'is_active',
        'is_under_construction',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_under_construction' => 'boolean',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    protected $appends = ['image_url'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($shop) {
            if (empty($shop->public_id)) {
                $shop->public_id = static::generateUniquePublicId();
            }
        });
    }

    public static function generateUniquePublicId(): string
    {
        do {
            $publicId = strtoupper(Str::random(8));
        } while (static::where('public_id', $publicId)->exists());

        return $publicId;
    }

    public function getImageUrlAttribute(): ?string
    {
        if (!$this->image) {
            return null;
        }

        // If it's already a full URL, return as-is
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }

        // Otherwise, it's a local file path
        return '/storage/' . $this->image;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function generalCategory(): BelongsTo
    {
        return $this->belongsTo(GeneralCategory::class, 'general_category_id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'shop_public_id', 'public_id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Staff members assigned to this shop.
     */
    public function staff(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'staff_shops')
            ->withPivot('role')
            ->withTimestamps();
    }
}
