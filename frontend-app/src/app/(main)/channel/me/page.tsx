"use client";
import { SearchIcon } from "lucide-react";
import { Friend, useFriend } from "@/context/friendContext";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";

export default function MePage() {
  const { friends, setFriends } = useFriend();
  const { user } = useAuth();
  const [tab, setTab] = useState<"online" | "all" | "pending" | "add">(
    "online",
  );
  const [search, setSearch] = useState("");
  const [pending, setPending] = useState<{
    request: Friend[];
    accept: Friend[];
  }>({
    request: [],
    accept: [],
  });

  useEffect(() => {
    const socket = new WebSocket(process.env.WS_API_PUBLIC!);
    socket.onopen = () => {
      console.log("Connected to server");

      socket.send(
        JSON.stringify({
          event: "pusher:subscribe",
          data: {
            channel: "user-data",
          },
        }),
      );

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.event === "update-user") {
          const res = JSON.parse(data.data);
          const users: Friend = res.user;
          console.log(users);
          if (user?.id != users.id) {
            setFriends(
              friends.map((prev) => (prev.id == users.id ? users : prev)),
            );
          }
        }
        if (data.event === "pusher:ping") {
          socket.send(
            JSON.stringify({
              event: "pusher:pong",
            }),
          );
        }
      };
    };
  }, []);

  useEffect(() => {
    fetch(`${process.env.HOST_API_PUBLIC}/api/friend/pending`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        setPending(data.data);
      })
      .catch(() => {});
  }, []);

  const list = friends;
  return (
    <div className="flex h-full flex-col bg-neutral-900">
      <div className="flex min-h-12 w-full items-center gap-4 border-t border-neutral-700 px-4 py-2 text-[14px]">
        <button
          onClick={() => setTab("online")}
          className={cn(
            "cursor-pointer rounded-lg px-3 py-1 text-neutral-400 hover:opacity-80",
            tab === "online"
              ? "bg-neutral-700 text-white hover:bg-neutral-700"
              : "hover:bg-neutral-700",
          )}
        >
          Online
        </button>
        <button
          onClick={() => setTab("all")}
          className={cn(
            "cursor-pointer rounded-lg px-3 py-1 text-neutral-400 hover:opacity-80",
            tab === "all"
              ? "bg-neutral-700 text-white hover:bg-neutral-700"
              : "hover:bg-neutral-700",
          )}
        >
          All
        </button>
        {(pending.request.length > 0 || pending.accept.length > 0) && (
          <button
            onClick={() => setTab("pending")}
            className={cn(
              "cursor-pointer rounded-lg px-3 py-1 text-neutral-400 hover:opacity-80",
              tab === "pending"
                ? "bg-neutral-700 hover:bg-neutral-700"
                : "hover:bg-neutral-700",
            )}
          >
            Pending
          </button>
        )}
        <button
          onClick={() => setTab("add")}
          className={cn(
            "cursor-pointer rounded-lg bg-indigo-500 px-3 py-1 text-white hover:opacity-80",
            tab === "add" && "bg-indigo-950 text-indigo-500",
          )}
        >
          Add Friend
        </button>
      </div>

      <div className="flex h-full border-t border-neutral-700">
        <div className="w-full border-neutral-700 p-6">
          {tab == "all" || tab == "online" ? (
            <ListView />
          ) : tab == "pending" ? (
            <PendingView />
          ) : (
            <AddView />
          )}
        </div>
        {/* {tab == "all" || tab == "online" ? (
          <div className="w-full border-neutral-700 p-6">
            <div className="relative mb-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                className="bg-foreground w-full rounded-lg border border-neutral-800 p-2 focus:border-indigo-500 focus:outline-none"
              />
              <SearchIcon className="absolute right-0 mr-2 h-4 w-4" />
            </div>
            {search.length > 0 ? (
              <></>
            ) : (
              <>
                <div className="mx-2 my-4 flex flex-col items-center">
                  <h1 className="self-start text-sm">
                    {tab === "online" ? "Online" : "All Friends"} -{" "}
                    {tab === "online"
                      ? friends.filter((fr) => fr.is_online).length
                      : friends.length}
                  </h1>
                </div>
              </>
            )}
            {tab == "online"
              ? friends.map((value) =>
                  value.is_online && search.length == 0 ? (
                    <FriendList
                      key={value.id}
                      id={value.id}
                      display_name={value.display_name}
                      username={value.username}
                      picture={value.picture}
                      last_active={value.last_active}
                      is_online={value.is_online}
                    />
                  ) : value.is_online && value.display_name.includes(search) ? (
                    <FriendList
                      key={value.id}
                      id={value.id}
                      display_name={value.display_name}
                      username={value.username}
                      picture={value.picture}
                      last_active={value.last_active}
                      is_online={value.is_online}
                    />
                  ) : null,
                )
              : friends.map((value) =>
                  search.length == 0 ? (
                    <FriendList
                      key={value.id}
                      id={value.id}
                      display_name={value.display_name}
                      username={value.username}
                      picture={value.picture}
                      last_active={value.last_active}
                      is_online={value.is_online}
                    />
                  ) : value.display_name.includes(search) ? (
                    <FriendList
                      key={value.id}
                      id={value.id}
                      display_name={value.display_name}
                      username={value.username}
                      picture={value.picture}
                      last_active={value.last_active}
                      is_online={value.is_online}
                    />
                  ) : null,
                )}
          </div>
        ) : tab == "pending" ? (
          <div></div>
        ) : tab === "add" ? (
          <InputFriend />
        ) : (
          <div className="w-full border-neutral-700 p-6"></div>
        )} */}
        <div className="w-96 border-l border-neutral-700 bg-neutral-800"></div>
      </div>
    </div>
  );
}

function TabBtn() {
  return <></>;
}

function ListView() {
  return <>list view </>;
}

function PendingView() {
  return <>pending view</>;
}

function AddView() {
  return <>add view</>;
}

function InputFriend() {
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
}: Friend) {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(
      () => {
        setNow(Math.floor(Date.now() / 1000));
      },
      1000 * 60 * 5,
    ); // update setiap detik

    return () => clearInterval(interval);
  }, []);

  const isOnline = now - last_active < 60 * 5;
  return (
    <div className="group relative flex h-[60px] cursor-pointer items-center justify-start border-y border-neutral-700 px-2 py-3 text-sm hover:rounded-lg hover:border-none hover:bg-neutral-800">
      <div className="relative mr-2">
        <img
          src={picture}
          alt="profile"
          className={cn(
            "h-8 w-8 rounded-full",
            picture.endsWith("default_picture.png")
              ? "bg-foreground object-contain p-1"
              : "object-cover",
          )}
        />
        <div
          className={cn(
            "absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border-[4px] border-neutral-900 group-hover:border-neutral-800",
            isOnline ? "bg-green-500" : "bg-gray-500",
          )}
        />
      </div>

      <div>
        <h1 className="font-bold">{display_name}</h1>
        <p className="text-xs text-neutral-400">
          {is_online ? "Online" : "Offline"}
          {/* {now - props.last_active > 60 * 5 ? "Offline" : "Online"} */}
        </p>
      </div>
    </div>
  );
}
