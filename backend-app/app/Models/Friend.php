<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Friend extends Model
{
    use HasUuids;

    protected $table = 'friends';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'friend_id',
        'is_accepted'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function friend()
    {
        return $this->belongsTo(User::class, 'friend_id', 'id');
    }   
}
