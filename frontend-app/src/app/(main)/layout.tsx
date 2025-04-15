import { ServerProvider } from "@/context/serverContext";
import { AuthProvider } from "@/context/authContext";
import { redirect } from "next/navigation";
import { getUser } from "./_getData/getUser";
import DisableRightClick from "@/components/DisableRightClick";
import ListChannelBar from "./_components/listChannelBar";
import SideNavBar from "./_components/sideNavBar";
import HeaderBar from "./_components/headerBar";
import getServer from "./_getData/getServer";
import getFriend from "./_getData/getFriend";
import { FriendProvider } from "@/context/friendContext";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const servers = await getServer();
  const friends = await getFriend();
  return (
    <AuthProvider get_user={user}>
      <ServerProvider get_servers={servers ?? []}>
        <FriendProvider get_friends={friends}>
          <DisableRightClick />
          <div className="bg-foreground fixed flex h-screen w-screen flex-col">
            <HeaderBar />
            <div className="flex h-full text-white">
              <SideNavBar />
              <ListChannelBar />
              <div className="w-full bg-neutral-900">{children}</div>
            </div>
          </div>
        </FriendProvider>
      </ServerProvider>
    </AuthProvider>
  );
}
