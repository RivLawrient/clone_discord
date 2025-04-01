"use client";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  display_name: string;
  username: string;
  email: string;
  status: string;
  about_me: string;
  is_online: boolean;
  token: string;
  token_exp: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  //   loading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      fetch(`${process.env.HOST_API_PUBLIC}/api/user`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 401) {
            console.log("gaagl");
            redirect("/login");
          }
          return null;
        })
        .then((data) => {
          setUser(data.data);
        });
    }
  }, []);

  const logout = () => {
    fetch(`${process.env.HOST_API_PUBLIC}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    redirect("/login");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
