import { Server, useServer } from "@/context/serverContext";
import { Loader2Icon, SearchIcon, X } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface DiscoverModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function DiscoverModal(props: DiscoverModalProps) {
  const [search, setSearch] = useState("");
  const { servers } = useServer();
  const [filteredServers, setFilteredServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (search === "") {
      setLoading(true);
      fetch(`${process.env.HOST_API_PUBLIC}/api/find_server`, {
        method: "GET",
        credentials: "include",
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            setFilteredServers(data.data);
            setLoading(false);
          }
          setLoading(false);
        })
        .catch(() => {});
    } else {
      setLoading(true);
      setTimeout(() => {
        fetch(`${process.env.HOST_API_PUBLIC}/api/find_server/${search}`, {
          method: "GET",
        })
          .then(async (res) => {
            const data = await res.json();
            if (res.ok) {
              setFilteredServers(data.data);
              setLoading(false);
            } else {
              setFilteredServers([]);
              setLoading(false);
            }
          })
          .catch(() => {});
        setLoading(false);
      }, 1000);
    }
  }, [search]);

  if (!props.isOpen) return null;
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
        }
      }}
      className="absolute right-0 bottom-0 left-0 z-[99] flex h-screen w-screen items-center justify-center bg-black/70"
    >
      <div className="flex min-w-2xl flex-col items-center overflow-hidden rounded-lg text-center">
        <div className="flex w-full flex-row items-center justify-between border-b border-neutral-700 bg-neutral-900 p-5 px-6">
          <h1 className="my-2 text-2xl font-bold">Discover</h1>

          <div className="relative flex items-center gap-2">
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
              <SearchIcon
                color="gray"
                className="absolute right-0 mr-2 h-4 w-4"
              />
            )}
          </div>
        </div>

        {!loading && filteredServers.length === 0 ? (
          <div className="my-10">Server Not Found</div>
        ) : !loading && filteredServers.length > 0 ? (
          <div
            style={{
              scrollbarWidth: "none",
            }}
            className="grid max-h-[750px] grid-cols-2 gap-4 overflow-y-auto bg-neutral-900 p-4 px-6"
          >
            {filteredServers.map((v) => (
              <Card onClose={props.onClose} v={v} key={v.id} />
            ))}
          </div>
        ) : (
          loading && <Loader2Icon className="my-10 animate-spin" />
        )}
      </div>
    </div>
  );
}

function Card({ v, onClose }: { v: Server; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const { servers, setServers } = useServer();
  const route = useRouter();
  const JoinHandle = async () => {
    setLoading(true);
    await fetch(`${process.env.HOST_API_PUBLIC}/api/my_server/${v.id}`, {
      method: "PUT",
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setServers([...servers, data.data]);
          onClose();
          route.push("/channel/" + v.id);
          //  setLoading(false);
        }
        setLoading(false);
      })
      .catch(() => {});
  };

  return (
    <div
      key={v.id}
      className="relative flex h-[340px] w-80 flex-col overflow-hidden rounded-lg border border-neutral-700 p-4 text-left"
    >
      <div className="absolute top-0 right-0 left-0 h-15 bg-neutral-700" />
      <div className="bg-foreground z-[2] mb-4 flex size-15 items-center justify-center overflow-hidden rounded-xl">
        {v.picture ? (
          <img src={v.picture} alt="" className="object-cover" />
        ) : (
          <span>{v.name[0].toUpperCase()}</span>
        )}
      </div>
      <h1 className="text-3xl">{v.name}</h1>
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <div className="size-2 rounded-full bg-green-500" />
        <span>{v.member} Members</span>
      </div>
      <h2 className="my-4 flex-1 text-sm leading-tight text-wrap text-neutral-400">
        {v.description}
      </h2>

      {servers.some((vv) => vv.id === v.id) ? (
        <button
          onClick={() => {
            onClose();
            redirect("/channel/" + v.id);
          }}
          className="my-2 cursor-pointer rounded-lg bg-indigo-500 p-2 px-6 py-2 text-sm text-white transition-all hover:bg-indigo-800/80"
        >
          Go to Server
        </button>
      ) : (
        <button
          onClick={JoinHandle}
          className="my-2 flex cursor-pointer justify-center rounded-lg bg-indigo-500 p-2 px-6 py-2 text-sm text-white transition-all hover:bg-indigo-800/80"
        >
          {loading ? <Loader2Icon className="animate-spin" /> : "Join Server"}
        </button>
      )}
    </div>
  );
}
