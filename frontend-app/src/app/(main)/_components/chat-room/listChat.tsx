import { useEffect, useRef } from "react";
import DarkenHexColor from "@/components/DarkenHexColor";
import { usePathname } from "next/navigation";
import { Chat, useServer } from "@/context/serverContext";

function formatDateTime(dateTime: string) {
  const date = new Date(dateTime);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (dateOnly.getTime() === today.getTime()) {
    // Hari ini
    return `${hours}.${minutes}`;
  } else if (dateOnly.getTime() === yesterday.getTime()) {
    // Kemarin
    return `Yesterday, ${hours}.${minutes}`;
  } else {
    // Lebih lama dari kemarin
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}, ${hours}.${minutes}`;
  }
}

function formatDate(dateTime: string) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  return `${day} ${month} ${year}`;
}

export default function ListChat() {
  const boxRef = useRef<HTMLDivElement>(null);
  const path = usePathname().split("/");
  const { servers } = useServer();
  const room = servers
    .filter((v) => v.id === path[2])[0]
    .room.filter((v) => v.id === path[3])[0];

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  let lastDate = "";
  return (
    <div
      ref={boxRef}
      className="flex flex-1 flex-col overflow-x-hidden overflow-y-scroll bg-neutral-900 px-5 pb-3"
    >
      <div className="flex-1"></div>
      <div className="text-center text-4xl">Welcome to</div>
      <div className="text-center text-xl">{room.name}</div>

      {room.chat &&
        room.chat.length > 0 &&
        room.chat.map((v, index) => {
          const currentDate = formatDate(v.created_at);
          const showDateSeparator = currentDate !== lastDate;
          lastDate = currentDate;

          return (
            <div key={index} className="min-w-0 flex-1">
              {showDateSeparator && (
                <div className="my-4 flex items-center">
                  <div className="flex-grow border-t border-neutral-700"></div>
                  <span className="mx-2 text-sm text-neutral-500">
                    {currentDate}
                  </span>
                  <div className="flex-grow border-t border-neutral-700"></div>
                </div>
              )}
              <div className="mb-2 flex items-center gap-2">
                <div
                  style={{
                    backgroundColor: DarkenHexColor("#" + v.user.id.slice(-6)),
                  }}
                  className="rounded-full p-2"
                >
                  <img
                    src={process.env.HOST_API_PUBLIC + v.user.picture}
                    alt=""
                    className="size-6 object-contain"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h1 className="flex items-center text-xl font-semibold text-neutral-400">
                    {v.user.display_name}
                    <span className="ml-4 text-xs">
                      {formatDateTime(v.created_at)}
                    </span>
                  </h1>
                  <p className="break-words">{v.message}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
