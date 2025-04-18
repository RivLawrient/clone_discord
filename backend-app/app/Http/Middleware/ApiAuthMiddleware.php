<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie("session");
        $authenticate = false;
        $user = null;

        if($token) {
            $user = User::where('token', $token)->first();
            if ($user) {
                if ($user->token_exp > time()) {
                    $authenticate = true;
                }
            }
        }

        if ($authenticate) {
            // Menyimpan user ID ke dalam request
            $request->merge(['user' => $user->id]);
            return $next($request);
        } else {
            User::where('token', $token)->update(['token' => null, 'token_exp' => null]);
            return response()->json([
                "errors" => [
                    "message" => [
                        "unauthorized"
                    ]
                ]
            ])->setStatusCode(401)
            ->withCookie(cookie('session', '', 0));
        }
    }
}
