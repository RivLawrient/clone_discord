"use client";
import { useServer } from "@/context/serverContext";
import ServerBtn from "./serverBtn";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";

export default function SideBarServer() {
  const { servers } = useServer();
  return (
    <div className="grid min-h-0 w-[72px] grid-rows-[auto_auto_1fr]">
      <ServerBtn logo="dm" />

      <hr className="mx-auto my-2 w-8 rounded-full border-neutral-800" />
      <div className="flex flex-col gap-2 overflow-y-scroll pb-20 [&::-webkit-scrollbar]:w-0">
        {servers.map((v) => (
          <ServerBtn key={v.id} logo="server" server={v} />
        ))}
        {/* {Array.from({ length: 11 }).map((_, i) => (
          <ServerBtn
            logo="server"
            server={{
              id: i.toString(),
              name: i.toString(),
              created_at: new Date().toString(),
              description: i.toString(),
              invite_code: "",
              is_private: false,
              member: 0,
              picture: "",
              role: "",
              room: [],
              updated_at: "",
            }}
            key={i}
          />
        ))} */}

        <ServerBtn logo="add" />
      </div>
    </div>
  );
}
