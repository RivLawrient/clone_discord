import { cn } from "@/lib/utils";
import { CompassIcon } from "lucide-react";
import { useState } from "react";
import DiscoverModal from "./discoverModal";

export default function DiscoverBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <DiscoverModal isOpen={isOpen} onClose={closeModal} />
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <button
          onClick={openModal}
          className="peer flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gray-800 hover:bg-indigo-500"
        >
          <CompassIcon className="" />
        </button>
        <div
          className={cn(
            "absolute left-0 h-5 w-0 rounded-r-lg bg-white transition-all peer-hover:w-1",
          )}
        />
        <div className="absolute left-17 z-[51] hidden items-center rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-[14px] font-semibold text-nowrap peer-hover:flex">
          <div className="absolute -left-1 size-1.5 rotate-45 border-b border-l border-neutral-800 bg-neutral-900" />
          Discover
        </div>
      </div>
    </>
  );
}
