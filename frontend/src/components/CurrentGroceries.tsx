import { useState } from "react";

interface Props {
  items: string[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
  onClearAll: () => void;
}

export function CurrentGroceries({ items, onAdd, onRemove, onClearAll }: Props) {
  const [text, setText] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <div>
      <form onSubmit={handleAdd} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add an item (e.g. eggs)"
          style={{
            flex: 1,
            minWidth: 0,
            padding: 8,
            fontSize: 13,
            borderRadius: 6,
            border: "1px solid #d1d5db",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 14px",
            borderRadius: 6,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      {items.length === 0 ? (
        <p style={{ color: "#6b7280", fontSize: 13 }}>
          Nothing here yet — add what you currently have on hand.
        </p>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{items.length} item(s)</span>
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
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {items.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  padding: "4px 10px",
                  background: "#eef2ff",
                  color: "#3730a3",
                  borderRadius: 999,
                }}
              >
                {item}
                <button
                  onClick={() => onRemove(item)}
                  style={{
                    fontSize: 12,
                    color: "#3730a3",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    lineHeight: 1,
                  }}
                  aria-label={`Remove ${item}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
