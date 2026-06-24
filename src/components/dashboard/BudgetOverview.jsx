function BudgetOverview() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-8 mt-8">
      <h2 className="text-xl font-semibold mb-6">
        Budget Overview
      </h2>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              Food Budget
            </span>

            <span className="text-slate-500">
              ₹4,200 / ₹5,000
            </span>
          </div>

          <div className="w-full bg-[#C1E8FF] rounded-full h-3">
            <div
              className="bg-[#5483B3] h-3 rounded-full"
              style={{ width: "84%" }}
            />
          </div>

          <p className="text-sm text-slate-500 mt-2">
            84% utilized
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              Travel Budget
            </span>

            <span className="text-slate-500">
              ₹1,500 / ₹3,000
            </span>
          </div>

          <div className="w-full bg-[#C1E8FF] rounded-full h-3">
            <div
              className="bg-[#7DA0CA] h-3 rounded-full"
              style={{ width: "50%" }}
            />
          </div>

          <p className="text-sm text-slate-500 mt-2">
            50% utilized
          </p>
        </div>
      </div>
    </section>
  );
}

export default BudgetOverview;