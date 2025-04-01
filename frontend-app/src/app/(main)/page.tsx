"use client";
import { useAuth } from "@/context/authContext";

export default function MainPage() {
  const { user } = useAuth();

  return <div>main page</div>;
}
