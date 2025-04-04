import DisableRightClick from "@/components/DisableRightClick";
import { AuthProvider } from "@/context/authContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SideNavBar from "./_components/sideNavBar";
import HeaderBar from "./_components/headerBar";
import ListChannelBar from "./_components/listChannelBar";
import { ChannelProvider } from "@/context/channelContext";

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
      <ChannelProvider>
        <DisableRightClick />
        {/* <AddServerModal /> */}
        <div className="h-screen w-screen flex flex-col fixed bg-foreground">
          <HeaderBar />
          <div className="h-full flex text-white">
            <SideNavBar />
            <ListChannelBar />
            <div className="w-full bg-neutral-900">{children}</div>
          </div>
        </div>
      </ChannelProvider>
    </AuthProvider>
  );
}
