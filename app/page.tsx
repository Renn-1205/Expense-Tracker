"use client";

import { useEffect, useState } from "react";
import { ExpenseForm } from "@/src/components/ExpenseForm";
import { ExpenseList } from "@/src/components/ExpenseList";
import { ExpenseStats } from "@/src/components/ExpenseStats";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState("All");
  const [mounted, setMounted] = useState(false);

  // Load expenses from localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("expenses");
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load expenses:", error);
      }
    }
  }, []);

  // Save expenses to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses, mounted]);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((e) => e.category === filter);

  const categories = ["All", ...new Set(expenses.map((e) => e.category))];

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            💰 Expense Tracker
          </h1>
          <p className="text-slate-600">
            Track your spending and manage your finances
          </p>
        </div>

        {/* Stats */}
        <ExpenseStats expenses={filteredExpenses} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <ExpenseForm onAddExpense={addExpense} />
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            {/* Filter */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === cat
                      ? "bg-blue-500 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <ExpenseList
              expenses={filteredExpenses}
              onDeleteExpense={deleteExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
