"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export interface Friend {
  id: string;
  username: string;
  display_name: string;
  picture: string;
  last_active: number;
  is_online: boolean;
}

interface friendContextType {
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
}

export const FriendContext = createContext<friendContextType>({
  friends: [],
  setFriends: () => {},
});

export const FriendProvider = ({
  children,
  get_friends,
}: {
  children: ReactNode;
  get_friends: Friend[];
}) => {
  const [friends, setFriends] = useState<Friend[]>(get_friends);

  return (
    <FriendContext.Provider value={{ friends, setFriends }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriend = () => {
  const context = useContext(FriendContext);
  if (!context)
    throw new Error("useFriend must be used within a FriendProvider");
  return context;
};
