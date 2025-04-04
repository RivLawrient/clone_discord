"use client";
import { useChannel } from "@/context/channelContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AddServerModal } from "./addServerBtn";

export default function HeaderBar() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const { channels } = useChannel();
  useEffect(() => {
    if (pathname.split("/").pop() != "me") {
      setName(pathname.split("/")[2]);
    } else {
      setName("friend");
    }
  }, [pathname]);
  return (
    <header className="header h-[36px] w-full bg-foreground text-white flex items-center justify-center">
      {channels.map((channel) => {
        if (channel.id == pathname.split("/").pop()) {
          return <div key={channel.id}>{channel.name}</div>;
        }
      })}
    </header>
  );
}
