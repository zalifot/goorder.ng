<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (! $request->user()) {
            return redirect('/');
        }

        if (in_array($request->user()->role, $roles)) {
            return $next($request);
        }

        if ($request->user()->role === 'user') {
            return redirect('/customer/dashboard');
        }

        return redirect('/');
    }
}
