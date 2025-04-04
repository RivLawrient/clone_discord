"use client";
import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function ListChannelBar() {
  const path = usePathname();
  return (
    <div className="aside rounded-l-lg relative w-[380px] h-full bg-foreground border-l-[1.5px] border-t-[1.5px] border-neutral-900">
      {path.split("/")[2] == "me" ? <ListMe /> : <ListServer />}
      {/* <div className="absolute z-50 right-0 top-0 bottom-0 w-1 hover:bg-neutral-700/50" /> */}
    </div>
  );
}

function ListMe() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="p-2 w-full flex flex-col">
      <button
        onClick={() => router.push("/channel/me")}
        className={cn(
          "flex items-center hover:bg-neutral-900 rounded-md p-2 px-4 text-base text-neutral-400 hover:text-neutral-200",
          pathname === "/channel/me" && "bg-neutral-800 text-neutral-200"
        )}
      >
        <UserIcon className="w-5 h-5 mr-2" />
        Friends
      </button>
      <hr className="border-neutral-900 my-2 mx-4 border-[1.5px]" />
    </div>
  );
}

function ListServer() {
  return <div>Server</div>;
}
