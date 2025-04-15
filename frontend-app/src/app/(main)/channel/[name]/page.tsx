"use client";
import { useServer } from "@/context/serverContext";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChannelNamePage() {
  const path = usePathname().split("/")[2];
  const { servers } = useServer();
  const [found, setFound] = useState(false);
  useEffect(() => {
    servers.map((value) => {
      value.id == path
        ? redirect(path + "/" + value.room[0].id)
        : fetch(`${process.env.HOST_API_PUBLIC}/api/my_server/${path}`, {
            method: "GET",
            credentials: "include",
          }).then(async (res) => {
            if (res.ok) {
              const data = await res.json();
              redirect(path + "/" + data.data.room[0].id);
            } else {
              setFound(true);
            }
          });
    });
  }, []);

  if (!found) {
    return <PopUp />;
  }
  return <div>{path}</div>;
}

function PopUp() {
  return (
    <div className="absolute top-1/2 left-1/2 z-50 flex h-96 w-96 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-neutral-800 text-white">
      <div className="flex h-full w-full items-center justify-center text-xl font-bold">
        Loading...
      </div>
    </div>
  );
}
