<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use stdClass;
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

        if($token) {
            $authenticate = true;

            try {
                JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
    
            }catch (ExpiredException $e) {
                return response()->json([
                    "errors" => [
                        "message" => [
                            $e->getMessage()
                        ]
                    ]
                ])->setStatusCode(401);
            }
        }

        if ($authenticate) {
            return $next($request);
        } else {
            return response()->json([
                "errors" => [
                    "message" => [
                        "unauthorized"
                    ]
                ]
            ])->setStatusCode(401);
        }
    }
}
