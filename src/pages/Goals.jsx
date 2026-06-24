import { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { auth } from "../firebase/firebaseConfig";
import {
  addGoal,
  getGoals,
  deleteGoal,
} from "../firebase/firestore";

function Goals() {
  const [showModal, setShowModal] =
    useState(false);

  const [goals, setGoals] = useState([]);

  const [title, setTitle] =
    useState("");

  const [targetAmount, setTargetAmount] =
    useState("");

  const [currentAmount, setCurrentAmount] =
    useState("");

  const [targetDate, setTargetDate] =
    useState("");

  const loadGoals = async () => {
    try {
      const data = await getGoals(
        auth.currentUser.uid
      );

      setGoals(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      loadGoals();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addGoal({
        userId: auth.currentUser.uid,
        title,
        targetAmount: Number(
          targetAmount
        ),
        currentAmount: Number(
          currentAmount
        ),
        targetDate,
        createdAt: Date.now(),
      });

      await loadGoals();

      setTitle("");
      setTargetAmount("");
      setCurrentAmount("");
      setTargetDate("");

      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGoal(id);

      await loadGoals();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-[#021024]">
              Goals
            </h1>

            <p className="text-[#5483B3] mt-2">
              Save towards your financial goals.
            </p>
          </div>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="
              bg-[#052659]
              text-white
              px-6
              py-3
              rounded-xl
              cursor-pointer
              hover:bg-[#021024]
              hover:shadow-lg
              transition-all
            "
          >
            + Create Goal
          </button>

        </div>

        {/* Empty State */}
        {goals.length === 0 ? (
          <div className="bg-white border border-[#C1E8FF] rounded-3xl p-12 text-center">

            <div className="text-6xl mb-5">
              🎯
            </div>

            <h2 className="text-2xl font-bold text-[#021024]">
              No Goals Yet
            </h2>

            <p className="text-slate-500 mt-3">
              Create your first financial goal.
            </p>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="
                mt-6
                bg-[#052659]
                text-white
                px-6
                py-3
                rounded-xl
                cursor-pointer
                hover:bg-[#021024]
                transition-all
              "
            >
              Create First Goal
            </button>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {goals.map((goal) => {
              const progress =
                goal.targetAmount > 0
                  ? Math.min(
                      100,
                      Math.round(
                        (goal.currentAmount /
                          goal.targetAmount) *
                          100
                      )
                    )
                  : 0;

              return (
                <div
                  key={goal.id}
                  className="
                    bg-white
                    border
                    border-[#C1E8FF]
                    rounded-3xl
                    p-6
                    hover:shadow-lg
                    transition-all
                  "
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <h2 className="text-xl font-bold text-[#021024]">
                        {goal.title}
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Target Date:
                        {" "}
                        {goal.targetDate}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleDelete(
                          goal.id
                        )
                      }
                      className="
                        text-red-500
                        cursor-pointer
                        hover:text-red-700
                      "
                    >
                      Delete
                    </button>

                  </div>

                  <div className="mt-5">

                    <div className="flex justify-between mb-2">

                      <span>
                        ₹
                        {goal.currentAmount.toLocaleString()}
                      </span>

                      <span>
                        ₹
                        {goal.targetAmount.toLocaleString()}
                      </span>

                    </div>

                    <div className="w-full bg-[#C1E8FF] rounded-full h-3">

                      <div
                        className="
                          bg-[#052659]
                          h-3
                          rounded-full
                          transition-all
                        "
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                    <p className="mt-2 text-sm text-[#5483B3]">
                      {progress}% completed
                    </p>

                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-3xl p-6 w-full max-w-md">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold text-[#021024]">
                  Create Goal
                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="text-xl cursor-pointer"
                >
                  ✕
                </button>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <input
                  type="text"
                  placeholder="Goal Name"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-3"
                  required
                />

                <input
                  type="number"
                  placeholder="Target Amount"
                  value={targetAmount}
                  onChange={(e) =>
                    setTargetAmount(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-3"
                  required
                />

                <input
                  type="number"
                  placeholder="Current Saved Amount"
                  value={currentAmount}
                  onChange={(e) =>
                    setCurrentAmount(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-3"
                  required
                />

                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) =>
                    setTargetDate(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-3"
                  required
                />

                <button
                  type="submit"
                  className="
                    w-full
                    bg-[#052659]
                    text-white
                    py-3
                    rounded-xl
                    cursor-pointer
                    hover:bg-[#021024]
                    transition-all
                  "
                >
                  Save Goal
                </button>

              </form>

            </div>

          </div>
        )}

      </div>
    </AppLayout>
  );
}

export default Goals;