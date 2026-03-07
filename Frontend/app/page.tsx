import Navigation from "./components/navigation";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block">Master your Spring</span>
            <span className="block text-slate-600 mt-2">Applications with ease.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base text-slate-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
            A beautiful, minimal interface for managing your users, posts, and everything in between. Built with modern technologies for speed and reliability.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
            <Link
              href="/register"
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-slate-900 hover:bg-slate-800 md:py-4 md:text-lg md:px-10 transition-all shadow-lg shadow-slate-200"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center px-8 py-3 border border-slate-200 text-base font-semibold rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 md:py-4 md:text-lg md:px-10 transition-all"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { title: "User Management", desc: "Easily manage your users with a clean, intuitive interface." },
              { title: "Post Controls", desc: "Full control over your content with advanced moderation tools." },
              { title: "Robust Security", desc: "Built-in security measures to keep your data safe and private." }
            ].map((feature, i) => (
              <div key={i} className="relative p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}