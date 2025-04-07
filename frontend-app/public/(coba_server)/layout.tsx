// import { Suspense } from "react";
// import AuthProvider from "./aku/auth-provider";
// import { getUser } from "./aku/getUser";
// import { redirect } from "next/navigation";

// export default async function layout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const user = await getUser();
//   if (!user) {
//     redirect("/login");
//   }

//   //   async function UserData({ children }: { children: React.ReactNode }) {
//   //     const user = await getUser();
//   //     if (!user) redirect("/login");

//   //     return <AuthProvider initialUser={user}>{children}</AuthProvider>;
//   //   }

//   return (
//     <div>
//       <Suspense fallback={<div>Sedang memuat data pengguna...</div>}>
//         {/* <UserData>{children}</UserData> */}
//         <AuthProvider initialUser={user}>{children}</AuthProvider>
//       </Suspense>
//     </div>
//   );
// }
