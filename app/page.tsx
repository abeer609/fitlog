import Link from "next/link";
import WorkoutCard from "@/components/WorkoutCard";
import Image from "next/image";
import { Workout } from "@/lib/workouts";
import client from "@/lib/client";

export default async function HomePage() {
  const res = await client.get<Workout[]>("/fitlog");
  const workouts = res.data;

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 pt-10 sm:px-10">
        <div className="flex flex-col items-center gap-10 rounded-3xl border border-line/70 bg-panel px-6 py-14 sm:px-14 lg:flex-row lg:justify-between lg:py-20">
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime">
              Workout Library
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>
            <p className="mt-5 text-base text-white/60 sm:text-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <Link
              href="#library"
              className="focus-ring mt-8 inline-flex items-center rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Browse Workouts
            </Link>
          </div>

          <div className="flex-1">
            <Image
              style={{ width: "100%", height: "auto" }}
              width={0}
              height={0}
              sizes="100vw"
              src="/banner.png"
              alt="banner image"
            />
          </div>
        </div>
      </section>

      <section id="library" className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <h2 className="font-display text-3xl tracking-wide sm:text-4xl">
          THE LIBRARY
        </h2>
        <p className="mt-2 text-white/60">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}
