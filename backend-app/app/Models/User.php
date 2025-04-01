<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Notifications\Notifiable;

class User extends Model
{
    use HasUuids, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'display_name',
        'username',
        'email',
        'password',
        'status',
        'about_me',
        'is_online',
        'token_exp',
        'token'
    ];

    protected $casts = [
        'is_online' => 'boolean'
    ];
}
