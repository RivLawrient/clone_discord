"use client";
import { useServer } from "@/context/serverContext";
import ServerBtn from "./server/serverBtn";
import { PlusCircleIcon } from "lucide-react";
// import ServerBtn from "./serverBtn";

export default function SideBar() {
  const { servers } = useServer();
  return (
    <div className="grid min-h-0 w-[72px] grid-rows-[auto_auto_1fr]">
      <ServerBtn destination="/channels/me" tooltip="Direct Messages" isSelect>
        <img src="/dc.png" className="object-cover p-2" />
      </ServerBtn>

      <hr className="mx-auto my-2 w-8 rounded-full border-neutral-700/70" />
      <div className="flex flex-col gap-2 overflow-y-scroll pb-20 [&::-webkit-scrollbar]:w-0">
        {servers.map((v) => (
          <ServerBtn
            key={v.id}
            destination={"/channels/" + v.id}
            isSelect
            tooltip={v.name}
            server={v}
          />
        ))}
        <ServerBtn tooltip="Add a Server">
          <PlusCircleIcon className="m-auto " />
        </ServerBtn>
      </div>
    </div>
  );
}
