import { Friend, useFriend } from "@/context/friendContext";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

export function FriendList({
  id,
  display_name,
  username,
  picture,
  last_active,
  is_online,
  isLast,
  isRequest,
  isAcc,
}: Friend & { isLast?: boolean; isRequest?: boolean; isAcc?: boolean }) {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const { friends, setFriends } = useFriend();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000 * 60); // update setiap detik

    return () => clearInterval(interval);
  }, []);

  const acceptHandle = async () => {
    await fetch(`${process.env.HOST_API_PUBLIC}/api/friend/accept/${id}`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) {
          setFriends({
            ...friends,
            accept: friends.accept.filter((value) => value.id != id),
          });
        }
      })
      .catch(() => {
        console.log("error");
      });
  };
  return (
    <div
      className={cn(
        "group relative flex h-[60px] cursor-pointer items-center border-y border-neutral-700 px-2 py-3 text-sm hover:rounded-lg hover:border-none hover:bg-neutral-800",
        isLast && "border-b-0",
      )}
    >
      <div className="relative mr-2">
        <img
          src={process.env.HOST_API_PUBLIC + picture}
          alt="profile"
          className={cn(
            "h-8 w-8 rounded-full",
            picture.endsWith("default_picture.png")
              ? "bg-foreground object-contain p-1"
              : "object-cover",
          )}
        />
        {!isRequest && (
          <div
            className={cn(
              "absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border-[4px] border-neutral-900 group-hover:border-neutral-800",
              is_online ? "bg-green-500" : "bg-gray-500",
            )}
          />
        )}
      </div>

      <div className="flex-1">
        <h1 className="flex items-center font-bold">
          {display_name}
          <span className="ml-3 hidden text-xs font-normal group-hover:block">
            {username}
          </span>
        </h1>
        <p className="text-xs text-neutral-400">
          {isRequest ? username : is_online ? "Online" : "Offline"}
        </p>
      </div>
      {isRequest && (
        <div className="flex gap-6">
          {/* TODO: FUNCTION ACCEPT AND DECLINE OR CANCEL REQUEST*/}
          {isAcc && (
            <button
              onClick={acceptHandle}
              className="group/acc hover:bg-foreground cursor-pointer rounded-full"
            >
              <Check className="size-10 stroke-neutral-500 p-2 group-hover/acc:stroke-green-500" />
            </button>
          )}
          <button className="group/dec hover:bg-foreground cursor-pointer rounded-full">
            <X className="size-10 stroke-neutral-500 p-2 group-hover/dec:stroke-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}
