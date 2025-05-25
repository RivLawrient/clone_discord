import DarkenHexColor from "@/components/DarkenHexColor";
import { Friend, useFriend } from "@/context/friendContext";
import { cn } from "@/lib/utils";
import {
  Check,
  DeleteIcon,
  MessageCircleIcon,
  MessageSquare,
  MessageSquareIcon,
  MoreVerticalIcon,
  Trash2Icon,
  X,
} from "lucide-react";
// import HoverDetail from "../../../xxx(main)/_components/hoverDetail";
import { useState } from "react";
import { redirect } from "next/navigation";

interface Props {
  friend: Friend;
  isLast?: boolean;
  isPending?: boolean;
  isRequest?: boolean;
}

export function FriendList(props: Props) {
  const { friends, setFriends } = useFriend();

  const acceptHandle = () => {
    fetch(
      `${process.env.HOST_API_PUBLIC}/api/friend/accept/${props.friend.username}`,
      {
        method: "POST",
        credentials: "include",
      },
    )
      .then(async (res) => {
        const datas = await res.json();
        const data: Friend = datas.data;
        if (res.ok) {
          setFriends({
            ...friends,
            friends: [...friends.friends, data],
            request: friends.request.filter(
              (value) => value.id != props.friend.id,
            ),
          });
        }
      })
      .catch(() => {});
  };

  const declineHandle = () => {
    fetch(
      `${process.env.HOST_API_PUBLIC}/api/friend/decline/${props.friend.username}`,
      {
        method: "POST",
        credentials: "include",
      },
    )
      .then(async (res) => {
        if (res.ok) {
          setFriends({
            ...friends,
            request: friends.request.filter(
              (value) => value.id != props.friend.id,
            ),
          });
        }
      })
      .catch(() => {});
  };

  const cancelHandle = () => {
    fetch(
      `${process.env.HOST_API_PUBLIC}/api/friend/cancel/${props.friend.username}`,
      {
        method: "POST",
        credentials: "include",
      },
    )
      .then(async (res) => {
        if (res.ok) {
          setFriends({
            ...friends,
            pending: friends.pending.filter(
              (value) => value.id != props.friend.id,
            ),
          });
        }
      })
      .catch(() => {});
  };

  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && (
        <RemoveFriendModal
          closeHandle={() => setModal(!modal)}
          name={props.friend.display_name}
          username={props.friend.username}
        />
      )}
      <div
        className={cn(
          "group relative flex h-[60px] cursor-pointer items-center border-y border-neutral-700 px-2 py-3 text-sm hover:rounded-lg hover:border-transparent hover:bg-neutral-800",
          props.isLast && "border-b-0",
        )}
      >
        <div className="relative mr-2">
          <img
            style={{
              backgroundColor: DarkenHexColor("#" + props.friend.id.slice(-6)),
            }}
            src={process.env.HOST_API_PUBLIC + props.friend.picture}
            alt="profile"
            className={cn(
              "h-8 w-8 rounded-full",
              props.friend.picture.endsWith("default_picture.png")
                ? "bg-foreground object-contain p-1.5"
                : "object-cover",
            )}
          />
          {!props.isPending && !props.isRequest && (
            <div
              className={cn(
                "absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border-[4px] border-neutral-900 group-hover:border-neutral-800",
                props.friend.is_online ? "bg-green-500" : "bg-gray-500",
              )}
            />
          )}
        </div>

        <div className="flex-1">
          <h1 className="flex items-center font-bold">
            <span>{props.friend.display_name}</span>
            <span className="ml-3 text-xs font-normal text-transparent group-hover:text-white">
              {props.friend.username}
            </span>
          </h1>
          <p className="text-xs text-neutral-400">
            {props.isPending || props.isRequest
              ? props.friend.username
              : props.friend.is_online
                ? "Online"
                : "Offline"}
          </p>
        </div>
        {props.isPending || props.isRequest ? (
          <div className="flex gap-6">
            {props.isRequest && (
              // <HoverDetail position="top" label="Accept">
              <button
                onClick={acceptHandle}
                className="group/acc hover:bg-foreground cursor-pointer rounded-full"
              >
                <Check className="size-10 stroke-neutral-500 p-2 group-hover/acc:stroke-green-500" />
              </button>
              // </HoverDetail>
            )}
            {/* <HoverDetail
              position="top"
              label={props.isPending ? "Cancel" : "Reject"}
            > */}
            <button
              onClick={props.isPending ? cancelHandle : declineHandle}
              className="group/dec hover:bg-foreground cursor-pointer rounded-full"
            >
              <X className="size-10 stroke-neutral-500 p-2 group-hover/dec:stroke-red-500" />
            </button>
            {/* </HoverDetail> */}
          </div>
        ) : (
          <div className="flex gap-2">
            {/* <HoverDetail label="Message" position="top"> */}
            <button
              // onClick={() => redirect("/channel/me/" + props.friend.username)}
              className="group/opt cursor-pointer rounded-full p-2 group-hover:bg-neutral-900"
            >
              <MessageCircleIcon className="size-5 fill-neutral-500 stroke-neutral-500 group-hover/opt:fill-white group-hover/opt:stroke-white" />
            </button>
            {/* </HoverDetail> */}
            {/* <HoverDetail label="Remove Friends" position="top"> */}
            <button
              onClick={() => setModal(!modal)}
              className="group/opt cursor-pointer rounded-full p-2 group-hover:bg-neutral-900"
            >
              <Trash2Icon className="size-5 stroke-neutral-500 group-hover/opt:stroke-red-500" />
            </button>
            {/* </HoverDetail> */}
          </div>
        )}
      </div>
    </>
  );
}

function RemoveFriendModal(props: {
  closeHandle: () => void;
  name: string;
  username: string;
}) {
  const { friends, setFriends } = useFriend();
  const removeHandle = () => {
    fetch(`${process.env.HOST_API_PUBLIC}/api/friend/${props.username}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(async (res) => {
        const datas = await res.json();
        const data: Friend = datas.data;
        if (res.ok) {
          setFriends({
            ...friends,
            friends: friends.friends.filter((v) => v.id != data.id),
          });
        }
      })
      .catch(() => {});
  };
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.closeHandle();
        }
      }}
      className="bg-foreground/50 absolute top-0 right-0 bottom-0 left-0 z-[99] flex items-center justify-center"
    >
      <div className="max-w-96 rounded-lg bg-neutral-700 p-4">
        <h1 className="text-xl font-semibold">Remove '{props.name}'?</h1>
        <h2 className="text-sm">
          Are you sure you want to remove{" "}
          <span className="font-semibold">{props.name}</span> from your friends?
        </h2>
        <div className="mt-8 flex justify-end gap-2 transition-all">
          <button
            onClick={props.closeHandle}
            className="cursor-pointer rounded-sm bg-neutral-800 px-6 py-2 text-sm hover:bg-neutral-800/80"
          >
            Cancel
          </button>
          <button
            onClick={removeHandle}
            className="cursor-pointer rounded-sm bg-red-500 px-6 py-2 text-sm hover:bg-red-500/80"
          >
            Remove Friend
          </button>
        </div>
      </div>
    </div>
  );
}
