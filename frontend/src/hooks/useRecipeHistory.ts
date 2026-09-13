import { useCallback, useEffect, useState } from "react";

export interface HistoryEntry {
  name: string;
  usedAt: string;
}

const STORAGE_KEY = "mealPlannerHistory";

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function useRecipeHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // localStorage unavailable (private browsing, etc.) — history just won't persist
    }
  }, [history]);

  const markUsed = useCallback((name: string) => {
    setHistory((prev) => [{ name, usedAt: new Date().toISOString() }, ...prev]);
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return { history, markUsed, clearHistory };
}
