"use client";

import { useTheme } from "@/src/context/ThemeContext";
import { useAuth } from "@/src/hooks/useAuth";

export function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header
      className={`${
        darkMode
          ? "bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700"
          : "bg-gradient-to-r from-blue-600 to-blue-700"
      } border-b sticky top-0 z-50`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💰</span>
          <h1 className="text-white text-2xl font-bold">Expense Tracker</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white text-sm hidden sm:inline">
            {user?.email}
          </span>

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition ${
              darkMode
                ? "bg-slate-700 text-yellow-400 hover:bg-slate-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            title="Toggle dark mode"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
