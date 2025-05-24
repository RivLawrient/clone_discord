import { useState } from "react";
import { SearchBar } from "./searchBar";
import { FriendList } from "./friendList";

import { Friend } from "@/context/friendContext";
import { tab } from "../../channels/me/page";

interface listViewProps {
  tab: tab;
  friends: Friend[];
}
export function ListView(props: listViewProps) {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="mx-2 my-4 flex flex-col items-center">
        <h1 className="self-start text-sm">
          {props.tab === "online" ? "Online" : "All Friends"} -{" "}
          {props.tab === "online"
            ? props.friends.filter((fr) => fr.is_online).length
            : props.friends.length}
        </h1>
      </div>
      {props.friends
        .filter((value) => {
          const matchesSearch = value.display_name.includes(search);
          if (props.tab === "online") return value.is_online && matchesSearch;
          if (props.tab === "all") return matchesSearch;
          return false;
        })
        .map((value, index, array) => (
          <FriendList
            key={index}
            friend={value}
            isLast={index === array.length - 1}
          />
        ))}
    </div>
  );
}
