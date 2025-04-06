"use client";
import { useChannel } from "@/context/channelContext";
import { cn } from "@/lib/utils";
import { CameraIcon, Plus, PlusCircleIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export function AddServerBtn() {
  const [isOpen, setIsOpen] = useState(false); // Ubah default ke false
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <AddServerModal isOpen={isOpen} onClose={closeModal} />
      <div className="relative flex w-full flex-col items-center justify-center gap-2">
        <button
          onClick={openModal}
          className="peer flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gray-800 hover:bg-indigo-500"
        >
          <PlusCircleIcon className="" />
        </button>
        <div
          className={cn(
            "absolute left-0 h-1/2 w-0 rounded-r-lg bg-white transition-all peer-hover:w-1",
          )}
        />
        <div className="absolute left-17 z-[51] hidden rounded-lg border border-neutral-800 bg-neutral-900 p-2 text-[14px] font-semibold text-nowrap peer-hover:block">
          Add Server
        </div>
      </div>
    </>
  );
}

export function AddServerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(() => new FormData());
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const server = useChannel();
  // Cleanup URL saat komponen unmount atau preview berubah
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFormData = new FormData();
      // Salin data yang sudah ada
      for (let [key, value] of formData.entries()) {
        newFormData.append(key, value);
      }
      newFormData.set("picture", file);
      setFormData(newFormData);

      // Buat preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = new FormData();
    for (let [key, value] of formData.entries()) {
      newFormData.append(key, value);
    }
    newFormData.set("name", e.target.value); // Gunakan set untuk mengganti nilai
    setFormData(newFormData);
  };

  const createHandle = async () => {
    if (!formData.get("name")) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.HOST_API_PUBLIC}/api/server/new`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        server.setChannels([...server.channels, data.data]);
        setLoading(false);
        onClose(); // Tutup modal saat sukses
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="absolute -top-[36px] right-0 bottom-0 left-0 z-[99] flex h-screen w-screen items-center justify-center bg-black/70"
    >
      <div className="flex max-w-md flex-col items-center rounded-lg bg-neutral-800 px-5 py-3 text-center">
        <h1 className="my-2 text-2xl font-bold">Customize Your Server</h1>
        <h2 className="text-sm text-wrap">
          Give your new server a personality with a name and an icon. You can
          always change it later.
        </h2>
        <div
          className={cn(
            "relative my-5 flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-dashed border-white",
            formData.get("picture") && "border-none bg-neutral-900",
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute h-full w-full cursor-pointer rounded-full opacity-0"
          />
          {!formData.get("picture") ? (
            <>
              <div className="absolute top-0 -right-1 h-6 w-6 rounded-full bg-indigo-500 p-1">
                <Plus className="h-4 w-4" />
              </div>
              <CameraIcon className="h-8 w-8" />
              <h1 className="text-[10px] font-semibold">UPLOAD</h1>
            </>
          ) : (
            <img
              src={previewUrl || ""}
              className="h-full w-full rounded-full object-cover"
              alt="Server preview"
            />
          )}
        </div>

        <div className="mb-4 flex w-full flex-col">
          <label className="my-2 text-start text-xs font-semibold">
            SERVER NAME
          </label>
          <input
            type="text"
            maxLength={30}
            ref={inputRef}
            onChange={handleNameChange}
            className="rounded-lg border border-gray-800 bg-neutral-900 p-2 transition-all focus:border-blue-500 focus:outline-none"
          />
          <h1 className="my-2 text-start text-[10px] text-gray-400">
            By creating a server, you agree to Discord's{" "}
            <a href="" className="text-indigo-500 hover:underline">
              community guidelines
            </a>
            .
          </h1>
        </div>

        <button
          onClick={createHandle}
          disabled={loading}
          className={cn(
            "my-2 cursor-pointer self-end rounded-lg bg-indigo-500 p-2 px-6 py-2 text-sm text-white",
            loading && "cursor-not-allowed opacity-50",
          )}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
