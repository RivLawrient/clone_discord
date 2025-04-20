import { useEffect } from "react";
import useAddServerModal from "./useAddServerModal";
import { CameraIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface addServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddServerModal(props: addServerModalProps) {
  const {
    createHandle,
    error,
    formData,
    handleFileChange,
    handleNameChange,
    inputRef,
    loading,
    previewUrl,
  } = useAddServerModal(props);

  useEffect(() => {
    if (props.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.isOpen]);

  if (!props.isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
        }
      }}
      className="absolute right-0 bottom-0 left-0 z-[99] flex h-screen w-screen items-center justify-center bg-black/70"
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
          {(error.name || error.picture) && (
            <div className="rounded-lg border border-red-500 bg-red-500/10 p-2 text-xs text-red-500 transition-all">
              {error.name || error.picture}
            </div>
          )}
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
            "my-2 cursor-pointer self-end rounded-lg bg-indigo-500 p-2 px-6 py-2 text-sm text-white transition-all hover:bg-indigo-800/80",
            loading && "cursor-not-allowed opacity-50",
          )}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
