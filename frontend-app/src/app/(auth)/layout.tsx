import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = await cookies();
  const token = cookie.get("session");
  if (token) {
    redirect("/");
  }
  return (
    <div className="bg-indigo-800 h-screen w-screen fixed">
      auth layout{children}
    </div>
  );
}
