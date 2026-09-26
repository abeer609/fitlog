import { usePlan } from "@/lib/workout-context";
import { Workout } from "@/lib/workouts";
import { Check, Clock, Flame, Star, X } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export function PlanRow({
  workout,
  tab,
  onRemove,
}: {
  workout: Workout;
  tab: "plan" | "saved";
  onRemove: () => void;
}) {
  const { isCompleted, toggleCompleted } = usePlan();
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line/70 bg-panel/40 p-4">
      <div className="h-20 w-20 flex-none overflow-hidden rounded-xl sm:h-24 sm:w-24">
        <img src={workout.image} alt="" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-lg tracking-wide">
          {workout.name.toUpperCase()}
        </h3>
        <p className="text-sm text-white/50">{workout.equipment}</p>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white/70">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-lime" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-lime" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-lime text-lime" />
            {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-none items-center gap-3">
        {tab === "plan" &&
          (isCompleted(workout.id) ? (
            <button
              onClick={() => {
                toggleCompleted(workout.id);
                toast("Removed from completed");
              }}
              className="focus-ring inline-flex items-center rounded-full border px-5 py-2 text-sm font-semibold cursor-pointer"
            >
              <X />
              Mark Incomplete
            </button>
          ) : (
            <button
              onClick={() => {
                toggleCompleted(workout.id);
                toast("Congratulations! You completed " + workout.name);
              }}
              className="focus-ring inline-flex items-center rounded-full bg-lime px-5 py-2 text-sm font-semibold text-ink cursor-pointer"
            >
              <Check />
              Mark as Done
            </button>
          ))}

        <Link
          href={`/workouts/${workout.id}`}
          className="focus-ring whitespace-nowrap rounded-full border border-line px-5 py-2 text-sm font-medium text-white hover:border-white/40"
        >
          View Details
        </Link>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="focus-ring rounded-full p-2 text-white/40 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
