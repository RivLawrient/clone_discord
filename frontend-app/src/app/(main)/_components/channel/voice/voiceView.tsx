"use client";

import { useServer } from "@/context/serverContext";
import { usePathname } from "next/navigation";

export default function VoiceView() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const voice = servers
    .filter((v) => v.id === path[2])[0]
    .channel.voice.filter((v) => v.id === path[3])[0];

  return <div>voice {voice.name}</div>;
}
