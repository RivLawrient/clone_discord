import { cookies } from "next/headers";
import Image from "next/image";
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
    <div
      style={{ backgroundImage: "url('/bg.svg')", backgroundSize: "cover" }}
      className="h-screen w-screen fixed"
    >
      <Image
        className="absolute m-11"
        src="/discord.svg"
        width={124}
        height={24}
        alt="logo discord name"
      />
      {children}
    </div>
  );
}
