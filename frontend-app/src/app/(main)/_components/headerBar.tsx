"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserIcon } from "lucide-react";
import { useServer } from "@/context/serverContext";

export default function HeaderBar() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const { servers } = useServer();

  useEffect(() => {
    if (pathname.split("/").pop() != "me") {
      setName(pathname.split("/")[2]);
    } else {
      setName("Friend");
    }
  }, [pathname]);

  return (
    <header className="header bg-foreground flex h-[36px] w-full items-center justify-center text-white">
      {pathname.split("/").pop() == "me" ? (
        <div className="flex items-center gap-2 text-sm">
          <UserIcon className="h-4 w-4" />
          Friends
        </div>
      ) : (
        servers.map(
          (data) =>
            data.id == pathname.split("/").pop() && (
              <div key={data.id}>{data.name}</div>
            ),
        )
      )}
    </header>
  );
}
