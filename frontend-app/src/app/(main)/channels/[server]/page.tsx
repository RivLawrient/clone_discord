"use client";
import { useServer } from "@/context/serverContext";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const server = servers.find((v) => v.id === path[2]);
  const router = useRouter();

  if (server) {
    if (server.channel.text[0]) {
      router.push(`/channels/${path[2]}/${server.channel.text[0].id}`);
    }

    return <div>not found</div>;
  }
  return router.push("/channels/me");
}
