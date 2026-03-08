"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navigation from "../components/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
            if (res.ok) {
                const user = await res.json();
                localStorage.setItem("user", JSON.stringify(user));
                // Dispatch event for components to listen to storage changes
                window.dispatchEvent(new Event("storage"));
                router.push("/");
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#061e14] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-green-600/5 rounded-full blur-[120px]" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">

                        <h2 className="text-4xl font-extrabold text-white tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="mt-3 text-slate-400 font-medium">
                            Sign in to access your GreenHouse account
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="bg-white/5 backdrop-blur-xl py-10 px-6 sm:px-10 shadow-2xl rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
                            {/* Inner glow */}
                            <div className="absolute -inset-px bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                                {error && (
                                    <div className="p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
                                        <div className="flex items-center gap-2">
                                            <span>⚠️</span>
                                            {error}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-300 ml-1">
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all outline-none"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between ml-1">
                                        <label htmlFor="password" className="block text-sm font-semibold text-slate-300">
                                            Password
                                        </label>
                                        <Link href="#" className="text-xs font-medium text-green-500 hover:text-green-400 transition-colors">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="block w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-4 px-4 bg-green-600 hover:bg-green-500 text-white text-lg font-bold rounded-2xl shadow-xl shadow-green-900/40 hover:shadow-green-500/20 active:scale-95 transition-all focus:outline-none disabled:opacity-50 disabled:active:scale-100 cursor-pointer mt-8"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </span>
                                    ) : (
                                        "Sign in"
                                    )}
                                </button>
                            </form>
                        </div>

                        <p className="mt-8 text-center text-sm text-slate-400 font-medium">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-green-500 hover:text-green-400 font-bold transition-all underline decoration-green-500/30 underline-offset-4 hover:decoration-green-500">
                                Create one for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}