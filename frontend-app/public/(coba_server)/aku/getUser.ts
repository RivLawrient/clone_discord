import { cookies } from "next/headers";

interface User {
  id: string;
  display_name: string;
  username: string;
  email: string;
  status: string;
  about_me: string;
  is_online: boolean;
  picture: string;
  token: string;
  token_exp: string;
  created_at: string;
  updated_at: string;
}

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies(); // Ambil cookies dari request
  const cookieHeader = cookieStore.get("session")?.value;
  await new Promise((resolve) => setTimeout(resolve, 8000)); // Delay 2 detik
  const res = await fetch(`${process.env.HOST_API_PUBLIC}/api/user`, {
    method: "GET",
    headers: {
      Cookie: `session=${cookieHeader}`, // Sertakan cookies dalam header
    },
  });
  const data = await res.json();
  if (res.ok) {
    return data.data;
  }
  return null;
}
