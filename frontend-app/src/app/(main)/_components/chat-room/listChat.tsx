import { useEffect, useRef } from "react";

export default function ListChat() {
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);
  return (
    <div
      ref={boxRef}
      className="flex flex-1 flex-col overflow-y-scroll bg-neutral-900"
    >
      <div className="flex-1"></div>
      <div>welcome to</div>
      <div>two</div>
    </div>
  );
}
