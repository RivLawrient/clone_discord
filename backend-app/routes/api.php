<?php

use App\Events\UserCurrent;
use App\Http\Controllers\ChannelChatController;
use App\Http\Controllers\ChatTextChannelController;
use App\Http\Controllers\MyServerController;
use App\Http\Controllers\RoomServerController;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\TextChannelController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoiceChannelController;
use App\Http\Middleware\ApiAuthMiddleware;
use App\Http\Middleware\UpdateWS;
use App\Models\ChannelChat;
use Illuminate\Http\Request;
use App\Http\Controllers\FriendController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UserController::class, 'register']);
Route::put('/login',[UserController::class, 'login']);

Route::middleware(ApiAuthMiddleware::class)->group(function () {
    Route::middleware(UpdateWS::class)->group(function() {
        Route::get('/user', [UserController::class, 'user']);
    });
        Route::post("/user/online", [UserController::class, "update_online"]);
        Route::post("/user/offline", [UserController::class, "update_offline"]);
        Route::post('/logout', [UserController::class, 'logout']);

        Route::post('/friend/add/{username}', [FriendController::class, "add_friend"])->where("username", ".*");
        Route::get("/friend", [FriendController::class, "list_friend"]);
        Route::post("/friend/accept/{username}", [FriendController::class, "accept_request"])->where("username", ".*");
        Route::post("/friend/decline/{username}",[FriendController::class, "decline_request"])->where("username", ".*");
        Route::post("/friend/cancel/{username}",[FriendController::class, "cancel_request"])->where("username", ".*");
        Route::delete("/friend/{username}", [FriendController::class, "remove"])->where("username",".*");
        Route::get("/friend/{username}", [FriendController::class, "show"])->where("username",".*");

        Route::post("/server", [ServerController::class, "create"]);
        Route::get('/server_picture/{filename}', [ServerController::class, 'server_picture'])->where('filename', '.*');
        Route::get("/server/{id}", [ServerController::class, "find_by_id"]);
        Route::get("/server/invite/{invite_code}", [ServerController::class, "find_by_invite_code"]);
        Route::post("/my_server/{invite_code}", [ServerController::class, "join"]);
        Route::get("/my_server", [ServerController::class, "list_my"]);
        Route::delete("/my_server/leave/{id}", [ServerController::class, "leave"]);
        Route::delete("/my_server/delete/{id}", [ServerController::class, "delete"]);
        Route::put("/server/{id}", [ServerController::class, "rename"]);

        Route::post("/text_channel/{idserver}",[TextChannelController::class, "add"]);
        Route::put("/text_channel/{id}",[TextChannelController::class, "rename"]);
        Route::delete("/text_channel/{id}",[TextChannelController::class, "delete"]);

        Route::post("/voice_channel/{idserver}",[VoiceChannelController::class, "add"]);
        Route::put("/voice_channel/{id}",[VoiceChannelController::class, "rename"]);
        Route::delete("/voice_channel/{id}",[VoiceChannelController::class, "delete"]);

        Route::post("/text_channel/chat/{idchannel}", [ChatTextChannelController::class, "add"]);

});

Route::get('/user_picture/{filename}', [UserController::class, 'user_picture'])->where('filename', '.*');

// Route::middleware(ApiAuthMiddleware::class)->group(function() {

//     Route::middleware(UpdateWS::class)->group(function() {
//         Route::get('/user', [UserController::class, 'user']);
//         Route::post('/logout', [UserController::class, 'logout']);

//         Route::post('/server/new', [ServerController::class, 'create']);
//         Route::get('/server/{id}', [ServerController::class, 'show'])->where('id', '.*');

//         Route::get('/room_server/{server_id}', [RoomServerController::class, 'list'])->where('server_id', '.*');

//     });
//     Route::post('/room_server', [RoomServerController::class, 'create']);
//     Route::get('/my_server', [MyServerController::class, 'list']);
//     Route::get('/friend', [FriendController::class,'list_friend']);

//     Route::post('/friend/accept/{friend_id}', [FriendController::class, 'accept_request'])->where('friend_id', '.*');
//     Route::post('/friend/add/{friend_username}', [FriendController::class, 'ajkjkdd_friend'])->where('friend_username', '.*');

//     Route::put('/my_server/{id}', [MyServerController::class, 'join_server'])->where("id", '.*');


//     Route::post('/channel_chat/{room_server_id}', [ChannelChatController::class, 'add'])->where('room_server_id', '.*');
//     Route::get('/channel_chat/{room_server_id}', [ChannelChatController::class, 'get'])->where('room_server_id', '.*');
// });


// Route::get('/server_picture/{filename}', [ServerController::class, 'server_picture'])->where('filename', '.*');

// Route::get('/find_server/{name}', [ServerController::class, 'find_by_name'])->where('name', '.*');
// Route::get('/find_server', [ServerController::class, 'sort_by_name']);
