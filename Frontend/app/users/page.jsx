import Navigation from "../components/navigation";
import Link from "next/link";

export default async function Users() {
    const res = await fetch("http://localhost:8080/users")
    const users = await res.json()

    return (
        <div className="min-h-screen bg-[#061e14] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-green-600/5 rounded-full blur-[120px]" />
            </div>
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Community <span className="text-green-500">Members</span></h1>
                        <p className="mt-1 text-sm text-slate-400 font-medium">A detailed list of all registered users in your application.</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Link
                            href="/users/create"
                            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl shadow-xl shadow-green-900/30 hover:shadow-green-500/20 active:scale-95 transition-all focus:outline-none border border-green-500"
                        >
                            Create User
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-[2rem] shadow-sm hover:shadow-green-500/5 hover:border-green-500/30 transition-all group"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 font-bold border border-green-500/30 uppercase text-lg">
                                    {user.name ? user.name.charAt(0) : '?'}
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-white group-hover:text-green-400 transition-colors uppercase tracking-wider">{user.name}</h2>
                                    <p className="text-xs text-slate-400 font-medium lowercase tracking-tight mt-0.5">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {users.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                            <p className="text-slate-400 font-medium">No users found. Start by creating one!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}