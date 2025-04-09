"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export interface Friend {
  id: string;
  username: string;
  display_name: string;
  picture: string;
  last_active: number;
}

interface friendContextType {
  friends: Friend[];
  setFriends: (friends: Friend[]) => void;
}

export const FriendContext = createContext<friendContextType>({
  friends: [],
  setFriends: () => {},
});

export const FriendProvider = (props: {
  children: ReactNode;
  friends: Friend[];
}) => {
  const [friends, setFriends] = useState<Friend[]>(props.friends);

  return (
    <FriendContext.Provider value={{ friends, setFriends }}>
      {props.children}
    </FriendContext.Provider>
  );
};

export const useFriend = () => {
  const context = useContext(FriendContext);
  if (!context)
    throw new Error("useFriend must be used within a FriendProvider");
  return context;
};
