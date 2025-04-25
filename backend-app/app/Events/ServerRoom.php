<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ServerRoom implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $server_id;

    public $chat;
    /**
     * Create a new event instance.
     */
    public function __construct($server_id, $chat)
    {
        $this->server_id = $server_id;

        $this->chat = $chat;
        //
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
