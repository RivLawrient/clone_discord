<?php

use App\Http\Controllers\MyServerController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExampleController;
use App\Http\Middleware\ApiAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::put('/login',[UserController::class, 'login']);

Route::middleware(ApiAuthMiddleware::class)->group(function() {
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', [UserController::class, 'logout']);

    Route::post('/server/new', [ServerController::class, 'create']);
    Route::get('/my_server', [MyServerController::class, 'list']);
});

Route::get('/user_picture/{filename}', [UserController::class, 'user_picture'])->where('filename', '.*');
Route::get('/server_picture/{filename}', [ServerController::class, 'server_picture'])->where('filename', '.*');
