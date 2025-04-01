<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request): UserResource
    {
        $data = $request->validated();
    
        $user = User::create($data);
        $user->is_online = false;
        $user->password = Hash::make($data['password']);
        $user->save();

        return new UserResource($user);
    }
}
