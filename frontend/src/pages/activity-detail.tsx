import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import activities from "../data/activities.json";
import { getSavedActivityIds, saveActivityId } from "../utils/favorites";

const initialComments = [
  {
    author: "Sam",
    text: "This would be a good weekend activity. I would save it for a low-pressure plan.",
  },
  {
    author: "Jordan",
    text: "Nice option if the group wants something simple without too much planning.",
  },
];

export default function ActivityDetail() {
  const { activityId } = useParams();
  const activity = activities.find((item) => item.id === Number(activityId));
  const [comments, setComments] = useState(initialComments);
  const [savedIds, setSavedIds] = useState(getSavedActivityIds);

  function updateComment(index: number, text: string) {
    setComments((currentComments) =>
      currentComments.map((comment, commentIndex) =>
        commentIndex === index ? { ...comment, text } : comment
      )
    );
  }

  function saveActivity(activityId: number) {
    setSavedIds(saveActivityId(activityId));
  }

  if (!activity) {
    return (
      <div>
        <Navbar />
        <main className="p-8 text-left">
          <h1>Activity not found</h1>
          <Link to="/dashboard">Back to Discover</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef5ec_0%,#f8fafc_42%,#f6f2e9_100%)]">
      <Navbar />
      <main className="mx-auto max-w-3xl p-8 text-left">
        <Link to="/dashboard" className="text-sm font-semibold text-emerald-800">
          Back to Discover
        </Link>

        <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-white/70 bg-[linear-gradient(135deg,#14532d_0%,#2f855a_45%,#d9b46e_100%)] shadow-xl shadow-emerald-950/15">
          <div className="flex h-full items-end p-6">
            <span className="rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-emerald-950 shadow-sm">
              Activity image placeholder
            </span>
          </div>
        </div>

        <section className="mt-8">
          <p className="text-sm font-medium text-emerald-700">
            {activity.category}
          </p>
          <h1>{activity.title}</h1>
          <p className="text-lg text-zinc-600">{activity.description}</p>
        </section>

        <div className="mt-6 rounded-xl border border-white/70 bg-white/85 p-5 text-zinc-700 shadow-sm backdrop-blur">
          <p>
            <strong className="text-zinc-950">Category:</strong>{" "}
            {activity.category}
          </p>
          <p>
            <strong className="text-zinc-950">Location:</strong>{" "}
            {activity.location}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {activity.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <section className="mt-8 rounded-xl border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur">
          <h2>Plan this activity</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => saveActivity(activity.id)}
              className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              {savedIds.includes(activity.id) ? "Saved activity" : "Save activity"}
            </button>
            <button className="rounded-full border border-emerald-200 bg-white px-5 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50">
              Add note
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-white/70 bg-white/85 p-5 shadow-sm backdrop-blur">
          <h2>Comments</h2>
          <div className="mt-4 space-y-4">
            {comments.map((comment, index) => (
              <div
                key={comment.author}
                className="rounded-lg border border-zinc-200 bg-white p-4"
              >
                <p className="font-medium text-zinc-900">{comment.author}</p>
                <textarea
                  value={comment.text}
                  onChange={(event) => updateComment(index, event.target.value)}
                  className="mt-2 min-h-24 w-full resize-y rounded-md border border-zinc-300 bg-white p-3 text-sm text-zinc-700 outline-none focus:border-emerald-500"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
