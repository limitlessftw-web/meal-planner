import { DAYS, type Day, type WeeklyPlan } from "../hooks/useWeeklyPlan";

interface Props {
  plan: WeeklyPlan;
  recipeNames: string[];
  onSetDay: (day: Day, recipeName: string | null) => void;
  onClear: () => void;
  loading: boolean;
  error: string | null;
}

export function WeeklyPlanGrid({ plan, recipeNames, onSetDay, onClear, loading, error }: Props) {
  const plannedCount = DAYS.filter((day) => plan[day]).length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: "#6b7280" }}>{plannedCount}/7 days planned</span>
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
          Clear week
        </button>
      </div>

      {error && <p style={{ color: "#b91c1c", fontSize: 12, marginBottom: 10 }}>{error}</p>}
      {loading && <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 10 }}>Loading recipes...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 10,
        }}
      >
        {DAYS.map((day) => (
          <div
            key={day}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 12,
              background: plan[day] ? "#f0fdf4" : "#fff",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 8 }}>
              {day}
            </div>
            <select
              value={plan[day] ?? ""}
              onChange={(e) => onSetDay(day, e.target.value || null)}
              disabled={loading}
              style={{
                width: "100%",
                fontSize: 13,
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #d1d5db",
                background: "#fff",
              }}
            >
              <option value="">— unplanned —</option>
              {recipeNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
