import Link from "next/link";
import Search from "./search";

export default function Navigation() {
    return (
        <nav className="bg-[#04140d]/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/5 py-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center gap-8">

                    <div className="flex-shrink-0 flex items-center shrink-0">
                        <Link href="/" className="flex items-center gap-2 group transition-all duration-300">

                            <span className="text-xl font-extrabold tracking-tight text-white hidden sm:block">
                                Green<span className="text-green-500">House</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Center: Search & Message */}
                    <div className="hidden lg:flex flex-1 items-center gap-8 justify-center max-w-2xl px-4">
                        <Search />
                        <div className="flex flex-col shrink-0">
                            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest leading-none">Flash Delivery</p>
                            <p className="text-xs text-slate-400 font-medium">Under 2h guaranteed</p>
                        </div>
                    </div>

                    {/* Auth / Menu */}
                    <div className="flex items-center gap-6 shrink-0">
                        <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:block">
                            Log in
                        </Link>
                        <Link href="/register" className="inline-flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl shadow-xl shadow-green-900/30 hover:shadow-green-500/20 active:scale-95 transition-all focus:outline-none border border-green-500 cursor-pointer">
                            Join Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Search - only shows on mobile */}
            <div className="lg:hidden px-4 pb-4">
                <Search />
            </div>
        </nav>
    );
}

