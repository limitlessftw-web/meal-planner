import { useState } from "react";

interface Props {
  onSubmit: (ingredients: string[]) => void;
  disabled: boolean;
}

export function IngredientInput({ onSubmit, disabled }: Props) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ingredients = text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (ingredients.length > 0) {
      onSubmit(ingredients);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, fontWeight: 600 }}>
        What ingredients do you have? (comma-separated)
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="eggs, cheese, bread, tomato"
        rows={3}
        style={{ padding: 8, fontSize: 14, borderRadius: 6, border: "1px solid #d1d5db" }}
      />
      <button
        type="submit"
        disabled={disabled}
        style={{
          padding: "8px 16px",
          borderRadius: 6,
          border: "none",
          background: disabled ? "#9ca3af" : "#16a34a",
          color: "#fff",
          fontWeight: 600,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        Find Recipes
      </button>
    </form>
  );
}
