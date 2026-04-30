"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { useTheme } from "@/src/context/ThemeContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated()) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [loading, isAuthenticated, router]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="text-center">
        <span className="text-6xl block mb-4">⏳</span>
        <p
          className={`text-lg ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Redirecting...
        </p>
      </div>
    </div>
  );
}
