<?php

namespace App\Http\Controllers;

use App\Events\UpdateUser;
use App\Events\UserCurrent;
use App\Models\Friend;
use App\Models\User;
use App\Http\Resources\FriendListResource;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    public function add_friend(Request $request, $friend_username) {
        $check = User
        ::where('username', $friend_username)
        ->first();
        if (!$check) {
            return response()->json([
                'message' => 'Hm, didn’t work. Double check that the username is correct.'
            ], 404);
        }else{
            if ($request->user == $check->id) {
                return response()->json([
                    'message' => 'Hm, didn’t work. Double check that the username is correct.'
                ], 400);
            }
        }

        
        $friend = Friend
        ::where('user_id', $request->user)
        ->where('friend_id', $check['id'])
        ->select('id')
        ->first();
        if ($friend) {
            return response()->json([
                'message' => 'User already in your list'
            ], 400);
        }

        $me = Friend
        ::where('user_id', $check['id'])
        ->where('friend_id', $request->user)
        ->select('id')
        ->first();
        if ($me) {
            return response()->json([
                'message' => 'User already in your list'
            ], 400);
        }

        Friend::create([
            'user_id' => $request->user,
            'friend_id' => $check->id,
            'is_accepted' => false
        ]);

        // event(new UpdateUser([
        //     'accept' => new FriendListResource(User::where('id', $request->user)->first()),
        //     'user_id' => $check->id
        // ]));
        event(new UserCurrent( $check->id));
        event(new UserCurrent( $request->user));

        return response()->json([
            'request' => new FriendListResource($check)
        ], 200);
    }

    public function list_friend(Request $request) {
        $list = Friend
        ::where('user_id', $request->user)
        ->where('is_accepted', true)
        ->join('users', 'friends.friend_id', '=', 'users.id')
        ->get();

        $accept = Friend
        ::where('friend_id', $request->user)
        ->where('is_accepted', false)
        ->join('users', 'friends.user_id', '=', 'users.id')
        ->get();

        $request = Friend
        ::where('user_id', $request->user)
        ->where('is_accepted', false)
        ->join('users', 'friends.friend_id', '=', 'users.id')
        ->get();

        
        return response()->json([
            'data' => [
                'friends' => FriendListResource::collection($list),
                'accept' => FriendListResource::collection($accept),
                'request' => FriendListResource::collection($request)

            ]
        ], 200);
    }
 

    public function accept_request(Request $request, $friend_id) {
        $req = Friend
        ::where('user_id', $friend_id)
        ->where('friend_id', $request->user)
        ->where('is_accepted', false)
        ->first();
        if (!$req) {
            return response()->json([
                'message' => 'Friend request not found'
            ], 404);
        }
        $req->is_accepted = true;
        $req->save();

       Friend
       ::create([
            'user_id' => $request->user,
            'friend_id' => $friend_id,
            'is_accepted' => true
        ]);

        // event(new UpdateUser([
        //     'friends' => new FriendListResource(User::where('id', $request->user)->first()),
        //     'user_id' => $friend_id
        // ]));

        event(new UserCurrent( $friend_id));
        event(new UserCurrent( $request->user));

        return response()->json([
            'data' => new FriendListResource(User::find($friend_id))
        ], 200);
    }

//    todo: yang request hilangkan di pending dan add ke friend list 
// websocket nya friendnya 'request->user' dan target accountny 'friend_id'
}
