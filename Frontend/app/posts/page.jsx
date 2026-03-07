import Navigation from "../components/navigation";

export default async function Posts() {
    const res = await fetch("http://localhost:8080/posts")
    const posts = await res.json()

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Posts</h1>
                    <p className="mt-1 text-sm text-slate-500">Explore the latest articles and updates from our community.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                        >
                            <div className="flex flex-col h-full">
                                <h2 className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors mb-2 tracking-tight">
                                    {post.title}
                                </h2>
                                <p className="text-slate-500 leading-relaxed text-sm flex-grow">
                                    {post.description}
                                </p>
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Article</span>
                                    <span className="text-sm font-medium text-slate-900 group-hover:translate-x-1 transition-transform inline-flex items-center">
                                        Read more <span className="ml-1">→</span>
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                    {posts.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-slate-300">
                            <p className="text-slate-500 text-lg">No posts yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}