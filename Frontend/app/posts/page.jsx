import Navigation from "../components/navigation";

export default async function Posts() {
    const res = await fetch("http://localhost:8080/api/products")
    const products = await res.json()

    return (
        <div className="min-h-screen bg-[#061e14] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-green-600/5 rounded-full blur-[120px]" />
            </div>
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Our <span className="text-green-500">Inventory</span></h1>
                    <p className="mt-1 text-sm text-slate-400">Browse through our wide selection of fresh greenhouse products.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-[2rem] shadow-sm hover:shadow-green-500/10 hover:border-green-500/30 transition-all group cursor-pointer"
                        >
                            <div className="flex flex-col h-full">
                                <div className="aspect-video mb-4 overflow-hidden rounded-2xl bg-[#0a271a]">
                                    <img src={product.imgurl || "https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg"} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors mb-2 tracking-tight">
                                    {product.title}
                                </h2>
                                <p className="text-slate-400 leading-relaxed text-sm flex-grow">
                                    {product.description}
                                </p>
                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-lg font-black text-white">Ksh {product.price}</span>
                                    <span className="text-sm font-medium text-green-500 group-hover:translate-x-1 transition-transform inline-flex items-center">
                                        View Details <span className="ml-1">→</span>
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                    {products.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                            <p className="text-slate-400 text-lg">No products found. Check back soon!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}