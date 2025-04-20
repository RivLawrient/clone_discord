"use client";
import HeaderChat from "@/app/(main)/_components/chat-room/headerChat";
import InputChat from "@/app/(main)/_components/chat-room/inputChat";
import ListChat from "@/app/(main)/_components/chat-room/listChat";
import { useServer } from "@/context/serverContext";
import { redirect, usePathname } from "next/navigation";

export default function ChannelRoomPage() {
  const path = usePathname().split("/");
  const { servers } = useServer();

  if (!servers.some((v) => v.id === path[2])) redirect("/channel/" + path[2]);

  if (
    !servers
      .filter((v) => v.id === path[2])[0]
      .room.some((v) => v.id === path[3])
  )
    return (
      <div className="flex-1 bg-neutral-900 text-center">Channel not found</div>
    );

  return (
    <div className="flex flex-1 flex-col">
      <HeaderChat />
      <ListChat />
      <InputChat />
    </div>
  );
}
