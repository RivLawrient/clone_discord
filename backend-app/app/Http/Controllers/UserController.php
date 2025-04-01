<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Client\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request): JsonResponse 
    {
        $data = $request->validated();

    
        $user = User::create($data);
        $user->is_online = false;
        $user->password = Hash::make($data['password']);
        $user->save();
        
        $token = JWT::encode([
            'email' => $user->email,
            'exp' => time() + (60 * 24)
        ], env('JWT_SECRET'), 'HS256'); 

        return response()->json([
            'user' => new UserResource($user)
        ])->withCookie(cookie('session', $token, 60 * 24));
    }

    public function user(Request $request): UserResource {
        
        $token = $request->cookie('session');
        $decoded = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

        $user = User::where('email', $decoded->email)->first();
 
        return new UserResource($user);
    }
}
