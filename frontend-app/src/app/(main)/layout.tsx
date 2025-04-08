import DisableRightClick from "@/components/DisableRightClick";
import { AuthProvider } from "@/context/authContext";
import { redirect } from "next/navigation";
import SideNavBar from "./_components/sideNavBar";
import HeaderBar from "./_components/headerBar";
import ListChannelBar from "./_components/listChannelBar";
import { getUser } from "./_getData/getUser";
import { ServerProvider } from "@/context/serverContext";
import getServer from "./_getData/getServer";
import IdleTimer from "./_components/idleTimer";

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
  return (
    <AuthProvider user={user}>
      <ServerProvider servers={servers ?? []}>
        <DisableRightClick />
        {/* <IdleTimer /> */}
        <div className="bg-foreground fixed flex h-screen w-screen flex-col">
          <HeaderBar />
          <div className="flex h-full text-white">
            <SideNavBar />
            <ListChannelBar />
            <div className="w-full bg-neutral-900">{children}</div>
          </div>
        </div>
      </ServerProvider>
    </AuthProvider>
  );
}
