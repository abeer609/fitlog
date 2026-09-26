"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

type PlanState = {
  plan: string[];
  saved: string[];
  toggleInPlan: (slug: string) => void;
  toggleSaved: (slug: string) => void;
  isInPlan: (slug: string) => boolean;
  isSaved: (slug: string) => boolean;
};

const PlanContext = createContext<PlanState | null>(null);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";

function readList(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readList(PLAN_KEY));
    setSaved(readList(SAVED_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    } catch {
      // storage unavailable; ignore
    }
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch {
      // storage unavailable; ignore
    }
  }, [saved, hydrated]);

  const value = useMemo<PlanState>(
    () => ({
      plan,
      saved,
      toggleInPlan: (slug: string) =>
        setPlan((prev) =>
          prev.includes(slug)
            ? prev.filter((s) => s !== slug)
            : [...prev, slug],
        ),
      toggleSaved: (slug: string) =>
        setSaved((prev) =>
          prev.includes(slug)
            ? prev.filter((s) => s !== slug)
            : [...prev, slug],
        ),
      isInPlan: (slug: string) => plan.includes(slug),
      isSaved: (slug: string) => saved.includes(slug),
    }),
    [plan, saved],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
