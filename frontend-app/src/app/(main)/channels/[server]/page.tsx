"use client";
import { useServer } from "@/context/serverContext";
import { redirect, usePathname } from "next/navigation";

export default function Page() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const server = servers.find((v) => v.id === path[2]);

  return redirect(`/channels/${path[2]}/${server?.channel[0].id}`);
}
