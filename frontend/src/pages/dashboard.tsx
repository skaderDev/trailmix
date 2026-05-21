
import { useState } from "react"
import { Link } from "react-router-dom"
import { Grid } from "../components/grid"
import  Card  from "../components/card"
import  Navbar  from "../components/navbar"
import activities from "../data/activities.json"
import { getSavedActivityIds, saveActivityId } from "../utils/favorites"

export default function Dashboard() {
    const [savedIds, setSavedIds] = useState(getSavedActivityIds);

    function saveActivity(activityId: number) {
        setSavedIds(saveActivityId(activityId));
    }

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#eef5ec_0%,#f8fafc_45%,#f6f2e9_100%)]">
            <Navbar />
            <main className="mx-auto max-w-7xl px-6 py-10 text-left">
                <section className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                        Discover
                    </p>
                    <h1 className="text-4xl font-bold text-zinc-950">
                        Find your next plan
                    </h1>
                    <p className="max-w-2xl text-zinc-700">
                        Browse activities for solo time, date ideas, and group
                        hangouts.
                    </p>
                </section>

                <Grid>
                    {activities.map((activity) => (
                        <Card
                            key={activity.id}
                            title={activity.title}
                            subtitle={`${activity.category} - ${activity.location}`}
                            chips={activity.tags}
                            footer={
                                <>
                                    <Link
                                        to={`/activities/${activity.id}`}
                                        className="text-sm font-semibold text-emerald-800"
                                    >
                                        View details
                                    </Link>
                                    <button
                                        onClick={() => saveActivity(activity.id)}
                                        className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
                                    >
                                        {savedIds.includes(activity.id) ? "Saved" : "Save"}
                                    </button>
                                </>
                            }
                        />
                    ))}
                </Grid>
            </main>
        </div>
    )
}
