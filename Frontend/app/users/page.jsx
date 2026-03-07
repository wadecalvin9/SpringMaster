import Navigation from "../components/navigation";
import Link from "next/link";

export default async function Users() {
    const res = await fetch("http://localhost:8080/users")
    const users = await res.json()

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navigation />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Users</h1>
                        <p className="mt-1 text-sm text-slate-500">A detailed list of all registered users in your application.</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Link
                            href="/users/create"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all focus:outline-none ring-2 ring-transparent ring-offset-2 focus:ring-slate-900"
                        >
                            Create User
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 uppercase">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors uppercase tracking-wider">{user.name}</h2>
                                    <p className="text-sm text-slate-500 font-medium lowercase tracking-tight">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {users.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
                            <p className="text-slate-500">No users found. Start by creating one!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}