import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-white/50 sm:flex-row sm:px-10">
        <span className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-lime" strokeWidth={2.5} />
          <span className="font-display tracking-wide text-white/80">
            FITLOG
          </span>
        </span>
        <span>
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log
          honest.
        </span>
      </div>
    </footer>
  );
}
