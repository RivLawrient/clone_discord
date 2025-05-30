<?php

namespace App\Http\Middleware;

use App\Events\UserCurrent;
use App\Events\UserFriend;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UpdateWS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $other = User::get();
        foreach ($other as $o) {
            if ($o->last_active < time() - 30 && $o->is_online) {
                User::where('id', $o->id)->update(['is_online' => false]);
            }
            if($o->id == $request->user) {
                continue;
            }
            event(new UserFriend($o->id));
        }

        return $next($request);
    }
}
