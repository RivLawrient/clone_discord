import { redirect } from "next/navigation";

export default function Page() {
  redirect("/channels/me");
  return <div></div>;
}
