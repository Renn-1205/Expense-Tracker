"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

export default function Dashboard() {
  const router = useRouter();

  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Register ChartJS plugins on client side only
    ChartJS.register(ArcElement, Tooltip, Legend);

    const user = localStorage.getItem("user");
    if (!user) router.push("/login");

    const data = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(data);
  }, []);

  const addExpense = () => {
    if (!title || !amount || !date) {
      setError("All fields required");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date,
    };

    const updated = [...expenses, newExpense];
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
    setError("");
  };

  const deleteExpense = (id) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((e) => e.category === filter);

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = {
  Food: 0,
  Transport: 0,
  Entertainment: 0,
};

expenses.forEach((e) => {
  categoryTotals[e.category] += e.amount;
});

const chartData = {
  labels: ["Food", "Transport", "Entertainment"],
  datasets: [
    {
      data: [
        categoryTotals.Food,
        categoryTotals.Transport,
        categoryTotals.Entertainment,
      ],
      backgroundColor: ["#60a5fa", "#34d399", "#f472b6"],
    },
  ],
};
  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-6" : "bg-gray-100 min-h-screen p-6"}>

      {/* HEADER */}
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold">
  💰 Expense Dashboard
</h1>
        <button
  onClick={() => setDarkMode(!darkMode)}
  className="bg-gray-800 text-white px-3 py-1 rounded"
>
  Toggle Theme
</button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Total</h2>
          <p className="text-2xl font-bold">${total}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-gray-500">Transactions</h2>
          <p className="text-2xl font-bold">
            {filteredExpenses.length}
          </p>
        </div>
      </div>

      {/* ADD FORM */}
      <div className="bg-white p-4 mb-6 rounded-xl shadow">
        <h2 className="mb-3 font-bold text-lg">Add Expense</h2>

        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Entertainment</option>
          </select>

          <input
            type="date"
            className="border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          onClick={addExpense}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>

        <p className="text-red-500 mt-2">{error}</p>
      </div>

      {/* FILTER */}
      <div className="mb-4 flex gap-2">
        {["All", "Food", "Transport", "Entertainment"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded ${
              filter === cat
                ? "bg-blue-500 text-white"
                : "bg-white border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
<div className="bg-white p-4 rounded-xl shadow mb-6">
  <h2 className="font-bold mb-3">Spending Chart</h2>
  <Pie data={chartData} />
</div>
      {/* LIST */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold mb-2">Expenses</h2>

        {filteredExpenses.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-semibold">{e.title}</p>
              <p className="text-sm text-gray-500">
                {e.category} • {e.date}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold">${e.amount}</span>

              <button
                onClick={() => deleteExpense(e.id)}
                className="bg-red-400 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}