"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Clock, Flame, Star, X } from "lucide-react";
import { usePlan, PLAN_CAP } from "@/lib/workout-context";
import type { Workout } from "@/lib/workouts";
import client from "@/lib/client";
import LoadingState from "@/components/Loading";
import { ErrorState } from "@/components/Error";

type Tab = "plan" | "saved";
type SortKey = "duration" | "caloriesBurned" | "rating" | "name";
type LoadStatus = "loading" | "ready" | "error";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
  { key: "name", label: "Name" },
];

export default function PlanPage() {
  const { plan, saved, toggleInPlan, toggleSaved } = usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [sortOpen, setSortOpen] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    client
      .get<Workout[]>("/fitlog")
      .then((res) => {
        if (cancelled) return;
        setWorkouts(res.data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const activeIds = tab === "plan" ? plan : saved;

  const items = useMemo(() => {
    const list = activeIds
      .map((id) => workouts.find((w) => w.id === id))
      .filter((w): w is Workout => Boolean(w));
    return [...list].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "rating") return b.rating - a.rating;
      return a[sortKey] - b[sortKey];
    });
  }, [activeIds, sortKey, workouts]);

  const totals = items.reduce(
    (acc, w) => ({
      minutes: acc.minutes + w.duration,
      calories: acc.calories + w.caloriesBurned,
    }),
    { minutes: 0, calories: 0 },
  );

  const activeSortLabel = sortOptions.find((o) => o.key === sortKey)?.label;
  const remove = (id: number) =>
    tab === "plan" ? toggleInPlan(id) : toggleSaved(id);

  return (
    <main className="mx-auto max-w-5xl px-6 py-14 sm:px-10">
      <h1 className="font-display text-4xl tracking-wide sm:text-5xl">
        MY PLAN
      </h1>
      <p className="mt-3 text-white/60">
        Cap of {PLAN_CAP} lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 divide-x divide-line/70 rounded-2xl border border-line/70 bg-panel">
        <StatCell label="Exercises" value={items.length} accent />
        <StatCell label="Minutes" value={totals.minutes} />
        <StatCell label="Calories" value={totals.calories} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 rounded-full border border-line/70 bg-panel p-1 text-sm">
          <button
            type="button"
            onClick={() => setTab("plan")}
            className={`focus-ring rounded-full px-5 py-2 font-medium transition-colors ${
              tab === "plan"
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            onClick={() => setTab("saved")}
            className={`focus-ring rounded-full px-5 py-2 font-medium transition-colors ${
              tab === "saved"
                ? "bg-white/10 text-white"
                : "text-white/50 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/50">Sort By</span>
            <button
              type="button"
              onClick={() => setSortOpen((v) => !v)}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-line/70 px-4 py-2 font-medium"
            >
              {activeSortLabel}
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          {sortOpen && (
            <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-xl border border-line bg-panel shadow-xl">
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    setSortKey(option.key);
                    setSortOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                    option.key === sortKey ? "text-lime" : "text-white/80"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {status === "loading" && <LoadingState />}
        {status === "error" && (
          <ErrorState onRetry={() => setReloadToken((n) => n + 1)} />
        )}
        {status === "ready" &&
          (items.length === 0 ? (
            <EmptyState />
          ) : (
            items.map((workout) => (
              <PlanRow
                key={workout.id}
                workout={workout}
                onRemove={() => remove(workout.id)}
              />
            ))
          ))}
      </div>
    </main>
  );
}

function StatCell({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="px-6 py-6 sm:px-8">
      <p className="text-sm text-white/50">{label}</p>
      <p
        className={`mt-2 font-display text-4xl ${
          accent ? "text-lime" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function PlanRow({
  workout,
  onRemove,
}: {
  workout: Workout;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line/70 bg-panel/40 p-4">
      <div className="h-20 w-20 flex-none overflow-hidden rounded-xl sm:h-24 sm:w-24">
        {/* <WorkoutImage workout={workout} /> */}
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

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-line/70 px-6 py-24 text-center">
      <h3 className="font-display text-2xl tracking-wide">NOTHING HERE YET</h3>
      <p className="mt-2 max-w-sm text-white/50">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/#library"
        className="focus-ring mt-6 inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink hover:bg-limedim"
      >
        Go to workouts
      </Link>
    </div>
  );
}
