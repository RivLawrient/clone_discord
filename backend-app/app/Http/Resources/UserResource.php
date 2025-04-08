<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'display_name' => $this->display_name,
            'banner_color' => $this->banner_color,
            'username' => $this->username,
            'email' => $this->email,
            'date_of_birth' => $this->date_of_birth,
            'status' => $this->status,
            'about_me' => $this->about_me,
            'is_online' => $this->is_online,
            'last_active' => $this->last_active,
            'picture' => $this->picture,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

}
