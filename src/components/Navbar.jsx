function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-[#021024]">
          Finova
        </h2>

        <p className="text-sm text-slate-500">
          Track smarter. Save faster.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-500 hover:text-[#052659] transition-colors">
          🔔
        </button>

        <div className="w-10 h-10 rounded-full bg-[#5483B3] flex items-center justify-center text-white font-semibold">
          R
        </div>
      </div>
    </header>
  );
}

export default Navbar;