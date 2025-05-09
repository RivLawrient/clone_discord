"use client";

import { useServer } from "@/context/serverContext";
import { UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const server = servers.find((v) => v.id === path[2]);

  return (
    <div className="mx-auto flex h-[36px] items-center gap-2">
      {path[2] === "me" ? (
        <UsersIcon className="size-5" />
      ) : (
        <div className="flex size-5 items-center justify-center rounded-sm bg-indigo-500">
          <span className="text-center">{server?.name[0]}</span>
        </div>
      )}
      <span className="text-[14px]">
        {path[2] === "me" ? "Friends" : server?.name}
      </span>
    </div>
  );
}
