import { Server, useServer } from "@/context/serverContext";
import getServer from "@/get-data/getServer";

export async function generateStaticParams() {
  const servers: Server[] = await fetch(
    `${process.env.HOST_API_PUBLIC}/api/my_server`,
    {
      method: "GET",
      // headers: {
      //   Cookie: `session=${cookie.get("session")?.value}`,
      // },
    },
  ).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
    return [];
  });

  if (servers)
    return servers.map((v) => ({
      server: v.id,
    }));
}

export default function Page() {
  return <>server</>;
}
