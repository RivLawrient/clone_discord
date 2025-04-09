"use client";

import { redirect } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

export interface User {
  id: string;
  display_name: string;
  banner_color: string;
  username: string;
  email: string;
  date_of_birth: string;
  status: string;
  about_me: string;
  is_online: boolean;
  last_active: number;
  picture: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = (props: { children: ReactNode; user: User }) => {
  const [user, setUser] = useState<User>(props.user);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    fetch(`${process.env.HOST_API_PUBLIC}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    redirect("/login");
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
