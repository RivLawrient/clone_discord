import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";
import { Dispatch, JSX, SetStateAction, useState } from "react";

export function SettingView({ setting }: { setting: boolean }) {
  const [view, setView] = useState("My Account");
  const { logout } = useAuth();

  const select: Record<string, () => JSX.Element> = {
    "My Account": MyAccountView,
    Profiles: ProfilesView,
  };

  if (!setting) return null;
  return (
    <div className="absolute z-[99] flex h-screen w-screen bg-red-200/50">
      <div className="flex w-7/12 justify-end bg-neutral-900">
        <div className="h-full min-w-[264px] py-16 pr-2 text-white">
          <div className="flex flex-col gap-1">
            <span className="px-2 text-[12px] font-semibold text-neutral-400">
              USER SETTINGS
            </span>
            <BtnSelect placeholder="My Account" view={view} setView={setView} />
            <BtnSelect placeholder="Profiles" view={view} setView={setView} />
            <hr className="m-2 border border-neutral-700/50" />
            <button
              onClick={logout}
              className="flex cursor-pointer items-center justify-between rounded-sm p-2 py-1.5 text-start text-neutral-400 transition-all hover:bg-neutral-700 hover:text-white"
            >
              Log out
              <LogOutIcon className="size-5" />
            </button>
            <hr className="m-2 border border-neutral-700/50" />
          </div>
        </div>
      </div>
      <div className="flex w-full bg-neutral-800">
        <div className="h-full min-w-[850px] px-8 py-16">{select[view]()}</div>
      </div>
    </div>
  );
}

function MyAccountView() {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-semibold">My Account</h1>
    </div>
  );
}

function ProfilesView() {
  return (
    <div className="text-white">
      <h1 className="mb-6 text-xl font-semibold">Profiles</h1>
      <div>tes</div>
    </div>
  );
}
function BtnSelect(props: {
  placeholder: string;
  view: string;
  setView: Dispatch<SetStateAction<string>>;
}) {
  return (
    <button
      onClick={() => props.setView(props.placeholder)}
      type="button"
      className={cn(
        "cursor-pointer rounded-sm p-2 py-1.5 text-start text-neutral-400 transition-all hover:bg-neutral-700 hover:text-white",
        props.view === props.placeholder && "bg-neutral-800 text-white",
      )}
    >
      {props.placeholder}
    </button>
  );
}
