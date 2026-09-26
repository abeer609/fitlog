"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/lib/workout-context";

const navLinks = [
  { href: "/", label: "Workouts" },
  { href: "/plan", label: "My Plan" },
];

export default function Header() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-lime" strokeWidth={2.5} />
          <span className="font-display text-lg tracking-wide">FITLOG</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-lime/15 text-lime"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5 text-sm text-white/80">
          <span className="flex items-center gap-2">
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime px-1.5 text-xs font-semibold text-ink">
              {plan.length}
            </span>
          </span>
          <span className="flex items-center gap-2">
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-1.5 text-xs font-semibold text-white">
              {saved.length}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
}
