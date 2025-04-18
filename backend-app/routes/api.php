<?php

use App\Events\UserCurrent;
use App\Http\Controllers\MyServerController;
use App\Http\Controllers\RoomServerController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ApiAuthMiddleware;
use App\Http\Middleware\UpdateWS;
use Illuminate\Http\Request;
use App\Http\Controllers\FriendController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::put('/login',[UserController::class, 'login']);
Route::get('/list_user', [UserController::class, 'list_user']);

Route::middleware(ApiAuthMiddleware::class)->group(function() {
   
    Route::middleware(UpdateWS::class)->group(function() {
        Route::get('/user', [UserController::class, 'user']);
        Route::post('/logout', [UserController::class, 'logout']);
        
        Route::post('/server/new', [ServerController::class, 'create']);
        Route::get('/server/{id}', [ServerController::class, 'show'])->where('id', '.*');
        
        Route::get('/room_server/{server_id}', [RoomServerController::class, 'list'])->where('server_id', '.*');
        Route::post('/room_server', [RoomServerController::class, 'create']);
        
    });
    Route::get('/my_server', [MyServerController::class, 'list']);
    Route::get('/friend', [FriendController::class,'list_friend']);

    Route::post('/friend/accept/{friend_id}', [FriendController::class, 'accept_request']);
    Route::post('/friend/add/{friend_id}', [FriendController::class, 'add_friend']);
});


Route::get('/user_picture/{filename}', [UserController::class, 'user_picture'])->where('filename', '.*');
Route::get('/server_picture/{filename}', [ServerController::class, 'server_picture'])->where('filename', '.*');


Route::get('/test', function (Request $request) {
    event(new UserCurrent( "019644b6-5eba-7142-9606-09f81e7c1864"));
});