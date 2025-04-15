<?php

namespace App\Http\Middleware;

use App\Events\UpdateUser;
use App\Http\Resources\FriendListResource;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie("session");
        $authenticate = false;
        $user = null;

        $other = User::select('id', 'username', 'display_name', 'picture', 'last_active', 'is_online')->where('is_online', true)->get();
        foreach ($other as $o) {
            if ($o->last_active < time() - 60 * 5) {
                User::where('id', $o->id)->update(['is_online' => false]);
                // event(new UpdateUser(new FriendListResource($o)->toArray($request)));
                event(new UpdateUser([
                    'friends' => new FriendListResource($o),
                ]));
            }
        }

        if($token) {
            $user = User::select('id', 'token_exp')->where('token', $token)->first();
            if ($user) {
                if ($user->token_exp > time()) {
                    User::where('id', $user->id)->update(['last_active' => time(), 'is_online' => true]);

                    $res = new FriendListResource(User::where('id', $user->id)->first());
                    // event(new UpdateUser($res->toArray($request)));
                    event(new UpdateUser([
                        'friends' => $res,
                    ]));
                    $authenticate = true;
                }
            }
        }

        if ($authenticate) {
            // Menyimpan user ID ke dalam request
            // $request->merge(['username' => $user->username]);
            $request->merge(['user' => $user->id]);
            return $next($request);
        } else {
            User::where('token', $token)->update(['token' => null, 'token_exp' => null]);
            return response()->json([
                "errors" => [
                    "message" => [
                        "unauthorized"
                    ]
                ]
            ])->setStatusCode(401)
            ->withCookie(cookie('session', '', 0));
        }
    }
}
