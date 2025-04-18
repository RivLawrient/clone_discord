<?php

namespace App\Events;

use App\Http\Resources\FriendListResource;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserCurrent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $friends;
    public $accept;

    public $request; 

    private $user_id;
    /**
     * Create a new event instance.
     */
    public function __construct($user_id)
    {

        $this->user_id = $user_id;
        $f = Friend
        ::where('user_id', $user_id)
        ->where('is_accepted', true)
        ->join('users', 'friends.friend_id', '=', 'users.id')
        ->get();

        $a = Friend
        ::where('friend_id', $user_id)
        ->where('is_accepted', false)
        ->join('users', 'friends.user_id', '=', 'users.id')
        ->get();

        $r = Friend
        ::where('user_id', $user_id)
        ->where('is_accepted', false)
        ->join('users', 'friends.friend_id', '=', 'users.id')
        ->get();

        $this->friends = FriendListResource::collection($f);
        $this->accept = FriendListResource::collection($a);
        $this->request = FriendListResource::collection($r);
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
