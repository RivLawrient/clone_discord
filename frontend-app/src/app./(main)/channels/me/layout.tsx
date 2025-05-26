// "use client";
import { useAuth } from "@/context/authContext";
import { useFriend } from "@/context/friendContext";
import { ReactNode, useEffect } from "react";

export default function Layout(props: { children: ReactNode }) {
  // const { friends, setFriends } = useFriend();
  // const { user } = useAuth();

  // useEffect(() => {
  //   const socket = new WebSocket(process.env.WS_API_PUBLIC!);
  //   socket.onopen = () => {
  //     console.log("Connected to server-friend");

  //     socket.send(
  //       JSON.stringify({
  //         event: "pusher:subscribe",
  //         data: {
  //           channel: "user." + user?.id,
  //         },
  //       }),
  //     );

  //     socket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       if (data.event == "user-current") {
  //         const res = JSON.parse(data.data);
  //         // const users = res;
  //         console.log(res);
  //         setFriends({
  //           friends: res.friends,
  //           pending: res.pending,
  //           request: res.request,
  //         });
  //       }
  //     };
  //   };
  // }, []);
  return <div className="grid bg-neutral-900">{props.children}</div>;
}
