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
    public function register(UserRegisterRequest $request): JsonResponse {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data)->fresh();
        $user->token = Str::uuid();
        $user->token_exp = time() + (60 * 60) * 24; 
        $user->picture = '/api/user_picture/default_picture.png';
        $user->save();

        return response()
        ->json([
            'data' => new UserResource($user)
        ])
        ->withCookie(cookie('session', $user->token, 60 * 24))
        ->setStatusCode(201);
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
        $user->token_exp = time() + (60 * 60) * 24;
        $user->save();
        
        return response()->json([
            'data' => new UserResource($user)
        ])->withCookie(cookie('session', $user->token, 60 * 24));
    }

    public function logout(Request $request): JsonResponse {
        return response()->json([
            'message' => 'Logged out successfully'
        ])->setStatusCode(200)->withCookie(cookie('session', '', 0));
    }

    public function user(Request $request): UserResource {
        $token = $request->cookie('session');

        $user = User::where('token', $token)->first();
        $user->picture = request()->getSchemeAndHttpHost() . $user->picture;
        return new UserResource($user);
    }

    public function user_picture($filename) {
        $path = storage_path('app/public/' . $filename);
        
        if (!file_exists($path)) {
            return response()->json([
                'errors' => [
                    'message' => ['File not found']
                ]
            ])->setStatusCode(404);
        }
        
        return response()->file($path);
    }
    
}
