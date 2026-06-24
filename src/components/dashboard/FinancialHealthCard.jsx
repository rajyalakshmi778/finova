function FinancialHealthCard({
  income = 0,
  expense = 0,
}) {
  let score = 0;

  const savingsRate =
    income > 0
      ? ((income - expense) / income) * 100
      : 0;

  if (savingsRate >= 40) {
    score = 95;
  } else if (savingsRate >= 30) {
    score = 85;
  } else if (savingsRate >= 20) {
    score = 75;
  } else if (savingsRate >= 10) {
    score = 65;
  } else if (savingsRate >= 0) {
    score = 50;
  } else {
    score = 20;
  }

  let status = "";
  let color = "";

  if (score >= 80) {
    status = "Excellent financial health";
    color = "#052659";
  } else if (score >= 60) {
    status = "Good financial health";
    color = "#5483B3";
  } else if (score >= 40) {
    status = "Needs improvement";
    color = "#7DA0CA";
  } else {
    status = "High spending detected";
    color = "#dc2626";
  }

  const savingsAmount = Math.max(
    income - expense,
    0
  );

  return (
    <section className="bg-white rounded-3xl border border-[#C1E8FF] p-8 mb-8 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col lg:flex-row justify-between gap-6">

        <div>
          <p className="text-[#5483B3] font-medium mb-2">
            Financial Health Score
          </p>

          <h2
            className="text-6xl font-bold"
            style={{ color }}
          >
            {score}
          </h2>

          <p className="text-slate-600 mt-3">
            {status}
          </p>
        </div>

        <div className="bg-[#F8FBFF] rounded-2xl p-5 min-w-[260px]">

          <div>
            <p className="text-sm text-slate-500">
              Monthly Target
            </p>

            <p className="font-semibold text-[#021024] mt-1">
              Maintain a score above 80
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-slate-500">
              Savings Potential
            </p>

            <p className="font-bold text-[#052659] text-lg">
              ₹{savingsAmount.toLocaleString()}
            </p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-slate-500">
              Savings Rate
            </p>

            <p className="font-bold text-[#052659] text-lg">
              {Math.round(savingsRate)}%
            </p>
          </div>

        </div>
      </div>

      <div className="mt-8">
        <div className="w-full bg-[#C1E8FF] rounded-full h-4 overflow-hidden">
          <div
            className="h-4 rounded-full transition-all duration-700"
            style={{
              width: `${score}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default FinancialHealthCard;