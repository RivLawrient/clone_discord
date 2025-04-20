import { Friend } from "@/context/friendContext";
import { useState } from "react";
import { FriendList } from "./friendList";
import { SearchBar } from "./searchBar";

interface pendingViewProps {
  request: Friend[];
  accept: Friend[];
}
export function PendingView(props: pendingViewProps) {
  const [search, setSearch] = useState("");
  return (
    <div className="p-6">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="mx-2 my-4 flex flex-col items-center">
        {props.accept.length != 0 && (
          <h1 className="self-start text-sm">
            {"Received - " + props.accept.length}
          </h1>
        )}
      </div>
      {props.accept.map((value, index) => (
        <FriendList
          key={value.id}
          display_name={value.display_name}
          id={value.id}
          is_online={value.is_online}
          last_active={value.last_active}
          picture={value.picture}
          username={value.username}
          isLast={index == props.accept.length - 1}
          isRequest={true}
          isAcc={true}
        />
      ))}
      <div className="mx-2 my-4 flex flex-col items-center">
        {props.request.length != 0 && (
          <h1 className="self-start text-sm">
            {"Sent - " + props.request.length}
          </h1>
        )}
      </div>
      {props.request.map((value, index) => (
        <FriendList
          key={value.id}
          display_name={value.display_name}
          id={value.id}
          is_online={value.is_online}
          last_active={value.last_active}
          picture={value.picture}
          username={value.username}
          isLast={index == props.request.length - 1}
          isRequest={true}
        />
      ))}
    </div>
  );
}
