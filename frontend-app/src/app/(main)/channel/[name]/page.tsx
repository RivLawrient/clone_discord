"use client";
import { Server, useServer } from "@/context/serverContext";
import { Loader2Icon } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChannelNamePage() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const [loading, setLoading] = useState(true);
  const [currentServer, setCurrentServer] = useState<Server>();
  useEffect(() => {
    if (!servers.some((v) => v.id === path[2])) {
      fetch(`${process.env.HOST_API_PUBLIC}/api/server/${path[2]}`, {
        method: "GET",
        credentials: "include",
      }).then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          // redirect(path + "/" + data.data.room[0].id);
          setCurrentServer(data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } else if (servers.some((v) => v.id === path[2])) {
      servers.map((value) => {
        value.id === path[2] &&
          redirect("/channel/" + path[2] + "/" + value.room[0].id);
      });
    }
  }, []);

  return (
    <div className="flex-1 bg-neutral-900">
      <div
        onClick={(e) => e.target === e.currentTarget && redirect("/channel/me")}
        className="bg-foreground/50 absolute top-0 right-0 bottom-0 left-0 z-[99] flex cursor-pointer items-center justify-center"
      >
        <div className="relative flex w-80 cursor-default flex-col overflow-hidden rounded-lg bg-neutral-800 p-4">
          {currentServer && !loading ? (
            <>
              <div className="absolute top-0 right-0 left-0 h-15 bg-neutral-400" />
              <div className="bg-foreground z-[2] mb-4 flex size-15 items-center justify-center overflow-hidden rounded-xl">
                {currentServer.picture ? (
                  <img
                    src={currentServer.picture}
                    alt=""
                    className="object-cover"
                  />
                ) : (
                  <span>{currentServer.name[0].toUpperCase()}</span>
                )}
              </div>
              <h1 className="text-3xl">{currentServer.name}</h1>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <div className="size-2 rounded-full bg-green-500" />
                <span>123,123 Members</span>
              </div>
              <h2 className="my-4 text-sm leading-tight text-wrap text-neutral-400">
                {currentServer.description}
              </h2>
              <button className="my-2 cursor-pointer rounded-lg bg-indigo-500 p-2 px-6 py-2 text-sm text-white transition-all hover:bg-indigo-800/80">
                Join Server
              </button>
            </>
          ) : !currentServer && !loading ? (
            <>
              <div className="flex-1 text-center">Server is Not Found</div>
              <button
                onClick={() => redirect("/channel/me")}
                className="my-2 cursor-pointer rounded-lg bg-indigo-500 p-2 px-6 py-2 text-sm text-white transition-all hover:bg-indigo-800/80"
              >
                Back
              </button>
            </>
          ) : (
            <div className="flex flex-1 justify-center">
              <Loader2Icon className="animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
