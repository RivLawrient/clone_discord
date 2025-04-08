import { SearchIcon } from "lucide-react";
import getFriend from "../../_getData/getFriend";

export default async function MePage() {
  const datas = await getFriend();

  return (
    <div className="flex h-full flex-col bg-neutral-900">
      <div className="min-h-12 w-full border-t border-neutral-700"></div>
      <div className="flex h-full border-t border-neutral-700">
        <div className="w-full border-r border-neutral-700 p-6">
          <div className="relative mb-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              className="bg-foreground w-full rounded-lg border border-neutral-800 p-2 focus:border-indigo-500 focus:outline-none"
            />
            <SearchIcon className="absolute right-0 mr-2 h-4 w-4" />
          </div>
          <div className="my-4 flex flex-col items-center">
            <h1 className="self-start text-sm">Online - {1}</h1>
          </div>

          {/* friend list */}
          {datas.map((fr) => (
            <FriendList
              key={fr.id}
              name={fr.display_name}
              status={fr.is_online}
              picture={fr.picture}
            />
          ))}
        </div>
        <div className="w-96 bg-neutral-800"></div>
      </div>
    </div>
  );
}

function FriendList(props: { name: string; status: boolean; picture: string }) {
  return (
    <div className="flex h-[60px] cursor-pointer items-center justify-start border-y border-neutral-700 py-3 text-sm hover:rounded-lg hover:border-none hover:bg-neutral-800">
      {/* <div className="mr-2 h-8 w-8 rounded-full bg-neutral-800"></div> */}
      <img
        src={props.picture}
        alt="profile"
        className="mr-2 h-8 w-8 rounded-full"
      />
      <div>
        <h1 className="font-bold">{props.name}</h1>
        <p className="text-xs text-neutral-400">
          {props.status ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
}
