"use client";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";

export default function MainPage() {
  const { user, loading } = useAuth();
  console.log(user);
  return (
    <div>
      main page {user?.username}
      <Link href="/channel">channel</Link>
      {loading ? (
        <div>Loading...</div>
      ) : (
        user?.picture && (
          <img
            src={`${user?.picture}`}
            alt="user picture"
            className="h-24 w-24 object-contain rounded-full p-4"
            style={{
              backgroundColor: `#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`,
            }}
          />
        )
      )}
    </div>
  );
}
