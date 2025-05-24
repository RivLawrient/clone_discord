<?php

namespace App\Events;

use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use App\Http\Resources\FriendResource;
use Illuminate\Queue\SerializesModels;
use App\Models\Friend;

class UserFriend implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $friends;
    public $request; 
    public $pending;


    private $user_id;
    /**
     * Create a new event instance.
     */
    public function __construct($user_id)
    {

        $this->user_id = $user_id;

        $m = Friend
        ::where("friend_id", $user_id)
        ->where("is_accepted", true)
        ->with("user")
        ->get()
        ->pluck('user');
        $f = Friend
        ::where('user_id', $user_id)
        ->where('is_accepted', true)
        ->with('friend')
        ->get()
        ->pluck('friend');

        $r = Friend
        ::where('friend_id', $user_id)
        ->where('is_accepted', false)
        ->with("user")
        ->get()
        ->pluck('user');

        $p = Friend
        ::where('user_id', $user_id)
        ->where('is_accepted', false)
        ->with('friend')
        ->get()
        ->pluck('friend');

        $this->friends = FriendResource::collection($m->merge($f));
        $this->request = FriendResource::collection($r);
        $this->pending = FriendResource::collection($p);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return ['user.' . $this->user_id];
    }

    public function broadcastAs()
    {
        return 'user-current';
    }
}
