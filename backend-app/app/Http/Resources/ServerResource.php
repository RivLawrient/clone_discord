<?php

namespace App\Http\Resources;

use App\Models\MyServer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // $prefixpict = '';

        // if($this->picture) {
        //     $prefixpict = request()->getSchemeAndHttpHost()
        // }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'picture' =>  $this->picture ? request()->getSchemeAndHttpHost(). $this->picture : $this->picture,
            'description' => $this->description,
            'is_private' => $this->is_private,
            'role' => MyServer
                ::where('user_id', request()->user)
                ->where('server_id', $this->id)
                ->first()
                ?->role,
            'invite_code' => $this->invite_code,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'room' => RoomServerResource::collection($this->roomServers)
        ];
    }
}
