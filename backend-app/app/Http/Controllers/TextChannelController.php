<?php

namespace App\Http\Controllers;

use App\Events\ServerRoom;
use App\Http\Requests\TextChannelRequest;
use App\Http\Resources\TextChannelResource;
use App\Models\ChatTextChannel;
use App\Models\Server;
use App\Models\TextChannel;
use Illuminate\Http\Request;

class TextChannelController extends Controller
{

    function add(Request $request, $idserver, TextChannelRequest $req) {
        $data = $req->validated();

        $server = Server::find($idserver);
        if(!$server) return response()->json([
            "error" => "Server Not Found"
        ])->setStatusCode(404); 

        $text = TextChannel::create([
            'server_id' => $server->id,
            'name' => $data['name']
        ]);

        broadcast(new ServerRoom($idserver));

        return response()->json([
            "data" => new TextChannelResource($text)
        ])->setStatusCode(200);
    }

    function rename(Request $request, $id, TextChannelRequest $req) {   
        $data = $req->validated();

        $text = TextChannel::find($id);
        if(!$text) return response()->json([
            "error" => "Channel Not Found"
        ])->setStatusCode(404); 
        $text->name = $data['name'];
        $text->save();
        broadcast(new ServerRoom($text->server_id));

        return response()->json([
            "data" => new TextChannelResource($text)
        ])->setStatusCode(200);
    }

    function delete($id) {
        $text = TextChannel::find($id);
        if(!$text) return response()->json([
            "error" => "Channel Not Found"
        ])->setStatusCode(404); 

        $chat = ChatTextChannel::where("text_channel_id", $text->id);
        $chat->delete();
        $text->delete();

        broadcast(new ServerRoom($text->server_id));
        return response()->json([
            "data" => $id
        ])->setStatusCode(200);
    }
}
