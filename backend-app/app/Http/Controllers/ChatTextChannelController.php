<?php

namespace App\Http\Controllers;

use App\Events\ServerRoom;
use App\Http\Requests\ChatTextChannelRequest;
use App\Http\Resources\ChatTextChannelResource;
use App\Models\ChatTextChannel;
use App\Models\TextChannel;
use Illuminate\Http\Request;

class ChatTextChannelController extends Controller
{
    function add(Request $request, $idchannel, ChatTextChannelRequest $req) {
        $data = $req->validated();

        $check = TextChannel::find($idchannel);
        if(!$check) return response()->json([
            "error" => "Channel not found"
        ])->setStatusCode(404);

        $chat = ChatTextChannel::create([
            'text_channel_id' => $check->id,
            'user_id' => $request->user,
            'message' => $data['message']
        ]);

        broadcast(new ServerRoom($check->server_id));

        return response()->json([
            'data' => new ChatTextChannelResource($chat)
        ])->setStatusCode(200);
    }
}
