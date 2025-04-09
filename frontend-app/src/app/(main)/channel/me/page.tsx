"use client";
import { SearchIcon } from "lucide-react";
import { Friend, useFriend } from "@/context/friendContext";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import FriendList from "./FriendList";
export default function MePage() {
  const { friends, setFriends } = useFriend();
  const { user } = useAuth();

  useEffect(() => {
    const socket = new WebSocket(process.env.WS_API_PUBLIC!);
    socket.onopen = () => {
      console.log("Connected to server");

      socket.send(
        JSON.stringify({
          event: "pusher:subscribe",
          data: {
            channel: "user-data",
          },
        }),
      );

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.event === "update-user") {
          const res = JSON.parse(data.data);
          const users: Friend = res.user;
          console.log(users);
          if (user?.id != users.id) {
            setFriends(
              friends.map((prev) => (prev.id == users.id ? users : prev)),
            );
          }
        }
        if (data.event === "pusher:ping") {
          socket.send(
            JSON.stringify({
              event: "pusher:pong",
            }),
          );
        }
      };
    };
  }, []);
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
          {friends.map((fr) => (
            <FriendList
              key={fr.id}
              name={fr.display_name}
              last_active={fr.last_active}
              picture={fr.picture}
            />
          ))}
        </div>
        <div className="w-96 bg-neutral-800"></div>
      </div>
    </div>
  );
}

// function FriendListaaaa(props: {
//   name: string;
//   last_active: number;
//   picture: string;
// }) {
//   return (
//     <div className="flex h-[60px] cursor-pointer items-center justify-start border-y border-neutral-700 py-3 text-sm hover:rounded-lg hover:border-none hover:bg-neutral-800">
//       <img
//         src={props.picture}
//         alt="profile"
//         className="mr-2 h-8 w-8 rounded-full"
//       />
//       <div>
//         <h1 className="font-bold">{props.name}</h1>
//         <p className="text-xs text-neutral-400">
//           {Math.floor(new Date().getTime() / 1000) - props.last_active > 30
//             ? "Offline"
//             : "Online"}
//         </p>
//       </div>
//     </div>
//   );
// }
