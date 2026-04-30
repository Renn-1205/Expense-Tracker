"use client";

const CATEGORY_ICONS = {
  Food: "🍔",
  Transport: "🚗",
  Entertainment: "🎬",
  Shopping: "🛍️",
  Utilities: "💡",
  Health: "🏥",
  Education: "📚",
  Other: "📦",
};

export function ExpenseList({ expenses, onDeleteExpense }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
        <p className="text-2xl text-slate-500">📭 No expenses yet</p>
        <p className="text-slate-400 mt-2">Add an expense to get started</p>
      </div>
    );
  }

  const sorted = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">
        📋 Expense History
      </h2>

      <div className="space-y-3">
        {sorted.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-4 flex-1">
              <span className="text-2xl">
                {CATEGORY_ICONS[expense.category] || "📦"}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  {expense.description}
                </h3>
                <p className="text-sm text-slate-500">
                  {expense.category} • {formatDate(expense.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-blue-600">
                {formatCurrency(expense.amount)}
              </span>
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition text-sm font-medium"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
