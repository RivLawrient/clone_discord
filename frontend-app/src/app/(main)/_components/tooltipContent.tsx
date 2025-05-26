import { Tooltip } from "radix-ui";

export default function TooltipContent(props: {
  label: string;
  position: "left" | "right" | "bottom" | "top";
}) {
  return (
    <Tooltip.Content
      sideOffset={5}
      side={props.position}
      className="z-[50] flex h-[36px] items-center rounded-lg border border-neutral-700/70 bg-neutral-800 p-2 text-[14px] leading-none font-semibold text-neutral-300 opacity-100"
    >
      {props.label}
      <Tooltip.Arrow className="z-50 size-1.5 translate-y-[calc(-50%)] rotate-45 border-r border-b border-neutral-700 bg-neutral-800 fill-neutral-800" />
    </Tooltip.Content>
  );
}
