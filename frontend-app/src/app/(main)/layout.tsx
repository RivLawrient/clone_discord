import DisableRightClick from "@/components/DisableRightClick";
import { AuthProvider } from "@/context/authContext";
import { redirect } from "next/navigation";
import SideNavBar from "./_components/sideNavBar";
import HeaderBar from "./_components/headerBar";
import ListChannelBar from "./_components/listChannelBar";
import { ChannelProvider } from "@/context/channelContext";
import { getUser } from "./_getData/getUser";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <AuthProvider user={user}>
      <ChannelProvider>
        <DisableRightClick />
        <div className="bg-foreground fixed flex h-screen w-screen flex-col">
          <HeaderBar />
          <div className="flex h-full text-white">
            <SideNavBar />
            <ListChannelBar />
            <div className="w-full bg-neutral-900">{children}</div>
          </div>
        </div>
      </ChannelProvider>
    </AuthProvider>
  );
}
