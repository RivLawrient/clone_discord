<?php

namespace App\Http\Controllers;

use App\Events\UserCurrent;
use App\Events\UserFriend;
use App\Http\Resources\FriendResource;
use App\Models\Friend;
use App\Models\User;
use App\Http\Resources\FriendListResource;
use Illuminate\Http\Request;
use Symfony\Component\String\Inflector\FrenchInflector;
use function Laravel\Prompts\select;
use function PHPUnit\Framework\returnArgument;

class FriendController extends Controller
{
    public function add_friend(Request $request, $username) {
        $check_user = User::where("username", $username)->first();
        if (!$check_user) {
            return response()->json([
                'message' => 'Hm, didn’t work. Double check that the username is correct.'
            ], 404);
        }else{
            if ($request->user == $check_user->id) {
                return response()->json([
                    'message' => 'Hm, didn’t work. Double check that the username is correct.'
                ], 400);
            }
        }

        $user_id = Friend
        ::where("user_id", $request->user)
        ->where("friend_id", $check_user->id)
        ->first();
        if ($user_id) {
            return response()->json([
                'message' => 'User already in your list'
            ], 400);
        }
        

        $friend_id = Friend
        ::where('user_id', $check_user->id)
        ->where('friend_id', $request->user)
        ->first();
        if ($friend_id) {
            return response()->json([
                'message' => 'User already in your list'
            ], 400);
        }

        Friend::create([
            'user_id' => $request->user,
            'friend_id' => $check_user->id,
            'is_accepted' => false
        ]);


        broadcast(new UserFriend($check_user->id));

        return response()
        ->json([
            "data" => new FriendResource($check_user)
        ], 200);

    }

    public function list_friend(Request $request) {
        $me = Friend
        ::where("friend_id", $request->user)
        ->where("is_accepted", true)
        ->with("user")
        ->get()
        ->pluck('user');

        $friend = Friend
        ::where('user_id', $request->user)
        ->where('is_accepted', true)
        ->with('friend')
        ->get()
        ->pluck('friend');

        $req = Friend
        ::where('friend_id', $request->user)
        ->where('is_accepted', false)
        ->with("user")
        ->get()
        ->pluck('user');

        $pending = Friend
        ::where('user_id', $request->user)
        ->where('is_accepted', false)
        ->with('friend')
        ->get()
        ->pluck('friend');
        
        return response()->json([
            'data' => [
                'friends' => FriendResource::collection($me->merge($friend)),
                'request' => FriendResource::collection($req),
                'pending' => FriendResource::collection($pending)

            ]
        ], 200);
    }
 

    public function accept_request(Request $request, $username) {
        $friend = User::where("username", $username)->first();
        if(!$friend) {
            return response()->json([
                'message' => 'friend request not found'
            ], 404);
        }
        $req = Friend
        ::where('user_id', $friend->id)
        ->where('friend_id', $request->user)
        ->where('is_accepted', false)
        ->first();
        if (!$req) {
            return response()->json([
                'message' => 'friend request not found'
            ], 404);
        }
        $req->is_accepted = true;
        $req->save();

        
        broadcast(new UserFriend($friend->id));

        return response()->json([
            'data' => new FriendResource($friend)
        ], 200);
    }

    public function decline_request(Request $request, $username){
        $friend = User::where("username", $username)->first();
        if (!$friend) {
            return response()->json([
                'message' => 'friend request not found'
            ], 404);
        }
        $req = Friend
        ::where("user_id", $friend->id)
        ->where("friend_id", $request->user)
        ->where("is_accepted", false)
        ->first();
        if (!$req) {
            return response()->json([
                'message' => 'friend request not found'
            ], 404);
        }
        $req->delete();

        broadcast(new UserFriend($friend->id));

        return response()->json([
            'data' => new FriendResource($friend)
        ], 200);
    }

    public function cancel_request(Request $request, $username) {
        $friend = User::where("username", $username)->first();
        if (!$friend) {
            return response()->json([
                'message' => 'friend request not found'
            ], 404);
        }
        $req = Friend
        ::where("user_id", $request->user)
        ->where("friend_id", $friend->id)
        ->where("is_accepted", false)
        ->first();
        if (!$req) {
            return response()->json([
                'message' => 'pending add friend not found'
            ], 404);
        }
        $req->delete();

        broadcast(new UserFriend($friend->id));

        return response()->json([
            'data' => new FriendResource($friend)
        ], 200);

    }

    public function broadcast_friend(string $id) {
        $me = Friend
        ::where("friend_id", $id)
        ->where("is_accepted", true)
        ->with("user")
        ->get()
        ->pluck('user.id');

        $friend = Friend
        ::where('user_id', $id)
        ->where('is_accepted', true)
        ->with('friend')
        ->get()
        ->pluck('friend.id');

        $data = $me->merge($friend);

        foreach ($data as $fr) {
            event(new UserFriend($fr));
        }
    }

    public function remove(Request $request, $username) {
        $friend = User::where("username", $username)->first();
        $data = Friend
        ::where("friend_id", $friend->id)
        ->where("user_id", $request->user)
        ->first();

        if(!$data) {
            $data = Friend
            ::where("user_id", $friend->id)
            ->where("friend_id", $request->user)
            ->first();

            if(!$data){
                return response()->json([
                    'message' => 'friend not found'
                ], 404);
            }
        }

        $data->delete();

        broadcast(new UserFriend($friend->id));

        return response()
        ->json([
            "data" => new FriendResource($friend)
        ])
        ->setStatusCode(200);
    }

    public function show(Request $request, $username) {
        $friend = User::where("username", $username)->first();
        if (!$friend || ($friend->id === $request->user)) {
            return response()->json([
                'message' => 'user is not found'
            ], 404);
        }

        return response()
        ->json([
            "data" => new FriendResource($friend)
        ])
        ->setStatusCode(200);
    }
}
