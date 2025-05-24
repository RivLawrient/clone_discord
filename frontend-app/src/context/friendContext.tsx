"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Users } from "./serverContext";

export type ListFriend = {
  friends: Friend[];
  request: Friend[];
  pending: Friend[];
};

export type Friend = {
  id: string;
  username: string;
  display_name: string;
  picture: string;
  last_active: number;
  is_online: boolean;
};

interface friendContextType {
  friends: ListFriend;
  setFriends: (friends: ListFriend) => void;
}

export const FriendContext = createContext<friendContextType>({
  friends: {
    friends: [],
    request: [],
    pending: [],
  },
  setFriends: () => {},
});

export const FriendProvider = (props: {
  children: ReactNode;
  get_friends: ListFriend;
}) => {
  const [friends, setFriends] = useState<ListFriend>(props.get_friends);

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
