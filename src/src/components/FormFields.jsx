import { C } from "../theme/colors";

// FormField wrapper
export const FF = ({ label, children }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{
      display: "block", fontSize: 11.5, color: C.textMuted,
      marginBottom: 4, fontWeight: 500,
    }}>{label}</label>
    {children}
  </div>
);

// FormInput
export const FI = ({ value = "" }) => (
  <input defaultValue={value} style={{
    width: "100%", border: `1px solid ${C.border}`,
    borderRadius: 6, padding: "7px 10px",
    fontSize: 12.5, outline: "none", boxSizing: "border-box",
  }} />
);

// FormSelect
export const FS = ({ opts = ["Kameral", "Sayyor"] }) => (
  <select style={{
    width: "100%", border: `1px solid ${C.border}`,
    borderRadius: 6, padding: "7px 10px",
    fontSize: 12.5, outline: "none", background: C.card,
  }}>
    {opts.map(o => <option key={o}>{o}</option>)}
  </select>
);

// FormArea (textarea)
export const FA = ({ rows = 3, val = "" }) => (
  <textarea rows={rows} defaultValue={val} style={{
    width: "100%", border: `1px solid ${C.border}`,
    borderRadius: 6, padding: "7px 10px",
    fontSize: 12.5, outline: "none", resize: "vertical", boxSizing: "border-box",
  }} />
);
