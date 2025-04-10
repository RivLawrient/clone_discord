<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use App\Http\Resources\FriendListResource;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    //
    public function add_friend(Request $request, $friend_username) {
        $check = User::where('username', $friend_username)->first();
        
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
        
        $friend = Friend::where('user_id', $request->user)->where('friend_id', $check['id'])->first();
        if ($friend) {
            return response()->json([
                'message' => 'User already in your friend list'
            ], 400);
        }

        Friend::create([
            'user_id' => $request->user,
            'friend_id' => $check->id,
            'is_accepted' => false
        ]);

        return response()->json([
            'message' => 'Friend request sent'
        ], 200);
    }

    public function list_request(Request $request) {
        $lsit = Friend::where('user_id', $request->user)
        ->where('is_accepted', false)
        ->join('users', 'friends.friend_id', '=', 'users.id')
        ->get();
        return FriendListResource::collection($lsit);
    }
    
    public function list_accept(Request $request) {
        $req = Friend::where('friend_id', $request->user)->where('is_accepted', false)
        ->join('users', 'friends.user_id', '=', 'users.id')
        ->get();
        return  FriendListResource::collection($req);
    }

    public function list_pending(Request $request) {
        $req = $this->list_request($request);
        $acc = $this->list_accept($request);
        return response()->json([
            'data' => [
                'request' => $req,
                'accept' => $acc
            ]
        ], 200);
    }

    public function accept_request(Request $request, $friend_id) {
        $req = Friend
        ::where('user_id', $request->user)
        ->where('friend_id', $friend_id)
        ->where('is_accepted', false)
        ->first();
        if (!$req) {
            return response()->json([
                'message' => 'Friend request not found'
            ], 404);
        }
        $req->is_accepted = true;
        $req->save();

        return response()->json([
            'message' => new FriendListResource(User::find($friend_id))
        ], 200);
    }

    public function list_friend(Request $request) {
        $list = Friend::where('user_id', $request->user)->where('is_accepted', true)
        ->join('users', 'friends.friend_id', '=', 'users.id')
        ->get();
        return response()->json([
            'data' => FriendListResource::collection($list)
        ], 200);
    }
}
