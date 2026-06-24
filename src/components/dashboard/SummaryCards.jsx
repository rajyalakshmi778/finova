function SummaryCards({
  balance,
  income,
  expense,
  savingsRate,
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">

      {/* Balance Card */}
      <div className="lg:col-span-2 bg-[#052659] rounded-3xl p-8 text-white shadow-lg">
        <p className="text-[#C1E8FF] text-sm uppercase tracking-wide">
          Total Balance
        </p>

        <h2 className="text-5xl font-bold mt-3">
          ₹{balance.toLocaleString()}
        </h2>

        <p className="mt-4 text-[#C1E8FF]">
          Available balance across all finances
        </p>
      </div>

      {/* Income */}
      <div className="bg-white rounded-3xl border border-[#C1E8FF] p-6 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <p className="text-slate-500">
            Income
          </p>

          <span className="text-green-600 text-xl">
            ↗
          </span>
        </div>

        <h3 className="text-3xl font-bold text-[#021024] mt-4">
          ₹{income.toLocaleString()}
        </h3>

        <p className="text-sm text-slate-400 mt-3">
          Total earnings
        </p>
      </div>

      {/* Expense */}
      <div className="bg-white rounded-3xl border border-[#C1E8FF] p-6 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <p className="text-slate-500">
            Expenses
          </p>

          <span className="text-red-500 text-xl">
            ↘
          </span>
        </div>

        <h3 className="text-3xl font-bold text-[#021024] mt-4">
          ₹{expense.toLocaleString()}
        </h3>

        <p className="text-sm text-slate-400 mt-3">
          Total spending
        </p>
      </div>

      {/* Savings Rate */}
      <div className="bg-white rounded-3xl border border-[#C1E8FF] p-6 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <p className="text-slate-500">
            Savings Rate
          </p>

          <span className="text-[#5483B3] text-xl">
            💰
          </span>
        </div>

        <h3 className="text-3xl font-bold text-[#052659] mt-4">
          {savingsRate}%
        </h3>

        <div className="mt-4 w-full bg-[#C1E8FF] rounded-full h-2">
          <div
            className="bg-[#5483B3] h-2 rounded-full"
            style={{
              width: `${Math.min(
                savingsRate,
                100
              )}%`,
            }}
          />
        </div>

        <p className="text-sm text-slate-400 mt-3">
          Monthly efficiency
        </p>
      </div>
    </section>
  );
}

export default SummaryCards;