import { useFriend } from "@/context/friendContext";
import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/router";

export function ListMe() {
  const pathname = usePathname();
  const { friends } = useFriend();

  return (
    <div className="flex w-full flex-col">
      <div className="h-12 border-b border-neutral-800 p-2">
        <button className="h-full w-full rounded-md bg-neutral-800 text-xs font-semibold">
          Find or start a conversation
        </button>
      </div>

      <div className="flex flex-col p-2">
        <button
          onClick={() => redirect("/channel/me")}
          className={cn(
            "flex h-[38px] items-center rounded-md p-2 px-4 text-sm font-semibold text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200",
            pathname === "/channel/me" && "bg-neutral-800 text-neutral-200",
          )}
        >
          <UserIcon className="mr-2 flex h-5 w-5" />
          <label className="flex-1 text-start">Friends</label>
          {friends.request.length != 0 && (
            <div className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white">
              {friends.request.length}
            </div>
          )}
        </button>
        <hr className="mx-4 my-2 border-[1.5px] border-neutral-800" />
      </div>
    </div>
  );
}
