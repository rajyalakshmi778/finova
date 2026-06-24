import { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  addTransaction,
  getTransactions,
} from "../firebase/firestore";

import ExpenseChart from "../components/transactions/ExpenseChart";

function Transactions() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTransactions = async () => {
    try {
      if (!auth.currentUser) return;

      const data = await getTransactions(
        auth.currentUser.uid
      );

      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addTransaction({
        userId: auth.currentUser.uid,
        type,
        category,
        amount: Number(amount),
        note,
        date,
        createdAt: Date.now(),
      });

      await loadTransactions();

      setType("expense");
      setCategory("");
      setAmount("");
      setNote("");
      setDate("");

      setShowForm(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const filteredTransactions =
    transactions.filter((transaction) => {
      const matchesSearch =
        transaction.category
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.note
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : transaction.type === filter;

      return (
        matchesSearch && matchesFilter
      );
    });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#021024]">
              Transactions
            </h1>

            <p className="text-[#5483B3] mt-2">
              Manage your income and expenses
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="
              bg-[#052659]
              text-white
              px-6
              py-3
              rounded-xl
              cursor-pointer
              hover:bg-[#021024]
              hover:shadow-lg
              active:scale-95
              transition-all
            "
          >
            + Add Transaction
          </button>
        </div>

        {/* Summary */}
        <div className="grid lg:grid-cols-3 gap-5 mb-8">

          <div className="bg-[#052659] text-white rounded-3xl p-8 shadow-lg">
            <p className="text-[#C1E8FF]">
              Available Balance
            </p>

            <h2 className="text-4xl font-bold mt-3">
              ₹{balance.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white border border-[#C1E8FF] rounded-3xl p-6 hover:shadow-lg transition-all">
            <p className="text-slate-500">
              Income
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              ₹{income.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white border border-[#C1E8FF] rounded-3xl p-6 hover:shadow-lg transition-all">
            <p className="text-slate-500">
              Expenses
            </p>

            <h2 className="text-3xl font-bold text-red-600 mt-2">
              ₹{expense.toLocaleString()}
            </h2>
          </div>

        </div>

        {/* Chart */}
        <ExpenseChart
          transactions={transactions}
        />

        {/* Search */}
        <input
          type="text"
          placeholder="Search by category or note..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            bg-white
            border
            border-[#C1E8FF]
            rounded-xl
            p-4
            mb-5
            focus:outline-none
            focus:ring-2
            focus:ring-[#5483B3]
          "
        />

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          {[
            "all",
            "income",
            "expense",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`
                px-4 py-2 rounded-xl
                cursor-pointer
                transition-all
                ${
                  filter === item
                    ? "bg-[#052659] text-white"
                    : "bg-white border border-[#C1E8FF]"
                }
              `}
            >
              {item.charAt(0).toUpperCase() +
                item.slice(1)}
            </button>
          ))}
        </div>

        {/* History */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold text-[#021024]">
              Transaction History
            </h2>

            <span className="text-sm text-slate-500">
              {filteredTransactions.length} Transactions
            </span>
          </div>

          {filteredTransactions.length ===
          0 ? (
            <div className="bg-white border border-[#C1E8FF] rounded-3xl p-12 text-center">
              <div className="text-5xl mb-4">
                💸
              </div>

              <h3 className="text-xl font-semibold text-[#021024]">
                No Transactions Yet
              </h3>

              <p className="text-slate-500 mt-2">
                Add your first transaction
                to start tracking your
                finances.
              </p>
            </div>
          ) : (
            filteredTransactions.map(
              (transaction) => (
                <div
                  key={transaction.id}
                  className="
                    bg-white
                    border
                    border-[#C1E8FF]
                    rounded-2xl
                    p-5
                    mb-4
                    flex
                    justify-between
                    items-center
                    hover:shadow-md
                    transition-all
                  "
                >
                  <div>
                    <h3 className="font-semibold text-[#021024]">
                      {
                        transaction.category
                      }
                    </h3>

                    <p className="text-sm text-slate-500">
                      {transaction.note}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {transaction.date}
                    </p>
                  </div>

                  <div
                    className={
                      transaction.type ===
                      "income"
                        ? "text-green-600 font-bold text-xl"
                        : "text-red-600 font-bold text-xl"
                    }
                  >
                    {transaction.type ===
                    "income"
                      ? "+"
                      : "-"}
                    ₹
                    {transaction.amount.toLocaleString()}
                  </div>
                </div>
              )
            )
          )}
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-3xl p-6 w-full max-w-md">

              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-[#021024]">
                  Add Transaction
                </h2>

                <button
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="cursor-pointer text-xl"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <select
                  value={type}
                  onChange={(e) =>
                    setType(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-3"
                >
                  <option value="expense">
                    Expense
                  </option>

                  <option value="income">
                    Income
                  </option>
                </select>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-3"
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

                  <option value="Salary">
                    Salary
                  </option>

                  <option value="Freelance">
                    Freelance
                  </option>

                  <option value="Investment">
                    Investment
                  </option>
                </select>

                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-3"
                  required
                />

                <input
                  type="text"
                  placeholder="Note"
                  value={note}
                  onChange={(e) =>
                    setNote(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-3"
                />

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl p-3"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
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
                  {loading
                    ? "Adding..."
                    : "Add Transaction"}
                </button>

              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Transactions;