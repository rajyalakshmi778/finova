import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";
import FinancialHealthCard from "../components/dashboard/FinancialHealthCard";
import SummaryCards from "../components/dashboard/SummaryCards";
import SavingsGoals from "../components/dashboard/SavingsGoals";
import Budgets from "../pages/Budgets";
import BudgetOverview from "../components/dashboard/BudgetOverview";
import { auth } from "../firebase/firebaseConfig";
import { getDashboardData } from "../firebase/dashboard";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    transactions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        if (!auth.currentUser) return;

        const data = await getDashboardData(
          auth.currentUser.uid
        );

        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const savingsRate =
    dashboardData.income > 0
      ? Math.round(
          (dashboardData.balance /
            dashboardData.income) *
            100
        )
      : 0;

  const recentTransactions =
    dashboardData.transactions.slice(0, 5);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-[#052659] text-xl font-semibold">
            Loading Dashboard...
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-[#021024]">
          Financial Dashboard
        </h1>

        <p className="text-[#5483B3] mt-2">
          Track your spending, savings and
          financial progress.
        </p>
      </section>

      {/* Health Score */}
     <FinancialHealthCard
  income={dashboardData.income}
  expense={dashboardData.expense}
/>

      {/* Summary Cards */}
      <SummaryCards
        balance={dashboardData.balance}
        income={dashboardData.income}
        expense={dashboardData.expense}
        savingsRate={savingsRate}
      />

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4 my-8">
        <div className="bg-white border-l-4 border-[#5483B3] rounded-xl p-5">
          <p className="text-sm text-slate-500">
            Total Transactions
          </p>

          <h2 className="text-2xl font-bold text-[#021024]">
            {dashboardData.transactions.length}
          </h2>
        </div>

        <div className="bg-white border-l-4 border-[#7DA0CA] rounded-xl p-5">
          <p className="text-sm text-slate-500">
            Savings Rate
          </p>

          <h2 className="text-2xl font-bold text-[#021024]">
            {savingsRate}%
          </h2>
        </div>

        <div className="bg-white border-l-4 border-[#052659] rounded-xl p-5">
          <p className="text-sm text-slate-500">
            Net Balance
          </p>

          <h2 className="text-2xl font-bold text-[#021024]">
            ₹
            {dashboardData.balance.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-[#C1E8FF] p-6 mb-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-[#021024]">
            Recent Transactions
          </h2>
        </div>

        {recentTransactions.length === 0 ? (
          <p className="text-slate-500">
            No transactions found.
          </p>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map(
              (transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium text-[#021024]">
                      {transaction.category}
                    </p>

                    <p className="text-sm text-slate-500">
                      {transaction.note}
                    </p>
                  </div>

                  <div
                    className={
                      transaction.type ===
                      "income"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {transaction.type ===
                    "income"
                      ? "+"
                      : "-"}
                    ₹{transaction.amount}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Goals */}
      <SavingsGoals />

      {/* Budget */}
      <BudgetOverview />
    </AppLayout>
  );
}

export default Dashboard;