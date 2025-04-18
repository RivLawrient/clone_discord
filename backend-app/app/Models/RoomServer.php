<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoomServer extends Model
{
    protected $table = "room_servers";

    protected $primaryKey = "id";
    protected $keyType = "string";
    public $incrementing = false;

    protected $fillable = [
        "server_id",
        "name",
    ];

    public function server(): BelongsTo {
        return $this->belongsTo(Server::class, "server_id", "id");
    }

}
