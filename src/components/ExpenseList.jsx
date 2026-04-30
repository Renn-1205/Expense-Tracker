"use client";

import { useExpenses } from "@/src/context/ExpenseContext";
import { useTheme } from "@/src/context/ThemeContext";
import { formatCurrency, formatDate, getCategoryIcon } from "@/src/utils/formatting";

export function ExpenseList({ filter = "All" }) {
  const { darkMode } = useTheme();
  const { expenses, deleteExpense } = useExpenses();

  const filtered =
    filter === "All"
      ? expenses
      : expenses.filter((e) => e.category === filter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  if (sorted.length === 0) {
    return (
      <div
        className={`${
          darkMode
            ? "bg-slate-800 text-gray-400"
            : "bg-gray-50 text-gray-500"
        } rounded-xl p-8 text-center`}
      >
        <p className="text-lg">📭 No expenses yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sorted.map((expense) => (
        <div
          key={expense.id}
          className={`${
            darkMode
              ? "bg-slate-800 border-slate-700 hover:bg-slate-750"
              : "bg-white border-gray-200 hover:bg-gray-50"
          } border rounded-lg p-4 flex items-center justify-between transition`}
        >
          <div className="flex items-center gap-4 flex-1">
            <span className="text-2xl">{getCategoryIcon(expense.category)}</span>
            <div className="flex-1">
              <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {expense.title}
              </h3>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {expense.category} • {formatDate(expense.date)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`text-lg font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
              {formatCurrency(expense.amount)}
            </span>
            <button
              onClick={() => deleteExpense(expense.id)}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
