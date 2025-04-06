<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServerCreateRequest;
use App\Http\Resources\ServerResource;
use App\Models\MyServer;
use App\Models\RoomServer;
use App\Models\Server;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Str;

class ServerController extends Controller
{
    public function create(ServerCreateRequest $request): JsonResponse {
        $data = $request->validated();

        $server = Server::create($data);
        if($request->hasFile('picture')) {
            $file = $request->file('picture');
            $extension = $file->getClientOriginalExtension();
            $filename = Str::uuid() . '.' . $extension;
            $path = $file->storePubliclyAs('servers', $filename, 'public');
            
            
            $server->picture = '/api/server_picture/' . $filename;
            $server->save();

            $server->picture = request()->getSchemeAndHttpHost() . $server->picture;

        }

        $result = new ServerResource($server);

        $myServer = new MyServer();
        $myServer->id = Str::uuid();
        $myServer->user_id = $request->user;
        $myServer->server_id = $result->id;
        $myServer->save();

        $roomServer = new RoomServer();
        $roomServer->id = Str::uuid();
        $roomServer->name = "general";
        $roomServer->server_id = $result->id;
        $roomServer->save();

        return response()->json([
            'data' => $result
        ]);
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
    
}