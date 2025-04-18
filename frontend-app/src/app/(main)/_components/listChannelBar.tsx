"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, Hash, Plus, Settings, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import UserBar from "./userBar";
import { useServer } from "@/context/serverContext";
import { useFriend } from "@/context/friendContext";

export default function ListChannelBar() {
  const path = usePathname();

  return (
    <>
      <UserBar />
      <div className="aside bg-foreground relative h-full min-w-[300px] overflow-hidden rounded-l-lg border-t-[1.5px] border-l-[1.5px] border-neutral-800">
        {path.split("/")[2] == "me" ? <ListMe /> : <ListServer />}
      </div>
    </>
  );
}

function ListMe() {
  const pathname = usePathname();
  const router = useRouter();

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
          onClick={() => router.push("/channel/me")}
          className={cn(
            "flex h-[38px] items-center rounded-md p-2 px-4 text-sm font-semibold text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200",
            pathname === "/channel/me" && "bg-neutral-800 text-neutral-200",
          )}
        >
          <UserIcon className="mr-2 flex h-5 w-5" />
          <label className="flex-1 text-start">Friends</label>
          {friends.accept.length != 0 && (
            <div className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white">
              {friends.accept.length}
            </div>
          )}
        </button>
        <hr className="mx-4 my-2 border-[1.5px] border-neutral-800" />
      </div>
    </div>
  );
}

function ListServer() {
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const { servers } = useServer();

  return (
    <div className="flex flex-col">
      <div className="flex h-12 items-center justify-between border-b border-neutral-800 px-3 hover:bg-neutral-800">
        <h1>
          {servers.map(
            (server) => server.id == path.split("/")[2] && server.name,
          )}
        </h1>
        <ChevronDown />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col p-3 font-semibold text-neutral-400">
          <div className="flex items-center justify-between gap-1 px-2 text-[14px] hover:text-white">
            <h1
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1"
            >
              Text Channels{" "}
              <ChevronDown className={cn("h-3 w-3", open && "rotate-180")} />
            </h1>
            <Plus className="h-4 w-4" />
          </div>
          <div className="flex flex-col items-start">
            {servers.map(
              (data) =>
                data.id == path.split("/")[2] &&
                data.room.map((room) =>
                  room.id == path.split("/")[3] ? (
                    <ListChannel key={room.id} id={room.id} name={room.name} />
                  ) : (
                    open && (
                      <ListChannel
                        key={room.id}
                        id={room.id}
                        name={room.name}
                      />
                    )
                  ),
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListChannel({ name, id }: { name: string; id: string }) {
  const router = useRouter();
  const path = usePathname();
  return (
    <button
      onClick={() => router.push(`/channel/${path.split("/")[2]}/${id}`)}
      className={cn(
        "group flex w-full items-center justify-between rounded-md p-2 py-1 text-sm hover:bg-neutral-800 hover:text-white",
        path.split("/")[3] == id && "bg-neutral-800 text-neutral-200",
      )}
    >
      <span className="flex items-center gap-1">
        <Hash className="mr-1 h-4 w-4" /> {name}
      </span>
      <Settings className="hidden h-4 w-4 group-hover:block" />
    </button>
  );
}
