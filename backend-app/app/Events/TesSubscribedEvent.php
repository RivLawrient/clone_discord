<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
class TesSubscribedEvent implements ShouldBroadcast

{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $user = [];

    public function __construct($data)
    {
        $this->user = is_array($data) ? $data : [$data];
    }

    public function broadcastOn()
    {
        return ['tes']; // nama channel
    }

    public function broadcastAs()
    {
        return 'subscribed-feedback';
    }
}
