"use client";
import HeaderChat from "@/app/(main)/_components/chat-room/headerChat";
import InputChat from "@/app/(main)/_components/chat-room/inputChat";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ChannelRoomPage() {
  const path = usePathname().split("/")[3];
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  return (
    <div
      style={{
        height: "calc(100vh - 36px)",
      }}
      className="flex flex-col"
    >
      <HeaderChat />
      <div ref={boxRef} className="flex-1 overflow-y-scroll bg-neutral-900">
        <div>old</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>atestsetsetset</div>
        <div>new</div>
        <div>end</div>
      </div>
      <InputChat />
    </div>
  );
}
