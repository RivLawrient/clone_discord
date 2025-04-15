<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MyServer extends Model
{
    use HasUuids;

    protected $table = 'my_servers';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    
    protected $fillable = [
        'user_id',
        'server_id'
    ];
    
    /**
     * Relasi ke model User
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    
    /**
     * Relasi ke model Server
     *
     * @return BelongsTo
     */
    public function server(): BelongsTo
    {
        return $this->belongsTo(Server::class, 'server_id', 'id');
    }

    
    /**
     * Relasi ke model RoomServer
     *
     * @return BelongsTo
     */ 
    public function roomServers(): BelongsTo
    {
        return $this->belongsTo(RoomServer::class, 'server_id', 'id');
    }    
}
