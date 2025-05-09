import { useFriend } from "@/context/friendContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function AddView() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const { friends, setFriends } = useFriend();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    fetch(`${process.env.HOST_API_PUBLIC}/api/friend/add/${input}`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setError(`Success! Your friend request to ${input} has been sent.`);
          setFriends({
            ...friends,
            pending: [...friends.pending, data.data],
          });
        } else {
          setError(data.message);
        }
      })
      .catch(() => {
        setError("something error");
      });
  }

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
