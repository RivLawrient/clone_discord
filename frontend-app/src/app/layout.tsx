import type { Metadata } from "next";
import "./globals.css";
import DisableRightClick from "@/components/DisableRightClick";
import { AuthProvider } from "@/context/authContext";
import { ServerProvider } from "@/context/serverContext";
import { FriendProvider } from "@/context/friendContext";
import { getUser } from "@/get-data/getUser";
import { redirect } from "next/navigation";
import getServer from "@/get-data/getServer";
import getFriend from "@/get-data/getFriend";

export const metadata: Metadata = {
  title: "Clone Discord",
  description: "Welcome to Clone Discord",
  icons: "dcicon.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  const servers = await getServer();
  const friends = await getFriend();

  if (servers)
    return (
      <html lang="en">
        <body>
          <DisableRightClick />
          <AuthProvider get_user={user}>
            <ServerProvider get_servers={servers}>
              <FriendProvider get_friends={friends}>{children}</FriendProvider>
            </ServerProvider>
          </AuthProvider>
        </body>
      </html>
    );
}
