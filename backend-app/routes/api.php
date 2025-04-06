<?php

use App\Http\Controllers\MyServerController;
use App\Http\Controllers\RoomServerController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExampleController;
use App\Http\Middleware\ApiAuthMiddleware;
use App\Models\Server;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::put('/login',[UserController::class, 'login']);

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


Route::get('/query', function() {
    $data = Server::select('id', 'name', 'picture')
    ->where('id', '01960b9b-d836-7286-a98a-3c8fee19d24c')
    ->where('name', 'lasdgi')->get();

    return $data;
});