function FinancialHealthCard() {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-8 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 mb-2">
            Financial Health Score
          </p>

          <h2 className="text-5xl font-bold text-[#052659]">
            82
          </h2>

          <p className="text-slate-600 mt-2">
            Excellent progress this month
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">
            Monthly Target
          </p>

          <p className="text-lg font-semibold">
            Stay above 80
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="w-full bg-[#C1E8FF] rounded-full h-3">
          <div
            className="bg-[#5483B3] h-3 rounded-full"
            style={{ width: "82%" }}
          />
        </div>
      </div>
    </section>
  );
}

export default FinancialHealthCard;