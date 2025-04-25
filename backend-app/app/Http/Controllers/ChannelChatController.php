<?php

namespace App\Http\Controllers;

use App\Events\ServerRoom;
use App\Http\Requests\ChannelChatCreateRequest;
use App\Http\Resources\ChannelChatResource;
use App\Models\ChannelChat;
use App\Models\RoomServer;
use Illuminate\Http\Request;

class ChannelChatController extends Controller
{
    public function add(ChannelChatCreateRequest $request, $room_server_id) {
        $data = $request->validated();

        $chat = ChannelChat::create([
            'room_server_id' => $room_server_id,
            'user_id' => $request->user,
            'message' => $data['message'],
        ]);

        $server_id = RoomServer::where('id', $room_server_id)->select('server_id')->first();

        broadcast(new ServerRoom($room_server_id, new ChannelChatResource($chat->fresh()) ))->toOthers();
// broadcast()
        return response()->json([
            'data' => new ChannelChatResource($chat->fresh()),
        ]);
    }

    public function get(Request $request, $room_server_id) {
        $chat = ChannelChat::where('room_server_id', $room_server_id)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'data' => ChannelChatResource::collection($chat),
        ]);
    }
}