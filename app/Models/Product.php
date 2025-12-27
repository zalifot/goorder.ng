<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'category_id',
        'shop_public_id',
        'image',
        'price',
        'discount_percentage',
        'stock_quantity',
        'stock_status',
        'delivery_fee',
        'delivery_time',
        'payment_on_delivery',
        'description',
        'views',
        'is_active',
    ];

    public function shop(): BelongsTo
    {
        return $this->belongsTo(Shop::class, 'shop_public_id', 'public_id');
    }

    public function incrementViews(): void
    {
        $this->increment('views');
    }

    protected $casts = [
        'price' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
        'payment_on_delivery' => 'boolean',
        'is_active' => 'boolean',
    ];

    protected $appends = ['sale_price', 'image_url'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
            $product->stock_status = self::calculateStockStatus($product->stock_quantity);
        });

        static::updating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
            $product->stock_status = self::calculateStockStatus($product->stock_quantity);
        });
    }

    /**
     * Calculate stock status based on quantity.
     */
    protected static function calculateStockStatus(int $quantity): string
    {
        if ($quantity <= 0) {
            return 'out_of_stock';
        }
        if ($quantity <= 10) {
            return 'low_stock';
        }
        return 'in_stock';
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function getSalePriceAttribute(): float
    {
        if ($this->discount_percentage > 0) {
            return round($this->price * (1 - $this->discount_percentage / 100), 2);
        }
        return $this->price;
    }

    public function getImageUrlAttribute(): string
    {
        if (!$this->image) {
            return '';
        }
        
        // If it's already a URL (external image), return as-is
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }
        
        // Otherwise, it's a local file
        return asset('storage/' . $this->image);
    }
}
