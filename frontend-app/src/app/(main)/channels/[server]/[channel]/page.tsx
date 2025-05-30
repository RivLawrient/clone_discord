"use client";
import ChatView from "@/app/(main)/_components/channel/chat/chatView";
import VoiceView from "@/app/(main)/_components/channel/voice/voiceView";
import { useServer } from "@/context/serverContext";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const server = servers.find((v) => v.id === path[2]);
  const router = useRouter();

  useEffect(() => {
    if (
      !servers
        .filter((v) => v.id === path[2])[0]
        .channel.text.find((v) => v.id === path[3]) &&
      !servers
        .filter((v) => v.id === path[2])[0]
        .channel.voice.find((v) => v.id === path[3])
    ) {
      router.push("/channels/" + path[2]);
    }
  }, [servers]);

  if (server) {
    const chat = server.channel.text.find((v) => v.id === path[3]);
    if (chat) {
      return <ChatView />;
    } else if (server && server.channel.voice.find((v) => v.id === path[3])) {
      return <VoiceView />;
    } else if (!server.channel.text.find((v) => v.id === path[3])) {
      return <div>chat not found</div>;
    }
  }
  // router.push("/channels/me");
  // return <></>;
  return redirect("/channels/me");
}
