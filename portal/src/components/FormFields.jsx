import { C } from "../theme/colors";

export const FF = ({ label, children }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{
      display: "block", fontSize: 11.5, color: C.textMuted,
      marginBottom: 4, fontWeight: 500,
    }}>{label}</label>
    {children}
  </div>
);

export const FI = ({ value = "", placeholder, onChange, type = "text", disabled }) => (
  <input type={type} defaultValue={value} placeholder={placeholder}
    onChange={onChange} disabled={disabled}
    style={{
      width: "100%", border: `1px solid ${C.border}`,
      borderRadius: 6, padding: "8px 10px",
      fontSize: 12.5, outline: "none", boxSizing: "border-box",
      opacity: disabled ? 0.6 : 1,
    }} />
);

export const FS = ({ opts = [], value, onChange }) => (
  <select value={value} onChange={onChange}
    style={{
      width: "100%", border: `1px solid ${C.border}`,
      borderRadius: 6, padding: "8px 10px",
      fontSize: 12.5, outline: "none", background: C.card,
    }}>
    {opts.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
);

export const FA = ({ rows = 3, val = "", placeholder, onChange }) => (
  <textarea rows={rows} defaultValue={val} placeholder={placeholder} onChange={onChange}
    style={{
      width: "100%", border: `1px solid ${C.border}`,
      borderRadius: 6, padding: "8px 10px",
      fontSize: 12.5, outline: "none", resize: "vertical", boxSizing: "border-box",
    }} />
);

export const Btn = ({ children, onClick, kind = "primary", size = "md", icon: Icon, disabled, type = "button" }) => {
  const styles = {
    primary: { bg: C.primary, color: "#FFF", border: C.primary },
    ghost:   { bg: "transparent", color: C.primary, border: C.primary },
    soft:    { bg: C.primary15, color: C.primary, border: "transparent" },
    danger:  { bg: C.danger, color: "#FFF", border: C.danger },
    neutral: { bg: C.card, color: C.textPrimary, border: C.border },
  }[kind];
  const pad = size === "sm" ? "5px 10px" : size === "lg" ? "10px 18px" : "7px 14px";
  const fs  = size === "sm" ? 11 : size === "lg" ? 13.5 : 12.5;
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: styles.bg, color: styles.color,
        border: `1px solid ${styles.border}`,
        borderRadius: 6, padding: pad,
        fontSize: fs, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1, transition: "transform .12s, opacity .15s",
        whiteSpace: "nowrap",
      }}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
      {Icon && <Icon size={size === "sm" ? 13 : 15} />}
      {children}
    </button>
  );
};
