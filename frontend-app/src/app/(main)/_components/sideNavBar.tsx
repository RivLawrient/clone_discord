"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import ChannelBtn from "./channelBtn";
import { useChannel } from "@/context/channelContext";
import { AddServerBtn } from "./addServerBtn";
import { useEffect } from "react";

interface Channel {
  id: string;
  name: string;
  url_img?: string;
}

export default function SideNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const route = pathname.split("/")[2];
  const { channels } = useChannel();

  useEffect(() => {
    console.log(route);
  }, []);
  return (
    <aside className="sidebar bg-foreground relative flex h-full min-w-[72px] flex-col items-center gap-2 text-white">
      <div className="relative flex w-full flex-col items-center justify-center gap-2">
        <button className="peer flex w-full items-center justify-center">
          <img
            src="/dc.png"
            alt="dc"
            onClick={() => {
              router.push("/channel/me");
            }}
            className={cn(
              "h-10 w-10 cursor-pointer rounded-xl object-contain p-2 hover:bg-indigo-500",
              route == "me" ? "bg-indigo-500" : "bg-gray-800",
            )}
          />
        </button>
        <div
          className={cn(
            "absolute left-0 w-0 rounded-r-lg bg-white transition-all peer-hover:w-1",
            route == "me" ? "h-full w-1" : "h-1/2 w-0",
          )}
        />
        <div className="absolute left-17 z-[51] hidden rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-[14px] font-semibold text-nowrap peer-hover:block">
          Direct Messages
        </div>
      </div>

      <hr className="w-1/2 border-[1.5px] border-neutral-800" />

      {channels.map((channel) => (
        <ChannelBtn
          key={channel.id}
          index={channels.indexOf(channel)}
          name={channel.name}
          url_img={channel.picture}
          id={channel.id}
          last={channels.indexOf(channel) === channels.length - 1}
        />
      ))}

      <AddServerBtn />
    </aside>
  );
}
