import { User } from "@/context/authContext";
import { cookies } from "next/headers";

export async function getUser(): Promise<User | null> {
  const cookie = await cookies();

  if (!cookie.get("session")) return null;

  return await fetch(`${process.env.HOST_API_PUBLIC}/api/user`, {
    method: "GET",
    headers: {
      Cookie: `session=${cookie.get("session")?.value}`,
    },
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        return data.data;
      }
      return null;
    })
    .catch(() => {
      return null;
    });
}
