// "use client";
import { Server, useServer } from "@/context/serverContext";
import getServer from "@/get-data/getServer";
import { useParams } from "next/navigation";

// export async function generateStaticParams() {
//   const servers: Server[] | null = await fetch(
//     `${process.env.HOST_API_PUBLIC}/api/my_server`,
//     {
//       method: "GET",
//     },
//   )
//     .then(async (res) => {
//       if (res.ok) {
//         const data = await res.json();
//         return data.data;
//       }
//       return null;
//     })
//     .catch(() => null);

//   return (servers || []).map((v) => ({
//     server: v.id,
//   }));
// }

export default function Page() {
  // const param = useParams();
  // if (param.server === "me") {
  //   return <>me</>;
  // } else {
  //   return <>{param.server}</>;
  // }
  return <>dinami</>;
}
