import { useEffect, useState } from "react";

import AppLayout from "../components/AppLayout";
import FinancialHealthCard from "../components/dashboard/FinancialHealthCard";
import SummaryCards from "../components/dashboard/SummaryCards";
import SavingsGoals from "../components/dashboard/SavingsGoals";
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

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        if (!auth.currentUser) return;

        const data = await getDashboardData(
          auth.currentUser.uid
        );

        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard Error:", error);
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

  return (
    <AppLayout>
      {/* Dashboard Header */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          Good Evening, Raji 👋
        </h1>

        <p className="text-slate-500 mt-2">
          You're on track to achieve your financial goals this month.
        </p>
      </section>

      <FinancialHealthCard />

      <SummaryCards
        balance={dashboardData.balance}
        income={dashboardData.income}
        expense={dashboardData.expense}
        savingsRate={savingsRate}
      />

      <SavingsGoals />

      <BudgetOverview />
    </AppLayout>
  );
}

export default Dashboard;