"use client";
import { useAuth } from "@/context/authContext";
import { useFriend } from "@/context/friendContext";
import { Server, useServer } from "@/context/serverContext";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Layout(props: { children: ReactNode }) {
  const { friends, setFriends } = useFriend();
  const { servers, setServers } = useServer();
  const { user } = useAuth();
  const path = usePathname().split("/");
  const router = useRouter();

  useEffect(() => {
    const socket = new WebSocket(process.env.WS_API_PUBLIC!);

    socket.onopen = () => {
      console.log("Connected to server-room");

      socket.send(
        JSON.stringify({
          event: "pusher:subscribe",
          data: {
            channel: "server." + path[2],
          },
        }),
      );

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.event == "server-room") {
          const res = JSON.parse(data.data);
          // const users = res;
          const datas: Server = res.data;
          // console.log(res);
          if (datas) {
            setServers((p) =>
              p.map((v) =>
                v.id === path[2]
                  ? {
                      ...v,
                      channel: datas.channel,
                      members: datas.members,
                      member: datas.member,
                      name: datas.name,
                      picture: datas.picture,
                    }
                  : v,
              ),
            );
          } else {
            setServers((p) => p.filter((v) => v.id !== path[2]));
          }
        }
      };
    };
  }, []);

  useEffect(() => {
    if (!servers.find((v) => v.id === path[2])) {
      router.push("/channels/me");
    }
  }, [servers]);
  return (
    <div className="grid min-h-0 min-w-0 grid-rows-[auto_1fr] border-t border-neutral-700/70 bg-neutral-900">
      {props.children}
    </div>
  );
}
