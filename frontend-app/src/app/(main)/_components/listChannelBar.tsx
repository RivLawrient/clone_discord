"use client";
import { useChannel } from "@/context/channelContext";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ChevronDown,
  Hash,
  Plus,
  Settings,
  UserIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function ListChannelBar() {
  const path = usePathname();
  return (
    <div className="aside rounded-l-lg relative w-[380px] h-full bg-foreground border-l-[1.5px] border-t-[1.5px] border-neutral-800 overflow-hidden">
      {path.split("/")[2] == "me" ? <ListMe /> : <ListServer />}
      {/* <div className="absolute z-50 right-0 top-0 bottom-0 w-1 hover:bg-neutral-700/50" /> */}
    </div>
  );
}

function ListMe() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className=" w-full flex flex-col">
      <div className="h-12 border-b border-neutral-800 p-2">
        <button className="text-xs font-semibold bg-neutral-800 h-full w-full rounded-md">
          Find or start a conversation
        </button>
      </div>

      <div className="p-2 flex flex-col">
        <button
          onClick={() => router.push("/channel/me")}
          className={cn(
            "flex items-center hover:bg-neutral-900 rounded-md p-2 px-4 h-[38px] text-sm font-semibold text-neutral-400 hover:text-neutral-200",
            pathname === "/channel/me" && "bg-neutral-800 text-neutral-200"
          )}
        >
          <UserIcon className="w-5 h-5 mr-2" />
          Friends
        </button>
        <hr className="border-neutral-800 my-2 mx-4 border-[1.5px]" />
      </div>
    </div>
  );
}

function ListServer() {
  const channel = useChannel();
  const path = usePathname();
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col">
      <div className="h-12 hover:bg-neutral-800 border-b border-neutral-800 items-center justify-between flex px-3">
        <h1>
          {channel.channels.map((c) => c.id == path.split("/")[2] && c.name)}
        </h1>
        <ChevronDown />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col p-3 text-neutral-400">
          <div className="text-[14px] px-2 hover:text-white flex items-center gap-1 justify-between">
            <h1
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1"
            >
              General{" "}
              <ChevronDown className={cn("h-3 w-3", open && "rotate-180")} />
            </h1>
            <Plus className="w-4 h-4" />
          </div>
          <div className="flex flex-col items-start">
            {open && (
              <>
                <ListChannel name="Chatting" id="1" />
                <ListChannel name="Bott" id="1" />
              </>
            )}
            {/* <button className="flex items-center p-2">
              <Hash className="w-4 h-4 mr-1" /> Chatting
            </button>
            <button className="flex items-cente ">
              <Hash className="w-4 h-4 mr-1" /> Bot
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListChannel({ name, id }: { name: string; id: string }) {
  return (
    <button className="flex items-center p-2 py-1 w-full text-sm hover:bg-neutral-800 rounded-md hover:text-white justify-between group">
      <span className="flex items-center gap-1">
        <Hash className="w-4 h-4 mr-1" /> {name}
      </span>
      <Settings className="w-4 h-4 group-hover:block hidden" />
    </button>
  );
}
