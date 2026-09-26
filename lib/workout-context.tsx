"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export const PLAN_CAP = 5;

type PlanState = {
  plan: number[];
  saved: number[];
  planCap: number;
  isPlanFull: boolean;
  toggleInPlan: (id: number) => void;
  toggleSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const PlanContext = createContext<PlanState | null>(null);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";

function readList(key: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
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
      planCap: PLAN_CAP,
      isPlanFull: plan.length >= PLAN_CAP,
      toggleInPlan: (id: number) =>
        setPlan((prev) => {
          if (prev.includes(id)) return prev.filter((s) => s !== id);
          if (prev.length >= PLAN_CAP) return prev; // cap of five lifts for today
          return [...prev, id];
        }),
      toggleSaved: (id: number) =>
        setSaved((prev) =>
          prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
        ),
      isInPlan: (id: number) => plan.includes(id),
      isSaved: (id: number) => saved.includes(id),
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
