<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServerResource;
use App\Models\MyServer;
use App\Http\Resources\ServerCollection;
use App\Models\RoomServer;
use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException;
use Str;

class MyServerController extends Controller
{ 
    public function list(Request $request) {
        $myServers = Server::whereIn(
            'id',
            MyServer::where('user_id', $request->user)->pluck('server_id')
        )->get();
        

        
        return new ServerCollection($myServers);
    }

    public function join_server(Request $request, $id) {
        $server = MyServer::create([
            'user_id' => $request->user,
            'server_id' => $id
        ]);
        $server->role = "member";
        $server->save(); 

        return [
            'data' => new ServerResource(Server::find($id))
        ];
    } 
}
