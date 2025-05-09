"use client";

import { usePathname } from "next/navigation";
import InnerSideBarFriend from "./friend/innerSideBarFriend";
import InnerSideBarChannel from "./channel/innerSideBarChannel";
import UserBar from "./userBar";

export default function InnerSideBar() {
  const path = usePathname().split("/");
  return (
    <div className="relative grid w-[300px] grid-rows-[auto_1fr] rounded-tl-lg border-t border-l border-neutral-800">
      {path[2] === "me" ? <InnerSideBarFriend /> : <InnerSideBarChannel />}
      <UserBar />
    </div>
  );
}
