"use client";
import { useAuth } from "@/context/authContext";
import { Server, useServer } from "@/context/serverContext";
import { cn } from "@/lib/utils";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { CameraIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function ModalAddServer(props: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useAuth();
  const ref = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [picture, setPicture] = useState<File>();
  const route = useRouter();
  const { setServers } = useServer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    picture: "",
    name: "",
  });

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        setText(user.display_name.slice(0, 20) + "'s server");
        ref.current.focus();
      }
    }, 0);
  }, [props.modal]);

  const previewUrl = useMemo(() => {
    if (!picture) return null;
    return URL.createObjectURL(picture);
  }, [picture]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const fileChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(e.target.files[0]);
    }
  };
  const nameChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const newServer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setLoading(true);
    fetch(`${process.env.HOST_API_PUBLIC}/api/server`, {
      method: "POST",
      credentials: "include",
      body: (() => {
        const form = new FormData();
        form.append("name", text);
        picture && form.append("picture", picture);
        return form;
      })(),
    })
      .then(async (res) => {
        const data = await res.json();
        const resp: Server = data.data;
        if (res.ok) {
          setServers((p) => [...p, resp]);
          props.setModal(!props.modal);
          route.push("/channels/" + resp.id);
        }
      })
      .catch(() => {});
    setLoading(false);
  };

  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 bg-black/50"></DialogOverlay>
      <DialogContent
        onOpenAutoFocus={() => ref.current && ref.current.focus()}
        className={cn(
          "fixed top-1/2 left-1/2 flex max-w-md -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-neutral-700/70 bg-neutral-800 px-5 py-2 text-center text-white",
        )}
      >
        <DialogTitle className="my-2 text-2xl font-bold">
          Customize Your Server
        </DialogTitle>
        <DialogDescription></DialogDescription>
        <h2 className="text-sm text-wrap">
          Give your new server a personality with a name and an icon. You can
          always change it later.
        </h2>
        <div
          className={cn(
            "relative my-5 flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-dashed border-white",
            picture && "border-none",
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={fileChangeHandle}
            className={cn(
              "absolute size-full cursor-pointer rounded-full opacity-0",
            )}
            title=""
          />
          {previewUrl ? (
            <img
              src={previewUrl}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <>
              <div className="absolute top-0 -right-1 h-6 w-6 rounded-full bg-indigo-500 p-1">
                <PlusIcon className="h-4 w-4" />
              </div>
              <CameraIcon className="h-8 w-8" />
              <h1 className="text-[10px] font-semibold">UPLOAD</h1>
            </>
          )}
        </div>
        <div className="mb-4 flex w-full flex-col">
          <label className="my-2 text-start text-xs font-semibold">
            SERVER NAME
          </label>
          <input
            type="text"
            maxLength={50}
            ref={ref}
            value={text}
            onChange={nameChangeHandle}
            className="rounded-lg border border-gray-800 bg-neutral-900 p-2 transition-all focus:border-blue-500 focus:outline-none"
          />
          {/* {(error.name || error.picture) && (
            <div className="rounded-lg border border-red-500 bg-red-500/10 p-2 text-xs text-red-500 transition-all">
              {error.name || error.picture}
            </div>
          )} */}
          <h1 className="my-2 text-start text-[10px] text-gray-400">
            By creating a server, you agree to Discord's{" "}
            <a href="" className="text-indigo-500 hover:underline">
              community guidelines
            </a>
            .
          </h1>
        </div>

        {/* <DialogAction asChild> */}
        <button
          onClick={newServer}
          disabled={loading || !text}
          className={cn(
            "my-2 cursor-pointer self-end rounded-lg bg-indigo-500 p-2 px-6 py-2 text-sm text-white transition-all hover:bg-indigo-800/80",
            (loading || !text) && "cursor-not-allowed opacity-50",
          )}
        >
          {loading ? "Creating..." : "Create"}
        </button>
        {/* </DialogAction> */}
      </DialogContent>
    </DialogPortal>
  );
}
