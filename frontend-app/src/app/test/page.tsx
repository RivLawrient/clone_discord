"use client";
import { cloneElement, ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed h-screen w-screen bg-neutral-800 p-2 text-white">
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      {open && <MyModal onClose={() => setOpen(!open)} />}

      <br />
      <br />
      <Tooltip content="Anjai">
        <div>Akuuu</div>
      </Tooltip>
    </div>
  );
}

function MyModal(props: { onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // safe to use document
    return () => setMounted(false); // optional
  }, []);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div className="absolute size-full bg-red-500/50" onClick={props.onClose}>
      <div
        className="fixed top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 bg-white"
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>,
    document.body,
  );
}

function Tooltip({
  children,
  content,
}: {
  children: React.ReactElement | ReactNode;
  content: string;
}) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (visible && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.top - 30, // tooltip di atas
        left: rect.left + rect.width / 2,
      });
    }
  }, [visible]);

  // const child = cloneElement(children, {
  //   ref: ref,
  //   onMouseEnter: (e: React.MouseEvent) => {
  //     setVisible(true);
  //   },
  //   onMouseLeave: (e: React.MouseEvent) => {
  //     setVisible(false);
  //   },
  //   className: "inline-block",
  // });

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="inline-block"
      >
        {children}
      </span>
      {/* {child} */}
      {visible &&
        ReactDOM.createPortal(
          <div
            className="fixed z-[9999] -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white"
            style={{ top: coords.top, left: coords.left }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}
