<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ChatTextChannel extends Model
{
    use HasUuids;


    protected $fillable = [
        'text_channel_id',
        'user_id',
        'message'
    ];


    function text_channel() {
        return $this->belongsTo(TextChannel::class, 'text_channel_id', 'id');
    }

    function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}

