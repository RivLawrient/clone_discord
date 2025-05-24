<?php

namespace App\Http\Controllers;

use App\Events\ServerRoom;
use App\Http\Requests\ServerCreateRequest;
use App\Http\Requests\ServerRenameRequest;
use App\Http\Resources\FriendResource;
use App\Http\Resources\RoomServerResource;
use App\Http\Resources\ServerResource;
use App\Models\ChatTextChannel;
use App\Models\MyServer;
use App\Models\RoomServer;
use App\Models\Server;
use App\Models\TextChannel;
use App\Models\VoiceChannel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Str;


class ServerController extends Controller
{

    public function create(ServerCreateRequest $request): JsonResponse {
        $data = $request->validated();

        $server = Server::create($data)->fresh();
        if($request->hasFile('picture')) {
            $file = $request->file('picture');
            $extension = $file->getClientOriginalExtension();
            $filename = Str::uuid() . '.' . $extension;
            $file->storePubliclyAs('servers', $filename, 'public');
            
            $server->picture = '/api/server_picture/' . $filename;
            $server->save();
        }
        $server->invite_code = $server->generateUniqueInviteCode();
        $server->save();

        $my_server = MyServer::create([
            "user_id" => $request->user,
            "server_id" => $server->id
        ]);
        $my_server->is_owner = true;
        $my_server->save();

        $text = TextChannel::create([
            'server_id' => $server->id,
            'name' => 'General'
        ]);



        VoiceChannel::create([
            'server_id' => $server->id,
            'name' => 'General'
        ]);

        return response()->json([
            'data' => new ServerResource($server),
            // 'fresh' => $server
        ])->setStatusCode(200);
    }

    function find_by_id(Request $request, $id) {
        $data = Server::find($id); 
        $my = MyServer::where("server_id", $data->id);

        return response()->json([
            "data"=>$my->get(),
        ]);
    }

    function find_by_invite_code(Request $request, $invite_code) {
        $data = Server::where("invite_code", $invite_code); 
        if(!$data) return response()->json([
                "error" => "invite code not found"
            ])->setStatusCode(404); 

        return response()->json([
            "data"=> new ServerResource($data->first()),
        ]);
    }

    function join(Request $request, $invite_code) {
        $data = Server::where("invite_code", $invite_code)->first();
        if(!$data){
            return response()->json([
                "error" => "invite code not found"
            ])->setStatusCode(404); 
        }
        $check = MyServer::where("user_id", $request->user)->where("server_id", $data->id)->exists();
        if($check){
            return response()->json([
                "error" => "Already join"
            ])->setStatusCode(404); 
        }

    
        MyServer::create([
            'user_id' => $request->user,
            'server_id' => $data->id
        ]);

        broadcast(new ServerRoom($data->id));


        return response()->json([
            "data" => new ServerResource($data)
        ])->setStatusCode(200);
    }

    function list_my(Request $request) {
        $my = MyServer::where("user_id", $request->user)->get()->pluck("server_id");
        $data = Server::find($my); 

        return response()->json([
            "data" => ServerResource::collection($data),
        ])->setStatusCode(200);
    }
    

    function leave(Request $request, $id) {
        $exist = MyServer::where("user_id", $request->user)->where("server_id", $id);
        if(!$exist->exists()) return response()->json([
            "error" => "Not found"
        ])->setStatusCode(404); 
       
        if($exist->first()->is_owner) return response()->json([
            "error" => "Owner cannot Leave"
        ])->setStatusCode(400);

        broadcast(new ServerRoom($id));

        $exist->delete();

        return response()->json([
                "data" => $id
        ])->setStatusCode(200);
    }

    function delete(Request $request, $id) {
        $exist = MyServer::where("user_id", $request->user)->where("server_id", $id);
        if(!$exist->exists()) return response()->json([
            "error" => "Not found"
        ])->setStatusCode(404); 
       
        if(!$exist->first()->is_owner) return response()->json([
            "error" => "Member cannot Delete"
        ])->setStatusCode(400);
        
        $server = $server = Server::with([
            'myserver',
            'textchannel.chattextchannel',
            'voicechannel',
        ])->find($id);
        foreach ($server->textchannel as $textChannel) {
            $textChannel->chattextchannel()->delete();
        }
        $server->textchannel()->delete();
        $server->voicechannel()->delete();
        $server->myserver()->delete();
        $server->delete();

        broadcast(new ServerRoom($id));

        return response()->json([
                "data" => $id
        ])->setStatusCode(200);
    }

    function rename(Request $request, $id, ServerRenameRequest $req) {
        $data = $req->validated();

        $server = Server::find($id);
        if(!$server) return response()->json([
            "error" => "Not found"
        ])->setStatusCode(404);  

        $server->name = $data['name'];
        $server->save();
        
        broadcast(new ServerRoom($id));

        return response()->json([
            "data" => new ServerResource($server)
        ])->setStatusCode(202); 
    }

    function change_icon(Request $request){
        
    }


    public function server_picture($filename) {
        $path = storage_path('app/public/servers/' . $filename);
        
        if (!file_exists($path)) {
            return response()->json([
                'errors' => [
                    'message' => ['File not found']
                ]
            ])->setStatusCode(404);
        }
        
        return response()->file($path);
    }
   
    // public function show($id) {
    //     $server = Server::with(['roomServers'])->find($id);
    //     if (!$server) {
    //         return response()->json([
    //             'errors' => [
    //                 'message' => ['Server not found']
    //             ]
    //         ])->setStatusCode(404);
    //     }
        
    //     return new ServerResource($server);
    // }

    // public function find_by_name($name) {
    //     $server = Server::where('name', 'like', '%' . $name . '%')->with(['roomServers'])->get();
    //     if ($server->isEmpty()) {
    //         return response()->json([
    //             'errors' => [
    //                 'message' => ['Server not found']
    //             ]
    //         ])->setStatusCode(404);
    //     }
        
    //     return [
    //         'data' => ServerResource::collection($server),
    //     ];
    // }

    // public function sort_by_name() {
    //     $servers = Server::orderBy('name')->limit(10)->get();
    //     if ($servers->isEmpty()) {
    //         return response()->json([
    //             'errors' => [
    //                 'message' => ['No servers found']
    //             ]
    //         ])->setStatusCode(404);
    //     }
        
    //     return [
    //         'data' => ServerResource::collection($servers),
    //     ];
    // }
}