import { FiBell } from "react-icons/fi";

function Navbar() {
  const userName = "Raji";

  return (
    <header className="h-20 bg-white border-b border-[#C1E8FF] px-8 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-2xl font-bold text-[#021024]">
          Welcome back, {userName}
        </h1>

        <p className="text-sm text-[#5483B3]">
          Manage your finances efficiently
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="
            w-11 h-11
            rounded-xl
            bg-[#C1E8FF]
            text-[#052659]
            flex items-center justify-center
            cursor-pointer
            hover:bg-[#7DA0CA]
            transition-all
          "
        >
          <FiBell size={20} />
        </button>

        <div
          className="
            w-11 h-11
            rounded-full
            bg-[#052659]
            flex items-center justify-center
            text-white
            font-semibold
            cursor-pointer
            hover:bg-[#021024]
            transition-all
          "
        >
          {userName.charAt(0)}
        </div>
      </div>
    </header>
  );
}

export default Navbar;