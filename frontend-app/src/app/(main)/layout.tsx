import { ReactNode } from "react";
import Header from "./_components/header";
import SideBarServer from "./_components/server/sideBarServer";
import { AuthProvider, User } from "@/context/authContext";
import { Server, ServerProvider } from "@/context/serverContext";
import InnerSideBar from "./_components/innerSideBar";

const user: User = {
  id: "12039102391203",
  display_name: "LawrientRientasdfkjasdkfjalsdkfjlskdj",
  username: "Muhsandisv",
  email: "",
  date_of_birth: "",
  status: "",
  about_me: "",
  picture: "/api/user_picture/default_picture.png",
  banner_color: "",
  is_online: false,
  last_active: 0,
  created_at: "",
  updated_at: "",
};

export default async function Layout(props: { children: ReactNode }) {
  // const user = await getUser();
  // if (!user) {
  //   redirect("/login");
  // }
  return (
    <AuthProvider get_user={user}>
      <ServerProvider get_servers={dummyServers}>
        <div className="bg-foreground fixed grid h-screen w-screen grid-rows-[auto_1fr] text-white">
          <Header />
          {/* <UserBar /> */}
          <div className="grid min-h-0 grid-cols-[auto_auto_1fr]">
            <SideBarServer />
            <InnerSideBar />
            {props.children}
          </div>
        </div>
      </ServerProvider>
    </AuthProvider>
  );
}
// Jika Anda menyimpan tipe di file terpisah

export const dummyServers: Server[] = [
  {
    id: "1",
    name: "TechTalkasldkfjaldkfjalkdjflakdjflkajflka",
    picture: "https://example.com/pic1.png",
    description: "Tempat diskusi teknologi dan pemrograman",
    is_private: false,
    role: "admin",
    invite_code: "ABC123",
    member: 120,
    created_at: "2025-05-01T10:00:00Z",
    updated_at: "2025-05-01T12:00:00Z",
    channel: [
      {
        id: "c1",
        name: "generalasdfadfadfadsfadsfadsfadfadsfasdf",
        created_at: "2025-05-01T10:10:00Z",
        updated_at: "2025-05-01T10:15:00Z",
        chat: [],
      },
    ],
    voice: [
      {
        id: "v1",
        name: "General Voice",
        created_at: "2025-05-01T10:20:00Z",
        updated_at: "2025-05-01T10:20:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "GamingZone",
    picture: "https://example.com/pic2.png",
    description: "Komunitas gamer sejati",
    is_private: true,
    role: "member",
    invite_code: "GME456",
    member: 75,
    created_at: "2025-04-20T09:00:00Z",
    updated_at: "2025-04-25T10:00:00Z",
    channel: [
      {
        id: "c2",
        name: "game-chat",
        created_at: "2025-04-20T09:05:00Z",
        updated_at: "2025-04-21T09:30:00Z",
        chat: [],
      },
    ],
    voice: [
      {
        id: "v2",
        name: "Squad Room",
        created_at: "2025-04-20T09:10:00Z",
        updated_at: "2025-04-20T09:10:00Z",
      },
    ],
  },
  {
    id: "3",
    name: "DevHouse",
    picture: "https://example.com/pic3.png",
    description: "Ngoding bareng komunitas dev",
    is_private: false,
    role: "moderator",
    invite_code: "DEV789",
    member: 200,
    created_at: "2025-03-15T11:00:00Z",
    updated_at: "2025-04-01T12:00:00Z",
    channel: [
      {
        id: "c3",
        name: "frontend",
        created_at: "2025-03-15T11:05:00Z",
        updated_at: "2025-03-16T11:15:00Z",
        chat: [],
      },
    ],
    voice: [
      {
        id: "v3",
        name: "Dev Talk",
        created_at: "2025-03-15T11:10:00Z",
        updated_at: "2025-03-15T11:10:00Z",
      },
    ],
  },
  {
    id: "4",
    name: "DesignHub",
    picture: "https://example.com/pic4.png",
    description: "Tempat berkumpul para desainer",
    is_private: true,
    role: "member",
    invite_code: "DSG234",
    member: 90,
    created_at: "2025-02-10T08:00:00Z",
    updated_at: "2025-03-10T08:30:00Z",
    channel: [
      {
        id: "c4",
        name: "ui-ux",
        created_at: "2025-02-10T08:05:00Z",
        updated_at: "2025-02-10T08:10:00Z",
        chat: [],
      },
    ],
    voice: [
      {
        id: "v4",
        name: "Design Review",
        created_at: "2025-02-10T08:10:00Z",
        updated_at: "2025-02-10T08:10:00Z",
      },
    ],
  },
  {
    id: "5",
    name: "MusicRoom",
    picture: "https://example.com/pic5.png",
    description: "Komunitas pecinta musik",
    is_private: false,
    role: "guest",
    invite_code: "MUS111",
    member: 50,
    created_at: "2025-01-25T07:00:00Z",
    updated_at: "2025-01-30T07:30:00Z",
    channel: [
      {
        id: "c5",
        name: "song-share",
        created_at: "2025-01-25T07:05:00Z",
        updated_at: "2025-01-26T07:10:00Z",
        chat: [],
      },
    ],
    voice: [
      {
        id: "v5",
        name: "Listening Party",
        created_at: "2025-01-25T07:10:00Z",
        updated_at: "2025-01-25T07:10:00Z",
      },
    ],
  },
];
