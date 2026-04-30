"use client";

import { useState } from "react";
import { useExpenses } from "@/src/context/ExpenseContext";
import { useTheme } from "@/src/context/ThemeContext";
import { CATEGORIES } from "@/src/utils/formatting";

export function CategoryFilter({ onFilterChange }) {
  const { darkMode } = useTheme();
  const [selected, setSelected] = useState("All");

  const handleFilter = (category) => {
    setSelected(category);
    onFilterChange(category);
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-blue-200"
      } border rounded-xl shadow-lg p-6`}
    >
      <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
        🏷️ Filter by Category
      </h3>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleFilter("All")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selected === "All"
              ? "bg-blue-500 text-white"
              : darkMode
              ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleFilter(cat.name)}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              selected === cat.name
                ? "bg-blue-500 text-white"
                : darkMode
                ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
