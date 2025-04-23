"use client";
import { useEffect } from "react";

export default function LayoutServer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("websocket server");
  }, []);
  return <>{children}</>;
}
