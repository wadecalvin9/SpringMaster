"use client"
import { useState } from "react";
import Link from "next/link";

export default function ProductList({ products }) {
    const [addingId, setAddingId] = useState(null);

    async function addToCart(product) {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) {
            window.location.href = "/login";
            return;
        }

        const user = JSON.parse(savedUser);
        setAddingId(product.id);
        
        try {
            const res = await fetch("http://localhost:8080/api/cart/products/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity: 1,
                    user: { id: user.id },
                    product: { id: product.id }
                }),
            });

            if (res.ok) {
                // Trigger storage event to refresh nav count
                window.dispatchEvent(new Event("storage"));
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
        } finally {
            // Small delay for better UX
            setTimeout(() => setAddingId(null), 600);
        }
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-4 transition-all duration-300 hover:bg-white/10 hover:border-green-500/30 hover:-translate-y-1 flex flex-col h-full"
                >
                    {/* Product Image Container */}
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl bg-[#0a271a] flex items-center justify-center p-4">
                        <img
                            src={product.imgurl || "https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg"}
                            alt={product.title}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 px-2.5 py-1 bg-green-500/20 backdrop-blur-md rounded-full border border-green-500/30">
                            <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Fresh</p>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col flex-1 space-y-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                            {product.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed h-8">
                            {product.description}
                        </p>

                        <div className="pt-2 flex items-center justify-between mt-auto">
                            <p className="text-xl font-black text-white">
                                <span className="text-green-500 text-sm font-bold mr-0.5">Ksh</span>
                                {product.price}
                            </p>
                            <button 
                                onClick={() => addToCart(product)}
                                disabled={addingId === product.id}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-lg ${
                                    addingId === product.id 
                                    ? "bg-green-500/50 cursor-not-allowed" 
                                    : "bg-green-600 hover:bg-green-500 shadow-green-900/40"
                                }`}
                            >
                                {addingId === product.id ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
