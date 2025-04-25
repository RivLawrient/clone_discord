"use client";

import {
  Dispatch,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Friend } from "./friendContext";

export type Server = {
  id: string;
  name: string;
  picture: string;
  description: string;
  is_private: boolean;
  role: string;
  invite_code: string;
  member: number;
  created_at: string;
  updated_at: string;
  room: RoomServer[];
};

export type RoomServer = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  chat: Chat[];
};

export type Chat = {
  id: string;
  room_server_id: string;
  user: Friend;
  message: string;
  created_at: string;
  updated_at: string;
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
