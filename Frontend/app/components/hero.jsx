import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#061e14] py-8 lg:py-12">

            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-green-600/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            The <span className="text-green-500">Store</span> that <br className="hidden lg:block" /> comes to you.
                        </h1>
                        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Fresh groceries, daily essentials, and pharmacy needs delivered from your favorite local stores directly to your home.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1">
                            <button className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-900/40 hover:shadow-green-500/20 active:scale-95">
                                Start Ordering
                            </button>
                            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all backdrop-blur-sm">
                                Browse Stores
                            </button>
                        </div>
                    </div>

                    <div className="relative group order-1 lg:order-2">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-green-500/10 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700" />

                        <div className="relative aspect-[16/10] sm:aspect-[2/1] lg:aspect-[4/3] max-h-[400px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-slate-900">
                            <Image
                                width={800}
                                height={600}
                                src="https://images.pexels.com/photos/6707511/pexels-photo-6707511.jpeg"
                                alt="Modern delivery service"
                                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Floating info card - more compact */}
                            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-lg shadow-inner">
                                            🚚
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-sm leading-tight">Live Tracking</p>
                                            <p className="text-green-400 text-xs">Arriving in 18 mins</p>
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-[#1a3a2e] bg-slate-800 flex items-center justify-center overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
