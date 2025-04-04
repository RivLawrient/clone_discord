"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderBar() {
  const pathname = usePathname();
  const [name, setName] = useState("");

  useEffect(() => {
    if (pathname.split("/").pop() != "me") {
      setName(pathname.split("/")[2]);
    } else {
      setName("friend");
    }
  }, [pathname]);
  return (
    <header className="header h-[36px] w-full bg-foreground text-white flex items-center justify-center">
      {name}
    </header>
  );
}
