import { SearchIcon } from "lucide-react";

export default function MePage() {
  return (
    <div className="flex flex-col h-full bg-neutral-900 ">
      <div className="min-h-12 w-full border-t border-neutral-700"></div>
      <div className="flex h-full border-t border-neutral-700">
        <div className=" border-r border-neutral-700 w-full p-6">
          <div className="flex items-center gap-2 relative mb-4">
            <input
              type="text"
              placeholder="Search"
              className="bg-foreground rounded-lg p-2 w-full border border-neutral-800 focus:outline-none focus:border-indigo-500"
            />
            <SearchIcon className="w-4 h-4 absolute right-0 mr-2" />
          </div>
          <div className="flex items-center my-4 flex-col">
            <h1 className="text-sm self-start">Online - {1}</h1>
          </div>
    
          {/* friend list */}
          <div className="h-[60px] border-y border-neutral-700 flex items-center justify-start py-3 text-sm hover:border-none hover:bg-neutral-800 cursor-pointer hover:rounded-lg">
            <div className="w-8 h-8 mr-2 bg-neutral-800 rounded-full "></div>
            <div>
              <h1 className="font-bold">John Doe</h1>
              <p className="text-xs text-neutral-400">Online</p>
            </div>
          </div>
        </div>
        <div className="bg-neutral-800 w-96"></div>
      </div>
    </div>
  );
}
