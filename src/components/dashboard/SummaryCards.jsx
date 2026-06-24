function SummaryCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl border-l-4 border-[#021024] border border-slate-200 p-6">
        <p className="text-slate-500">Total Balance</p>
        <h2 className="text-2xl font-bold mt-2">₹24,500</h2>
      </div>

      <div className="bg-white rounded-xl border-l-4 border-[#052659] border border-slate-200 p-6">
        <p className="text-slate-500">Monthly Income</p>
        <h2 className="text-2xl font-bold mt-2">₹18,000</h2>
      </div>

      <div className="bg-white rounded-xl border-l-4 border-[#5483B3] border border-slate-200 p-6">
        <p className="text-slate-500">Monthly Expenses</p>
        <h2 className="text-2xl font-bold mt-2">₹7,500</h2>
      </div>

      <div className="bg-white rounded-xl border-l-4 border-[#7DA0CA] border border-slate-200 p-6">
        <p className="text-slate-500">Savings Rate</p>

        <h2 className="text-2xl font-bold text-[#052659] mt-2">
          35%
        </h2>

        <p className="text-sm text-slate-400 mt-2">
          Above average
        </p>
      </div>
    </section>
  );
}

export default SummaryCards;