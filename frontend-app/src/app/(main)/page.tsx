"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

export default function MainPage() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      main page {user?.username}
      <Link href="/channel">channel</Link>
    </div>
  );
}
