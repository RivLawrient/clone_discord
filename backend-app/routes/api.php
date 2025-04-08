<?php

use App\Events\MessageSent;
use App\Events\TestEvent;
use App\Http\Controllers\MyServerController;
use App\Http\Controllers\RoomServerController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\ApiAuthMiddleware;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::put('/login',[UserController::class, 'login']);
Route::get('/list_user', [UserController::class, 'list_user']);

Route::middleware(ApiAuthMiddleware::class)->group(function() {
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', [UserController::class, 'logout']);

    Route::post('/server/new', [ServerController::class, 'create']);
    Route::get('/my_server', [MyServerController::class, 'list']);

    Route::get('/room_server/{server_id}', [RoomServerController::class, 'list'])->where('server_id', '.*');
    Route::post('/room_server', [RoomServerController::class, 'create']);

});

Route::get('/user_picture/{filename}', [UserController::class, 'user_picture'])->where('filename', '.*');
Route::get('/server_picture/{filename}', [ServerController::class, 'server_picture'])->where('filename', '.*');


Route::get('/query', function(Request $request) {
    $data = User::select('id', 'token_exp')->where('token', $request->cookie('session'))->first();

    return $data;
});


Route::post('/send-message', function (Request $request) {
    $message = $request->input('message');
    event(new MessageSent($message));
    return response()->json(['status' => 'Message sent!']);
});