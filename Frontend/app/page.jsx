import Navigation from "./components/navigation";
import Link from "next/link";
import Hero from "./components/hero";

export default async function Home() {
  const res = await fetch("http://localhost:8080/api/products")
  const products = await res.json()

  return (
    <div className="min-h-screen bg-[#061e14] flex flex-col relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-green-600/5 rounded-full blur-[120px]" />
      </div>

      <Navigation />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Fresh <span className="text-green-500">Pickups</span>
          </h2>
          <p className="text-slate-400 mt-2">Explore our daily fresh selections delivered to you.</p>
        </div>

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
                  <button className="w-10 h-10 rounded-xl bg-green-600 hover:bg-green-500 text-white flex items-center justify-center transition-all active:scale-90 shadow-lg shadow-green-900/40">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}