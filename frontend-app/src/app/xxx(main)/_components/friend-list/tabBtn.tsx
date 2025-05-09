import { useFriend } from "@/context/friendContext";
import { tab } from "../../channel/me/page";
import { cn } from "@/lib/utils";

interface tabBtnProps {
  tab: tab;
  onClick: () => void;
  label: string;
}

export function TabBtn(props: tabBtnProps) {
  const { friends } = useFriend();
  return (
    <>
      <button
        onClick={props.onClick}
        className={cn(
          "flex cursor-pointer items-center justify-center rounded-lg px-3 py-1 transition-all",
          props.tab === props.label.toLowerCase()
            ? "bg-neutral-700 text-white hover:bg-neutral-600"
            : "text-neutral-400 hover:bg-neutral-800 hover:text-white",
        )}
      >
        {props.label}
        {props.label == "Pending" && friends.request.length != 0 && (
          <div className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white">
            {friends.request.length}
          </div>
        )}
      </button>
    </>
  );
}
