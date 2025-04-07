"use client"; // Harus client component karena menggunakan Context
import { Router } from "next/router";
import { getUser } from "./getUser";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";

// app/aku/page.tsx

export default function Aku() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div>
      <a href="/kamu">aku</a>
      <button onClick={() => router.push("/kamu")}>kamu</button>
      <h1>Data Pengguna</h1>
      <ul>
        <li>ID: {user.id}</li>
        <li>Nama Tampilan: {user.display_name}</li>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>Status: {user.status}</li>
        <li>Tentang Saya: {user.about_me}</li>
        <li>Online: {user.is_online ? "Ya" : "Tidak"}</li>
        <li>
          Gambar: <img src={user.picture} alt="Profile" width={50} />
        </li>
        <li>Token: {user.token}</li>
        <li>Token Expired: {user.token_exp}</li>
        <li>Dibuat: {user.created_at}</li>
        <li>Diperbarui: {user.updated_at}</li>
      </ul>
    </div>
  );
}

// export default async function Aku() {
//   const user = await getUser();
//   const route = useRouter();
//   console.log(user);
//   return (
//     <div>
//       <a href="/kamu">aku</a>
//       <h1>Data Pengguna</h1>
//       <ul>
//         <li>ID: {user.id}</li>
//         <li>Nama Tampilan: {user.display_name}</li>
//         <li>Username: {user.username}</li>
//         <li>Email: {user.email}</li>
//         <li>Status: {user.status}</li>
//         <li>Tentang Saya: {user.about_me}</li>
//         <li>Online: {user.is_online ? "Ya" : "Tidak"}</li>
//         <li>
//           Gambar: <img src={user.picture} alt="Profile" width={50} />
//         </li>
//         <li>Token: {user.token}</li>
//         <li>Token Expired: {user.token_exp}</li>
//         <li>Dibuat: {user.created_at}</li>
//         <li>Diperbarui: {user.updated_at}</li>
//       </ul>
//     </div>
//   );
// }

// interface User {
//   id: string;
//   display_name: string;
//   username: string;
//   email: string;
//   status: string;
//   about_me: string;
//   is_online: boolean;
//   picture: string;
//   token: string;
//   token_exp: string;
//   created_at: string;
//   updated_at: string;
// }

// async function getUser(): Promise<User> {
//   const cookieStore = await cookies(); // Ambil cookies dari request
//   const cookieHeader = cookieStore.get("session")?.value;

//   const res = await fetch(`${process.env.HOST_API_PUBLIC}/api/user`, {
//     method: "GET",
//     headers: {
//       Cookie: `session=${cookieHeader}`, // Sertakan cookies dalam header
//     },
//   });
//   const data = await res.json();
//   return data.data;
// }
