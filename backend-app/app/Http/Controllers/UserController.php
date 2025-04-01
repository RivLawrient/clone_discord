<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Str;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request): JsonResponse 
    {
        $data = $request->validated();

    
        $user = User::create($data);
        $user->is_online = false;
        $user->password = Hash::make($data['password']);
        $user->token = Str::uuid();
        $user->token_exp = time() + 20;
        $user->save();
        return response()->json([
            'user' => new UserResource($user)
        ])->withCookie(cookie('session', $user->token, 60 * 24))->setStatusCode(201);
    }

    public function login(UserLoginRequest $request): JsonResponse {
        $data = $request->validated();
        
        $user = User::where('email', $data['email'])->first();
        if(!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'errors' => [
                    'message' => ['Invalid credentials']
                ]
            ])->setStatusCode(401);
        }

        $user->token = Str::uuid();
        $user->token_exp = time() + 20;
        $user->save();
        
        return response()->json([
            'user' => new UserResource($user)
        ])->withCookie(cookie('session', $user->token, 60 * 24));
    }

    public function user(Request $request): UserResource {
        
        $token = $request->cookie('session');

        $user = User::where('token', $token)->first();
        return new UserResource($user);
    }
}
