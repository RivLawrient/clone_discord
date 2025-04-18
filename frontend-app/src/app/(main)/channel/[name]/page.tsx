"use client";
import { useServer } from "@/context/serverContext";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChannelNamePage() {
  const path = usePathname().split("/")[2];
  const { servers } = useServer();

  useEffect(() => {
    servers.map((value) => {
      value.id == path
        ? redirect(path + "/" + value.room[0].id)
        : fetch(`${process.env.HOST_API_PUBLIC}/api/my_server/${path}`, {
            method: "GET",
            credentials: "include",
          }).then(async (res) => {
            if (res.ok) {
              const data = await res.json();
              redirect(path + "/" + data.data.room[0].id);
            }
          });
    });
  }, []);

  return <div className="text-center">Server is not found</div>;
}
