import { User } from "@/context/authContext";

export default async function getFriend(): Promise<User[]> {
  const response = await fetch(`${process.env.HOST_API_PUBLIC}/api/list_user`);
  const data = await response.json();
  return data.data;
}
