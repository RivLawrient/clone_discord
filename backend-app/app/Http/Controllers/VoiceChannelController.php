<?php

namespace App\Http\Controllers;

use App\Events\ServerRoom;
use App\Http\Requests\VoiceChannelRequest;
use App\Http\Resources\VoiceChannelResource;
use App\Models\Server;
use App\Models\VoiceChannel;
use Illuminate\Http\Request;

class VoiceChannelController extends Controller
{
    function add(Request $request, $idserver, VoiceChannelRequest $req) {
        $data = $req->validated();

        $server = Server::find($idserver);
        if(!$server) return response()->json([
            "error" => "Server Not Found"
        ])->setStatusCode(404); 

        $text = VoiceChannel::create([
            'server_id' => $server->id,
            'name' => $data['name']
        ]);

        broadcast(new ServerRoom($idserver));
        return response()->json([
            "data" => new VoiceChannelResource($text)
        ])->setStatusCode(200);
    }

    function rename(Request $request, $id, VoiceChannelRequest $req) {   
        $data = $req->validated();

        $text = VoiceChannel::find($id);
        if(!$text) return response()->json([
            "error" => "Channel Not Found"
        ])->setStatusCode(404); 
        $text->name = $data['name'];
        $text->save();
        broadcast(new ServerRoom($text->server_id));

        return response()->json([
            "data" => new VoiceChannelResource($text)
        ])->setStatusCode(200);
    }

    function delete($id) {
        $text = VoiceChannel::find($id);
        if(!$text) return response()->json([
            "error" => "Channel Not Found"
        ])->setStatusCode(404); 
        $text->delete();
        broadcast(new ServerRoom($text->server_id));

        return response()->json([
            "data" => $id
        ])->setStatusCode(200);
    }
}
