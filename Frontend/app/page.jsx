import Navigation from "./components/navigation";
import Link from "next/link";
import Hero from "./components/hero";
import ProductList from "./components/ProductList";

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

        <ProductList products={products} />
      </main>
    </div>
  );
}