import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center shrink-0">
                        <span className="text-xl font-bold tracking-tight text-slate-900">Spring Master</span>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors">
                            Home
                        </Link>
                        <Link href="/users" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors">
                            Users
                        </Link>
                        <Link href="/posts" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors">
                            Post
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                            Log in
                        </Link>
                        <Link href="/register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-900 hover:bg-slate-800 transition-all focus:outline-none ring-2 ring-transparent ring-offset-2 focus:ring-slate-900">
                            Get started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
