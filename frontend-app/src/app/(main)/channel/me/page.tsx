"use client";
import { useFriend } from "@/context/friendContext";
import { cn } from "@/lib/utils";
import { TabBtn } from "../../_components/friend-list/tabBtn";
import { ListView } from "../../_components/friend-list/listView";
import { PendingView } from "../../_components/friend-list/pendingView";
import { AddView } from "../../_components/friend-list/addView";
import { useState } from "react";

export type tab = "online" | "all" | "pending" | "add";

export default function MePage() {
  const { friends } = useFriend();
  const [tab, setTab] = useState<tab>("online");

  return (
    <div className="flex flex-1 flex-col bg-neutral-900">
      <div className="flex min-h-12 w-full items-center gap-4 border-t border-neutral-700 px-4 py-2 text-[14px]">
        <TabBtn
          label="Online"
          tab={tab}
          onClick={() => {
            setTab("online");
          }}
        />
        <TabBtn label="All" tab={tab} onClick={() => setTab("all")} />
        {(friends.request.length > 0 || friends.accept.length > 0) && (
          <TabBtn label="Pending" tab={tab} onClick={() => setTab("pending")} />
        )}

        <button
          onClick={() => setTab("add")}
          className={cn(
            "cursor-pointer rounded-lg px-3 py-1 transition-all",
            tab === "add"
              ? "bg-indigo-950 text-indigo-400"
              : "bg-indigo-500 text-white hover:opacity-80",
          )}
        >
          Add Friend
        </button>
      </div>

      <div className="flex h-full border-t border-neutral-700">
        <div className="w-full border-neutral-700">
          {tab == "all" || tab == "online" ? (
            <ListView tab={tab} friends={friends.friends} />
          ) : tab == "pending" ? (
            <PendingView request={friends.request} accept={friends.accept} />
          ) : (
            <AddView />
          )}
        </div>
        <div className="w-96 border-l border-neutral-700 bg-neutral-800"></div>
      </div>
    </div>
  );
}
