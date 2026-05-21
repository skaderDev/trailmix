// components/layout/Navbar.tsx

import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Left Side */}
                <div className="flex items-center gap-8">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <div className="h-9 w-9 rounded-full bg-emerald-600 cursor-pointer" />
                        </Link>
                        <span className="text-2xl font-bold tracking-tight text-zinc-900">
                            TrailMix
                        </span>
                    </div>

                    {/* Search */}
                    <div className="hidden lg:flex">
                        <input
                            type="text"
                            placeholder="Search trail mixes..."
                            className="w-96 rounded-full border border-zinc-300 bg-zinc-50 px-5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-2">

                    <Link to="/dashboard" className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100">
                        Discover
                    </Link>

                    <Link to="/favorites" className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100">
                        Favorites
                    </Link>

                    <Link to="/create" className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100">
                        Create
                    </Link>

                    <Link to="/signin" className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-700">
                        Sign in
                    </Link>
                </div>
            </div>
        </nav>
    );
}
