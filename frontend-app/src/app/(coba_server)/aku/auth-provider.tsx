// app/auth-provider.tsx
"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface User {
  id: string;
  display_name: string;
  username: string;
  email: string;
  status: string;
  about_me: string;
  is_online: boolean;
  picture: string;
  token: string;
  token_exp: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User;
  children: ReactNode;
}) {
  const [user] = useState<User>(initialUser); // Gunakan data awal dari server

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
