"use client"
import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import Link from "next/link";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            fetchCart(user.id);
        } else {
            router.push("/login");
        }
    }, []);

    async function fetchCart(userId) {
        try {
            const res = await fetch(`http://localhost:8080/api/cart/products/user/${userId}`);
            if (res.ok) {
                const data = await res.json();
                setCartItems(data);
            }
        } catch (err) {
            <Error />
            console.error("Failed to fetch cart:", err);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleQuantityChange(item, delta) {
        const newQty = (item.quantity || 0) + delta;
        if (newQty < 1) {
            handleRemove(item.id);
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/api/cart/update/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: newQty })
            });
            if (res.ok) {
                const updated = await res.json();
                setCartItems(cartItems.map(i => i.id === item.id ? updated : i));
                window.dispatchEvent(new Event("storage"));
            }
        } catch (err) {
            console.error("Failed to update quantity:", err);
        }
    }

    async function handleRemove(itemId) {
        try {
            const res = await fetch(`http://localhost:8080/api/cart/remove/${itemId}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setCartItems(cartItems.filter(i => i.id !== itemId));
                window.dispatchEvent(new Event("storage"));
            }
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    }

    async function handleCheckout() {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) return;
        const user = JSON.parse(savedUser);

        setIsCheckingOut(true);
        setMessage("");
        try {
            const res = await fetch(`http://localhost:8080/api/cart/checkout/user/${user.id}`, {
                method: "POST",
            });
            if (res.ok) {
                setMessage("Order placed successfully! Greenhouse freshness is on its way.");
                setCartItems([]);
                // Update nav count
                window.dispatchEvent(new Event("storage"));
            } else {
                setMessage("Checkout failed. Please try again.");
            }
        } catch (err) {
            setMessage("Something went wrong. Please try again later.");
        } finally {
            setIsCheckingOut(false);
        }
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.total || 0), 0);

    return (
        <div className="min-h-screen bg-[#061e14] flex flex-col relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-green-600/5 rounded-full blur-[120px]" />
            </div>

            <Navigation />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full flex-1 flex flex-col">
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                        Shopping <span className="text-green-500">Cart</span>
                    </h1>
                    <p className="text-slate-400 mt-2">Manage your fresh selections before checkout.</p>
                </div>

                {message && (
                    <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 font-medium animate-in fade-in slide-in-from-top-2">
                        {message}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full" />
                    </div>
                ) : cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-5 flex items-center gap-6 group transition-all hover:bg-white/10 hover:border-green-500/20 relative">
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>

                                    <div className="h-24 w-24 bg-[#0a271a] rounded-2xl overflow-hidden p-2 flex-shrink-0">
                                        <img
                                            src={item.product?.imgurl || "https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg"}
                                            alt={item.product?.title}
                                            className="w-full h-full object-contain transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1 pr-8">
                                        <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors uppercase tracking-tight">{item.product?.title}</h3>
                                        <p className="text-sm text-slate-400 line-clamp-1">{item.product?.description}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/5">
                                                <button
                                                    onClick={() => handleQuantityChange(item, -1)}
                                                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                                    </svg>
                                                </button>
                                                <span className="w-8 text-center text-white font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item, 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-lg font-black text-white">
                                                <span className="text-green-500 text-xs font-bold mr-1">Ksh</span>
                                                {item.total}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sticky top-24 shadow-2xl">
                                <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-slate-400 font-medium text-sm">
                                        <span>Subtotal</span>
                                        <span className="text-white">Ksh {subtotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-400 font-medium text-sm">
                                        <span>Delivery Fee</span>
                                        <span className="text-green-400 font-bold">FREE</span>
                                    </div>
                                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                        <span className="text-white font-bold">Total</span>
                                        <span className="text-2xl font-black text-white">Ksh {subtotal}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl shadow-xl shadow-green-900/40 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isCheckingOut ? (
                                        <>
                                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Checkout Now"
                                    )}
                                </button>
                                <p className="mt-4 text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">Secure Payment Powered by GreenHouse</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
                        <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.112 16.856a.625.625 0 0 1-.625.667H2.906a.625.625 0 0 1-.625-.667l1.112-16.856a.625.625 0 0 1 .625-.667h1.572c.499 0 .93.345 1.04.83l.255 1.125M12 13.5V12m0 0V10.5m0 1.5H10.5m1.5 0h1.5" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
                        <p className="text-slate-400 mb-8 max-w-xs text-center">It looks like you haven't added any fresh picks to your greenhouse yet.</p>
                        <Link href="/" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/10">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
