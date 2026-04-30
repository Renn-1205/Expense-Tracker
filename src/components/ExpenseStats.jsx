"use client";

import { useExpenses } from "@/src/context/ExpenseContext";
import { useTheme } from "@/src/context/ThemeContext";
import { formatCurrency } from "@/src/utils/formatting";

export function ExpenseStats() {
  const { darkMode } = useTheme();
  const { expenses, getCategoryTotals, getTotalExpenses } = useExpenses();

  const total = getTotalExpenses();
  const categoryTotals = getCategoryTotals();

  const stats = [
    {
      label: "Total Expenses",
      value: formatCurrency(total),
      icon: "💰",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Transactions",
      value: expenses.length,
      icon: "📊",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Categories",
      value: Object.keys(categoryTotals).length,
      icon: "🏷️",
      color: "from-green-500 to-green-600",
    },
    {
      label: "Average Expense",
      value: expenses.length > 0 ? formatCurrency(total / expenses.length) : "$0",
      icon: "📈",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
            <span className="text-3xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
