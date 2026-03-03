import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import type { User } from "../schema/auth.types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setError("");
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setError("Access token required");
      return;
    }

    try {
      const data = await authService.getMe();
      setUser(data.data.user);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load services";
      setError(message);
      console.error("Auth checking failed:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login({
        email,
        password,
      });
      console.log(data.data);
      setUser(data.data.user);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load services";
      setError(message);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
