<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class StaffRole extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'permissions',
    ];

    protected $casts = [
        'permissions' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($role) {
            if (empty($role->slug)) {
                $role->slug = Str::slug($role->name) . '-' . Str::random(4);
            }
        });
    }

    /**
     * The user (admin) who created this role.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
