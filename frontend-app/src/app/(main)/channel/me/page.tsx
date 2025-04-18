"use client";
import { Check, SearchIcon, X } from "lucide-react";
import { Friend, useFriend } from "@/context/friendContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";
import { set } from "date-fns";

type tab = "online" | "all" | "pending" | "add";

export default function MePage() {
  const { friends } = useFriend();
  const [tab, setTab] = useState<tab>("online");

  return (
    <div className="flex h-full flex-col bg-neutral-900">
      <div className="flex min-h-12 w-full items-center gap-4 border-t border-neutral-700 px-4 py-2 text-[14px]">
        <TabBtn
          label="Online"
          tab={tab}
          onClick={() => {
            setTab("online");
          }}
        />
        <TabBtn label="All" tab={tab} onClick={() => setTab("all")} />
        {(friends.request.length > 0 || friends.accept.length > 0) && (
          <TabBtn label="Pending" tab={tab} onClick={() => setTab("pending")} />
        )}

        <button
          onClick={() => setTab("add")}
          className={cn(
            "cursor-pointer rounded-lg px-3 py-1 transition-all",
            tab === "add"
              ? "bg-indigo-950 text-indigo-400"
              : "bg-indigo-500 text-white hover:opacity-80",
          )}
        >
          Add Friend
        </button>
      </div>

      <div className="flex h-full border-t border-neutral-700">
        <div className="w-full border-neutral-700">
          {tab == "all" || tab == "online" ? (
            <ListView tab={tab} friends={friends.friends} />
          ) : tab == "pending" ? (
            <PendingView request={friends.request} accept={friends.accept} />
          ) : (
            <AddView />
          )}
          {/* <AddView /> */}
        </div>
        <div className="w-96 border-l border-neutral-700 bg-neutral-800"></div>
      </div>
    </div>
  );
}

function TabBtn({
  tab,
  onClick,
  label,
}: {
  tab: tab;
  onClick: () => void;
  label: string;
}) {
  const { friends } = useFriend();
  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "flex cursor-pointer items-center justify-center rounded-lg px-3 py-1 transition-all",
          tab === label.toLowerCase()
            ? "bg-neutral-700 text-white hover:bg-neutral-600"
            : "text-neutral-400 hover:bg-neutral-800 hover:text-white",
        )}
      >
        {label}
        {label == "Pending" && friends.accept.length != 0 && (
          <div className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white">
            {friends.accept.length}
          </div>
        )}
      </button>
    </>
  );
}

function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="relative mb-4 flex items-center gap-2">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-foreground w-full rounded-lg border border-neutral-800 p-2 focus:border-indigo-500 focus:outline-none"
      />
      {search != "" ? (
        <X
          color="grey"
          onClick={() => setSearch("")}
          className="absolute right-0 mr-2 h-6 w-6 cursor-pointer"
        />
      ) : (
        <SearchIcon color="gray" className="absolute right-0 mr-2 h-4 w-4" />
      )}
    </div>
  );
}

function ListView({ tab, friends }: { tab: tab; friends: Friend[] }) {
  const [search, setSearch] = useState("");
  return (
    <div className="p-6">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="mx-2 my-4 flex flex-col items-center">
        <h1 className="self-start text-sm">
          {tab === "online" ? "Online" : "All Friends"} -{" "}
          {tab === "online"
            ? friends.filter((fr) => fr.is_online).length
            : friends.length}
        </h1>
      </div>
      {friends.map((value, index) =>
        tab === "online" &&
        value.is_online &&
        value.display_name.includes(search) ? (
          <FriendList
            key={index}
            display_name={value.display_name}
            id={value.id}
            is_online={value.is_online}
            last_active={value.last_active}
            picture={value.picture}
            username={value.username}
            isLast={index == friends.length - 1}
          />
        ) : tab === "all" && value.display_name.includes(search) ? (
          <FriendList
            key={index}
            display_name={value.display_name}
            id={value.id}
            is_online={value.is_online}
            last_active={value.last_active}
            picture={value.picture}
            username={value.username}
            isLast={index == friends.length - 1}
          />
        ) : null,
      )}
    </div>
  );
}

function PendingView({
  request,
  accept,
}: {
  request: Friend[];
  accept: Friend[];
}) {
  const [search, setSearch] = useState("");
  return (
    <div className="p-6">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="mx-2 my-4 flex flex-col items-center">
        {accept.length != 0 && (
          <h1 className="self-start text-sm">
            {"Received - " + accept.length}
          </h1>
        )}
      </div>
      {accept.map((value, index) => (
        <FriendList
          key={value.id}
          display_name={value.display_name}
          id={value.id}
          is_online={value.is_online}
          last_active={value.last_active}
          picture={value.picture}
          username={value.username}
          isLast={index == accept.length - 1}
          isRequest={true}
          isAcc={true}
        />
      ))}
      <div className="mx-2 my-4 flex flex-col items-center">
        {request.length != 0 && (
          <h1 className="self-start text-sm">{"Sent - " + request.length}</h1>
        )}
      </div>
      {request.map((value, index) => (
        <FriendList
          key={value.id}
          display_name={value.display_name}
          id={value.id}
          is_online={value.is_online}
          last_active={value.last_active}
          picture={value.picture}
          username={value.username}
          isLast={index == request.length - 1}
          isRequest={true}
        />
      ))}
    </div>
  );
}

function AddView() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    await fetch(`${process.env.HOST_API_PUBLIC}/api/friend/add/${input}`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setError(`Success! Your friend request to ${input} has been sent.`);
        } else {
          setError(data.message);
        }
      })
      .catch(() => {
        setError("something error");
      });
  };

  return (
    <div className="flex h-fit w-full flex-col border-b border-neutral-700 p-6">
      <h1 className="text-lg">Add Friend</h1>
      <h2 className="text-sm">
        You can add friends with their Discord username.
      </h2>
      <form className="relative flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="You can add friends with their Discord username."
          onChange={(e) => setInput(e.target.value)}
          className={cn(
            "my-4 w-full rounded-sm bg-neutral-800 px-4 py-3 focus:outline-indigo-500 focus:outline-solid",
            error.startsWith("Hm") &&
              "border border-red-500 focus:outline-none",
          )}
        />
        <button
          disabled={input.length < 0}
          // onClick={handleSubmit}
          type="submit"
          className={cn(
            "absolute right-0 mr-2 cursor-pointer rounded-sm bg-indigo-500 p-1.5 px-4 text-xs",
            input == "" && "cursor-not-allowed opacity-50",
          )}
        >
          Send Friend Request
        </button>
      </form>
      <label
        className={cn(
          "-mt-2 text-xs",
          error.startsWith("Hm") ? "text-red-500" : "text-green-500",
        )}
      >
        {error}
      </label>
    </div>
  );
}

function FriendList({
  id,
  display_name,
  username,
  picture,
  last_active,
  is_online,
  isLast,
  isRequest,
  isAcc,
}: Friend & { isLast?: boolean; isRequest?: boolean; isAcc?: boolean }) {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const { friends, setFriends } = useFriend();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000 * 60); // update setiap detik

    return () => clearInterval(interval);
  }, []);

  const acceptHandle = async () => {
    await fetch(`${process.env.HOST_API_PUBLIC}/api/friend/accept/${id}`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setFriends({
            ...friends,
            accept: friends.accept.filter((value) => value.id != id),
          });
        }
      })
      .catch(() => {
        console.log("error");
      });
  };
  return (
    <div
      className={cn(
        "group relative flex h-[60px] cursor-pointer items-center border-y border-neutral-700 px-2 py-3 text-sm hover:rounded-lg hover:border-none hover:bg-neutral-800",
        isLast && "border-b-0",
      )}
    >
      <div className="relative mr-2">
        <img
          src={process.env.HOST_API_PUBLIC + picture}
          alt="profile"
          className={cn(
            "h-8 w-8 rounded-full",
            picture.endsWith("default_picture.png")
              ? "bg-foreground object-contain p-1"
              : "object-cover",
          )}
        />
        {!isRequest && (
          <div
            className={cn(
              "absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border-[4px] border-neutral-900 group-hover:border-neutral-800",
              is_online ? "bg-green-500" : "bg-gray-500",
            )}
          />
        )}
      </div>

      <div className="flex-1">
        <h1 className="flex items-center font-bold">
          {display_name}
          <span className="ml-3 hidden text-xs font-normal group-hover:block">
            {username}
          </span>
        </h1>
        <p className="text-xs text-neutral-400">
          {isRequest ? username : is_online ? "Online" : "Offline"}
        </p>
      </div>
      {isRequest && (
        <div className="flex gap-6">
          {/* TODO: FUNCTION ACCEPT AND DECLINE OR CANCEL REQUEST*/}
          {isAcc && (
            <button
              onClick={acceptHandle}
              className="group/acc hover:bg-foreground cursor-pointer rounded-full"
            >
              <Check className="size-10 stroke-neutral-500 p-2 group-hover/acc:stroke-green-500" />
            </button>
          )}
          <button className="group/dec hover:bg-foreground cursor-pointer rounded-full">
            <X className="size-10 stroke-neutral-500 p-2 group-hover/dec:stroke-red-500" />
          </button>
        </div>
      )}
    </div>
  );
}
