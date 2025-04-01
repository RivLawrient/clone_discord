<?php

use App\Http\Controllers\UserController;
use App\Http\Middleware\ApiAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::get('/login', function () {
    return "login";
});

Route::middleware(ApiAuthMiddleware::class)->group(function() {
    Route::get('/user', [UserController::class, 'user']);
});