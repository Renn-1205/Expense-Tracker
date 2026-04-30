"use client";

import { useEffect, useState } from "react";
import { useExpenses } from "@/src/context/ExpenseContext";
import { useTheme } from "@/src/context/ThemeContext";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { getCategoryColor } from "@/src/utils/formatting";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export function ExpenseChart() {
  const { darkMode } = useTheme();
  const { expenses, getCategoryTotals } = useExpenses();
  const [chartType, setChartType] = useState("pie");

  if (expenses.length === 0) {
    return (
      <div
        className={`${
          darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-blue-200"
        } border rounded-xl shadow-lg p-6`}
      >
        <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          📊 Add expenses to see charts
        </p>
      </div>
    );
  }

  const categoryTotals = getCategoryTotals();
  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: categories.map((cat) => getCategoryColor(cat)),
        borderColor: darkMode ? "#1e293b" : "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const lineData = {
    labels: categories,
    datasets: [
      {
        label: "Spending by Category",
        data: amounts,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#d1d5db" : "#374151",
          font: { size: 12, weight: "bold" },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#374151" : "#1f2937",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 12,
      },
    },
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-blue-200"
      } border rounded-xl shadow-lg p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
          📊 Spending Overview
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType("pie")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              chartType === "pie"
                ? "bg-blue-500 text-white"
                : darkMode
                ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🥧 Pie
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              chartType === "line"
                ? "bg-blue-500 text-white"
                : darkMode
                ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            📈 Line
          </button>
        </div>
      </div>

      <div className="relative h-80">
        {chartType === "pie" ? (
          <Pie data={pieData} options={chartOptions} />
        ) : (
          <Line data={lineData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}
