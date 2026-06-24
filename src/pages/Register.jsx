import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/auth";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await registerUser(
        email,
        password
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message ||
          "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FBFF] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#021024]">
            Finova
          </h1>

          <p className="text-[#5483B3] mt-3">
            Start your financial journey
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#C1E8FF] p-8 shadow-sm">

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#021024]">
              Create Account
            </h2>

            <p className="text-slate-500 mt-2">
              Join Finova and take control
              of your finances.
            </p>
          </div>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3">
              {error}
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                required
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-slate-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#5483B3]
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-slate-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#5483B3]
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
                minLength={6}
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-slate-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#5483B3]
                "
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-[#052659]
                text-white
                py-3
                rounded-xl

                hover:bg-[#021024]
                hover:shadow-lg

                active:scale-95

                transition-all
                duration-200

                cursor-pointer
              "
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="
                text-[#052659]
                font-semibold

                hover:text-[#021024]

                transition-all
              "
            >
              Sign In
            </Link>
          </div>

        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Secure personal finance management
        </p>

      </div>
    </div>
  );
}

export default Register;