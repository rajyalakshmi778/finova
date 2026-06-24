import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { addTransaction } from "../firebase/firestore";

function Transactions() {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTransaction({
        userId: auth.currentUser.uid,
        type,
        category,
        amount: Number(amount),
        note,
        date,
        createdAt: Date.now(),
      });

      alert("Transaction Added");

      setCategory("");
      setAmount("");
      setNote("");
      setDate("");
      setType("expense");
    } catch (error) {
      console.error(error);
      alert("Failed to add transaction");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 border border-slate-200">
        <h1 className="text-3xl font-bold mb-6">
          Add Transaction
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-2 font-medium">
              Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <input
              type="text"
              placeholder="Food, Salary, Transport..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Note
            </label>

            <input
              type="text"
              placeholder="Optional note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#052659] text-white py-3 rounded-xl"
          >
            Add Transaction
          </button>

        </form>
      </div>
    </div>
  );
}

export default Transactions;