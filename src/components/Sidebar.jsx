import {
  FiHome,
  FiCreditCard,
  FiTarget,
  FiPieChart,
  FiUser,
} from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


function Sidebar() {
  return (
    <aside className="w-64 bg-[#021024] text-white h-screen p-6">
      <h1 className="text-3xl font-bold text-[#C1E8FF] mb-10">
        Finova
      </h1>

      <nav className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl text-white/80 hover:bg-white hover:text-[#021024] transition-all duration-200 cursor-pointer">
          <FiHome />
          Dashboard
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl text-white/80 hover:bg-white hover:text-[#021024] transition-all duration-200 cursor-pointer">
          <FiCreditCard />
          Accounts
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl text-white/80 hover:bg-white hover:text-[#021024] transition-all duration-200 cursor-pointer">
          <FiPieChart />
          Transactions
        </div>

      <div className="flex items-center gap-3 p-3 rounded-xl text-white/80 hover:bg-white hover:text-[#021024] transition-all duration-200 cursor-pointer">
          Goals
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl text-white/80 hover:bg-white hover:text-[#021024] transition-all duration-200 cursor-pointer">
          <FiUser />
          Profile
        </div>
         <div className="flex items-center gap-3 p-3 rounded-xl text-white/80 hover:bg-white hover:text-[#021024] transition-all duration-200 cursor-pointer">
           <button
  onClick={() => signOut(auth)}
>
  Logout
</button>
        </div>
       
      </nav>
    </aside>
  );
}

export default Sidebar;