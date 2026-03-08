export default function Search() {
    return (
        <div className="flex items-center gap-0 w-full max-w-md group focus-within:ring-2 focus-within:ring-green-500/20 rounded-2xl transition-all">
            <div className="relative flex-1">
                <input
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-green-500/50 text-white rounded-l-2xl py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-500 focus:outline-none transition-all outline-none backdrop-blur-sm"
                    type="text"
                    placeholder="Search for fresh produce..."
                />

            </div>
            <button className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 px-6 rounded-r-2xl border-y border-r border-green-500 transition-all text-sm cursor-pointer whitespace-nowrap active:scale-95 shadow-lg shadow-green-900/20">
                Search
            </button>
        </div>
    );
}
