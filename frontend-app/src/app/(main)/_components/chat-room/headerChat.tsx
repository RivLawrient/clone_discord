import { useServer } from "@/context/serverContext";
import { HashIcon, UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HeaderChat() {
  const path = usePathname();
  const { servers } = useServer();
  return (
    <div className="flex min-h-12 items-center border-b border-neutral-700 bg-neutral-900 px-4">
      <HashIcon className="stroke-neutral-500" />
      <label className="ml-2 flex-1">
        {servers.map(
          (value) =>
            value.id == path.split("/")[2] &&
            value.room.map(
              (values) => values.id == path.split("/")[3] && values.name,
            ),
        )}
      </label>
      <div className="group relative cursor-pointer">
        <UsersIcon className="size-5 stroke-neutral-400" />
        <HoverMemberBtn />
      </div>
    </div>
  );
}

function HoverMemberBtn() {
  return (
    <div className="absolute right-0 -bottom-8 hidden rounded-sm border border-neutral-700 bg-neutral-800 p-1 text-xs text-nowrap group-hover:block">
      Show Member List
      
    </div>
  );
}
