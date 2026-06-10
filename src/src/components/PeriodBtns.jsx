import { C } from "../theme/colors";

export const PeriodBtns = ({ active, onChange }) => (
  <div style={{ display: "flex", gap: 4 }}>
    {["Barchasi", "Yil", "Chorak", "Oy"].map(f => {
      const on = active === f;
      return (
        <button key={f} onClick={() => onChange(f)}
          style={{
            padding: "4px 12px", borderRadius: 20,
            border: `1px solid ${on ? C.primary : C.border}`,
            background: on ? C.primary : C.card,
            color: on ? "white" : C.textMuted,
            cursor: "pointer", fontSize: 12,
            fontWeight: on ? 600 : 400,
            transition: "all .15s",
          }}>
          {f}
        </button>
      );
    })}
  </div>
);
