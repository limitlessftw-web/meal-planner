import { useEffect, useState } from "react";
import { IngredientInput } from "./components/IngredientInput";
import { RecipeList } from "./components/RecipeList";
import { RecipeHistory } from "./components/RecipeHistory";
import { GroceryList } from "./components/GroceryList";
import { CurrentGroceries } from "./components/CurrentGroceries";
import { WeeklyPlanGrid } from "./components/WeeklyPlan";
import { useRecipeHistory } from "./hooks/useRecipeHistory";
import { useGroceryList } from "./hooks/useGroceryList";
import { usePantry } from "./hooks/usePantry";
import { useWeeklyPlan } from "./hooks/useWeeklyPlan";
import { matchRecipes, listRecipes } from "./api/client";
import type { RecipeMatch } from "./types/api";

type Tab = "planner" | "weekly";

export default function App() {
  const [tab, setTab] = useState<Tab>("planner");
  const [matches, setMatches] = useState<RecipeMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const { history, markUsed, clearHistory } = useRecipeHistory();
  const grocery = useGroceryList();
  const pantry = usePantry();
  const weeklyPlan = useWeeklyPlan();
  const [recipeNames, setRecipeNames] = useState<string[]>([]);
  const [recipesLoading, setRecipesLoading] = useState(true);
  const [recipesError, setRecipesError] = useState<string | null>(null);

  useEffect(() => {
    listRecipes()
      .then((res) => setRecipeNames(res.recipes.map((r) => r.name)))
      .catch((e) => setRecipesError(e instanceof Error ? e.message : "Could not load recipes"))
      .finally(() => setRecipesLoading(false));
  }, []);

  async function handleSubmit(ingredients: string[]) {
    setLoading(true);
    setError(null);
    try {
      const res = await matchRecipes(ingredients);
      setMatches(res.matches);
      setSearched(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Meal Planner</h1>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
        Enter what you have on hand and get matching recipes with what's missing.
      </p>

      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #e5e7eb", marginBottom: 24 }}>
        {(["planner", "weekly"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 600,
              background: "none",
              border: "none",
              borderBottom: tab === t ? "2px solid #16a34a" : "2px solid transparent",
              color: tab === t ? "#16a34a" : "#6b7280",
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            {t === "planner" ? "Planner" : "Weekly Plan"}
          </button>
        ))}
      </div>

      {tab === "planner" && (
        <>
      <IngredientInput onSubmit={handleSubmit} disabled={loading} />

      {pantry.items.length > 0 && (
        <button
          onClick={() => handleSubmit(pantry.items)}
          disabled={loading}
          style={{
            marginTop: 10,
            fontSize: 12,
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            background: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Search recipes using my {pantry.items.length}-item pantry
        </button>
      )}

      {error && <p style={{ color: "#b91c1c", marginTop: 16 }}>{error}</p>}
      {loading && <p style={{ marginTop: 16, color: "#6b7280" }}>Searching...</p>}

      {searched && !loading && (
        <div style={{ marginTop: 24 }}>
          <RecipeList matches={matches} onMarkUsed={markUsed} onAddToGroceryList={grocery.addItems} />
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Current Groceries</h2>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: -6, marginBottom: 12 }}>
          What you have on hand right now — used by the "Search with my pantry" shortcut above.
        </p>
        <CurrentGroceries
          items={pantry.items}
          onAdd={pantry.addItem}
          onRemove={pantry.removeItem}
          onClearAll={pantry.clearAll}
        />
      </div>

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Grocery List</h2>
        <GroceryList
          items={grocery.items}
          onToggle={grocery.toggleItem}
          onRemove={grocery.removeItem}
          onClearChecked={grocery.clearChecked}
          onClearAll={grocery.clearAll}
        />
      </div>

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Past Recipes</h2>
        <RecipeHistory history={history} onClear={clearHistory} />
      </div>
        </>
      )}

      {tab === "weekly" && (
        <WeeklyPlanGrid
          plan={weeklyPlan.plan}
          recipeNames={recipeNames}
          onSetDay={weeklyPlan.setDay}
          onClear={weeklyPlan.clearPlan}
          loading={recipesLoading}
          error={recipesError}
        />
      )}
    </div>
  );
}
