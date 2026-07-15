"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("nestfinder_token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const response = (await api.auth.getMe(authToken)) as {
        success: boolean;
        data: User;
      };
      if (response.success) {
        setUser(response.data);
      }
    } catch {
      localStorage.removeItem("nestfinder_token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = (await api.auth.login(email, password)) as {
      success: boolean;
      data: User & { token: string };
    };
    if (response.success) {
      localStorage.setItem("nestfinder_token", response.data.token);
      setToken(response.data.token);
      setUser({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        avatar: response.data.avatar,
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const response = (await api.auth.register(name, email, password)) as {
      success: boolean;
      data: User & { token: string };
    };
    if (response.success) {
      localStorage.setItem("nestfinder_token", response.data.token);
      setToken(response.data.token);
      setUser({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("nestfinder_token");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
