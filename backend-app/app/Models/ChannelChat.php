<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ChannelChat extends Model
{
    use HasUuids;

    protected $table = "channel_chats";
    protected $primaryKey = "id";
    protected $keyType = "string";
    public $incrementing = false;
    protected $fillable = [
        "room_server_id",
        "message",
        "user_id",
    ];
    public function roomServer()
    {
        return $this->belongsTo(RoomServer::class, "room_server_id", "id");
    }
    public function user()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
