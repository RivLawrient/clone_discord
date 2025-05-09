"use client";
import { Channel, Server, useServer, Voice } from "@/context/serverContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { redirect, usePathname } from "next/navigation";
import {
  ChevronDownIcon,
  HashIcon,
  LogOutIcon,
  PlusIcon,
  Trash2Icon,
  Volume2Icon,
  XIcon,
} from "lucide-react";
import HoverDetail from "../hoverDetail";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function InnerSideBarChannel() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const server = servers.find((v) => v.id === path[2]);

  if (server)
    return (
      <>
        <DropDownSideBarChannel server={server} />
        <div className="flex min-w-0 flex-col gap-4 p-3">
          <GroupList variant="text" server={server} />
          <GroupList variant="voice" server={server} />
        </div>
      </>
    );
}

function GroupList(props: { variant: "text" | "voice"; server: Server }) {
  const data =
    props.variant === "text" ? props.server.channel : props.server.voice;

  return (
    <div className="text-neutral-400">
      <h1 className="flex cursor-pointer items-center px-2 text-[14px] hover:text-white">
        <span>
          {props.variant.toUpperCase()[0] + props.variant.slice(1)} Channels
        </span>
        <ChevronDownIcon className="mr-auto ml-1 size-4" />
        <HoverDetail label="Create Channel" position="top">
          <TooltipTrigger>
            <PlusIcon className="size-4 cursor-pointer text-neutral-400 hover:text-white" />
          </TooltipTrigger>
        </HoverDetail>
      </h1>

      {data.map((v) => (
        <ChannelBtn key={v.id} data={v} variant={props.variant} />
      ))}
    </div>
  );
}

function ChannelBtn(props: {
  data: Channel | Voice;
  variant: "text" | "voice";
}) {
  const [text, setText] = useState(props.data.name);
  const path = usePathname().split("/");
  const [editAble, setEditAbel] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editAble && ref.current) {
      ref.current.focus();
    }
  }, [editAble]);

  return (
    <button
      onClick={() => redirect(`/channels/${path[2]}/${props.data.id}`)}
      className={cn(
        "group grid w-full min-w-0 cursor-pointer grid-cols-[auto_1fr_auto] items-center rounded-sm px-2 py-1 text-start text-[16px] hover:bg-neutral-800 hover:text-white",
        path[3] === props.data.id && "bg-neutral-800 text-white",
      )}
    >
      {props.variant === "text" ? (
        <HashIcon
          className={cn(
            "mr-2 size-5 text-neutral-400",
            path[3] === props.data.id && "text-white opacity-100",
          )}
        />
      ) : (
        <Volume2Icon
          className={cn(
            "mr-2 size-5 text-neutral-400",
            path[3] === props.data.id && "text-white opacity-100",
          )}
        />
      )}
      {!editAble ? (
        <span
          onDoubleClick={() => setEditAbel(true)}
          className="mr-1 flex-1 cursor-text truncate text-[15px]"
        >
          {text}
        </span>
      ) : (
        <input
          ref={ref}
          value={text}
          onBlur={() => setEditAbel(false)}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="mr-1 flex-1 truncate text-[15px] outline-none"
        />
      )}
      <HoverDetail label="Delete" position="top">
        <TooltipTrigger asChild>
          <Trash2Icon
            className={cn(
              "size-5 text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-red-500",
              path[3] === props.data.id && "text-white opacity-100",
            )}
          />
        </TooltipTrigger>
      </HoverDetail>
    </button>
  );
}

function DropDownSideBarChannel(props: { server: Server }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group grid h-12 min-w-0 cursor-pointer grid-cols-[1fr_auto] items-center rounded-ss-md border-b border-neutral-800 px-4 outline-none hover:bg-neutral-900 data-[state=open]:bg-neutral-900">
        <span className="max-w-full justify-self-start truncate text-[16px] leading-none font-semibold">
          {props.server.name}
        </span>
        <ChevronDownIcon className="size-5 text-neutral-400 group-data-[state=open]:hidden" />
        <XIcon className="size-5 text-neutral-400 group-data-[state=closed]:hidden" />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5}>
        <div className="min-w-[200px] rounded-lg border border-neutral-800 bg-neutral-900 p-2">
          <button className="grid w-full cursor-pointer grid-cols-[1fr_auto] rounded-sm p-1 text-sm font-semibold text-red-500 hover:bg-red-500/10">
            <span className="text-start">Leave Server </span>
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
