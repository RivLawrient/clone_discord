<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\ApiAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::put('/login',[UserController::class, 'login']);

Route::middleware(ApiAuthMiddleware::class)->group(function() {
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::get('/user_picture/{filename}', [UserController::class, 'user_picture'])->where('filename', '.*');

