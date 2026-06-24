import { getTransactions } from "./firestore";

export const getDashboardData = async (userId) => {
  const transactions = await getTransactions(userId);

  const incomeTransactions = transactions.filter(
    (t) => t.type === "income"
  );

  const expenseTransactions = transactions.filter(
    (t) => t.type === "expense"
  );

  const income = incomeTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const expense = expenseTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const balance = income - expense;

  return {
    balance,
    income,
    expense,

    totalTransactions: transactions.length,

    incomeCount: incomeTransactions.length,

    expenseCount: expenseTransactions.length,

    recentTransactions: transactions.slice(0, 5),

    transactions,
  };
};