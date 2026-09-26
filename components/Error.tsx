export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-line/70 px-6 py-24 text-center">
      <h3 className="font-display text-2xl tracking-wide">
        COULDN&apos;T LOAD YOUR PLAN
      </h3>
      <p className="mt-2 max-w-sm text-white/50">
        The FitLog API didn&apos;t respond. Check your connection and try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="focus-ring mt-6 inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink hover:bg-limedim"
      >
        Retry
      </button>
    </div>
  );
}
