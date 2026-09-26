import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/workouts";
// import WorkoutArt from "@/components/WorkoutArt";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="focus-ring group flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-card transition-colors hover:border-lime/40"
    >
      <div className="relative aspect-16/11 overflow-hidden">
        {/* <WorkoutArt slug={workout.slug} /> */}
        <img src={workout.image} alt="" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-lime px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink"
            >
              {muscle}
            </span>
          ))}
        </div>

        <div>
          <h3 className="font-display text-xl leading-tight tracking-wide">
            {workout.name.toUpperCase()}
          </h3>
          <p className="mt-1 text-sm text-muted">{workout.equipment}</p>
        </div>

        <div className="mt-auto flex items-center gap-4 border-t border-line/70 pt-3 text-sm text-white/70">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {workout.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-4 w-4" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-lime text-lime" />
            {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
