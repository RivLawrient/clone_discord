"use client";
import { usePathname } from "next/navigation";

export default function ChannelRoomPage() {
  const path = usePathname().split("/")[3];

  return <div>{path}</div>;
}
