"use client";
import { useServer } from "@/context/serverContext";
import ServerBtn from "./serverBtn";

export default function SideBarServer() {
  const { servers } = useServer();
  return (
    <div className="grid min-h-0 w-[72px] grid-rows-[auto_auto_1fr]">
      <ServerBtn logo="dm" />

      <hr className="mx-auto my-2 w-8 rounded-full border-neutral-700/70" />
      <div className="flex flex-col gap-2 overflow-y-scroll pb-20 [&::-webkit-scrollbar]:w-0">
        {servers.map((v) => (
          <ServerBtn key={v.id} logo="server" server={v} />
        ))}
        <ServerBtn logo="add" />
      </div>
    </div>
  );
}
