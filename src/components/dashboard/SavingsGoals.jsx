function SavingsGoals() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-8 mt-8">
      <h2 className="text-xl font-semibold mb-6">
        Savings Goals
      </h2>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              Laptop Fund
            </span>

            <span className="text-slate-500">
              ₹32,000 / ₹80,000
            </span>
          </div>

          <div className="w-full bg-[#C1E8FF] rounded-full h-3">
            <div
              className="bg-[#5483B3] h-3 rounded-full"
              style={{ width: "40%" }}
            />
          </div>

          <p className="text-sm text-slate-500 mt-2">
            40% completed
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              Emergency Fund
            </span>

            <span className="text-slate-500">
              ₹60,000 / ₹1,00,000
            </span>
          </div>

          <div className="w-full bg-[#C1E8FF] rounded-full h-3">
            <div
              className="bg-[#7DA0CA] h-3 rounded-full"
              style={{ width: "60%" }}
            />
          </div>

          <p className="text-sm text-slate-500 mt-2">
            60% completed
          </p>
        </div>
      </div>
    </section>
  );
}

export default SavingsGoals;