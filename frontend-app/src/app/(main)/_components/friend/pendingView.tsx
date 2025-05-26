import { Friend } from "@/context/friendContext";
import { useState } from "react";
import { FriendList } from "./friendList";
import { SearchBar } from "./searchBar";

interface pendingViewProps {
  request: Friend[];
  pending: Friend[];
}
export function PendingView(props: pendingViewProps) {
  const [search, setSearch] = useState("");
  return (
    <div className="p-6">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="mx-2 my-4 flex flex-col items-center">
        {props.request.length != 0 && (
          <h1 className="self-start text-sm">
            {"Received - " + props.request.length}
          </h1>
        )}
      </div>
      {props.request.map((value, index, array) => (
        <FriendList
          key={index}
          friend={value}
          isRequest
          isLast={index === array.length - 1}
        />
      ))}
      <div className="mx-2 my-4 flex flex-col items-center">
        {props.pending.length != 0 && (
          <h1 className="self-start text-sm">
            {"Sent - " + props.pending.length}
          </h1>
        )}
      </div>
      {props.pending.map((value, index, array) => (
        <FriendList
          key={index}
          friend={value}
          isPending
          isLast={index === array.length - 1}
        />
      ))}
    </div>
  );
}
