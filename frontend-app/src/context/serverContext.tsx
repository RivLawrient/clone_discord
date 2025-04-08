"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface Server {
  id: string;
  name: string;
  picture: string;
  description: string;
  is_private: boolean;
  invite_code: string;
  created_at: string;
  updated_at: string;
  room: RoomServer[];
}

export interface RoomServer {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface ServerContextType {
  servers: Server[];
  setServers: (servers: Server[]) => void;
}

export const ServerContext = createContext<ServerContextType>({
  servers: [],
  setServers: () => {},
});

export const ServerProvider = (props: {
  children: ReactNode;
  servers: Server[];
}) => {
  const [servers, setServers] = useState<Server[]>(props.servers);

  return (
    <ServerContext.Provider value={{ servers, setServers }}>
      {props.children}
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
