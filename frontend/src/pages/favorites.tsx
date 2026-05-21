import { Link } from "react-router-dom";
import Card from "../components/card";
import { Grid } from "../components/grid";
import Navbar from "../components/navbar";
import activities from "../data/activities.json";
import { getSavedActivityIds, removeActivityId } from "../utils/favorites";
import { useState } from "react";

export default function Favorites() {
  const [savedIds, setSavedIds] = useState(getSavedActivityIds);
  const savedActivities = activities.filter((activity) =>
    savedIds.includes(activity.id)
  );

  function removeActivity(activityId: number) {
    setSavedIds(removeActivityId(activityId));
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef5ec_0%,#f8fafc_45%,#f6f2e9_100%)]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10 text-left">
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            Saved activities
          </p>
          <h1 className="text-4xl font-bold text-zinc-950">Favorites</h1>
          <p className="max-w-2xl text-zinc-700">
            Activities you saved from Discover will show up here.
          </p>
        </section>

        {savedActivities.length === 0 ? (
          <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-sm">
            <p className="text-zinc-700">No saved activities yet.</p>
            <Link
              to="/dashboard"
              className="mt-4 inline-flex rounded-full bg-emerald-700 px-5 py-2 text-sm font-medium text-white"
            >
              Browse activities
            </Link>
          </div>
        ) : (
          <Grid>
            {savedActivities.map((activity) => (
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
                      onClick={() => removeActivity(activity.id)}
                      className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50"
                    >
                      Remove
                    </button>
                  </>
                }
              />
            ))}
          </Grid>
        )}
      </main>
    </div>
  );
}
