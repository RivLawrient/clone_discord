import { AuthProvider } from "@/context/authContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = await cookies();
  const token = cookie.get("session");
  if (!token) {
    redirect("/login");
  }
  return (
    <AuthProvider>
      <div className="">main layout{children}</div>
    </AuthProvider>
  );
}
