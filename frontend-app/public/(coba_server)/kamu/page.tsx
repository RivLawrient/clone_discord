"use client";
import { redirect, useRouter } from "next/navigation";

export default function Kamu() {
  console.log("kamu");
  return (
    <div>
      <a href="/aku">kamu</a>
      <button onClick={() => redirect("/aku")}>aku</button>
    </div>
  );
}
