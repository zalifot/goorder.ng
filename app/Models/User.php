<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'name',
        'email',
        'phone',
        'password',
        'role',
        'is_banned',
        'google_id',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Shops owned by this user.
     */
    public function shops(): HasMany
    {
        return $this->hasMany(Shop::class);
    }

    /**
     * Staff roles created by this user.
     */
    public function staffRoles(): HasMany
    {
        return $this->hasMany(StaffRole::class);
    }

    /**
     * Shops this user has staff access to.
     */
    public function staffShops(): BelongsToMany
    {
        return $this->belongsToMany(Shop::class, 'staff_shops')
            ->withPivot('role')
            ->withTimestamps();
    }

    /**
     * Check if user is staff of a specific shop.
     */
    public function isStaffOf(Shop $shop): bool
    {
        return $this->staffShops()->where('shop_id', $shop->id)->exists();
    }

    /**
     * Check if user is an admin (super_admin or admin role).
     */
    public function isAdmin(): bool
    {
        return in_array($this->role, ['super_admin', 'admin']);
    }

    /**
     * Check if user is a shop owner.
     */
    public function isShopOwner(): bool
    {
        return $this->shops()->exists();
    }

    /**
     * Check if user is staff (assigned to any shop).
     */
    public function isStaff(): bool
    {
        return $this->staffShops()->exists();
    }

    /**
     * Check if user has access to dashboard (admin, owner, or staff).
     */
    public function hasDashboardAccess(): bool
    {
        return $this->isAdmin() || $this->isShopOwner() || $this->isStaff();
    }

    /**
     * Get the appropriate redirect path after login.
     */
    public function getLoginRedirectPath(): string
    {
        if ($this->hasDashboardAccess()) {
            return '/dashboard';
        }
        return '/';
    }
}
