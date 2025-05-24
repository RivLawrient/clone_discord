"use client";

import type { Chat, Text, Users } from "@/context/serverContext";
import { useServer } from "@/context/serverContext";
import { HashIcon, PlusCircleIcon, Users2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import HoverDetail from "../../hoverDetail";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { ScrollStyle } from "@/components/ScrollStyle";
import { User } from "@/context/authContext";
import DarkenHexColor from "@/components/DarkenHexColor";

export default function ChatView() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const channel = servers
    .filter((v) => v.id === path[2])[0]
    .channel.text.filter((v) => v.id === path[3])[0];
  const [member, setMember] = useState(true);

  return (
    <>
      <HeaderChat channel={channel} member={member} setMember={setMember} />
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_auto]">
        <div className="grid min-h-0 grid-rows-[1fr_auto]">
          <SectionChat channel={channel} />
          <InputChat channel={channel} />
        </div>
        {member && <MemberList />}
      </div>
    </>
  );
}

function HeaderChat(props: {
  channel: Text;
  member: boolean;
  setMember: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex h-12 min-w-0 items-center border-b border-neutral-700/70 px-5">
      <HashIcon size={20} className="text-neutral-400" />
      <h1 className="ml-2 flex-1 truncate select-none">{props.channel.name}</h1>
      <HoverDetail
        position="bottom"
        label={(props.member ? "Hide" : "Show") + " Member List"}
      >
        <TooltipTrigger asChild>
          <Users2Icon
            onClick={() => props.setMember(!props.member)}
            size={20}
            className={cn(
              "ml-3 cursor-pointer text-neutral-400 hover:text-white",
              props.member && "text-white",
            )}
          />
        </TooltipTrigger>
      </HoverDetail>
    </div>
  );
}

function SectionChat(props: { channel: Text }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isJustifyEnd, setIsJustifyEnd] = useState(false);
  const counter: Record<number, number> = {};

  const checkJustifyEnd = () => {
    if (containerRef.current && scrollRef.current) {
      setIsJustifyEnd(
        containerRef.current.clientHeight <= scrollRef.current.clientHeight,
      );
    }
  };

  useEffect(() => {
    checkJustifyEnd();
    const resizeObserver = new ResizeObserver(() => {
      checkJustifyEnd();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && isAtBottom) {
      el.scrollTop = el.scrollHeight;
    }

    checkJustifyEnd();
  }, [props.channel.chat.length]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el) {
      const threshold = 50;
      const isBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
      setIsAtBottom(isBottom);
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={cn(
        "mr-1 flex flex-col overflow-y-scroll",
        isJustifyEnd && "justify-end",
        ScrollStyle,
      )}
    >
      <div ref={containerRef}>
        {props.channel.chat.map((v, i, a) => {
          const day = new Date(v.created_at);
          counter[day.getDate()] = (counter[day.getDate()] || 0) + 1;
          return (
            <Fragment key={i}>
              {counter[day.getDate()] === 1 && (
                <div className="flex items-center text-xs text-neutral-400">
                  <hr className="mx-3 my-2 flex-1 rounded-full border-neutral-700/70" />
                  {new Date().getDate() - day.getDate() === 1
                    ? "Yesterday"
                    : day.toLocaleDateString("en-US", { month: "long" }) +
                      " " +
                      day.getDate()}
                  , {2025}
                  <hr className="mx-3 my-2 flex-1 rounded-full border-neutral-700/70" />
                </div>
              )}
              <Chat chat={v} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function Chat(props: { chat: Chat }) {
  return (
    <div className="relative flex flex-col py-1 pr-6 pl-[72px] break-words whitespace-break-spaces hover:bg-neutral-800">
      <UserPicture
        id={props.chat.user.id}
        is_online={props.chat.user.is_online}
        url={process.env.HOST_API_PUBLIC + props.chat.user.picture}
        className="absolute -ml-14 size-10"
      />
      <h3 className="font-bold">
        {props.chat.user.display_name}{" "}
        <span className="text-xs font-normal text-neutral-400">
          {TimeChat({ time: props.chat.created_at })}
        </span>
      </h3>
      <h1 className="min-w-0">{props.chat.message}</h1>
    </div>
  );
}

function TimeChat(props: { time: string }) {
  const data = new Date(props.time);
  const now = new Date();

  // Mengatur waktu ke tengah malam untuk perbandingan tanggal
  const dataMidnight = new Date(data);
  dataMidnight.setHours(0, 0, 0, 0);

  const nowMidnight = new Date(now);
  nowMidnight.setHours(0, 0, 0, 0);

  const yesterdayMidnight = new Date(nowMidnight);
  yesterdayMidnight.setDate(nowMidnight.getDate() - 1);

  const isToday = dataMidnight.getTime() === nowMidnight.getTime();
  const isYesterday = dataMidnight.getTime() === yesterdayMidnight.getTime();

  // Format waktu ke 12 jam dengan AM/PM
  let hours = data.getHours();
  const minutes = data.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Jam '0' seharusnya menjadi '12'
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  const timeStr = `${hours}:${minutesStr} ${ampm}`;

  if (isToday) {
    return timeStr;
  } else if (isYesterday) {
    return `Yesterday, ${timeStr}`;
  } else {
    const date = data.getDate();
    const month = data.getMonth() + 1; // getMonth() mengembalikan 0-11
    const year = data.getFullYear().toString().slice(2);
    return `${date}/${month}/${year}, ${timeStr}`;
  }
}

function InputChat(props: { channel: Text }) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxHeight = 120;
  const path = usePathname().split("/");
  const { servers, setServers } = useServer();

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = newHeight + "px";
    }
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        fetch(
          `${process.env.HOST_API_PUBLIC}/api/text_channel/chat/${props.channel.id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: text,
            }),
          },
        )
          .then(async (res) => {
            const resp = await res.json();
            const data: Chat = resp.data;
            // if (res.ok) {
            //   setServers((p) =>
            //     p.map((v) =>
            //       v.id === path[2]
            //         ? {
            //             ...v,
            //             channel: {
            //               ...v.channel,
            //               text: v.channel.text.map((vv) =>
            //                 vv.id === path[3]
            //                   ? { ...vv, chat: [...vv.chat, data] }
            //                   : vv,
            //               ),
            //             },
            //           }
            //         : v,
            //     ),
            //   );
            // }
          })
          .catch(() => {});

        // console.log("Kirim pesan:", text);
        setText("");
      }
    }
  };

  return (
    <div className="min-h-[78px] p-2 pb-6 select-none">
      <div className="flex rounded-lg bg-neutral-800 p-4">
        <PlusCircleIcon
          size={24}
          absoluteStrokeWidth
          className="ml-1 fill-neutral-400 text-neutral-800"
        />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${props.channel.name}`}
          className="ml-3 flex-1 resize-none bg-transparent text-white outline-none placeholder:text-neutral-500"
          rows={1}
        />
      </div>
    </div>
  );
}

function MemberList() {
  const path = usePathname().split("/");
  const { servers } = useServer();
  const member = servers.find((p) => p.id === path[2]);
  return (
    <div
      className={cn(
        "min-h-0 w-[250px] overflow-y-scroll border-l border-neutral-700/70 p-2",
        ScrollStyle,
      )}
    >
      {member &&
        member.members.map((v, i) => (
          <Fragment key={i}>
            <span className="ml-2 text-sm text-neutral-400">
              {i === 0 ? "Owner - 1" : `Member - ${member.member - 1}`}
            </span>
            <Member user={v} />
          </Fragment>
        ))}
    </div>
  );
}

function Member(props: { user: Users }) {
  return (
    <div className="hover:bgneu flex items-center rounded-lg px-4 py-2 hover:bg-neutral-800">
      <UserPicture
        id={props.user.id}
        is_online={props.user.is_online}
        url={process.env.HOST_API_PUBLIC + props.user.picture}
      />
      <h1 className="ml-2 text-lg">{props.user.display_name}</h1>
    </div>
  );
}

function UserPicture(props: {
  url: string;
  id: string;
  is_online: boolean;
  className?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: DarkenHexColor("#" + props.id.slice(-6)),
      }}
      className={cn("relative flex size-8 rounded-full", props.className)}
    >
      <div
        className={cn(
          "absolute -right-0 -bottom-0 size-3 rounded-full",
          !props.is_online ? "bg-green-500" : "bg-gray-500",
        )}
      />
      <img
        src={props.url}
        alt=""
        className={cn(
          "self-center object-cover",
          props.url.endsWith("default_picture.png") && "p-1.5",
        )}
      />
    </div>
  );
}
