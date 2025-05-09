import { ServerProvider } from "@/context/serverContext";
import { AuthProvider } from "@/context/authContext";
import { redirect } from "next/navigation";
import { getUser } from "../../get-data/getUser";
import DisableRightClick from "@/components/DisableRightClick";

import HeaderBar from "./_components/headerBar";
import getServer from "../../get-data/getServer";
import getFriend from "../../get-data/getFriend";
import { FriendProvider } from "@/context/friendContext";
import SideServerList from "./_components/sideServerList";
import ListChannelBar from "./_components/channel-list/listChannelBar";
import UserBar from "./_components/userBar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const friends = await getFriend();
  // const servers = await getServer();
  return (
    <AuthProvider get_user={user}>
      {/* <ServerProvider get_servers={servers ?? []}> */}
      <FriendProvider get_friends={friends}>
        <DisableRightClick />
        <div className="bg-foreground fixed flex h-screen w-screen flex-col">
          <HeaderBar />
          <UserBar />
          <div className="flex h-full pt-[36px] text-white">
            <SideServerList />
            <ListChannelBar />
            {children}
          </div>
        </div>
      </FriendProvider>
      {/* </ServerProvider> */}
    </AuthProvider>
  );
}
