import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiDollarSign,
  FiPieChart,
  FiTarget,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Sidebar() {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiHome />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <FiDollarSign />,
    },
    {
      name: "Budgets",
      path: "/budgets",
      icon: <FiPieChart />,
    },
    {
      name: "Goals",
      path: "/goals",
      icon: <FiTarget />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FiUser />,
    },
  ];

  return (
    <aside className="w-72 bg-[#021024] text-white min-h-screen flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-3xl font-bold text-[#C1E8FF]">
          Finova
        </h1>

        <p className="text-sm text-[#7DA0CA] mt-1">
          Track smarter. Save faster.
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                transition-all duration-200
                cursor-pointer

                ${
                  isActive
                    ? "bg-[#052659] text-white shadow-lg"
                    : "text-white/80 hover:bg-white hover:text-[#021024]"
                }
              `}
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">

        <button
          onClick={() => signOut(auth)}
          className="
            w-full
            flex items-center gap-3
            px-4 py-3
            rounded-xl
            bg-red-500
            text-white
            hover:bg-red-600
            transition-all
            cursor-pointer
          "
        >
          <FiLogOut />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;