import { Server } from "@/context/serverContext";
import { cn } from "@/lib/utils";
import { Dialog, Tooltip } from "radix-ui";
import { usePathname, useRouter } from "next/navigation";
import TooltipContent from "../tooltipContent";
import ModalAddServer from "./modalAddServer";
import { useState } from "react";

export default function ServerBtn(props: {
  destination?: string;
  server?: Server;
  tooltip: string;
  children?: React.ReactNode;
  isSelect?: boolean;
}) {
  const path = usePathname().split("/");
  const selected =
    props.isSelect && path[2] === props.destination?.split("/")[2];
  const router = useRouter();

  return (
    <div className="relative flex h-10 justify-center">
      <Adds tooltip={props.tooltip} isSelect={props.isSelect}>
        <button
          disabled={selected}
          onClick={() =>
            props.destination ? router.push(props.destination) : null
          }
          className={cn(
            "peer size-10 cursor-pointer overflow-hidden rounded-lg bg-neutral-800",
            selected ? "bg-indigo-500" : "transition-all hover:bg-indigo-500",
          )}
        >
          {props.server &&
            (props.server.picture ? (
              <img
                src={process.env.HOST_API_PUBLIC + props.server.picture}
                alt=""
                className="size-10 object-cover"
              />
            ) : (
              <>{props.server.name[0].toUpperCase()}</>
            ))}
          {props.children}
        </button>
      </Adds>
      <div
        className={cn(
          "absolute left-0 w-1 self-center rounded-r-lg bg-white transition-all",
          selected ? "h-10" : "h-0 peer-hover:h-5",
        )}
      />
    </div>
  );
}

function Adds(props: {
  children: React.ReactNode;
  tooltip: string;
  isSelect?: boolean;
}) {
  const [modal, setModal] = useState(false);
  return (
    <Dialog.Root open={modal} onOpenChange={(v) => setModal(v)}>
      <Tooltip.Provider disableHoverableContent delayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Dialog.Trigger asChild>{props.children}</Dialog.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <TooltipContent position="right" label={props.tooltip} />
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      {!props.isSelect && (
        <Dialog.Portal>
          <ModalAddServer modal={modal} setModal={setModal} />
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
}
