import Link from "next/link";

export function EmptyState() {
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
