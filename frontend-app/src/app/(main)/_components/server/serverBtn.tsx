"use client";
import { cn } from "@/lib/utils";
import HoverDetail from "../hoverDetail";
import { CameraIcon, PlusCircleIcon, PlusIcon } from "lucide-react";
import { Server } from "@/context/serverContext";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import ModalCreateServer from "./modalCreateServer";
import { useState } from "react";

interface Props {
  logo: "dm" | "add" | "server";
  server?: Server;
}

export default function ServerBtn(props: Props) {
  const path = usePathname().split("/");
  const [modal, setModal] = useState(false);
  const router = useRouter();

  return (
    <div className="relative flex h-10 w-full justify-center">
      <HoverDetail
        label={
          props.logo === "dm"
            ? "Direct Messages"
            : props.logo === "add"
              ? "Add a Server"
              : props.server
                ? props.server.name
                : ""
        }
        position="right"
      >
        <Dialog onOpenChange={(v) => setModal(v)} open={modal}>
          <DialogTrigger asChild>
            <TooltipTrigger
              disabled={
                (path[2] === "me" && props.logo === "dm") ||
                (props.server && path[2] === props.server.id)
              }
              onClick={() =>
                props.logo != "add" &&
                router.push(
                  "/channels/" +
                    (props.logo === "dm"
                      ? "me"
                      : props.logo === "server"
                        ? props.server && props.server.channel.text[0]
                          ? props.server.id +
                            "/" +
                            props.server.channel.text[0].id
                          : props.server?.id
                        : ""),
                )
              }
              className={cn(
                "group peer size-10 cursor-pointer overflow-hidden rounded-lg bg-neutral-800 hover:bg-indigo-500",
                path[2] === "me" && props.logo === "dm"
                  ? "bg-indigo-500"
                  : props.server &&
                      path[2] === props.server.id &&
                      "bg-indigo-500",
              )}
            >
              {props.logo === "dm" ? (
                <img src="/dc.png" alt="" className="object-cover p-2" />
              ) : props.logo === "add" ? (
                <PlusCircleIcon className="m-auto fill-white stroke-neutral-800 group-hover:stroke-indigo-500" />
              ) : props.server ? (
                props.server.picture ? (
                  <img
                    src={process.env.HOST_API_PUBLIC + props.server.picture}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <h1>{props.server.name[0].toUpperCase()}</h1>
                )
              ) : null}
            </TooltipTrigger>
          </DialogTrigger>
          {props.logo === "add" && (
            <ModalCreateServer modal={modal} setModal={setModal} />
          )}
        </Dialog>
      </HoverDetail>
      <div
        className={cn(
          "absolute left-0 self-center rounded-r-lg bg-white transition-all",
          path[2] === "me" && props.logo === "dm"
            ? "h-10 w-1"
            : props.server && path[2] === props.server.id
              ? "h-10 w-1"
              : "size-0 peer-hover:h-5 peer-hover:w-1",
        )}
      />
    </div>
  );
}
