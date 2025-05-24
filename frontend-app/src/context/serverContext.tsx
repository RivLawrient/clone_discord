"use client";

import {
  Dispatch,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

export type Server = {
  id: string;
  name: string;
  picture: string;
  is_owner: boolean;
  invite_code: string;
  member: number;
  members: Users[];
  created_at: string;
  updated_at: string;
  channel: {
    text: Text[];
    voice: Voice[];
  };
};

export type Text = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  chat: Chat[];
};

export type Voice = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Chat = {
  id: string;
  user: Users;
  message: string;
  created_at: string;
  updated_at: string;
};

export type Users = {
  id: string;
  username: string;
  display_name: string;
  picture: string;
  last_active: number;
  is_online: boolean;
};

interface ServerContextType {
  servers: Server[];
  setServers: Dispatch<React.SetStateAction<Server[]>>;
}

export const ServerContext = createContext<ServerContextType>({
  servers: [],
  setServers: () => {},
});

export const ServerProvider = ({
  children,
  get_servers,
}: {
  children: ReactNode;
  get_servers: Server[];
}) => {
  const [servers, setServers] = useState<Server[]>(get_servers);
  return (
    <ServerContext.Provider value={{ servers, setServers }}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error("useServer must be used within a ServerProvider");
  }
  return context;
};
