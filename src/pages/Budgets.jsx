import { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import { auth } from "../firebase/firebaseConfig";
import {
  addBudget,
  getBudgets,
  deleteBudget,
} from "../firebase/firestore";

function Budgets() {
  const [showModal, setShowModal] =
    useState(false);

  const [budgets, setBudgets] =
    useState([]);

  const [category, setCategory] =
    useState("");

  const [monthlyLimit, setMonthlyLimit] =
    useState("");

  const loadBudgets = async () => {
    try {
      const data = await getBudgets(
        auth.currentUser.uid
      );

      setBudgets(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      loadBudgets();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBudget({
        userId: auth.currentUser.uid,
        category,
        monthlyLimit: Number(
          monthlyLimit
        ),
        createdAt: Date.now(),
      });

      await loadBudgets();

      setCategory("");
      setMonthlyLimit("");

      setShowModal(false);
    } catch (error) {
  console.error("BUDGET SAVE ERROR:", error);
  alert(error.message);
}
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);

      await loadBudgets();
    } catch (error) {
      console.error(error);
    }
  };

  const totalAllocation =
    budgets.reduce(
      (sum, budget) =>
        sum + budget.monthlyLimit,
      0
    );

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold text-[#021024]">
              Budgets
            </h1>

            <p className="text-[#5483B3] mt-2">
              Set spending limits and stay in
              control of your finances.
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
              hover:bg-[#021024]
              hover:shadow-lg
              transition-all
            "
          >
            + Create Budget
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white border border-[#C1E8FF] rounded-3xl p-6">
            <p className="text-slate-500">
              Active Budgets
            </p>

            <h2 className="text-3xl font-bold text-[#021024] mt-2">
              {budgets.length}
            </h2>
          </div>

          <div className="bg-white border border-[#C1E8FF] rounded-3xl p-6">
            <p className="text-slate-500">
              Categories
            </p>

            <h2 className="text-3xl font-bold text-[#021024] mt-2">
              {budgets.length}
            </h2>
          </div>

          <div className="bg-white border border-[#C1E8FF] rounded-3xl p-6">
            <p className="text-slate-500">
              Monthly Allocation
            </p>

            <h2 className="text-3xl font-bold text-[#021024] mt-2">
              ₹
              {totalAllocation.toLocaleString()}
            </h2>
          </div>

        </div>

        {budgets.length === 0 ? (
          <div className="bg-white border border-[#C1E8FF] rounded-3xl p-14 text-center">

            <div className="text-6xl mb-5">
              📊
            </div>

            <h2 className="text-2xl font-bold text-[#021024]">
              No Budgets Yet
            </h2>

            <p className="text-slate-500 mt-3">
              Create your first budget to
              start tracking spending limits.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">

            {budgets.map((budget) => (
              <div
                key={budget.id}
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
                <div className="flex justify-between items-center">

                  <div>
                    <h2 className="text-xl font-bold text-[#021024]">
                      {budget.category}
                    </h2>

                    <p className="text-slate-500 text-sm mt-1">
                      Monthly Budget
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        budget.id
                      )
                    }
                    className="
                      text-red-500
                      hover:text-red-700
                    "
                  >
                    Delete
                  </button>

                </div>

                <div className="mt-5">

                  <p className="text-3xl font-bold text-[#052659]">
                    ₹
                    {budget.monthlyLimit.toLocaleString()}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-3xl p-6 w-full max-w-md">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold text-[#021024]">
                  Create Budget
                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="text-xl"
                >
                  ✕
                </button>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="w-full border border-[#C1E8FF] rounded-xl p-3"
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="Food">
                    Food
                  </option>

                  <option value="Transport">
                    Transport
                  </option>

                  <option value="Shopping">
                    Shopping
                  </option>

                  <option value="Bills">
                    Bills
                  </option>

                  <option value="Health">
                    Health
                  </option>

                  <option value="Entertainment">
                    Entertainment
                  </option>

                  <option value="Education">
                    Education
                  </option>

                  <option value="Investment">
                    Investment
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

                <input
                  type="number"
                  placeholder="Monthly Limit"
                  value={monthlyLimit}
                  onChange={(e) =>
                    setMonthlyLimit(
                      e.target.value
                    )
                  }
                  className="w-full border border-[#C1E8FF] rounded-xl p-3"
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
                    hover:bg-[#021024]
                    transition-all
                  "
                >
                  Save Budget
                </button>

              </form>

            </div>

          </div>
        )}

      </div>
    </AppLayout>
  );
}

export default Budgets;