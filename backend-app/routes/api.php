<?php

use App\Events\TesSubscribedEvent;
use App\Http\Controllers\MyServerController;
use App\Http\Controllers\RoomServerController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ApiAuthMiddleware;
use Illuminate\Http\Request;
use App\Http\Controllers\FriendController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::put('/login',[UserController::class, 'login']);
Route::get('/list_user', [UserController::class, 'list_user']);

Route::middleware(ApiAuthMiddleware::class)->group(function() {
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', [UserController::class, 'logout']);

    Route::post('/server/new', [ServerController::class, 'create']);
    Route::get('/server/{id}', [ServerController::class, 'show'])->where('id', '.*');
    Route::get('/my_server', [MyServerController::class, 'list']);

    Route::get('/room_server/{server_id}', [RoomServerController::class, 'list'])->where('server_id', '.*');
    Route::post('/room_server', [RoomServerController::class, 'create']);

    Route::post('/friend/add/{friend_id}', [FriendController::class, 'add_friend']);
    Route::get('/friend', [FriendController::class,'list_friend']);
    // Route::get('/friend/request', [FriendController::class, 'list_request']);
    // Route::get('/friend/accept', [FriendController::class, 'list_accept']);
    Route::get('/friend/pending', [FriendController::class, 'list_pending']);
    Route::post('/friend/accept/{friend_id}', [FriendController::class, 'accept_request']);
});

Route::get('/user_picture/{filename}', [UserController::class, 'user_picture'])->where('filename', '.*');
Route::get('/server_picture/{filename}', [ServerController::class, 'server_picture'])->where('filename', '.*');


Route::get('/query/{id}', function(Request $request, $id) {
    broadcast(new TesSubscribedEvent($id));
    return "Event sent!";
});
