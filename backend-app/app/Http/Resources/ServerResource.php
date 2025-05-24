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
          return [
            'id' => $this->id,
            'name' => $this->name,
            'picture' =>  $this->picture,
            'is_owner' => optional($this->myserver->where("user_id", $request->user)->first())->is_owner ?? false,
            'invite_code' => $this->invite_code,
            'member' => $this->myserver->count(),
            'members' => FriendResource::collection($this->myserver->pluck("user")),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'channel' => [
                'text' => TextChannelResource::collection($this->textchannel),
                'voice' => VoiceChannelResource::collection($this->voicechannel)
            ]
        ];
    }
}
