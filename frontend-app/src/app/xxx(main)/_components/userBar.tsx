"use client";
import DarkenHexColor from "@/components/DarkenHexColor";
import { useAuth, User } from "@/context/authContext";
import { cn } from "@/lib/utils";
import { Headphones, LogOutIcon, PencilIcon, Settings } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { SettingView } from "./settings-view/settingView";
import HoverDetail from "./hoverDetail";

export default function UserBar() {
  const { user, setUser } = useAuth();
  const [setting, setSetting] = useState(false);
  const [preview, setPreview] = useState(false);
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

  const [lastActive, setLastActive] = useState(Math.floor(Date.now() / 1000));
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const updateLastActive = () => {
      setLastActive(Math.floor(Date.now() / 1000));
    };

    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, updateLastActive));

    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000); // update tiap detik

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateLastActive),
      );
      clearInterval(interval);
    };
  }, []);

  const fetchOnline = async () => {
    await fetch(`${process.env.HOST_API_PUBLIC}/api/user/online`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        const datas = await res.json();
        const data: User = datas.data;
        if (res.ok) {
          setUser({
            ...user,
            last_active: data.last_active,
            is_online: data.is_online,
          });
        }
      })
      .catch(() => {});
  };

  const fetchOffline = async () => {
    await fetch(`${process.env.HOST_API_PUBLIC}/api/user/offline`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        const datas = await res.json();
        const data: User = datas.data;
        if (res.ok) {
          setUser({
            ...user,
            last_active: data.last_active,
            is_online: data.is_online,
          });
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    const selisih = now - lastActive;
    const batas = 120;
    if (user.is_online && selisih > batas) {
      fetchOffline();
    }
    if (!user.is_online && selisih < batas) {
      fetchOnline();
    }
  }, [now, lastActive]);

  return (
    <>
      <SettingView setting={setting} />
      <div className="absolute bottom-0 left-0 z-[52] w-[372px] p-2 transition-all select-none">
        <div className="relative flex max-h-[56px] w-full items-center justify-center rounded-sm bg-neutral-800 p-2">
          <PreviewProfile show={preview} setShow={setPreview} />
          <div
            onClick={() => setPreview(true)}
            className="flex-rows flex flex-1 cursor-pointer items-center rounded-md hover:bg-neutral-700"
          >
            <div
              style={{
                backgroundColor: DarkenHexColor("#" + user?.id.slice(-6)),
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full"
            >
              <div
                className={cn(
                  "absolute -right-1 -bottom-1 size-5 rounded-full border-4 border-neutral-800",
                  user.is_online ? "bg-green-500" : "bg-gray-500",
                )}
              />
              <img
                src={process.env.HOST_API_PUBLIC + user.picture}
                alt="user picture"
                className={cn(
                  "object-cover",
                  user?.picture.endsWith("default_picture.png") && "p-2",
                )}
              />
            </div>
            <div className="group flex grow flex-col pl-3 leading-4">
              <h1 className="text-[14px] font-semibold text-white">
                {user?.display_name}
              </h1>
              <div className="group flex h-[20px] grow flex-col overflow-hidden leading-4">
                <div className="transition-transform duration-300 group-hover:-translate-y-[20px]">
                  <p className="flex h-[20px] items-center gap-1 text-[14px] text-neutral-400">
                    {user.is_online ? "online" : "offline"}
                  </p>
                  <p className="h-[20px] text-[14px] text-neutral-400">
                    {user?.username}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-auto flex h-full items-center justify-center gap-0.5 self-end">
            <button className="my-0.5 cursor-pointer rounded-md p-2 text-[14px] text-neutral-400 hover:bg-neutral-700 hover:text-white">
              <Headphones className="h-5 w-5" />
            </button>
            <HoverDetail label="User Settings" position="top">
              <button
                onClick={() => {
                  setSetting(true);
                }}
                className="group my-0.5 flex cursor-pointer items-center justify-center rounded-md p-2 text-[14px] text-neutral-400 hover:bg-neutral-700 hover:text-white"
              >
                <Settings className="h-5 w-5 group-hover:animate-spin" />
                {/* <div className="absolute -top-6 hidden rounded-md border border-neutral-700 bg-neutral-700 p-1.5 text-[12px] text-nowrap text-white group-hover:block">
                User Settings
              </div> */}
              </button>
            </HoverDetail>
          </div>
        </div>
      </div>
    </>
  );
}

function PreviewProfile(props: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        props.setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props]);

  if (!props.show) return null;
  return (
    <div
      ref={ref}
      className="absolute bottom-18 w-full overflow-hidden rounded-sm bg-neutral-800 text-white"
    >
      <div
        style={{
          backgroundColor: `${user.banner_color}`,
        }}
        className="h-28 w-full"
      />
      <div className="relative w-full p-6 pt-15">
        <div className="absolute -top-8">
          <div
            style={{
              backgroundColor: DarkenHexColor("#" + user?.id.slice(-6)),
            }}
            className="relative flex size-20 items-center justify-center rounded-full outline-8 outline-neutral-800"
          >
            <div className="absolute right-0 bottom-0 size-4 rounded-full bg-green-500 outline-6 outline-neutral-800" />
            <img
              src={process.env.HOST_API_PUBLIC + user.picture}
              alt="user picture"
              className={cn(
                "object-cover",
                user.picture.endsWith("default_picture.png") && "p-4",
              )}
            />
          </div>
        </div>
        <h1 className="text-[20px] font-semibold">{user.display_name}</h1>
        <div className="flex gap-3">
          <h2 className="text-[12px]">{user.username}</h2>
          <div className="flex size-4 items-center justify-center rounded-full bg-teal-500 text-[12px] text-black">
            #
          </div>
        </div>
        <h1 className="mt-2 text-sm">{user.about_me}</h1>

        <div className="mt-4 rounded-sm bg-neutral-700 p-2">
          <button className="flex w-full rounded-lg p-2 text-sm text-neutral-400 transition-all hover:bg-neutral-600 hover:text-white">
            <PencilIcon className="mr-2 size-5" /> Edit Profile
          </button>
        </div>

        <div className="mt-4 rounded-sm bg-neutral-700 p-2">
          <button className="flex w-full rounded-lg p-2 text-sm text-neutral-400 transition-all hover:bg-neutral-600 hover:text-white">
            <LogOutIcon className="mr-2 size-5" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
