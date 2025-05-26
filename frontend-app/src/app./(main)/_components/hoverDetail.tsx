import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipArrow,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface Props {
  label: string;
  position: "left" | "right" | "bottom" | "top";
  children: React.ReactNode;
}

export default function HoverDetail(props: Props) {
  return (
    <TooltipProvider disableHoverableContent delayDuration={0}>
      <Tooltip>
        {props.children}
        <TooltipContent
          sideOffset={5}
          side={props.position}
          className="z-[50] flex h-[36px] items-center rounded-lg border border-neutral-700/70 bg-neutral-800 p-2 text-[14px] leading-none font-semibold text-neutral-300 opacity-100"
        >
          {props.label}
          <TooltipArrow className="z-50 size-1.5 translate-y-[calc(-50%)] rotate-45 border-r border-b border-neutral-700 bg-neutral-800 fill-neutral-800" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
