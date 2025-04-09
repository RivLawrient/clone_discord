import { useEffect } from "react";

import { useState } from "react";

export default function FriendList(props: {
  name: string;
  last_active: number;
  picture: string;
}) {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000); // update setiap detik

    return () => clearInterval(interval); // cleanup saat komponen di-unmount
  }, []);

  return (
    <div className="flex h-[60px] cursor-pointer items-center justify-start border-y border-neutral-700 py-3 text-sm hover:rounded-lg hover:border-none hover:bg-neutral-800">
      <img
        src={props.picture}
        alt="profile"
        className="mr-2 h-8 w-8 rounded-full"
      />
      <div>
        <h1 className="font-bold">{props.name}</h1>
        <p className="text-xs text-neutral-400">
          {now - props.last_active > 60 * 5 ? "Offline" : "Online"}
        </p>
      </div>
    </div>
  );
}
