"use client";
import { cn } from "@/lib/utils";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";

interface ChannelButtonProps {
  index: number;
  name: string;
  url_img?: string;
  id: string;
  last?: boolean;
}

export default function ChannelButton({
  index,
  name,
  url_img,
  id,
  last = false,
}: ChannelButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === `/channel/${id}`;
  const [isDragging, setIsDragging] = useState(false);
  const [isLastDragging, setIsLastDragging] = useState(false);
  return (
    <div className="flex w-full relative justify-center items-center">
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
          "absolute my-2 -top-3.5 h-1 w-10/12 rounded-2xl bg-green-500 transition-opacity duration-200",
          isDragging ? "opacity-100" : "opacity-0"
        )}
      />
      <button
        id={id}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("id", id);
          e.dataTransfer.setData("index", index.toString());
        }}
        onClick={() => redirect(`/channel/${id}`)}
        className={cn(
          "flex w-10 h-10 justify-center items-center peer p-2 group bg-gray-800 rounded-xl hover:bg-indigo-500 cursor-pointer",
          isActive && "bg-indigo-500"
        )}
      >
        {url_img ? (
          <img src={url_img} alt={`${name} channel`} className="object-cover" />
        ) : (
          <span>{name[0].toUpperCase()}</span>
        )}
      </button>
      <div
        draggable={false}
        className={cn(
          "absolute w-0 left-0 bg-white rounded-r-lg transition-all peer-hover:w-1",
          isActive ? "w-1 h-full" : "w-0 h-1/2"
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
            "absolute h-1 -bottom-1.5 w-10/12 rounded-2xl bg-green-500 transition-opacity duration-200",
            isLastDragging ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}
