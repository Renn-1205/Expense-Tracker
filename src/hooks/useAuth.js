"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (!email || !password) {
      return { error: "Email and password are required" };
    }
    const user = { email, id: Date.now() };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const isAuthenticated = () => !!user;

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };
}
