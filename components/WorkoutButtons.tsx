"use client";

import {
  CalendarPlus,
  CalendarCheck,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

export default function WorkoutButtons({ id }: { id: number }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => {}}
        className={`focus-ring flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors`}
      >
        Add
      </button>

      <button
        type="button"
        onClick={() => {}}
        className={`focus-ring flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors ${"border-white/40 bg-white/10 text-white"}`}
      >
        Add
      </button>
    </div>
  );
}
