<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Str;

class Server extends Model
{
    use HasUuids;

    protected $table = 'servers';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    
    protected $fillable = [
        'name',
        'picture',
    ];

    function generateUniqueInviteCode($length = 8): string
    {
        do {
            $code = Str::upper(Str::random($length)); // Contoh: "X8Y4ZT2A"
        } while (Server::where('invite_code', $code)->exists());

        return $code;
    }

    public function myserver() {
        return $this->hasMany(MyServer::class);
    }

    public function textchannel() {
        return $this->hasMany(TextChannel::class);
    }

    public function voicechannel() {
        return $this->hasMany(VoiceChannel::class);
    }
}

