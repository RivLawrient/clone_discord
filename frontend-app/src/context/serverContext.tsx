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
