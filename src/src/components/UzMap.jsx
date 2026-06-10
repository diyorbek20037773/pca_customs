import { C } from "../theme/colors";
import { MAP_R } from "../data/mapPaths";

export const UzMap = ({ hov, onHov }) => (
  <svg viewBox="0 0 1000 661" preserveAspectRatio="xMidYMid meet"
    style={{ width: "100%", height: "100%", display: "block" }}>
    {MAP_R.map(r => {
      // r.id (kichik harfli kalit) — REGS.id bilan bir xil bo'lishi muhim
      const on = hov === r.id;
      return (
        <path key={r.id} d={r.d}
          fill={on ? C.primary : "#BFDBFE"}
          stroke={on ? C.primary : C.card}
          strokeWidth={on ? 2.5 : 1.5}
          style={{
            cursor: "pointer", transition: "fill .2s, stroke-width .2s",
            filter: on ? "drop-shadow(0 2px 6px rgba(37,99,235,.5))" : "none",
          }}
          onMouseEnter={() => onHov(r.id)}
          onMouseLeave={() => onHov(null)} />
      );
    })}
  </svg>
);
