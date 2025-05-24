import { Server } from "@/context/serverContext";
import { cookies } from "next/headers";

export default async function getServer(): Promise<Server[] | null> {
  const cookie = await cookies();

  if (!cookie.get("session")) return null;

  return await fetch(`${process.env.HOST_API_PUBLIC}/api/my_server`, {
    method: "GET",
    headers: {
      Cookie: `session=${cookie.get("session")?.value}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
    return [];
  });
}
