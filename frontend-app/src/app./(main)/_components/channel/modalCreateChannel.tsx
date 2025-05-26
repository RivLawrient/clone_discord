"use client";
import { HashIcon, Volume2Icon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { Text, useServer } from "@/context/serverContext";

export function ModalCreateChannel(props: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [choise, setChoise] = useState("text");
  const [text, setText] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const path = usePathname().split("/");
  const { setServers } = useServer();
  const [loading, setLoading] = useState(false);

  const ch = ["text", "voice"];
  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, 0);
  }, [props.modal]);

  const newChannel = () => {
    setLoading(true);
    choise === "text"
      ? fetch(`${process.env.HOST_API_PUBLIC}/api/text_channel/${path[2]}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: text,
          }),
        })
          .then(async (res) => {
            const resp = await res.json();
            const data: Text = resp.data;
            // if (res.ok) {
            //   setServers((p) =>
            //     p.map((v) =>
            //       v.id === path[2]
            //         ? {
            //             ...v,
            //             channel: {
            //               ...v.channel,
            //               text: [...v.channel.text, data],
            //             },
            //           }
            //         : v,
            //     ),
            //   );
            // }
            setText("");
            setLoading(false);
            props.setModal(false);
          })
          .catch(() => {})
      : fetch(`${process.env.HOST_API_PUBLIC}/api/voice_channel/${path[2]}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: text,
          }),
        })
          .then(async (res) => {
            const resp = await res.json();
            const data: Text = resp.data;
            // if (res.ok) {
            //   setServers((p) =>
            //     p.map((v) =>
            //       v.id === path[2]
            //         ? {
            //             ...v,
            //             channel: {
            //               ...v.channel,
            //               voice: [...v.channel.voice, data],
            //             },
            //           }
            //         : v,
            //     ),
            //   );
            // }
            setText("");
            setLoading(false);
            props.setModal(false);
          })
          .catch(() => {});
  };

  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 bg-black/50"></DialogOverlay>
      <DialogContent className="fixed top-1/2 left-1/2 min-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-neutral-700/70 bg-neutral-800 p-4 px-6 text-white">
        <DialogClose asChild>
          <XIcon className="absolute top-0 right-0 m-5 cursor-pointer text-neutral-400 transition-all hover:text-white" />
        </DialogClose>
        <DialogTitle className="my-2 text-2xl font-bold">
          Create Channel
        </DialogTitle>
        <DialogDescription></DialogDescription>
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
        <div className="flex flex-row items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900 p-2 focus-within:border-indigo-500">
          {choise === "text" ? (
            <HashIcon className="size-5 stroke-neutral-400" />
          ) : (
            <Volume2Icon className="size-5 shadow-neutral-400" />
          )}

          <input
            type="text"
            placeholder="new-channel"
            className="flex-1 outline-none"
            maxLength={30}
            value={text}
            ref={ref}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="mt-6 flex flex-row items-center justify-end gap-2 text-xs font-semibold">
          <DialogClose asChild>
            <button className="cursor-pointer rounded-sm p-2 px-4 text-indigo-500 hover:underline">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={newChannel}
            disabled={loading || text === ""}
            className="cursor-pointer rounded-sm bg-indigo-500 p-3 px-4 text-white disabled:cursor-default disabled:opacity-50"
          >
            Create Channel
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  );
}
