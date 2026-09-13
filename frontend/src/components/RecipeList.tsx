import type { RecipeMatch } from "../types/api";

interface Props {
  matches: RecipeMatch[];
  onMarkUsed: (name: string) => void;
  onAddToGroceryList: (missing: string[]) => void;
}

export function RecipeList({ matches, onMarkUsed, onAddToGroceryList }: Props) {
  if (matches.length === 0) {
    return <p style={{ color: "#6b7280" }}>No recipes found. Try adding more ingredients.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {matches.map((recipe) => (
        <div
          key={recipe.name}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: 16,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 16 }}>{recipe.name}</h3>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a" }}>
              {Math.round(recipe.match_ratio * 100)}% match
            </span>
          </div>
          <p style={{ fontSize: 13, color: "#4b5563", marginTop: 8 }}>{recipe.instructions}</p>
          {recipe.missing.length > 0 && (
            <p style={{ fontSize: 12, color: "#b91c1c", marginTop: 8 }}>
              Missing: {recipe.missing.join(", ")}
            </p>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button
              onClick={() => onMarkUsed(recipe.name)}
              style={{
                fontSize: 12,
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #d1d5db",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Mark as cooked
            </button>
            {recipe.missing.length > 0 && (
              <button
                onClick={() => onAddToGroceryList(recipe.missing)}
                style={{
                  fontSize: 12,
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Add missing to grocery list
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
