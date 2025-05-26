import { redirect } from "next/navigation";
import { getUser } from "../../get-data/getUser";
import Image from "next/image";

export default async function Layout(props: { children: React.ReactNode }) {
  const user = await getUser();
  if (user) {
    redirect("/");
  }
  return (
    <div
      style={{ backgroundImage: "url('/bg.svg')", backgroundSize: "cover" }}
      className="fixed h-screen w-screen"
    >
      <Image
        className="absolute m-11"
        src="/discord.svg"
        width={124}
        height={24}
        alt="logo discord name"
        priority
      />
      {props.children}
    </div>
  );
}
