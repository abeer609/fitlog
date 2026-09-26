"use client";

import {
  CalendarPlus,
  CalendarCheck,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { usePlan } from "@/lib/workout-context";

export default function WorkoutButton({ id }: { id: number }) {
  const { toggleInPlan, toggleSaved, isInPlan, isSaved } = usePlan();
  const inPlan = isInPlan(id);
  const savedForLater = isSaved(id);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => toggleInPlan(id)}
        className={`focus-ring flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
          inPlan
            ? "bg-lime/15 text-lime ring-1 ring-lime/40"
            : "bg-lime text-ink hover:bg-limedim"
        }`}
      >
        {inPlan ? (
          <CalendarCheck className="h-4 w-4" />
        ) : (
          <CalendarPlus className="h-4 w-4" />
        )}
        {inPlan ? "Added to today's plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={() => toggleSaved(id)}
        className={`focus-ring flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors ${
          savedForLater
            ? "border-white/40 bg-white/10 text-white"
            : "border-line text-white/80 hover:border-white/40"
        }`}
      >
        {savedForLater ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
        {savedForLater ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
