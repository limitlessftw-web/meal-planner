import type { HistoryEntry } from "../hooks/useRecipeHistory";

interface Props {
  history: HistoryEntry[];
  onClear: () => void;
}

export function RecipeHistory({ history, onClear }: Props) {
  if (history.length === 0) {
    return (
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Nothing cooked yet — mark a recipe as cooked to see it here.
      </p>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "#6b7280" }}>{history.length} recipe(s) cooked</span>
        <button
          onClick={onClear}
          style={{
            fontSize: 12,
            color: "#6b7280",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Clear history
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {history.map((entry, i) => (
          <li
            key={`${entry.name}-${entry.usedAt}-${i}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 13,
              padding: "6px 10px",
              background: "#f9fafb",
              borderRadius: 6,
            }}
          >
            <span>{entry.name}</span>
            <span style={{ color: "#9ca3af" }}>
              {new Date(entry.usedAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
