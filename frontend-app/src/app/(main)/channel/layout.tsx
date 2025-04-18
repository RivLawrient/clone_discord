"use client";
import { useAuth } from "@/context/authContext";
import { useFriend } from "@/context/friendContext";
import { useEffect } from "react";

export default function ChannelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            request: res.request,
            accept: res.accept,
          });
        }
      };
    };
  }, []);
  return <>{children}</>;
}
