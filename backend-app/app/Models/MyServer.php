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
     
    public function server(){
        return $this->belongsTo(Server::class, 'server_id', "id");
    }
    public function user(){
        return $this->belongsTo(User::class, 'user_id', "id");
    }
}
