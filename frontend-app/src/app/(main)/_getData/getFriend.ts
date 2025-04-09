import { Friend } from "@/context/friendContext";
import { cookies } from "next/headers";

export default async function getFriend(): Promise<Friend[]> {
  const cookie = await cookies();
  const response = await fetch(`${process.env.HOST_API_PUBLIC}/api/friend`, {
    headers: {
      Cookie: `session=${cookie.get("session")?.value}`,
    },
  });
  const data = await response.json();
  return data.data;
}
