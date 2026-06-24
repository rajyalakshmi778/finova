import { getTransactions } from "./firestore";

export const getDashboardData = async (userId) => {
  const transactions = await getTransactions(userId);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return {
    income,
    expense,
    balance,
    transactions,
  };
};