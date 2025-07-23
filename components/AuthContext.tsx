"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getToken, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

// 1. Define the context shape
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// 2. Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check token on mount
  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  // Call this after successful login
  const login = () => setIsAuthenticated(true);

  // Call this on logout
  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    router.push("/signin");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom hook for easy usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
