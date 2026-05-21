
import { Link } from 'react-router-dom'


export default function Home() {

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(135deg,#f4f1e8_0%,#dfeedd_55%,#c9dfd6_100%)] px-6 text-center">
            <div className="max-w-2xl rounded-2xl border border-white/60 bg-white/75 p-10 shadow-xl shadow-emerald-950/10 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                    Activity planning made simple
                </p>
                <h1 className="text-6xl font-bold text-zinc-950">TrailMix</h1>
                <p className="mx-auto max-w-xl text-lg text-zinc-700">
                    Browse, save, and organize activities for solo days, date plans,
                    and group hangouts.
                </p>
                <Link
                    to="/dashboard"
                    className="mt-8 inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                >
                    Get Started
                </Link>
            </div>
        </div>
    )
}
