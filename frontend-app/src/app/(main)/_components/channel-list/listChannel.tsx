import { useServer } from "@/context/serverContext";
import { cn } from "@/lib/utils";
import { Server } from "http";
import { ChevronDown, Hash, Plus, Settings } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export function ListServer() {
  const path = usePathname();
  const [openText, setOpenText] = useState(true);
  const [openVoice, setOpenVoice] = useState(true);
  const { servers } = useServer();

  return (
    <div className="flex flex-col">
      <div className="flex h-12 items-center justify-between border-b border-neutral-800 px-3 hover:bg-neutral-800">
        <h1>
          {servers.map(
            (server) => server.id == path.split("/")[2] && server.name,
          )}
          {/* {server.name} */}
        </h1>
        <ChevronDown />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col p-3 font-semibold text-neutral-400">
          {servers.some((v) => v.id == path.split("/")[2]) && (
            <div className="mb-1 flex items-center justify-between gap-2 px-2 text-[14px] hover:text-white">
              <h1
                onClick={() => setOpenText(!openText)}
                className="flex cursor-pointer items-center gap-1"
              >
                Text Channels{" "}
                <ChevronDown
                  className={cn(
                    "h-3 w-3 cursor-pointer",
                    openText && "rotate-180",
                  )}
                />
              </h1>
              {(servers.filter((v) => v.id == path.split("/")[2])[0].role ===
                "owner" ||
                "admin") && <Plus className="h-4 w-4 cursor-pointer" />}
            </div>
          )}
          <div className="flex flex-col items-start">
            {servers.map(
              (data) =>
                data.id == path.split("/")[2] &&
                data.room.map((room) =>
                  room.id == path.split("/")[3] ? (
                    <ListChannel
                      key={room.id}
                      id={room.id}
                      name={room.name}
                      role={data.role}
                    />
                  ) : (
                    openText && (
                      <ListChannel
                        key={room.id}
                        id={room.id}
                        name={room.name}
                        role={data.role}
                      />
                    )
                  ),
                ),
            )}
          </div>
        </div>
        <div className="flex flex-col p-3 font-semibold text-neutral-400">
          {servers.some((v) => v.id == path.split("/")[2]) && (
            <div className="mb-1 flex items-center justify-between gap-2 px-2 text-[14px] hover:text-white">
              <h1
                onClick={() => setOpenVoice(!openVoice)}
                className="flex cursor-pointer items-center gap-1"
              >
                Voice Channels{" "}
                <ChevronDown
                  className={cn(
                    "h-3 w-3 cursor-pointer",
                    openVoice && "rotate-180",
                  )}
                />
              </h1>
              {(servers.filter((v) => v.id == path.split("/")[2])[0].role ===
                "owner" ||
                "admin") && <Plus className="h-4 w-4 cursor-pointer" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ListChannel({
  name,
  id,
  role,
}: {
  name: string;
  id: string;
  role: string;
}) {
  const path = usePathname();
  return (
    <button
      onClick={() => redirect(`/channel/${path.split("/")[2]}/${id}`)}
      className={cn(
        "group flex w-full cursor-pointer items-center justify-between rounded-md p-2 py-1 text-sm hover:bg-neutral-800 hover:text-white",
        path.split("/")[3] == id && "bg-neutral-800 text-neutral-200",
      )}
    >
      <span className="flex items-center gap-1">
        <Hash className="mr-1 h-4 w-4" /> {name}
      </span>
      {(role === "owner" || "admin") && (
        <Settings className="hidden h-4 w-4 group-hover:block" />
      )}
    </button>
  );
}
