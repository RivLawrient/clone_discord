<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomServerCreateRequest;
use App\Models\RoomServer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
class RoomServerController extends Controller
{
    public function list(Request $request, $server_id): JsonResponse {
        $roomServers = RoomServer::where('server_id', $server_id)->get();

        return response()->json([
            'data' => $roomServers
        ]);
    }

    public function create(RoomServerCreateRequest $request): JsonResponse {
        $data = $request->validated();

        $roomServer = new RoomServer();
        $roomServer->id = Str::uuid();
        $roomServer->server_id = $data['server_id'];
        $roomServer->name = $data['name'];
        $roomServer->save();

        return response()->json([
            'data' => $roomServer
        ]);
    }   
}
