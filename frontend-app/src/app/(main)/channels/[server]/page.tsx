"use client";
import { useServer } from "@/context/serverContext";
import { redirect, usePathname } from "next/navigation";

export default function Page() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const server = servers.find((v) => v.id === path[2]);

  if (server) {
    if (server.channel.text[0]) {
      redirect(`/channels/${path[2]}/${server.channel.text[0].id}`);
    }

    return <div>not found</div>;
  }
  redirect("/channels/me");
}
