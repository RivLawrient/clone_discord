<?php

namespace App\Events;

use App\Http\Resources\ServerResource;
use App\Models\Server;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ServerRoom implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $server_id;

    public $data;
    /**
     * Create a new event instance.
     */
    public function __construct($server_id)
    {
        $this->server_id = $server_id;

        $server = Server::find($server_id);
        if(!$server) {
            $this->data = null;
        }else{
            $this->data = new ServerResource($server);
        }
    }

    /**
     * Get the channels the event should broadcast on.
    *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            'server.' . $this->server_id
        ];
    }

    public function broadcastAs(){
        return 'server-room';
    }   
}
