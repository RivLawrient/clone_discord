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
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'picture' => $this->picture,
            'description' => $this->description,
            'is_private' => $this->is_private,
            'invite_code' => $this->invite_code,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
        
        // Hanya tambahkan field 'user' jika nilainya tidak null
        // if ($request->user !== null) {
        //     $data['user'] = $request->user;
        // }
        
        return $data;
    }
}
