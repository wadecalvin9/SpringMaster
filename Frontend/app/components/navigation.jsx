"use client"
import Link from "next/link";
import Search from "./search";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const checkUser = () => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            } else {
                setUser(null);
            }
        };

        checkUser();
        window.addEventListener("storage", checkUser);
        return () => window.removeEventListener("storage", checkUser);
    }, []);

    useEffect(() => {
        if (user) {
            fetchCartCount();
            // Optional: poll for cart updates if not using a better state management
            const interval = setInterval(fetchCartCount, 5000);
            return () => clearInterval(interval);
        } else {
            setCartCount(0);
        }
    }, [user]);

    async function fetchCartCount() {
        try {
            const res = await fetch(`http://localhost:8080/api/cart/count/user/${user.id}`);
            if (res.ok) {
                const count = await res.json();
                setCartCount(count);
            }
        } catch (err) {
            console.error("Failed to fetch cart count:", err);
        }
    }

    function handleLogout() {
        localStorage.removeItem("user");
        setUser(null);
        window.dispatchEvent(new Event("storage"));
        router.push("/login");
    }

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

                    {/* Auth / Menu / Cart */}
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        <Link href="/cart" className="relative group p-2 text-slate-300 hover:text-green-400 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link href="/profile" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:block">
                                    Profile
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="inline-flex items-center px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl transition-all border border-white/10 cursor-pointer"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:block">
                                    Log in
                                </Link>
                                <Link href="/register" className="inline-flex items-center px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl shadow-xl shadow-green-900/30 hover:shadow-green-500/20 active:scale-95 transition-all focus:outline-none border border-green-500 cursor-pointer">
                                    Join Now
                                </Link>
                            </div>
                        )}
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

