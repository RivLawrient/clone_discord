<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Hash;

class User extends Model
{
    use HasUuids, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'display_name',
        'banner_color',
        'username',
        'email',
        'password',
        'date_of_birth',
        'status',
        'about_me',
        'is_online',
        'last_active',
    ];
    /**
     * Relasi ke model MyServer
     *
     * @return HasMany
     */
    public function myServers(): HasMany
    {
        return $this->hasMany(MyServer::class, 'user_id', 'id');
    }
    
    /**
     * Mendapatkan semua server yang dimiliki user
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function servers()
    {
        return $this->hasManyThrough(Server::class, MyServer::class, 'user_id', 'id', 'id', 'server_id');
    }

    public function friends()
    {
        return $this->hasMany(Friend::class, 'user_id', 'id');
    }
    
}
