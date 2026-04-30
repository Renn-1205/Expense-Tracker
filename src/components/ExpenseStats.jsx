"use client";

export function ExpenseStats({ expenses }) {
  if (!expenses) expenses = [];

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categoryTotals = {};
  expenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const average =
    expenses.length > 0 ? (total / expenses.length).toFixed(2) : 0;

  const stats = [
    {
      label: "Total Expenses",
      value: `$${total.toFixed(2)}`,
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
      value: `$${average}`,
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
              <p className="text-3xl font-bold mt-3">{stat.value}</p>
            </div>
            <span className="text-4xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
