"use client";
import { ReactNode, useEffect } from "react";
import Header from "../_components/header";
import SideBarServer from "../_components/server/sideBarServer";
import InnerSideBar from "../_components/innerSideBar";
import { useAuth } from "@/context/authContext";
import { useFriend } from "@/context/friendContext";
import { usePathname } from "next/navigation";
import { Server, useServer } from "@/context/serverContext";

export default function Layout(props: { children: ReactNode }) {
  const { friends, setFriends } = useFriend();
  const { setServers } = useServer();
  const { user } = useAuth();
  const path = usePathname().split("/");

  useEffect(() => {
    const socket = new WebSocket(process.env.WS_API_PUBLIC!);

    socket.onopen = () => {
      console.log("Connected to server-friend");

      socket.send(
        JSON.stringify({
          event: "pusher:subscribe",
          data: {
            channel: "user." + user?.id,
          },
        }),
      );

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.event == "user-current") {
          const res = JSON.parse(data.data);
          // const users = res;
          console.log(res);
          setFriends({
            friends: res.friends,
            pending: res.pending,
            request: res.request,
          });
        }
      };
    };
  }, []);

  return (
    <div className="bg-foreground fixed grid h-screen w-screen grid-rows-[auto_1fr] text-white">
      <Header />
      <div className="grid min-h-0 grid-cols-[auto_auto_1fr]">
        <SideBarServer />
        <InnerSideBar />
        {props.children}
      </div>
    </div>
  );
}
