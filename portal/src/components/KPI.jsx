import { C } from "../theme/colors";

export const KPI = ({ label, value, sub, icon: Icon, color, tint, pct }) => {
  const gid = `kpi-g-${label.replace(/[^a-zA-Z0-9]/g, "")}`;
  const R = 22;
  const L = 2 * Math.PI * R;

  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.borderLight}`,
      borderRadius: 14,
      padding: "14px 16px",
      display: "flex", alignItems: "center", gap: 12, flex: 1,
      boxShadow: `0 1px 3px ${C.shadow}, 0 1px 2px ${C.shadow}`,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: tint || `${color}26`,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={22} color={color} strokeWidth={2.2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color, fontWeight: 700, marginBottom: 4, letterSpacing: 0.2 }}>{label}</div>
        <div style={{ fontSize: 19, fontWeight: 800, color: C.textPrimary, lineHeight: 1.05 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>{sub}</div>}
      </div>
      {pct != null && (
        <div style={{ position: "relative", width: 56, height: 56, flexShrink: 0 }}>
          <svg viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor={color} stopOpacity=".75" />
                <stop offset="100%" stopColor={color} />
              </linearGradient>
            </defs>
            <circle cx="28" cy="28" r={R} fill="none"
              stroke={tint} strokeWidth="8" />
            <circle cx="28" cy="28" r={R} fill="none"
              stroke={`url(#${gid})`} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${L * pct / 100} ${L}`} />
          </svg>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 800, color,
          }}>{pct}%</div>
        </div>
      )}
    </div>
  );
};
