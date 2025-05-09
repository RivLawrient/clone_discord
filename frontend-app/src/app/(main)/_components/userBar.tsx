"use client";
import DarkenHexColor from "@/components/DarkenHexColor";
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";
import {
  HeadphoneOffIcon,
  HeadphonesIcon,
  LogOutIcon,
  MicIcon,
  MicOffIcon,
} from "lucide-react";
import { useState } from "react";
import HoverDetail from "./hoverDetail";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export default function UserBar() {
  const { user } = useAuth();
  return (
    <div className="absolute right-2 bottom-0 -left-[72px] z-10 my-2 ml-2 flex w-auto rounded-sm border border-neutral-800 bg-neutral-900 p-2">
      <div
        style={{
          borderStartStartRadius: "24px",
          borderEndStartRadius: "24px",
          borderStartEndRadius: "8px",
          borderEndEndRadius: "8px",
        }}
        className="group mr-2 grid flex-1 cursor-pointer grid-cols-[auto_1fr] items-center gap-2 hover:bg-neutral-700/50"
      >
        <UserPicture
          url={process.env.HOST_API_PUBLIC + user.picture}
          id={user.id}
          is_online={user.is_online}
          className=""
        />
        <div className="group grid grid-rows-2">
          <div className="flex h-4 min-w-0 items-end">
            <span className="truncate text-[14px] leading-none font-semibold">
              {user.display_name}
            </span>
          </div>
          <div className="flex h-4 flex-col overflow-hidden text-neutral-400">
            <div className="flex min-w-0 flex-col transition-transform duration-200 group-hover:-translate-y-4">
              <span className="truncate text-xs leading-4">Online</span>
              <span className="truncate text-xs leading-4">
                {user.username}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div></div>
      <div className="flex gap-1">
        <AttributeBtn variant="mic" />
        <AttributeBtn variant="speaker" />
        <AttributeBtn variant="logout" />
      </div>
    </div>
  );
}

function AttributeBtn(props: { variant: "mic" | "speaker" | "logout" }) {
  const [mic, setMic] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const { logout } = useAuth();

  const labelMap = {
    mic: `Turn ${mic ? "Off" : "On"} Microphone`,
    speaker: `${speaker ? "Deafen" : "Undeafen"}`,
    logout: "Log Out",
  };

  const micHandle = () => {
    setMic(!mic);
  };

  const speakerHandle = () => {
    setSpeaker(!speaker);
  };

  const logoutHandle = () => {
    logout();
  };
  return (
    <HoverDetail label={labelMap[props.variant]} position="top">
      <TooltipTrigger
        onClick={
          props.variant === "mic"
            ? micHandle
            : props.variant === "speaker"
              ? speakerHandle
              : logoutHandle
        }
        className={cn(
          "group m-auto flex size-[32px] cursor-pointer items-center justify-center rounded-sm text-neutral-400 transition-all hover:bg-neutral-700/50 hover:text-white",
          props.variant === "mic" &&
            !mic &&
            "bg-red-500/20 hover:bg-red-500/30",
          props.variant === "speaker" &&
            !speaker &&
            "bg-red-500/20 hover:bg-red-500/30",
        )}
      >
        {props.variant === "mic" &&
          (mic ? (
            <MicIcon className="size-5" />
          ) : (
            <MicOffIcon className="size-5 scale-x-[-1] text-red-500" />
          ))}
        {props.variant === "speaker" &&
          (speaker ? (
            <HeadphonesIcon className="size-5" />
          ) : (
            <HeadphoneOffIcon className="size-5 scale-x-[-1] text-red-500" />
          ))}
        {props.variant === "logout" && (
          <LogOutIcon className="size-5 group-hover:text-red-500" />
        )}
      </TooltipTrigger>
    </HoverDetail>
  );
}

function UserPicture(props: {
  url: string;
  id: string;
  is_online: boolean;
  className?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: DarkenHexColor("#" + props.id.slice(-6)),
      }}
      className="relative flex size-10 rounded-full"
    >
      <div
        className={cn(
          "absolute -right-0 -bottom-0 size-3 rounded-full",
          props.className,
          !props.is_online ? "bg-green-500" : "bg-gray-500",
        )}
      />
      <img
        src={props.url}
        alt=""
        className={cn(
          "self-center object-cover",
          props.url.endsWith("default_picture.png") && "p-2",
        )}
      />
    </div>
  );
}
