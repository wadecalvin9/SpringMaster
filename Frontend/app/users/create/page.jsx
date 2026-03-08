"use client"
import { useState } from "react";
import Navigation from "../../components/navigation";
import { useRouter } from "next/navigation";

export default function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function createUser(e) {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            })
            if (res.ok) {
                router.push("/users");
            } else {
                setError("Failed to create user. Please try again.");
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
            <Navigation />
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-4xl font-extrabold text-white tracking-tight">
                        Add <span className="text-green-500">Member</span>
                    </h2>
                    <p className="mt-3 text-center text-sm text-slate-400 font-medium">
                        Invite a new member to the GreenHouse community.
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white/5 backdrop-blur-xl py-10 px-6 sm:px-10 shadow-2xl rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
                        {/* Inner glow */}
                        <div className="absolute -inset-px bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <form onSubmit={createUser} className="space-y-6 relative z-10">
                            {error && (
                                <div className="p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
                                    <div className="flex items-center gap-2">
                                        <span>⚠️</span>
                                        {error}
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-300 ml-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all outline-none"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-300 ml-1">
                                    Email address
                                </label>
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

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-slate-300 ml-1">
                                    Password
                                </label>
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

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-4 px-4 bg-green-600 hover:bg-green-500 text-white text-lg font-bold rounded-2xl shadow-xl shadow-green-900/40 hover:shadow-green-500/20 active:scale-95 transition-all focus:outline-none disabled:opacity-50 disabled:active:scale-100 cursor-pointer mt-8"
                            >
                                {isLoading ? "Creating member..." : "Create Member"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}