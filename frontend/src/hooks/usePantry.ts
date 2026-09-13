import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mealPlannerPantry";

function loadPantry(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function usePantry() {
  const [items, setItems] = useState<string[]>(() => loadPantry());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage unavailable (private browsing, etc.) — pantry just won't persist
    }
  }, [items]);

  const addItem = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setItems((prev) =>
      prev.some((i) => i.toLowerCase() === trimmed.toLowerCase()) ? prev : [...prev, trimmed]
    );
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((i) => i !== name));
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  return { items, addItem, removeItem, clearAll };
}
