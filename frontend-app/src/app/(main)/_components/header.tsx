"use client";
import { useServer } from "@/context/serverContext";
import { UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Header() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const server = servers.find((v) => v.id === path[2]);

  return (
    <div className="mx-auto flex h-[36px] items-center gap-2">
      {path[2] === "me" ? (
        <UsersIcon className="size-5" />
      ) : (
        server && (
          <Avatar className="flex size-5 items-center justify-center overflow-hidden rounded-sm bg-indigo-500">
            {server.picture && (
              <AvatarImage src={process.env.HOST_API_PUBLIC + server.picture} />
            )}
            <AvatarFallback>{server.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        )
      )}
      <span className="text-[14px]">
        {path[2] === "me" ? "Friends" : server?.name}
      </span>
    </div>
  );
}
