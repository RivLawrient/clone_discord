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
            'username' => $this->username,
            'email' => $this->email,
            'date_of_birth' => $this->date_of_birth,
            'status' => $this->status,
            'about_me' => $this->about_me,
            'is_online' => $this->is_online,
            'picture' => $this->picture,
            'token' => $this->token,
            'token_exp' => $this->token_exp,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

}
