export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateInput(date) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export const CATEGORIES = [
  { name: "Food", icon: "🍔", color: "#60a5fa" },
  { name: "Transport", icon: "🚗", color: "#34d399" },
  { name: "Entertainment", icon: "🎬", color: "#f472b6" },
  { name: "Shopping", icon: "🛍️", color: "#fbbf24" },
  { name: "Utilities", icon: "⚡", color: "#8b5cf6" },
  { name: "Health", icon: "🏥", color: "#ef4444" },
];

export function getCategoryColor(category) {
  return CATEGORIES.find((c) => c.name === category)?.color || "#6b7280";
}

export function getCategoryIcon(category) {
  return CATEGORIES.find((c) => c.name === category)?.icon || "📝";
}
