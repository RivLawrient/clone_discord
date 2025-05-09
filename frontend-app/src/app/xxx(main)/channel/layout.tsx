"use client";
import { useAuth } from "@/context/authContext";
import { ListFriend, useFriend } from "@/context/friendContext";
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
      console.log("Connected to user.");

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
          const res: ListFriend = JSON.parse(data.data);
          // console.log(res);
          setFriends(res);
        }

        if (data.event == "pusher:ping") {
          socket.send(
            JSON.stringify({
              event: "pusher:pong",
            }),
          );
        }
      };
    };
  }, []);

  useEffect(() => {
    const socket = new WebSocket(process.env.WS_API_PUBLIC!);
    socket.onopen = () => {
      console.log("Connected to server.");

      socket.send(
        JSON.stringify({
          event: "pusher:subscribe",
          data: {
            channel: "server",
          },
        }),
      );

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // console.log(data);
        if (data.event == "server-room") {
          const res = JSON.parse(data.data);
        }

        if (data.event == "pusher:ping") {
          socket.send(
            JSON.stringify({
              event: "pusher:pong",
            }),
          );
        }
      };
    };
  }, []);
  return <>{children}</>;
}
