"use client";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
// import { DropDownSideBarChannel } from "./dropDownSideBarChannel";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
// import { ModalCreateChannel } from "./modalCreateChannel";
import { Server, useServer } from "@/context/serverContext";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ChannelBtn from "./channelBtn";
import DropDownSideBarChannel from "./dropDownSideBarChannel";

export default function InnerSideBarChannel() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const server = servers.filter((v) => v.id === path[2])[0];

  if (server)
    return (
      <>
        <DropDownSideBarChannel server={server} />
        <div className="flex min-h-0 min-w-0 flex-col gap-4 overflow-y-scroll p-3 pb-20 [&::-webkit-scrollbar]:w-0">
          {/* <GroupList variant="text" server={server} id={path[3]} /> */}
          {/* <GroupList variant="voice" server={server} id={path[3]} /> */}
        </div>
      </>
    );
}

function GroupList(props: {
  variant: "text" | "voice";
  server: Server;
  id: string;
}) {
  const [modal, setModal] = useState(false);
  const [hide, setHide] = useState(false);
  const data = (
    props.variant === "text"
      ? props.server.channel.text
      : props.server.channel.voice
  ).filter((v) => (hide ? v.id === props.id : v));

  return (
    <div className="text-neutral-400 select-none">
      <h1 className="flex cursor-pointer items-center px-2 text-[14px] hover:text-white">
        <div
          onClick={() => setHide(!hide)}
          className="flex flex-1 items-center"
        >
          <span>
            {props.variant.toUpperCase()[0] + props.variant.slice(1)} Channels
          </span>
          <ChevronDownIcon
            className={cn(
              "mr-auto ml-1 size-4 transition-all",
              hide && "-rotate-90",
            )}
          />
        </div>
        {props.server.is_owner ? (
          // <HoverDetail label="Create Channel" position="top">
          // <TooltipTrigger>
          <Dialog onOpenChange={(v) => setModal(v)} open={modal}>
            <DialogTrigger asChild>
              <PlusIcon className="size-4 cursor-pointer text-neutral-400 hover:text-white" />
            </DialogTrigger>
            {/* <ModalCreateChannel modal={modal} setModal={setModal} /> */}
          </Dialog>
        ) : // </TooltipTrigger>
        // </HoverDetail>
        null}
      </h1>

      {data.map((v) => (
        <ChannelBtn key={v.id} data={v} variant={props.variant} />
      ))}
    </div>
  );
}
