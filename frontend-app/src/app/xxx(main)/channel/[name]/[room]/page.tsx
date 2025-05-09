"use client";
import HeaderChat from "@/app/xxx(main)/_components/chat-room/headerChat";
import InputChat from "@/app/xxx(main)/_components/chat-room/inputChat";
import ListChat from "@/app/xxx(main)/_components/chat-room/listChat";
import { useAuth } from "@/context/authContext";
import { Chat, useServer } from "@/context/serverContext";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ChannelRoomPage() {
  const path = usePathname().split("/");
  const { user } = useAuth();
  const { servers, setServers } = useServer();
  const room = servers
    .filter((v) => v.id === path[2])[0]
    .room.filter((v) => v.id === path[3])[0];

  // useEffect(() => {
  //   const socket = new WebSocket(process.env.WS_API_PUBLIC!);
  //   socket.onopen = () => {
  //     console.log("Connected to server.");

  //     socket.send(
  //       JSON.stringify({
  //         event: "pusher:subscribe",
  //         data: {
  //           channel: "server." + path[3],
  //         },
  //       }),
  //     );

  //     socket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       // console.log(data);
  //       if (data.event == "server-room") {
  //         const res = JSON.parse(data.data);
  //         console.log(res.chat);
  //         res.chat && res.chat.user.id != user?.id && null;
  //         // setServers(
  //         //   servers.map((v) =>
  //         //     v.id === path[2]
  //         //       ? {
  //         //           ...v,
  //         //           room: v.room.map((vv) =>
  //         //             vv.id === path[3]
  //         //               ? {
  //         //                   ...vv,
  //         //                   chat: [...vv.chat, res.chat],
  //         //                 }
  //         //               : vv,
  //         //           ),
  //         //         }
  //         //       : v,
  //         //   ),
  //         // );
  //         // setChat((prev) => [...prev, res.chat]);
  //       }

  //       if (data.event == "pusher:ping") {
  //         socket.send(
  //           JSON.stringify({
  //             event: "pusher:pong",
  //           }),
  //         );
  //       }
  //     };
  //   };
  // }, []);

  useEffect(() => {
    fetch(process.env.HOST_API_PUBLIC + "/api/channel_chat/" + path[3], {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        const ch: Chat[] = data.data;

        ch.map((v) => {
          !room.chat.some((vv) => vv.id === v.id) &&
            setServers((prev) =>
              prev.map((vv) =>
                vv.id === path[2]
                  ? {
                      ...vv,
                      room: vv.room.map((vvv) =>
                        vvv.id === path[3]
                          ? { ...vvv, chat: [...vvv.chat, v] }
                          : vvv,
                      ),
                    }
                  : vv,
              ),
            );
        });
      })
      .catch(() => {});
  }, []);

  if (!servers.some((v) => v.id === path[2])) redirect("/channel/" + path[2]);

  if (
    !servers
      .filter((v) => v.id === path[2])[0]
      .room.some((v) => v.id === path[3])
  )
    return (
      <div className="flex-1 bg-neutral-900 text-center">Channel not found</div>
    );

  return (
    <div className="flex min-w-0 flex-1 flex-col border-t border-neutral-700">
      <HeaderChat />
      <ListChat />
      <InputChat />
    </div>
  );
}
