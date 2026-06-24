import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ExpenseChart({ transactions }) {
  const expenseTransactions = transactions.filter(
    (t) => t.type === "expense"
  );

  const chartData = expenseTransactions.reduce(
    (acc, transaction) => {
      const date = transaction.date;

      const existing = acc.find(
        (item) => item.date === date
      );

      if (existing) {
        existing.amount += transaction.amount;
      } else {
        acc.push({
          date,
          amount: transaction.amount,
        });
      }

      return acc;
    },
    []
  );

  return (
    <div className="bg-white rounded-3xl border border-[#C1E8FF] p-6 shadow-sm mb-8 hover:shadow-lg transition-all">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#021024]">
          Expense Trend
        </h2>

        <p className="text-[#5483B3] text-sm">
          Daily expense tracking
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#052659"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseChart;