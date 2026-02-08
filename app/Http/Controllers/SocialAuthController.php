<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    /**
     * Redirect to Google for customer authentication
     */
    public function redirectToGoogle(Request $request)
    {
        // Store the intended role in session
        $role = $request->query('role', 'user');
        session(['oauth_role' => $role]);
        
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google callback
     */
    public function handleGoogleCallback()
    {
        // Get the intended role from session before any potential redirect
        $intendedRole = session('oauth_role', 'user');
        session()->forget('oauth_role');

        $loginRoute = in_array($intendedRole, ['admin', 'super_admin', 'shop_owner'])
            ? '/vendor-login'
            : '/customer-login';

        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return redirect($loginRoute)->withErrors(['error' => 'Failed to authenticate with Google. Please try again.']);
        }

        // Check if user exists by google_id or email
        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $googleUser->getEmail())
            ->first();

        if ($user) {
            // Update google_id if logging in with existing email account
            if (!$user->google_id) {
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]);
            }
        } else {
            // Generate a unique username from their Google name or email
            $baseName = Str::slug(explode('@', $googleUser->getEmail())[0], '_');
            $username = $baseName;
            $counter = 1;
            while (User::where('username', $username)->exists()) {
                $username = $baseName . '_' . $counter++;
            }

            // Create new user
            $user = User::create([
                'username'         => $username,
                'email'            => $googleUser->getEmail(),
                'google_id'        => $googleUser->getId(),
                'avatar'           => $googleUser->getAvatar(),
                'role'             => $intendedRole,
                'password'         => Hash::make(Str::random(32)),
                'email_verified_at' => now(),
            ]);
        }

        // Check if user is banned
        if ($user->is_banned) {
            return redirect($loginRoute)->withErrors(['error' => 'Your account has been suspended. Please contact support.']);
        }

        Auth::login($user, true);

        // Redirect based on role
        if (in_array($user->role, ['admin', 'super_admin', 'shop_owner'])) {
            return redirect('/vendor/dashboard');
        }

        return redirect('/customer/dashboard');
    }
}
