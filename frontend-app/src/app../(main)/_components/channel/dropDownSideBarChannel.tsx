"use client";

import { Server } from "@/context/serverContext";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, XIcon } from "lucide-react";
import { AlertDialog, DropdownMenu } from "radix-ui";

export default function DropDownSideBarChannel(props: { server: Server }) {
  return (
    <Adds>
      <button
        className={cn(
          "grid h-12 min-w-0 cursor-pointer grid-cols-[1fr_auto] items-center border-b border-neutral-700/70 px-4 outline-none hover:bg-neutral-800/40",
        )}
      >
        <span className="max-w-full justify-self-start truncate text-[16px] leading-normal font-semibold">
          {props.server.name}
        </span>
        <ChevronDownIcon className="size-5 text-neutral-400" />
        {/* <XIcon className="size-5 text-neutral-400" /> */}
      </button>
    </Adds>
  );
}

function Adds(props: { children: React.ReactNode }) {
  return (
    <AlertDialog.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>{props.children}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            className={cn(
              "flex min-w-[200px] flex-col gap-2 rounded-lg border border-neutral-700/70 bg-neutral-800 p-2 text-white",
            )}
          >
            <DropdownMenu.Item>Change Icon</DropdownMenu.Item>
            <DropdownMenu.Item>Rename</DropdownMenu.Item>
            <DropdownMenu.Item>Invite Code</DropdownMenu.Item>
            <AlertDialog.Trigger asChild>
              <DropdownMenu.Item>Delete</DropdownMenu.Item>
            </AlertDialog.Trigger>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <AlertDialog.Portal>
        <ModalDeleteLeaveServer />
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

function ModalDeleteLeaveServer() {
  return (
    <>
      <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
      <AlertDialog.Content
        className={cn(
          "fixed top-1/2 left-1/2 flex max-w-md -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-neutral-700/70 bg-neutral-800 px-5 py-2 text-center text-white",
        )}
      >
        <AlertDialog.Title>ANjai</AlertDialog.Title>
        <AlertDialog.Description></AlertDialog.Description>
        <AlertDialog.Cancel>cancel</AlertDialog.Cancel>
      </AlertDialog.Content>
    </>
  );
}

// import { Server, useServer } from "@/context/serverContext";
// import { cn } from "@/lib/utils";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuPortal,
//   DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogOverlay,
//   AlertDialogPortal,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@radix-ui/react-alert-dialog";
// import {
//   CameraIcon,
//   ChevronDownIcon,
//   ImageIcon,
//   LogOutIcon,
//   PlusIcon,
//   TextCursorInputIcon,
//   Trash2Icon,
//   UserPlus2Icon,
//   XIcon,
// } from "lucide-react";
// import {
//   ChangeEvent,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { redirect, usePathname, useRouter } from "next/navigation";

// export function DropDownSideBarChannel(props: { server: Server }) {
//   const [rename, setRename] = useState(false);
//   const [name, setName] = useState(props.server.name);
//   const ref = useRef<HTMLInputElement>(null);
//   const { setServers } = useServer();
//   const [show, setShow] = useState(false);
//   const [dialog, setDialog] = useState(false);
//   const [variant, setVariant] = useState<
//     "delete" | "invite" | "picture" | null
//   >(null);

//   useEffect(() => {
//     if (rename) {
//       const timeout = setTimeout(() => {
//         ref.current?.focus();
//         ref.current?.select();
//       }, 1);
//       return () => clearTimeout(timeout);
//     }
//   }, [rename]);

//   const updateServerName = () => {
//     fetch(`${process.env.HOST_API_PUBLIC}/api/server/${props.server.id}`, {
//       method: "PUT",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: name,
//       }),
//     })
//       .then(async (res) => {
//         const resp = await res.json();
//         const data: Server = resp.data;
//         // if (res.ok) {
//         //   setServers((p) =>
//         //     p.map((v) => (v.id === props.server.id ? data : v)),
//         //   );
//         // }
//       })
//       .catch(() => {});
//   };

//   return (
//     <AlertDialog open={dialog} onOpenChange={(v) => setDialog(v)}>
//       <DropdownMenu onOpenChange={(v) => setShow(v)} open={show}>
//         <DropdownMenuTrigger
//           disabled={rename}
//           className="group grid h-12 min-w-0 cursor-pointer grid-cols-[1fr_auto] items-center rounded-ss-md border-b border-neutral-700/70 px-4 outline-none hover:bg-neutral-800/40 data-[state=open]:bg-neutral-800/40"
//         >
//           {!rename ? (
//             <span className="max-w-full justify-self-start truncate text-[16px] leading-normal font-semibold">
//               {props.server.name}
//             </span>
//           ) : (
//             <input
//               ref={ref}
//               type="text"
//               value={name}
//               onChange={(e) => {
//                 e.preventDefault();
//                 setName(e.target.value);
//               }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   setRename(false);
//                   updateServerName();
//                 }
//               }}
//               onBlur={() => {
//                 setRename(false);
//                 // updateServerName();
//               }}
//               className="max-w-full justify-self-start truncate text-[16px] leading-none font-semibold outline-none"
//             />
//           )}
//           <ChevronDownIcon className="size-5 text-neutral-400 group-data-[state=open]:hidden" />
//           <XIcon className="size-5 text-neutral-400 group-data-[state=closed]:hidden" />
//         </DropdownMenuTrigger>
//         <DropdownMenuPortal>
//           <DropdownMenuContent
//             sideOffset={5}
//             className="flex min-w-[200px] flex-col gap-2 rounded-lg border border-neutral-700/70 bg-neutral-800 p-2"
//           >
//             {props.server.is_owner ? (
//               <AlertDialogTrigger>
//                 <BtnList
//                   action={() => setVariant("picture")}
//                   label="Change Icon"
//                 >
//                   <ImageIcon size={20} />
//                 </BtnList>
//               </AlertDialogTrigger>
//             ) : null}
//             {props.server.is_owner ? (
//               <BtnList label="Rename" action={() => setRename(true)}>
//                 <TextCursorInputIcon size={20} />
//               </BtnList>
//             ) : null}
//             <AlertDialogTrigger>
//               <BtnList
//                 action={() => setVariant("invite")}
//                 label="Invite Friend"
//               >
//                 <UserPlus2Icon size={20} />
//               </BtnList>
//             </AlertDialogTrigger>
//             <AlertDialogTrigger>
//               <BtnList
//                 // disabled
//                 label={props.server.is_owner ? "Delete" : "Leave" + " Server"}
//                 action={() => setVariant("delete")}
//                 className="text-red-500 hover:bg-red-500/10"
//               >
//                 {props.server.is_owner ? (
//                   <Trash2Icon size={20} />
//                 ) : (
//                   <LogOutIcon size={20} />
//                 )}
//               </BtnList>
//             </AlertDialogTrigger>
//           </DropdownMenuContent>
//         </DropdownMenuPortal>
//       </DropdownMenu>
//       {variant === "delete" ? (
//         <LeaveDeleteServer
//           show={show}
//           setShow={setShow}
//           server={props.server}
//         ></LeaveDeleteServer>
//       ) : variant === "invite" ? (
//         <InviteServer />
//       ) : variant === "picture" ? (
//         <ChangeIcon />
//       ) : null}
//     </AlertDialog>
//   );
// }

// function BtnList(props: {
//   disabled?: boolean;
//   action: () => void;
//   children: ReactNode;
//   label: string;
//   className?: string;
// }) {
//   return (
//     <DropdownMenuItem
//       disabled={props.disabled}
//       onClick={props.action}
//       className={cn(
//         "grid w-full cursor-pointer grid-cols-[1fr_auto] rounded-sm p-1 text-sm font-semibold text-white outline-none hover:bg-neutral-700/50",
//         props.className,
//       )}
//     >
//       <span className="text-start">{props.label}</span>
//       {props.children}
//     </DropdownMenuItem>
//   );
// }

// function ChangeIcon() {
//   const path = usePathname().split("/");
//   const { servers } = useServer();
//   const server = servers.find((p) => p.id === path[2]);
//   const [copy, setCopy] = useState(false);
//   const text = window.location.origin + "/invite/" + server?.invite_code;
//   const [picture, setPicture] = useState<File>();

//   const previewUrl = useMemo(() => {
//     if (!picture) return null;
//     return URL.createObjectURL(picture);
//   }, [picture]);

//   const fileChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setPicture(e.target.files[0]);
//     }
//   };

//   return (
//     <AlertDialogPortal>
//       <AlertDialogOverlay className="fixed inset-0 z-40 bg-black/50" />
//       <AlertDialogContent className="fixed top-1/2 left-1/2 z-50 flex w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-neutral-700/70 bg-neutral-800 p-4 px-6 text-white">
//         <AlertDialogCancel asChild>
//           <XIcon
//             size={20}
//             className="fixed top-0 right-0 m-4 cursor-pointer text-neutral-400 hover:text-white"
//           />
//         </AlertDialogCancel>

//         <AlertDialogTitle className="text-sm font-semibold">
//           Change Icon
//         </AlertDialogTitle>
//         <AlertDialogDescription></AlertDialogDescription>
//         <div
//           className={cn(
//             "relative my-5 flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-dashed border-white",
//             picture && "border-none",
//           )}
//         >
//           <input
//             type="file"
//             accept="image/*"
//             onChange={fileChangeHandle}
//             className={cn(
//               "absolute size-full cursor-pointer rounded-full opacity-0",
//             )}
//             title=""
//           />
//           {previewUrl ? (
//             <img
//               src={previewUrl}
//               alt=""
//               className="h-full w-full rounded-full object-cover"
//             />
//           ) : (
//             <>
//               <div className="absolute top-0 -right-1 h-6 w-6 rounded-full bg-indigo-500 p-1">
//                 <PlusIcon className="h-4 w-4" />
//               </div>
//               <CameraIcon className="h-8 w-8" />
//               <h1 className="text-[10px] font-semibold">UPLOAD</h1>
//             </>
//           )}
//         </div>
//         <h1 className="mt-2 mb-2 text-sm">
//           We recommend an image of at least 512x512.
//         </h1>
//         <button
//           // onClick={newServer}
//           disabled={!picture}
//           className={cn(
//             "my-2 cursor-pointer rounded-lg bg-indigo-500 p-2 px-6 py-2 text-sm text-white transition-all hover:bg-indigo-800/80",
//             !picture && "cursor-not-allowed opacity-50",
//           )}
//         >
//           Save
//           {/* {loading ? "Creating..." : "Create"} */}
//         </button>
//       </AlertDialogContent>
//     </AlertDialogPortal>
//   );
// }
// function InviteServer() {
//   const path = usePathname().split("/");
//   const { servers } = useServer();
//   const server = servers.find((p) => p.id === path[2]);
//   const [copy, setCopy] = useState(false);
//   const text = window.location.origin + "/invite/" + server?.invite_code;

//   return (
//     <AlertDialogPortal>
//       <AlertDialogOverlay className="fixed inset-0 z-40 bg-black/50" />
//       <AlertDialogContent className="fixed top-1/2 left-1/2 z-50 flex w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border border-neutral-700/70 bg-neutral-800 p-4 px-6 text-white">
//         <AlertDialogCancel asChild>
//           <XIcon
//             size={20}
//             className="fixed top-0 right-0 m-4 cursor-pointer text-neutral-400 hover:text-white"
//           />
//         </AlertDialogCancel>

//         <AlertDialogTitle className="text-sm font-semibold">
//           Invite friend to {server && server.name}
//         </AlertDialogTitle>
//         <AlertDialogDescription></AlertDialogDescription>
//         <div className="mt-2 flex w-full flex-col transition-all">
//           <h1>Or, send a server invite link to a friend</h1>
//           <div
//             className={cn(
//               "mt-1 flex items-center justify-between rounded-sm border border-neutral-700/70 bg-neutral-900 p-1 pl-4",
//               copy && "border-green-500",
//             )}
//           >
//             <span className="text-sm leading-none">{text}</span>
//             <button
//               onClick={() => {
//                 navigator.clipboard.writeText(text);
//                 setCopy(true);
//                 setTimeout(() => {
//                   setCopy(false);
//                 }, 1000);
//               }}
//               className={cn(
//                 "cursor-pointer rounded-sm bg-indigo-500 px-5 py-2 text-sm hover:bg-indigo-800",
//                 copy && "bg-green-500 hover:bg-green-700",
//               )}
//             >
//               {copy ? "Coppied" : "Copy"}
//             </button>
//           </div>
//         </div>
//       </AlertDialogContent>
//     </AlertDialogPortal>
//   );
// }

// function LeaveDeleteServer(props: {
//   show: boolean;
//   setShow: Dispatch<SetStateAction<boolean>>;
//   server: Server;
// }) {
//   const { setServers, servers } = useServer();
//   const router = useRouter();
//   const after = servers.filter((v) => v.id !== props.server.id);

//   const deleteServer = () => {
//     fetch(
//       `${process.env.HOST_API_PUBLIC}/api/my_server/delete/${props.server.id}`,
//       {
//         method: "DELETE",
//         credentials: "include",
//       },
//     )
//       .then(async (res) => {
//         const resp = await res.json();
//         const data = resp.data;
//         if (res.ok) {
//           router.push("/channels/me");
//           // setTimeout(() => {
//           //   setServers((p) => p.filter((v) => v.id !== data));
//           // }, 50);
//         }
//       })
//       .catch(() => {});
//   };
//   const leaveServer = () => {
//     fetch(
//       `${process.env.HOST_API_PUBLIC}/api/my_server/leave/${props.server.id}`,
//       {
//         method: "DELETE",
//         credentials: "include",
//       },
//     )
//       .then(async (res) => {
//         const resp = await res.json();
//         const data = resp.data;
//         if (res.ok) {
//           router.push("/channels/me");
//           // setTimeout(() => {
//           //   setServers((p) => p.filter((v) => v.id !== data));
//           // }, 50);
//         }
//       })
//       .catch(() => {});
//   };

//   return (
//     <AlertDialogPortal>
//       <AlertDialogOverlay className="fixed inset-0 z-40 bg-black/50" />
//       <AlertDialogContent className="fixed top-1/2 left-1/2 z-50 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-neutral-700/70 bg-neutral-800 p-4 px-6 text-white">
//         <AlertDialogTitle className="my-2 text-xl font-bold">
//           {props.server.is_owner ? "Delete" : "Leave"} Server
//         </AlertDialogTitle>
//         <AlertDialogDescription></AlertDialogDescription>
//         <h2 className="text-sm text-wrap">
//           Are you sure you want to {props.server.is_owner ? "delete" : "leave"}{" "}
//           {props.server.name}? This cannot be undone.
//         </h2>
//         <div className="mt-6 flex gap-2 place-self-end text-xs font-semibold">
//           <AlertDialogCancel className="cursor-pointer rounded-sm p-2 px-4 text-indigo-500 outline-none hover:underline">
//             cancel
//           </AlertDialogCancel>
//           <AlertDialogAction
//             onClick={(e) => {
//               e.stopPropagation();
//               props.server.is_owner ? deleteServer() : leaveServer();
//             }}
//             className="cursor-pointer rounded-sm bg-red-500 p-3 px-4 text-white transition-all outline-none hover:bg-red-500/80"
//           >
//             {props.server.is_owner ? "Delete" : "Leave"} Server
//           </AlertDialogAction>
//         </div>
//       </AlertDialogContent>
//     </AlertDialogPortal>
//   );
// }
