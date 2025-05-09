
import { useServer } from "@/context/serverContext";
import { setServers } from "dns";
import { PlusCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Dispatch, useState } from "react";
// import { Chat } from "../../channel/[name]/[room]/page";

export default function InputChat() {
  const path = usePathname().split("/");
  const { servers, setServers } = useServer();
  const [chat, setChat] = useState("");

  const sendHandle = async () => {
    await fetch(process.env.HOST_API_PUBLIC + "/api/channel_chat/" + path[3], {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: chat,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        // console.log(data);
        if (res.ok) {
          setServers(
            servers.map((v) =>
              v.id === path[2]
                ? {
                    ...v,
                    room: v.room.map((vv) =>
                      vv.id === path[3]
                        ? {
                            ...vv,
                            chat: [...vv.chat, data.data],
                          }
                        : vv,
                    ),
                  }
                : v,
            ),
          );
        }
      })
      .catch(() => {});
  };
  return (
    <div className="bg-neutral-900 px-4 pb-6">
      <div className="flex min-h-12 items-center rounded-lg bg-neutral-800 px-4">
        <PlusCircleIcon />
        <input
          placeholder="Channel ini"
          type="text"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && chat.length > 0) {
              sendHandle();
              setChat("");
            }
          }}
          maxLength={255}
          className="ml-4 flex-1 outline-none"
        />
      </div>
    </div>
  );
}
