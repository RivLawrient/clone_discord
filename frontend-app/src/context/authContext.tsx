"use client";

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
  //   logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("ini user", user);
    if (!user) {
      fetch(`${process.env.HOST_API_PUBLIC}/api/user`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
