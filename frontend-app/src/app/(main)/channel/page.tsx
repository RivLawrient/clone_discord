"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

export default function ChannelPage() {
  const { logout } = useAuth();
  return (
    <div>
      channel page
      <Link href="/">back</Link>
      <button onClick={logout}>logout</button>
    </div>
  );
}
