import { AuthProvider } from "@/context/authContext";
import { FriendProvider } from "@/context/friendContext";
import { ServerProvider } from "@/context/serverContext";
import getFriend from "@/get-data/getFriend";
import getServer from "@/get-data/getServer";
import { getUser } from "@/get-data/getUser";
import { redirect } from "next/navigation";

export default async function Layout(props: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const servers = await getServer();
  const friends = await getFriend();

  if (servers)
    return (
      <AuthProvider get_user={user}>
        <ServerProvider get_servers={servers}>
          <FriendProvider get_friends={friends}>
            {props.children}
          </FriendProvider>
        </ServerProvider>
      </AuthProvider>
    );
}
