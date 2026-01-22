<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['error' => 'Failed to authenticate with Google. Please try again.']);
        }

        // Get the intended role from session
        $intendedRole = session('oauth_role', 'user');
        session()->forget('oauth_role');

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
            // Create new user
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'role' => $intendedRole,
                'email_verified_at' => now(),
            ]);
        }

        // Check if user is banned
        if ($user->is_banned) {
            return redirect('/login')->withErrors(['error' => 'Your account has been suspended. Please contact support.']);
        }

        Auth::login($user, true);

        // Redirect based on role
        if (in_array($user->role, ['admin', 'super_admin', 'shop_owner'])) {
            return redirect('/dashboard');
        }

        return redirect('/user-dashboard');
    }
}
