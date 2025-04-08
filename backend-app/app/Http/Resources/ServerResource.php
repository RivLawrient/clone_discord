<?php

namespace App\Http\Resources;

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
            'invite_code' => $this->invite_code,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'room' => RoomServerResource::collection($this->roomServers)
        ];
    }
}
