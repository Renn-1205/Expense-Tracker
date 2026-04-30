"use client";

import { useState } from "react";
import { useExpenses } from "@/src/context/ExpenseContext";
import { useTheme } from "@/src/context/ThemeContext";
import { validateExpense } from "@/src/utils/validation";
import { CATEGORIES } from "@/src/utils/formatting";

export function ExpenseForm({ onSuccess }) {
  const { darkMode } = useTheme();
  const { addExpense } = useExpenses();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const validation = validateExpense(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    addExpense({
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    });

    setSuccess("✅ Expense added successfully!");
    setFormData({
      title: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });

    setTimeout(() => setSuccess(""), 3000);
    onSuccess?.();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-blue-200"
      } border rounded-xl shadow-lg p-6`}
    >
      <h2 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
        ➕ Add New Expense
      </h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Lunch at restaurant"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.title
                  ? "border-red-500"
                  : darkMode
                  ? "border-slate-600"
                  : "border-gray-300"
              } ${
                darkMode
                  ? "bg-slate-700 text-white"
                  : "bg-white text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Amount ($)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.amount
                  ? "border-red-500"
                  : darkMode
                  ? "border-slate-600"
                  : "border-gray-300"
              } ${
                darkMode
                  ? "bg-slate-700 text-white"
                  : "bg-white text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-slate-700 text-white border-slate-600"
                  : "bg-white text-gray-900 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.date
                  ? "border-red-500"
                  : darkMode
                  ? "border-slate-600"
                  : "border-gray-300"
              } ${
                darkMode
                  ? "bg-slate-700 text-white"
                  : "bg-white text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
        >
          ✅ Add Expense
        </button>
      </form>
    </div>
  );
}
