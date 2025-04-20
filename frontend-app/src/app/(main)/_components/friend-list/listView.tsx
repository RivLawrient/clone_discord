import { useState } from "react";
import { SearchBar } from "./searchBar";
import { FriendList } from "./friendList";
import { tab } from "../../channel/me/page";
import { Friend } from "@/context/friendContext";

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
            display_name={value.display_name}
            id={value.id}
            is_online={value.is_online}
            last_active={value.last_active}
            picture={value.picture}
            username={value.username}
            isLast={index === array.length - 1}
          />
        ))}
    </div>
  );
}
