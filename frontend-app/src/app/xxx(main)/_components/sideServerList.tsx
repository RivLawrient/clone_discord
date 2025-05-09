"use client";

import { usePathname, useRouter } from "next/navigation";
import { AddServerBtn } from "./add-server/addServerBtn";
import { useServer } from "@/context/serverContext";
import { useFriend } from "@/context/friendContext";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import ServerBtn from "./serverBtn";
import DiscoverBtn from "./add-server/discoverBtn";

export default function SideServerList() {
  const router = useRouter();
  const pathname = usePathname();
  const route = pathname.split("/")[2];
  const { servers } = useServer();
  const { friends } = useFriend();
  // useEffect(() => {
  //   if (!servers.some((v) => v.id === route)) {
  //     console.log("gada");
  //   }
  // }, []);
  return (
    <aside className="sidebar bg-foreground relative flex h-full min-w-[72px] flex-col items-center gap-2 text-white select-none">
      <div className="relative flex w-full flex-col items-center justify-center gap-2">
        <button className="peer relative flex w-full items-center justify-center">
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
          {friends.request.length != 0 && (
            <div className="outline-foreground pointer-events-none absolute right-4 bottom-0 ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white outline-2">
              {friends.request.length}
            </div>
          )}
        </button>
        <div
          className={cn(
            "absolute left-0 w-0 rounded-r-lg bg-white transition-all peer-hover:w-1",
            route == "me" ? "h-full w-1" : "h-1/2 w-0",
          )}
        />

        {/* <div className="absolute left-17 z-[51] hidden items-center rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-[14px] font-semibold text-nowrap peer-hover:flex">
          <div className="absolute -left-1 size-1.5 rotate-45 border-b border-l border-neutral-800 bg-neutral-900" />
          Direct Messages
        </div> */}
      </div>

      <hr className="w-1/2 border-[1.5px] border-neutral-800" />

      <div
        style={{}}
        className="bg-foreground z-[51] flex w-full flex-col gap-2 overflow-x-clip overflow-y-scroll pb-32"
      >
        {servers.map((server) => (
          <ServerBtn
            key={server.id}
            name={server.name}
            url_img={server.picture}
            id={server.id}
            index={servers.indexOf(server)}
            last={servers.indexOf(server) === servers.length - 1}
          />
        ))}
        <AddServerBtn />
        <DiscoverBtn />
      </div>
    </aside>
  );
}
