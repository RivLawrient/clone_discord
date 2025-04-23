"use client";

import { usePathname, useRouter } from "next/navigation";
import UserBar from "../userBar";
import { ListMe } from "./listMe";
import { ListServer } from "./listChannel";

export default function ListChannelBar() {
  const path = usePathname();

  return (
    <>
      {/* <UserBar /> */}
      <div className="aside bg-foreground h-full min-w-[300px] overflow-hidden rounded-l-lg border-t-[1.5px] border-l-[1.5px] border-neutral-800 select-none">
        {path.split("/")[2] == "me" ? <ListMe /> : <ListServer />}
      </div>
    </>
  );
}
