import { useServer } from "@/context/serverContext";
import { cn } from "@/lib/utils";
import { HashIcon, Volume2Icon, X, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Tooltip } from "recharts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddChannelModal(props: Props) {
  const [choise, setChoise] = useState("text");
  const [text, setText] = useState("");
  const path = usePathname().split("/");
  const { servers, setServers } = useServer();

  const createHandle = async () => {
    await fetch(`${process.env.HOST_API_PUBLIC}/api/room_server`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: text,
        server_id: path[2],
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setServers(
            servers.map((v) =>
              v.id === path[2] ? { ...v, room: [...v.room, data.data] } : v,
            ),
          );
          props.onClose();
        }
      })
      .catch(() => {});
  };

  const ch = ["text", "voice"];
  if (!props.isOpen) return null;
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
        }
      }}
      className="absolute top-0 right-0 bottom-0 left-0 z-[99] flex items-center justify-center bg-black/50"
    >
      <div className="relative min-w-[500px] rounded-lg bg-neutral-800 p-4 px-6">
        <XIcon
          onClick={props.onClose}
          className="absolute top-0 right-0 m-5 cursor-pointer stroke-stone-400 transition-all hover:stroke-white"
        />
        <h1 className="text-xl">Create Channel</h1>
        <h2 className="text-[12px]">
          in {choise === "text" ? "Text" : "Voice"} Channels
        </h2>
        <h1 className="mt-4 mb-1">Channel Type</h1>
        <div className="flex flex-col gap-2">
          {ch.map((value) => (
            <div
              key={value}
              onClick={() => setChoise(value)}
              className={cn(
                "flex cursor-pointer flex-row items-center rounded-sm p-2 px-4 hover:bg-neutral-700",
                choise === value ? "bg-neutral-700" : "",
              )}
            >
              <div
                className={cn(
                  "mr-2 size-6 rounded-full border-neutral-400",
                  choise === value
                    ? "border-[7px] border-indigo-500 bg-white"
                    : "border",
                )}
              />
              {value === "text" ? (
                <HashIcon className="stroke-neutral-400" />
              ) : (
                <Volume2Icon className="stroke-neutral-400" />
              )}

              <div className="ml-4 flex flex-col">
                <h1>{value === "text" ? "Text" : "Voice"}</h1>
                <h2 className="text-xs">
                  {value === "text"
                    ? "Send messages, images, GIFs, emoji, opinions, and puns "
                    : "Hang out together with voice, video, and screen share"}
                </h2>
              </div>
            </div>
          ))}
        </div>
        <h1 className="mt-6 mb-2 text-xs font-semibold">CHANNEL NAME</h1>
        <div className="flex flex-row items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 p-2">
          {choise === "text" ? (
            <HashIcon className="size-5 stroke-neutral-400" />
          ) : (
            <Volume2Icon className="size-5 shadow-neutral-400" />
          )}

          <input
            type="text"
            placeholder="new-channel"
            className="flex-1 outline-none"
            maxLength={25}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="mt-6 flex flex-row items-center justify-end gap-2 text-xs font-semibold">
          <button
            onClick={props.onClose}
            className="cursor-pointer rounded-sm p-2 px-4 text-indigo-500 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={createHandle}
            disabled={text === ""}
            className="cursor-pointer rounded-sm bg-indigo-500 p-3 px-4 text-white disabled:cursor-default disabled:opacity-50"
          >
            Create Channel
          </button>
        </div>
      </div>
    </div>
  );
}
