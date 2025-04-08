"use client";
import { useServer } from "@/context/serverContext";
import { cn } from "@/lib/utils";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";

interface ServerBtnProps {
  index: number;
  name: string;
  url_img?: string;
  id: string;
  last?: boolean;
}

export default function ServerBtn({
  index,
  name,
  url_img,
  id,
  last = false,
}: ServerBtnProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(`/channel/${id}`);
  const [isDragging, setIsDragging] = useState(false);
  const [isLastDragging, setIsLastDragging] = useState(false);
  const { servers } = useServer();

  return (
    <div className="relative flex w-full items-center justify-center">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          console.log(id, e.dataTransfer.getData("id"));
          console.log(index, e.dataTransfer.getData("index"));
        }}
        className={cn(
          "absolute -top-3.5 my-2 h-1 w-10/12 rounded-2xl bg-green-500 transition-opacity duration-200",
          isDragging ? "opacity-100" : "opacity-0",
        )}
      />
      <button
        id={id}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("id", id);
          e.dataTransfer.setData("index", index.toString());
          setIsDragging(true);
        }}
        onDragEnd={() => {
          setIsDragging(false);
        }}
        onClick={() => redirect(`/channel/${id}/${servers[index].room[0].id}`)}
        className={cn(
          "peer group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gray-800 hover:bg-indigo-500",
          isActive && "bg-indigo-500",
          isDragging && "bg-gray-800",
          url_img ? "bg-neutral-900" : "p-2",
        )}
      >
        {url_img ? (
          <img
            src={url_img}
            alt={`${name} channel`}
            className="h-full w-full rounded-xl object-cover"
          />
        ) : (
          <span>{name[0].toUpperCase()}</span>
        )}
      </button>
      <div
        draggable={false}
        className={cn(
          "absolute left-0 w-0 rounded-r-lg bg-white transition-all peer-hover:w-1",
          isActive ? "h-full w-1" : "h-1/2 w-0",
        )}
      />
      {last && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsLastDragging(true);
          }}
          onDragLeave={() => setIsLastDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsLastDragging(false);
            console.log(id, e.dataTransfer.getData("id"));
          }}
          className={cn(
            "absolute -bottom-1.5 h-1 w-10/12 rounded-2xl bg-green-500 transition-opacity duration-200",
            isLastDragging ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      <div className="absolute left-17 z-[51] hidden rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-[14px] font-semibold text-nowrap peer-hover:block">
        {name}
      </div>
    </div>
  );
}
