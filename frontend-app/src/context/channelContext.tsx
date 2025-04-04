"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Server {
  id: string;
  name: string;
  picture: string;
  description: string;
  is_private: boolean;
  invite_code: string;
  created_at: string;
  updated_at: string;
}

interface ChannelContextType {
  channels: Server[];
  setChannels: (channels: Server[]) => void;
}

const ChannelContext = createContext<ChannelContextType>({
  channels: [],
  setChannels: () => {},
});

export const ChannelProvider = ({ children }: { children: ReactNode }) => {
  const [channels, setChannels] = useState<Server[]>([]);

  useEffect(() => {
    fetch(`${process.env.HOST_API_PUBLIC}/api/my_server`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setChannels(data.data);
      })
      .catch(() => {});
  }, []);
  return (
    <ChannelContext.Provider value={{ channels, setChannels }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannel = () => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error("useChannel must be used within a ChannelProvider");
  }
  return context;
};
