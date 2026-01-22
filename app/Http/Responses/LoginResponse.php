<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        $user = $request->user();
        $redirectPath = $user->getLoginRedirectPath();

        return $request->wantsJson()
            ? new JsonResponse(['two_factor' => false, 'redirect' => $redirectPath], 200)
            : redirect()->intended($redirectPath);
    }
}
