"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import ChannelBtn from "./channelBtn";
import { useChannel } from "@/context/channelContext";
import { AddServerBtn } from "./addServerBtn";
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
  return (
    <aside className="sidebar min-w-[72px] relative flex flex-col items-center bg-foreground text-white h-full gap-2">
      <div className="flex flex-col gap-2 relative w-full justify-center items-center">
        <button className="flex w-full justify-center peer items-center ">
          <img
            src="/dc.png"
            alt="dc"
            onClick={() => {
              router.push("/channel/me");
            }}
            className={cn(
              "w-10 h-10 object-contain rounded-xl hover:bg-indigo-500  p-2 cursor-pointer",
              route == "me" ? "bg-indigo-500" : "bg-gray-800"
            )}
          />
        </button>
        <div
          className={cn(
            "absolute w-0 left-0 bg-white rounded-r-lg peer-hover:w-1 transition-all ",
            route == "me" ? "h-full w-1" : "h-1/2 w-0 "
          )}
        />
        <div className="absolute text-[14px] font-semibold left-17 z-[51] hidden peer-hover:block text-nowrap bg-neutral-900 border border-neutral-800 rounded-lg p-2">
          Direct Messages
        </div>
      </div>

      <hr className="border-neutral-800 w-1/2 border-[1.5px]" />

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
