function SummaryCards({
  balance,
  income,
  expense,
  savingsRate,
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl border-l-4 border-[#021024] border border-slate-200 p-6">
        <p className="text-slate-500">Total Balance</p>
        <h2 className="text-2xl font-bold mt-2">
          ₹{balance.toLocaleString()}
        </h2>
      </div>

      <div className="bg-white rounded-xl border-l-4 border-[#052659] border border-slate-200 p-6">
        <p className="text-slate-500">Total Income</p>
        <h2 className="text-2xl font-bold mt-2">
          ₹{income.toLocaleString()}
        </h2>
      </div>

      <div className="bg-white rounded-xl border-l-4 border-[#5483B3] border border-slate-200 p-6">
        <p className="text-slate-500">Total Expenses</p>
        <h2 className="text-2xl font-bold mt-2">
          ₹{expense.toLocaleString()}
        </h2>
      </div>

      <div className="bg-white rounded-xl border-l-4 border-[#7DA0CA] border border-slate-200 p-6">
        <p className="text-slate-500">Savings Rate</p>

        <h2 className="text-2xl font-bold text-[#052659] mt-2">
          {savingsRate}%
        </h2>

        <p className="text-sm text-slate-400 mt-2">
          Based on your transactions
        </p>
      </div>
    </section>
  );
}

export default SummaryCards;