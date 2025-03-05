<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'sanctum/csrf-cookie',
        'api/*'  // This will exclude all API routes from CSRF protection
    ];

    /**
     * Determine if the request has a valid CSRF token.
     */
    protected function tokensMatch($request)
    {
        $match = parent::tokensMatch($request);
        if (!$match) {
            \Log::error('CSRF token mismatch', [
                'token' => $request->header('X-CSRF-TOKEN'),
                'session_token' => $request->session()->token(),
                'url' => $request->url(),
                'method' => $request->method(),
            ]);
        }
        return $match;
    }
}