import { cn } from "@/lib/utils";

interface Props {
  label: string;
  position: "left" | "right" | "bottom" | "top";
  children: React.ReactNode;
}

export default function HoverDetail(props: Props) {
  return (
    <div className="group/hover relative">
      <div
        className={cn(
          "absolute hidden items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 p-2 text-[14px] font-semibold text-nowrap text-white group-hover/hover:flex",
          props.position === "top" &&
            "bottom-full left-1/2 mb-2 -translate-x-1/2",
          props.position === "bottom" &&
            "top-full left-1/2 mt-2 -translate-x-1/2",
          props.position === "left" &&
            "top-1/2 right-full mr-2 -translate-y-1/2",
          props.position === "right" &&
            "top-1/2 left-full ml-2 -translate-y-1/2",
        )}
      >
        {props.label}
      </div>
      <div
        className={cn(
          "absolute hidden size-1.5 rotate-45 self-center justify-self-center border-neutral-700 bg-neutral-900 group-hover/hover:block",
          props.position === "top" &&
            "bottom-full left-1/2 mb-[5px] -translate-x-1/2 border-r border-b",
          props.position === "bottom" &&
            "top-full left-1/2 mt-[5px] -translate-x-1/2 border-t border-l",
          props.position === "left" &&
            "top-1/2 right-full mr-[5px] -translate-y-1/2 border-t border-r",
          props.position === "right" &&
            "top-1/2 left-full ml-[5px] -translate-y-1/2 border-b border-l",
        )}
      />

      {props.children}
    </div>
  );
}
