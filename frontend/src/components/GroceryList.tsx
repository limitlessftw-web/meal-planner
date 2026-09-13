import type { GroceryItem } from "../hooks/useGroceryList";

interface Props {
  items: GroceryItem[];
  onToggle: (name: string) => void;
  onRemove: (name: string) => void;
  onClearChecked: () => void;
  onClearAll: () => void;
}

export function GroceryList({ items, onToggle, onRemove, onClearChecked, onClearAll }: Props) {
  if (items.length === 0) {
    return (
      <p style={{ color: "#6b7280", fontSize: 13 }}>
        Your grocery list is empty — click "Add missing to grocery list" on a recipe to fill it in.
      </p>
    );
  }

  const checkedCount = items.filter((i) => i.checked).length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "#6b7280" }}>
          {checkedCount}/{items.length} checked off
        </span>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onClearChecked}
            disabled={checkedCount === 0}
            style={{
              fontSize: 12,
              color: checkedCount === 0 ? "#d1d5db" : "#6b7280",
              background: "none",
              border: "none",
              cursor: checkedCount === 0 ? "not-allowed" : "pointer",
              textDecoration: "underline",
            }}
          >
            Clear checked
          </button>
          <button
            onClick={onClearAll}
            style={{
              fontSize: 12,
              color: "#6b7280",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Clear all
          </button>
        </div>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item) => (
          <li
            key={item.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 13,
              padding: "6px 10px",
              background: "#f9fafb",
              borderRadius: 6,
            }}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onToggle(item.name)}
              style={{ cursor: "pointer" }}
            />
            <span
              style={{
                flex: 1,
                textDecoration: item.checked ? "line-through" : "none",
                color: item.checked ? "#9ca3af" : "#111827",
              }}
            >
              {item.name}
            </span>
            <button
              onClick={() => onRemove(item.name)}
              style={{
                fontSize: 12,
                color: "#9ca3af",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={`Remove ${item.name}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
