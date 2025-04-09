<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use App\Http\Resources\FriendListResource;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    //
    public function add_friend(Request $request, $friend_id) {
        $check = User::find($friend_id);
        if (!$check) {
            if ($request->user == $friend_id) {
                return response()->json([
                    'message' => 'User not found'
                ], 400);
            }
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
       
        Friend::create([
            'user_id' => $request->user,
            'friend_id' => $friend_id,
            'is_accepted' => false
        ]);

        return response()->json([
            'message' => 'Friend request sent'
        ], 200);
    }

    public function list_request(Request $request) {
        $req = Friend::where('user_id', $request->user)->where('is_accepted', false)
        ->join('users', 'friends.friend_id', '=', 'users.id')
        ->get();
        return response()->json([
            'data' => FriendListResource::collection($req)
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
