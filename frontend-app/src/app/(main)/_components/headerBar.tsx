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
    <header className="bg-foreground absolute flex min-h-[36px] w-full items-center justify-center text-white select-none">
      {pathname.split("/").pop() == "me" ? (
        <div className="flex items-center gap-2 text-sm">
          <UserIcon className="h-4 w-4" />
          Friends
        </div>
      ) : (
        servers.map(
          (value) =>
            value.id == pathname.split("/")[2] && (
              <div key={value.id} className="flex items-center gap-2">
                <div className="z-[2] flex size-5 items-center justify-center overflow-hidden rounded-sm bg-gray-800">
                  {value.picture ? (
                    <img
                      src={value.picture}
                      alt=""
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-[12px]">
                      {value.name[0].toUpperCase()}
                    </span>
                  )}
                </div>
                {value.name}
              </div>
            ),
        )
      )}
    </header>
  );
}
