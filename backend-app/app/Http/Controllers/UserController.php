<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserCollection;
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

        $user = User::create($data);
        $user->token = Str::uuid();
        $user->token_exp = time() + (60 * 60) * 24; 
        $user->picture = '/api/user_picture/default_picture.png';
        $user->last_active = now();
        $user->save();

        return response()
        ->json([
            'data' => new UserResource($user->fresh())
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
                    'message' => ['Email or Password is incorrect']
                ]
            ])->setStatusCode(401);
        }
        
        $user->token = Str::uuid();
        $user->token_exp = time() + (60 * 60) * 24;
        $user->save();
        
        return response()
        ->json([
            'data' => new UserResource($user)
        ])
        ->withCookie(cookie('session', $user->token, 60 * 24))
        ->setStatusCode(200);
    }

    public function logout(Request $request): JsonResponse {
        return response()
        ->json([
            'message' => 'Logged out successfully'
        ])
        ->setStatusCode(200)
        ->withCookie(cookie('session', '', 0));
    }

    public function user(Request $request): UserResource {
        $user = User::where('token', $request->cookie('session'))->first();
        $user->picture = request()->getSchemeAndHttpHost() . $user->picture;
        return new UserResource($user);
    }

    public function user_picture($filename) {
        $path = storage_path('app/public/' . $filename);
        if (!file_exists($path)) {
            return response()->json([
                'errors' => [
                    'message' => 'File not found'
                ]
            ])->setStatusCode(404);
        }
        
        return response()->file($path);
    }

    public function list_user() {
        $user = User::all();


        return new UserCollection($user);
    }

}
