import { Text, useServer, Voice } from "@/context/serverContext";
import { redirect, usePathname, useRouter } from "next/navigation";
import { HashIcon, Trash2Icon, Volume2Icon } from "lucide-react";
// import HoverDetail from "../hoverDetail";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
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

export default function ChannelBtn(props: {
  data: Text | Voice;
  variant: "text" | "voice";
}) {
  const [text, setText] = useState(props.data.name);
  const path = usePathname().split("/");
  const [editAble, setEditAbel] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { setServers, servers } = useServer();
  const server = servers.find((v) => v.id === path[2]);

  useEffect(() => {
    if (editAble && ref.current) {
      ref.current.focus();
      ref.current.select();
    }
  }, [editAble]);

  const updateChannelName = () => {
    props.variant === "text"
      ? fetch(
          `${process.env.HOST_API_PUBLIC}/api/text_channel/${props.data.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: text,
            }),
          },
        )
          .then(async (res) => {
            const resp = await res.json();
            const data: Text = resp.data;
            // if (res.ok) {
            //   setServers((p) =>
            //     p.map((v) =>
            //       v.id === path[2]
            //         ? {
            //             ...v,
            //             channel: {
            //               ...v.channel,
            //               text: v.channel.text.map((vv) =>
            //                 vv.id === props.data.id
            //                   ? { ...vv, name: data.name }
            //                   : vv,
            //               ),
            //             },
            //           }
            //         : v,
            //     ),
            //   );
            // }
          })
          .catch(() => {})
      : fetch(
          `${process.env.HOST_API_PUBLIC}/api/voice_channel/${props.data.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: text,
            }),
          },
        )
          .then(async (res) => {
            const resp = await res.json();
            const data: Voice = resp.data;
            // if (res.ok) {
            //   setServers((p) =>
            //     p.map((v) =>
            //       v.id === path[2]
            //         ? {
            //             ...v,
            //             channel: {
            //               ...v.channel,
            //               voice: v.channel.voice.map((vv) =>
            //                 vv.id === props.data.id
            //                   ? { ...vv, name: data.name }
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
  };

  return (
    <>
      <button
        onClick={(e) => redirect(`/channels/${path[2]}/${props.data.id}`)}
        className={cn(
          "group grid w-full min-w-0 cursor-pointer grid-cols-[auto_1fr_auto] items-center rounded-sm px-2 py-1 text-start text-[16px] hover:text-white",
          path[3] === props.data.id
            ? "bg-neutral-800 text-white"
            : "hover:bg-neutral-800/40",
        )}
      >
        {props.variant === "text" ? (
          <HashIcon
            className={cn(
              "mr-2 size-5 text-neutral-400",
              path[3] === props.data.id && "text-white opacity-100",
            )}
          />
        ) : (
          <Volume2Icon
            className={cn(
              "mr-2 size-5 text-neutral-400",
              path[3] === props.data.id && "text-white opacity-100",
            )}
          />
        )}
        {!editAble ? (
          <span
            onDoubleClick={() => setEditAbel(true)}
            className={cn(
              "mr-1 flex-1 truncate text-[15px]",
              path[3] === props.data.id && "cursor-text",
            )}
          >
            {text}
          </span>
        ) : (
          <input
            ref={ref}
            value={text}
            onBlur={() => {
              setEditAbel(false);
              updateChannelName();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditAbel(false);
                updateChannelName();
              }
            }}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="mr-1 flex-1 truncate text-[15px] outline-none"
          />
        )}

        {server?.is_owner ? (
          // <HoverDetail label="Delete" position="top">
          <Dialog>
            <DialogTrigger asChild>
              {/* <TooltipTrigger asChild> */}
              <Trash2Icon
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "size-5 text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-red-500",
                  path[3] === props.data.id && "text-white opacity-100",
                )}
              />
              {/* </TooltipTrigger> */}
            </DialogTrigger>
            <ModalConfirmDeleteChannel
              id={props.data.id}
              variant={props.variant}
            />
          </Dialog>
        ) : // </HoverDetail>
        null}
      </button>
      {props.variant === "voice" && (
        <div>
          {/* <div>lol</div>
          <div>lol</div>
          <div>lol</div>
          <div>lol</div> */}
        </div>
      )}
    </>
  );
}

function ModalConfirmDeleteChannel(props: {
  id: string;
  variant: "voice" | "text";
}) {
  const { servers, setServers } = useServer();
  const path = usePathname().split("/");
  const channel = servers
    .find((v) => v.id === path[2])
    ?.channel.text.filter((v) => v.id !== props.id);

  const removeChannel = () => {
    props.variant === "text"
      ? fetch(`${process.env.HOST_API_PUBLIC}/api/text_channel/${props.id}`, {
          method: "DELETE",
          credentials: "include",
        }).then(async (res) => {
          const resp = await res.json();
          const data = resp.data;

          // if (res.ok) {
          //   setServers((p) =>
          //     p.map((v) =>
          //       v.id === path[2]
          //         ? {
          //             ...v,
          //             channel: {
          //               ...v.channel,
          //               text: v.channel.text.filter((vv) => vv.id !== data),
          //             },
          //           }
          //         : v,
          //     ),
          //   );
          // }
        })
      : fetch(`${process.env.HOST_API_PUBLIC}/api/voice_channel/${props.id}`, {
          method: "DELETE",
          credentials: "include",
        }).then(async (res) => {
          const resp = await res.json();
          const data = resp.data;

          // if (res.ok) {
          //   setServers((p) =>
          //     p.map((v) =>
          //       v.id === path[2]
          //         ? {
          //             ...v,
          //             channel: {
          //               ...v.channel,
          //               voice: v.channel.voice.filter((vv) => vv.id !== data),
          //             },
          //           }
          //         : v,
          //     ),
          //   );
          // }
        });
  };

  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 bg-black/50"></DialogOverlay>
      <DialogContent className="fixed top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-neutral-700/70 bg-neutral-800 p-4 px-6 text-white">
        <DialogTitle className="my-2 text-xl font-bold">
          Delete Channel
        </DialogTitle>
        <DialogDescription></DialogDescription>
        <h2 className="text-sm text-wrap">
          Are you sure you want to delete {}? This cannot be undone.
        </h2>
        <div className="mt-6 flex flex-row items-center justify-end gap-2 text-xs font-semibold">
          <DialogClose asChild>
            <button className="cursor-pointer rounded-sm p-2 px-4 text-indigo-500 hover:underline">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeChannel();

              if (path[3] === props.id && channel) {
                if (channel[0]) {
                  redirect("/channels/" + path[2] + "/" + channel[0].id);
                } else {
                  redirect("/channels/" + path[2]);
                }
              }
            }}
            className="cursor-pointer rounded-sm bg-red-500 p-3 px-4 text-white transition-all hover:bg-red-500/80"
          >
            Delete Channel
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  );
}
