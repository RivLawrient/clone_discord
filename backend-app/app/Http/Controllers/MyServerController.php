<?php

namespace App\Http\Controllers;

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
    public function create(Request $request): JsonResponse {
        $data = $request->validated();

        try {
            $myServer = new MyServer();
            $myServer->id = Str::uuid();
            $myServer->user_id = $request->user()->id;
            $myServer->server_id = $data['server_id'];
            $myServer->save();
            
            return response()->json([
                'data' => $myServer
            ]);
        } catch (QueryException $e) {
            // Jika terjadi error unique constraint violation
            if ($e->getCode() == 23000) {
                return response()->json([
                    'errors' => [
                        'message' => ['Anda sudah memiliki server ini']
                    ]
                ])->setStatusCode(400);
            }
            throw $e;
        }
    }

    public function list(Request $request) {
        // $myServers = MyServer::with(['server.roomServers'])
        // ->get()
        // ->pluck('server')
        // ->filter();

        $myServers = Server::whereIn(
            'id',
            MyServer::where('user_id', $request->user)->pluck('server_id')
        )->get();
        

        
        return new ServerCollection($myServers);
    }
}
