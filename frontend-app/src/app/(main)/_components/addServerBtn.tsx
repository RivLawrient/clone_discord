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
      <div className="flex flex-col gap-2 relative w-full items-center justify-center">
        <button
          onClick={openModal}
          className="flex justify-center w-10 h-10 peer items-center rounded-xl cursor-pointer hover:bg-indigo-500 bg-gray-800"
        >
          <PlusCircleIcon className="" />
        </button>
        <div
          className={cn(
            "absolute h-1/2 w-0 left-0 bg-white rounded-r-lg peer-hover:w-1 transition-all"
          )}
        />
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
      className="absolute -top-[36px] z-[99] left-0 right-0 bottom-0 flex justify-center items-center h-screen w-screen bg-black/70"
    >
      <div className="bg-neutral-800 rounded-lg px-5 py-3 max-w-md flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold my-2">Customize Your Server</h1>
        <h2 className="text-wrap text-sm">
          Give your new server a personality with a name and an icon. You can
          always change it later.
        </h2>
        <div
          className={cn(
            "flex flex-col justify-center items-center rounded-full border-2 border-dashed border-white w-20 h-20 relative my-5",
            formData.get("picture") && "border-none bg-neutral-900"
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full h-full opacity-0 absolute cursor-pointer rounded-full"
          />
          {!formData.get("picture") ? (
            <>
              <div className="absolute -right-1 top-0 h-6 w-6 rounded-full bg-indigo-500 p-1">
                <Plus className="w-4 h-4" />
              </div>
              <CameraIcon className="w-8 h-8" />
              <h1 className="text-[10px] font-semibold">UPLOAD</h1>
            </>
          ) : (
            <img
              src={previewUrl || ""}
              className="w-full h-full object-cover rounded-full"
              alt="Server preview"
            />
          )}
        </div>

        <div className="flex flex-col w-full mb-4">
          <label className="text-start text-xs font-semibold my-2">
            SERVER NAME
          </label>
          <input
            type="text"
            maxLength={30}
            ref={inputRef}
            onChange={handleNameChange}
            className="bg-neutral-900 border border-gray-800 rounded-lg p-2 focus:border-blue-500 focus:outline-none transition-all"
          />
          <h1 className="text-[10px] text-gray-400 my-2 text-start">
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
            "bg-indigo-500 text-white rounded-lg p-2 text-sm px-6 py-2 my-2 self-end cursor-pointer",
            loading && "opacity-50 cursor-not-allowed"
          )}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
