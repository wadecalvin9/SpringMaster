"use client"
import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import { useRouter } from "next/navigation";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) {
            router.push("/login");
            return;
        }

        const userData = JSON.parse(savedUser);
        fetchUserDetails(userData.id);
    }, []);

    async function fetchUserDetails(id) {
        try {
            const res = await fetch(`http://localhost:8080/users/${id}`);
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                // If backend fails, use local data or logout
                handleLogout();
            }
        } catch (err) {
            console.error("Failed to fetch profile:", err);
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storage"));
        router.push("/login");
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#061e14] flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#061e14] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-green-500/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-green-600/5 rounded-full blur-[120px]" />
            </div>

            <Navigation />

            <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden relative group">
                    {/* Decorative glow */}
                    <div className="absolute -inset-px bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                            <div className="h-32 w-32 rounded-[2.5rem] bg-green-500/20 flex items-center justify-center text-green-400 text-5xl font-black border border-green-500/30 shadow-2xl shadow-green-900/20">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                                    {user?.name}
                                </h1>
                                <p className="text-green-500 font-bold tracking-widest uppercase text-xs">GreenHouse Platinum Member</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</p>
                                <p className="text-lg text-white font-medium">{user?.email}</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Member Since</p>
                                <p className="text-lg text-white font-medium">March 2026</p>
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/10 flex flex-wrap gap-4 justify-center md:justify-start">
                            <button className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-green-900/40 active:scale-95">
                                Edit Profile
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="px-8 py-4 bg-white/5 hover:bg-red-500/20 text-white hover:text-red-400 font-bold rounded-2xl transition-all border border-white/10 hover:border-red-500/30"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
