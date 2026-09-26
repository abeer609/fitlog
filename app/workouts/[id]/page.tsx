import { notFound } from "next/navigation";
import axios from "axios";
import { Workout } from "@/lib/workouts";
import WorkoutButtons from "@/components/WorkoutButtons";

const statRows = (workout: NonNullable<Workout>) => [
  { label: "Equipment", value: workout.equipment },
  { label: "Difficulty", value: workout.difficulty },
  { label: "Sets", value: String(workout.sets) },
  { label: "Reps", value: workout.reps },
  { label: "Duration", value: workout.duration },
  { label: "Calories", value: `${workout.calories} kcal` },
  { label: "Rating", value: workout.rating.toFixed(1) },
];

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params;
  const url = "https://api.abcz.workers.dev/api/fitlog/" + p.id;
  const res = await axios.get<Workout>(url);
  const workout = res.data;
  if (!workout) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="aspect-square overflow-hidden rounded-2xl border border-line/70">
          <img src={workout.image} alt="" />
        </div>

        <div>
          <h1 className="font-display text-4xl tracking-wide sm:text-5xl">
            {workout.name.toUpperCase()}
          </h1>
          <p className="mt-4 text-base text-white/60">{workout.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink"
              >
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-8 overflow-hidden rounded-xl border border-line/70">
            {statRows(workout).map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-5 py-3 text-sm ${
                  i % 2 === 0 ? "bg-panel" : "bg-card"
                }`}
              >
                <dt className="uppercase tracking-wide text-white/50">
                  {row.label}
                </dt>
                <dd className="font-medium text-white">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <h2 className="font-display text-xl tracking-wide">INSTRUCTIONS</h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/75">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/10 text-xs text-white/80">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <WorkoutButtons id={workout.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
