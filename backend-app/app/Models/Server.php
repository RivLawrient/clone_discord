<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'description',
        'is_private',
        'invite_code'
    ];

    protected $casts = [
        'is_private' => 'boolean'
    ];
    
    /**
     * Relasi ke model MyServer
     *
     * @return HasMany
     */
    public function myServers(): HasMany
    {
        return $this->hasMany(MyServer::class, 'server_id', 'id');
    }
    
    /**
     * Mendapatkan semua user yang memiliki server ini
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function users()
    {
        return $this->hasManyThrough(User::class, MyServer::class, 'server_id', 'id', 'id', 'user_id');
    }
}
