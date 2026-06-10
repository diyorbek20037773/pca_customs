import { Check } from "lucide-react";
import { C } from "../theme/colors";

export const IntegrationTabs = ({ tabs, active, onChange }) => (
  <div style={{
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 40,
    padding: 8,
    marginBottom: 14,
  }}>
    <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
      {tabs.map(t => {
        const on = t.key === active;
        return (
          <button key={t.key} onClick={() => onChange(t.key)}
            style={{
              flex: "1 1 0", minWidth: 130,
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 10px",
              background: on ? C.tabActive : "transparent",
              color: on ? C.tabActiveTxt : C.textPrimary,
              border: "none", borderRadius: 24, cursor: "pointer",
              fontSize: 11.5, fontWeight: on ? 700 : 500,
              lineHeight: 1.25, textAlign: "left",
              whiteSpace: "normal",
              transition: "background .15s",
            }}>
            {on && <Check size={14} style={{ flexShrink: 0, color: C.tabActiveTxt }} />}
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);
