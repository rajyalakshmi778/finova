import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { getGoals } from "../../firebase/goals";

function SavingsGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const data = await getGoals(user.uid);
        setGoals(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, []);

  return (
    <section className="bg-white rounded-3xl border border-[#C1E8FF] p-8 mt-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#021024]">
            Savings Goals
          </h2>

          <p className="text-[#5483B3] mt-1">
            Create and track your financial goals
          </p>
        </div>

        <button
          className="
            bg-[#052659]
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-[#021024]
            transition-all
          "
        >
          + Create Goal
        </button>
      </div>

      {loading ? (
        <p>Loading goals...</p>
      ) : goals.length === 0 ? (
        <div
          className="
            border-2
            border-dashed
            border-[#C1E8FF]
            rounded-2xl
            p-12
            text-center
          "
        >
          <div className="text-5xl mb-4">🎯</div>

          <h3 className="text-xl font-semibold text-[#021024]">
            No Goals Yet
          </h3>

          <p className="text-slate-500 mt-2">
            Create your first savings goal.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = Math.min(
              Math.round(
                (goal.currentAmount /
                  goal.targetAmount) *
                  100
              ),
              100
            );

            return (
              <div
                key={goal.id}
                className="
                  border
                  border-[#C1E8FF]
                  rounded-2xl
                  p-5
                "
              >
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold">
                    {goal.title}
                  </h3>

                  <span>
                    {progress}%
                  </span>
                </div>

                <div className="w-full bg-[#C1E8FF] rounded-full h-3">
                  <div
                    className="bg-[#052659] h-3 rounded-full"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between mt-3 text-sm">
                  <span>
                    ₹
                    {goal.currentAmount?.toLocaleString()}
                  </span>

                  <span>
                    ₹
                    {goal.targetAmount?.toLocaleString()}
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

export default SavingsGoals;