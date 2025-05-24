import { User2Icon } from "lucide-react";

export default function InnerSideBarFriend() {
  return (
    <>
      <div className="h-12 border-b border-neutral-700/70 px-3 py-2">
        <div className="flex size-full items-center justify-center rounded-sm bg-neutral-800 text-sm">
          Find or start a conversation
        </div>
      </div>
      <div className="flex flex-col p-2">
        <button className="flex cursor-pointer gap-2 rounded-sm bg-neutral-800 p-2 hover:bg-neutral-800/50">
          <User2Icon />
          <span>Friends</span>
        </button>
      </div>
    </>
  );
}
