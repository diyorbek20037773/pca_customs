import { Search, SlidersHorizontal, FileSpreadsheet, Calendar } from "lucide-react";
import { C } from "../theme/colors";

const PERIODS = ["Barchasi", "Yil", "Chorak", "Oy"];

export const IntegrationToolbar = ({
  title,
  period, setPeriod,
  from = "01.01.2025", to = "22.11.2025",
  query, setQuery,
}) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 4px", marginBottom: 10, flexWrap: "wrap",
  }}>
    <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, marginRight: "auto" }}>
      {title}
    </div>

    <div style={{ display: "flex", gap: 4 }}>
      {PERIODS.map(p => {
        const on = period === p;
        return (
          <button key={p} onClick={() => setPeriod(p)}
            style={{
              padding: "6px 14px", borderRadius: 20,
              border: `1px solid ${on ? C.primary : C.border}`,
              background: on ? C.primary : C.card,
              color: on ? "white" : C.textPrimary,
              fontSize: 12, fontWeight: on ? 700 : 500, cursor: "pointer",
            }}>{p}</button>
        );
      })}
    </div>

    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "6px 10px", border: `1px solid ${C.border}`,
      borderRadius: 6, background: C.card, fontSize: 12, color: C.textPrimary,
    }}>
      <span>{from}</span>
      <span style={{ color: C.textMuted }}>→</span>
      <span>{to}</span>
      <Calendar size={14} color={C.textMuted} />
    </div>

    <div style={{ position: "relative" }}>
      <input value={query} onChange={e => setQuery(e.target.value)}
        placeholder="STIR / nomi..."
        style={{
          padding: "7px 36px 7px 12px", width: 230,
          border: `1px solid ${C.border}`, borderRadius: 6,
          fontSize: 12, outline: "none",
          background: C.card, color: C.textPrimary,
        }} />
      <button style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 34,
        border: "none", background: C.primary,
        borderRadius: "0 6px 6px 0", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}><Search size={14} color="white" /></button>
    </div>

    <button title="Excel"
      style={{
        width: 34, height: 32, border: `1px solid #10B981`,
        background: "#ECFDF5", borderRadius: 6, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}><FileSpreadsheet size={16} color="#10B981" /></button>
    <button title="Filtrlar"
      style={{
        width: 34, height: 32, border: `1px solid ${C.border}`,
        background: C.card, borderRadius: 6, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}><SlidersHorizontal size={16} color={C.textMuted} /></button>
  </div>
);
