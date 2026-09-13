import { useCallback, useEffect, useState } from "react";

export interface GroceryItem {
  name: string;
  checked: boolean;
}

const STORAGE_KEY = "mealPlannerGroceryList";

function loadList(): GroceryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GroceryItem[]) : [];
  } catch {
    return [];
  }
}

export function useGroceryList() {
  const [items, setItems] = useState<GroceryItem[]>(() => loadList());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage unavailable (private browsing, etc.) — list just won't persist
    }
  }, [items]);

  const addItems = useCallback((names: string[]) => {
    setItems((prev) => {
      const existing = new Set(prev.map((i) => i.name.toLowerCase()));
      const additions = names
        .filter((name) => !existing.has(name.toLowerCase()))
        .map((name) => ({ name, checked: false }));
      return additions.length > 0 ? [...prev, ...additions] : prev;
    });
  }, []);

  const toggleItem = useCallback((name: string) => {
    setItems((prev) =>
      prev.map((item) => (item.name === name ? { ...item, checked: !item.checked } : item))
    );
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((item) => item.name !== name));
  }, []);

  const clearChecked = useCallback(() => {
    setItems((prev) => prev.filter((item) => !item.checked));
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  return { items, addItems, toggleItem, removeItem, clearChecked, clearAll };
}
