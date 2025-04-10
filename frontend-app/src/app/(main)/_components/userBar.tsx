"use client";
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";
import { Headphones, Settings } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserBar() {
  const { user, loading } = useAuth();
  const [setting, setSetting] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSetting(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <SettingView setting={setting} />
      <div className="absolute bottom-0 left-0 z-[51] w-[372px] p-2">
        <div className="flex max-h-[56px] w-full items-center justify-center rounded-sm bg-neutral-900 p-2">
          <div className="bg-foreground flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
            <img
              src={`${user?.picture}`}
              alt="user picture"
              className={cn(
                "object-cover",
                user?.picture.endsWith("default_picture.png") && "p-2",
              )}
            />
          </div>
          <div className="group flex grow flex-col pl-3 leading-4 hover:rounded-md hover:bg-neutral-800">
            <h1 className="text-[14px] font-semibold text-white">
              {user?.display_name}
            </h1>
            <p className="text-[14px] text-neutral-400 group-hover:hidden">
              online
            </p>
            <p className="hidden text-[14px] text-neutral-400 group-hover:block">
              {user?.username}
            </p>
          </div>
          <div className="ml-auto flex h-full items-center justify-center gap-0.5 self-end">
            <button className="my-0.5 cursor-pointer rounded-md p-2 text-[14px] text-neutral-400 hover:bg-neutral-800">
              <Headphones className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setSetting(true);
              }}
              className="group my-0.5 flex cursor-pointer items-center justify-center rounded-md p-2 text-[14px] text-neutral-400 hover:bg-neutral-800"
            >
              <Settings className="h-5 w-5 group-hover:animate-spin" />
              <div className="absolute -top-6 hidden rounded-md border border-neutral-700 bg-neutral-800 p-1.5 text-[12px] text-nowrap text-white group-hover:block">
                User Settings
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SettingView({ setting }: { setting: boolean }) {
  if (!setting) return null;
  return (
    <div className="absolute -top-9 z-[99] flex h-[calc(100vh+36px)] w-screen bg-red-200/50">
      <div className="flex w-7/12 bg-neutral-900">
        <div className="h-full min-w-[264px]"></div>
      </div>
      <div className="flex w-full bg-neutral-800">
        <div className="h-full min-w-[850px]"></div>
      </div>
    </div>
  );
}
