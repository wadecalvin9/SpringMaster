"use client"
import Link from "next/link";
import Navigation from "./navigation";

export default function Error() {
    return (
        <div className="min-h-screen bg-[#061e14] flex flex-col relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-green-600/5 rounded-full blur-[120px]" />
            </div>

            <Navigation />

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
                <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 rounded-[2.5rem] text-center shadow-2xl">
                    <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20 rotate-12">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-red-500 -rotate-12"
                        >
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Something went wrong</h1>
                    <p className="text-slate-400 mb-10 leading-relaxed text-lg">
                        We couldn't load the fresh products right now. The server might be resting.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-green-950/40 inline-flex items-center justify-center gap-2"
                        >
                            <span>Try Refreshing</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
                        </Link>

                        <Link
                            href="/support"
                            className="text-slate-500 hover:text-white transition-colors py-2 text-sm font-medium"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}