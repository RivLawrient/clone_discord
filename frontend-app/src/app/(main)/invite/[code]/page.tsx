"use client";

import { Server, useServer } from "@/context/serverContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<Server>();
  const path = usePathname().split("/");
  const [loading, setLoading] = useState(true);
  const { servers, setServers } = useServer();
  const server = servers.find((v) => v.invite_code === path[2]);
  const router = useRouter();

  useEffect(() => {
    if (server) {
      router.push("/channels/" + server.id + "/" + server.channel);
    } else {
      fetch(`${process.env.HOST_API_PUBLIC}/api/server/invite/${path[2]}`, {
        method: "GET",
        credentials: "include",
      })
        .then(async (res) => {
          const resp = await res.json();
          const data: Server = resp.data;
          if (res.ok) {
            setData(data);
          }
        })
        .catch(() => {});
      setLoading(false);
    }
  }, []);
  if (!loading)
    return (
      <div
        style={{ backgroundImage: "url('/bg.svg')", backgroundSize: "cover" }}
        className="fixed h-screen w-screen"
      >
        <Image
          className="absolute m-11"
          src="/discord.svg"
          width={124}
          height={24}
          alt="logo discord name"
        />
        <div className="fixed top-1/2 left-1/2 flex w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-neutral-700/70 bg-neutral-800 p-6 text-white">
          {/* {data && !loading ? (
          <Modal data={data} />
        ) : (
          !data && !loading && <NotFound />
        )} */}
          {data ? <Modal data={data} /> : <NotFound />}
        </div>
      </div>
    );
}

function Modal(props: { data: Server }) {
  const { setServers } = useServer();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const joinHandle = () => {
    setLoading(true);
    fetch(
      `${process.env.HOST_API_PUBLIC}/api/my_server/${props.data.invite_code}`,
      {
        method: "POST",
        credentials: "include",
      },
    )
      .then(async (res) => {
        const resp = await res.json();
        const data: Server = resp.data;
        if (res.ok) {
          setServers((p) => [...p, data]);
          setTimeout(() => {
            router.push(
              "/channels/" + data.id + "/" + props.data.channel.text[0].id,
            );
          }, 1);
        }
      })
      .catch(() => {});
  };
  return (
    <>
      <Avatar className="mb-2 flex size-20 items-center justify-center overflow-hidden rounded-xl bg-indigo-500">
        <AvatarImage src={process.env.HOST_API_PUBLIC + props.data.picture} />
        <AvatarFallback className="text-[40px]">
          {props.data.name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h2> invited you to join</h2>
      <h1 className="text-2xl font-semibold">{props.data.name}</h1>
      <div className="mt-1 mb-4 flex items-center gap-2">
        <div className="size-4 rounded-full bg-green-500" />
        <span>{props.data.member} Members</span>
      </div>

      <button
        onClick={joinHandle}
        disabled={loading}
        className="w-full cursor-pointer rounded-sm bg-indigo-500 py-2 text-sm text-white transition-all hover:bg-indigo-800/80"
      >
        Accept Invite
      </button>
      <button
        onClick={() => router.push("/channels/me")}
        className="cursor-pointer pt-5 text-sm hover:underline"
      >
        No Thanks
      </button>
    </>
  );
}

function NotFound() {
  const [count, setCount] = useState(3);
  const router = useRouter();
  useEffect(() => {
    if (count <= 0) {
      router.push("/"); // Redirect ke halaman utama
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, router]);

  return (
    <>
      <h1>Server Is Not Found</h1>
      <h2>Redirect in {count}</h2>
    </>
  );
}
