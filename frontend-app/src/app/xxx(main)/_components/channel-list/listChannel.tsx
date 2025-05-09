import { useServer } from "@/context/serverContext";
import { cn } from "@/lib/utils";
import { ChevronDown, Hash, Plus, Settings } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import AddChannelModal from "../add-channel/addChannelModal";

export function ListServer() {
  const path = usePathname();
  const [openText, setOpenText] = useState(true);
  const [openVoice, setOpenVoice] = useState(true);
  const { servers } = useServer();
  const [showModal, setShowModal] = useState(false);

  const role = servers.find((v) => v.id === path.split("/")[2])?.role;

  return (
    <>
      <AddChannelModal
        isOpen={showModal}
        onClose={() => setShowModal(!showModal)}
      />
      <div className="flex flex-col">
        <div className="flex h-12 items-center justify-between border-b border-neutral-800 px-3 hover:bg-neutral-800">
          <h1>
            {servers.map(
              (server) => server.id == path.split("/")[2] && server.name,
            )}
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
                {(role === "owner" || role === "admin") && (
                  <Plus
                    onClick={() => setShowModal(!showModal)}
                    className="h-4 w-4 cursor-pointer"
                  />
                )}
              </div>
            )}
            <div className="flex flex-col items-start">
              {/* {servers.map(
                (data) =>
                  data.id == path.split("/")[2] &&
                  data.room.map((room) =>
                    room.id === path.split("/")[3] ? (
                      <ListChannel
                        key={room.id}
                        id={room.id}
                        name={room.name}
                        role={role}
                      />
                    ) : (
                      openText && (
                        <ListChannel
                          key={room.id}
                          id={room.id}
                          name={room.name}
                          role={role}
                        />
                      )
                    ),
                  ),
              )} */}
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
                {(role === "owner" || role === "admin") && (
                  <Plus
                    onClick={() => setShowModal(!showModal)}
                    className="h-4 w-4 cursor-pointer"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ListChannel({
  name,
  id,
  role,
}: {
  name: string;
  id: string;
  role: string | undefined;
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
      <span className="flex min-w-0 flex-1 items-center gap-1">
        <Hash className="mr-1 size-5 flex-shrink-0" />
        <span className="truncate">{name}</span>
      </span>
      {(role === "owner" || role === "admin") && (
        <Settings className="hidden h-4 w-4 group-hover:block" />
      )}
    </button>
  );
}
