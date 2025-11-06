/* eslint-disable @typescript-eslint/no-explicit-any */
// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: any | null;
  setUser: (user: any | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ 
  children,
  initialUser 
}: { 
  children: React.ReactNode;
  initialUser: any | null;
}) => {
  const [user, setUser] = useState<any | null>(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);