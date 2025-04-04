"use client";

import { cn } from "@/lib/utils";
import { PlusCircleIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import ChannelBtn from "./channelBtn";
import { Fragment, useState } from "react";

interface Channel {
  id: string;
  name: string;
  url_img?: string;
}

export default function SideNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const route = pathname.split("/")[2];
  const [channels, setChannels] = useState<Channel[]>([
    { id: "1", name: "me", url_img: "" },
    { id: "2", name: "Majay manji", url_img: "" },
    { id: "3", name: "kamu", url_img: "" },
  ]);
  return (
    <aside className="sidebar min-w-[72px] relative flex flex-col items-center bg-foreground text-white h-full gap-2">
      <div className="flex flex-col gap-2 relative w-full">
        <button className="flex w-full justify-center items-center ">
          <img
            src="/dc.png"
            alt="dc"
            onClick={() => {
              router.push("/channel/me");
            }}
            className={cn(
              "w-10 h-10 object-contain rounded-xl peer hover:bg-indigo-500  p-2 cursor-pointer",
              route == "me" ? "bg-indigo-500" : "bg-gray-800"
            )}
          />
        </button>
        <div
          className={cn(
            "absolute h-1/2 w-0 left-0 bg-white rounded-r-lg  transition-all ",
            route == "me" ? "h-full w-1" : "h-1/2 peer-hover:w-1"
          )}
        />
      </div>

      <hr className="border-neutral-800 w-1/2 border-[1.5px]" />

      {channels.map((channel) => (
        <ChannelBtn
          key={channel.id}
          index={channels.indexOf(channel)}
          name={channel.name}
          url_img={channel.url_img}
          id={channel.id}
          last={channels.indexOf(channel) === channels.length - 1}
        />
      ))}

      <button className="flex w-full relative justify-center items-center group ">
        <PlusCircleIcon
          onClick={() => {}}
          className={cn(
            "w-10 h-10 object-contain rounded-xl peer hover:bg-indigo-500 bg-gray-800 cursor-pointer p-2"
          )}
        />
        <div
          className={cn(
            "absolute h-1/2 w-0 left-0 bg-white rounded-r-lg transition-all peer-hover:w-1 "
          )}
        />
      </button>
    </aside>
  );
}
