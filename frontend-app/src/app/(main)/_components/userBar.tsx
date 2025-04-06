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
      <div className="w-[372px] z-[51] absolute bottom-0 left-0 p-2">
        <div className="flex p-2 w-full bg-neutral-900 max-h-[56px] rounded-sm items-center justify-center">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-foreground flex items-center justify-center">
            <img
              src={`${user?.picture}`}
              alt="user picture"
              className={cn(
                "object-cover",
                user?.picture.endsWith("default_picture.png") && "p-2"
              )}
            />
          </div>
          <div className="flex group flex-col pl-3 leading-4 grow hover:bg-neutral-800 hover:rounded-md">
            <h1 className="text-white text-[14px] font-semibold">
              {user?.display_name}
            </h1>
            <p className="text-neutral-400 text-[14px] group-hover:hidden">
              online
            </p>
            <p className="text-neutral-400 text-[14px] group-hover:block hidden">
              {user?.username}
            </p>
          </div>
          <div className="ml-auto self-end flex gap-0.5 items-center justify-center h-full ">
            <button className="text-neutral-400 text-[14px] p-2 rounded-md hover:bg-neutral-800 cursor-pointer my-0.5">
              <Headphones className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setSetting(true);
              }}
              className="text-neutral-400 text-[14px] p-2 group flex items-center justify-center rounded-md hover:bg-neutral-800 cursor-pointer my-0.5"
            >
              <Settings className="w-5 h-5 group-hover:animate-spin" />
              <div className="group-hover:block hidden absolute text-white text-[12px] -top-6 text-nowrap p-1.5 rounded-md bg-neutral-800 border border-neutral-700">
                User Settings
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SettingView(props: { setting: boolean }) {
  if (!props.setting) return null;
  return (
    <div className="absolute z-[99] bg-red-200/50 -top-9 w-screen h-[calc(100vh+36px)] flex">
      <div className="bg-neutral-900 w-7/12 flex">
        <div className="min-w-[264px] h-full"></div>
      </div>
      <div className="bg-neutral-800 w-full flex">
        <div className="min-w-[850px] h-full"></div>
      </div>
    </div>
  );
}
