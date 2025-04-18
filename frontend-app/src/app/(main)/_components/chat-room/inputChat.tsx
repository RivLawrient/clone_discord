import { PlusCircleIcon } from "lucide-react";

export default function InputChat() {
  return (
    <div className="bg-neutral-900 px-4 pb-6">
      <div className="flex min-h-12 items-center rounded-lg bg-neutral-800 px-4">
        <PlusCircleIcon />
        <input
          placeholder="Channel ini"
          type="text"
          className="ml-4 flex-1 outline-none"
        />
      </div>
    </div>
  );
}
