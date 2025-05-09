"use client";

import { redirect } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

export type User = {
  id: string;
  display_name: string;
  username: string;
  email: string;
  date_of_birth: string;
  status: string;
  about_me: string;
  picture: string;
  banner_color: string;
  is_online: boolean;
  last_active: number;
  created_at: string;
  updated_at: string;
};

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: {
    id: "",
    display_name: "",
    username: "",
    email: "",
    date_of_birth: "",
    status: "",
    about_me: "",
    picture: "",
    banner_color: "",
    is_online: false,
    last_active: 0,
    created_at: "",
    updated_at: "",
  },
  setUser: () => {},
  loading: true,
  logout: () => {},
});

export const AuthProvider = ({
  children,
  get_user,
}: {
  children: ReactNode;
  get_user: User;
}) => {
  const [user, setUser] = useState<User>(get_user);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    fetch(`${process.env.HOST_API_PUBLIC}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    redirect("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
