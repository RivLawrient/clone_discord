<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class TextChannel extends Model
{
    use HasUuids;

    protected $fillable = [
        'server_id',
        'name'
    ];

    function server() {
        return $this->belongsTo(Server::class, 'server_id', 'id');
    }

    function chattextchannel() {
        return $this->hasMany(ChatTextChannel::class);
    }
}
