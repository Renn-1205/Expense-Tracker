"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/src/context/ThemeContext";
import { useAuth } from "@/src/hooks/useAuth";
import { Header } from "@/src/components/Header";
import { ExpenseForm } from "@/src/components/ExpenseForm";
import { ExpenseList } from "@/src/components/ExpenseList";
import { ExpenseStats } from "@/src/components/ExpenseStats";
import { ExpenseChart } from "@/src/components/ExpenseChart";
import { CategoryFilter } from "@/src/components/CategoryFilter";

export default function DashboardPage() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const { user, loading, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated()) {
      router.push("/login");
    }
  }, [mounted, loading, isAuthenticated, router]);

  if (!mounted || loading) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-3xl">⏳ Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <ExpenseStats />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Form & List */}
          <div className="lg:col-span-2 space-y-8">
            {/* Form */}
            <ExpenseForm onSuccess={() => {}} />

            {/* Filter */}
            <CategoryFilter onFilterChange={setFilter} />

            {/* List */}
            <div>
              <h2
                className={`text-xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                📋 Recent Transactions
              </h2>
              <ExpenseList filter={filter} />
            </div>
          </div>

          {/* Right Column - Chart */}
          <div className="lg:col-span-1">
            <ExpenseChart />
          </div>
        </div>
      </main>
    </div>
  );
}
