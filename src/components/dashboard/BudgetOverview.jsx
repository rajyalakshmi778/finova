import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import {
  getBudgets,
  getTransactions,
} from "../../firebase/firestore";

function BudgetOverview() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBudgetData = async () => {
      try {
        if (!auth.currentUser) return;

        const userId = auth.currentUser.uid;

        const budgetData =
          await getBudgets(userId);

        const transactions =
          await getTransactions(userId);

        const budgetsWithSpending =
          budgetData.map((budget) => {
            const spent = transactions
              .filter(
                (transaction) =>
                  transaction.type ===
                    "expense" &&
                  transaction.category ===
                    budget.category
              )
              .reduce(
                (sum, transaction) =>
                  sum + transaction.amount,
                0
              );

            return {
              ...budget,
              spent,
            };
          });

        setBudgets(
          budgetsWithSpending
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBudgetData();
  }, []);

  const getStatus = (
    percentage
  ) => {
    if (percentage >= 90)
      return "Critical";

    if (percentage >= 75)
      return "Warning";

    return "Healthy";
  };

  const getColor = (
    percentage
  ) => {
    if (percentage >= 90)
      return "#dc2626";

    if (percentage >= 75)
      return "#f59e0b";

    return "#052659";
  };

  if (loading) {
    return (
      <section className="bg-white rounded-3xl border border-[#C1E8FF] p-8 mt-8 shadow-sm">
        <h2 className="text-xl font-bold">
          Loading budgets...
        </h2>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-3xl border border-[#C1E8FF] p-8 mt-8 shadow-sm">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#021024]">
          Budget Overview
        </h2>

        <p className="text-[#5483B3] mt-1">
          Monitor spending against
          your monthly budgets
        </p>
      </div>

      {budgets.length === 0 ? (
        <div className="border-2 border-dashed border-[#C1E8FF] rounded-2xl p-10 text-center">

          <div className="text-5xl mb-4">
            📊
          </div>

          <h3 className="text-xl font-semibold text-[#021024]">
            No Budgets Yet
          </h3>

          <p className="text-slate-500 mt-2">
            Create a budget to start
            tracking your spending.
          </p>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {budgets.map((budget) => {
            const limit =
              budget.monthlyLimit || 0;

            const spent =
              budget.spent || 0;

            const percentage =
              limit > 0
                ? Math.min(
                    Math.round(
                      (spent / limit) *
                        100
                    ),
                    100
                  )
                : 0;

            const remaining =
              limit - spent;

            return (
              <div
                key={budget.id}
                className="bg-[#F8FBFF] border border-[#C1E8FF] rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-4">

                  <div>
                    <h3 className="font-bold text-lg text-[#021024]">
                      💰{" "}
                      {budget.category}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Monthly Budget
                    </p>
                  </div>

                  <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
                    {getStatus(
                      percentage
                    )}
                  </span>

                </div>

                <div className="w-full bg-[#C1E8FF] rounded-full h-3">

                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor:
                        getColor(
                          percentage
                        ),
                    }}
                  />

                </div>

                <div className="flex justify-between mt-4">

                  <div>
                    <p className="text-xs text-slate-500">
                      Spent
                    </p>

                    <p className="font-semibold">
                      ₹
                      {spent.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">
                      Budget
                    </p>

                    <p className="font-semibold">
                      ₹
                      {limit.toLocaleString()}
                    </p>
                  </div>

                </div>

                <div className="mt-4 flex justify-between text-sm">

                  <span className="text-[#5483B3]">
                    ₹
                    {remaining.toLocaleString()}
                    {" "}
                    remaining
                  </span>

                  <span className="font-semibold">
                    {percentage}%
                  </span>

                </div>
              </div>
            );
          })}

        </div>
      )}

    </section>
  );
}

export default BudgetOverview;