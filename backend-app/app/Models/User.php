<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
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
        'token'
    ];
    
    
}
