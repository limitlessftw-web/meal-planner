import { useCallback, useEffect, useState } from "react";

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Day = (typeof DAYS)[number];
export type WeeklyPlan = Record<Day, string | null>;

const STORAGE_KEY = "mealPlannerWeeklyPlan";

function emptyPlan(): WeeklyPlan {
  return DAYS.reduce((acc, day) => ({ ...acc, [day]: null }), {} as WeeklyPlan);
}

function loadPlan(): WeeklyPlan {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyPlan(), ...(JSON.parse(raw) as WeeklyPlan) } : emptyPlan();
  } catch {
    return emptyPlan();
  }
}

export function useWeeklyPlan() {
  const [plan, setPlan] = useState<WeeklyPlan>(() => loadPlan());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch {
      // localStorage unavailable (private browsing, etc.) — plan just won't persist
    }
  }, [plan]);

  const setDay = useCallback((day: Day, recipeName: string | null) => {
    setPlan((prev) => ({ ...prev, [day]: recipeName }));
  }, []);

  const clearPlan = useCallback(() => setPlan(emptyPlan()), []);

  return { plan, setDay, clearPlan };
}
