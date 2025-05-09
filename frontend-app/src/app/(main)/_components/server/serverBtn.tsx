"use client";
import { cn } from "@/lib/utils";
import HoverDetail from "../hoverDetail";
import { PlusCircleIcon } from "lucide-react";
import { Server } from "@/context/serverContext";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { redirect, usePathname } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";

interface Props {
  logo: "dm" | "add" | "server";
  server?: Server;
}

export default function ServerBtn(props: Props) {
  const path = usePathname().split("/");

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
        <Dialog>
          <DialogTrigger asChild>
            <TooltipTrigger
              onClick={() =>
                props.logo != "add" &&
                redirect(
                  "/channels/" +
                    (props.logo === "dm"
                      ? "me"
                      : props.logo === "server"
                        ? props.server
                          ? props.server.id + "/" + props.server.channel[0].id
                          : ""
                        : ""),
                )
              }
              className={cn(
                "group peer size-10 cursor-pointer rounded-lg bg-neutral-800 hover:bg-indigo-500",
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
                <h1>{props.server.name[0]}</h1>
              ) : null}
            </TooltipTrigger>
          </DialogTrigger>
          {props.logo === "add" && <ModalAddServer />}
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

function ModalAddServer() {
  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 bg-black/50"></DialogOverlay>
      <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500">
        <DialogTitle>Add Server</DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogClose>X</DialogClose>
        <div className="text-white">asdf</div>
      </DialogContent>
    </DialogPortal>
  );
}
