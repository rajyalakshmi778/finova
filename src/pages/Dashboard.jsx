import AppLayout from "../components/AppLayout";
import FinancialHealthCard from "../components/dashboard/FinancialHealthCard";
import SummaryCards from "../components/dashboard/SummaryCards";
import SavingsGoals from "../components/dashboard/SavingsGoals";
import BudgetOverview from "../components/dashboard/BudgetOverview";

function Dashboard() {
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

      <SummaryCards />

      <SavingsGoals />

      <BudgetOverview />
    </AppLayout>
  );
}

export default Dashboard;