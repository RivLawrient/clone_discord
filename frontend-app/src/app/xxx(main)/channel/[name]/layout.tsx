"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Chat {
  id: string;
  server_id: string;
  user_id: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export default function LayoutServer({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname().split("/");
  const [chat, setChat] = useState<Chat[]>([]);

  return <>{children}</>;
}
