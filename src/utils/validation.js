export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateExpense(expense) {
  const errors = {};

  if (!expense.title || expense.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (!expense.amount || isNaN(expense.amount) || expense.amount <= 0) {
    errors.amount = "Amount must be a positive number";
  }

  if (!expense.category) {
    errors.category = "Category is required";
  }

  if (!expense.date) {
    errors.date = "Date is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validatePassword(password) {
  if (password.length < 6) {
    return { isValid: false, error: "Password must be at least 6 characters" };
  }
  return { isValid: true };
}
