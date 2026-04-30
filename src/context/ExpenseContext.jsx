"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses, mounted]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setExpenses([...expenses, newExpense]);
    return newExpense;
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const updateExpense = (id, updates) => {
    setExpenses(
      expenses.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const getExpensesByCategory = (category) => {
    return expenses.filter((e) => e.category === category);
  };

  const getCategoryTotals = () => {
    const totals = {};
    expenses.forEach((expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    });
    return totals;
  };

  const getTotalExpenses = () => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  };

  const getExpensesByDateRange = (startDate, endDate) => {
    return expenses.filter((e) => {
      const expenseDate = new Date(e.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
        getExpensesByCategory,
        getCategoryTotals,
        getTotalExpenses,
        getExpensesByDateRange,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenses must be used within ExpenseProvider");
  }
  return context;
}
