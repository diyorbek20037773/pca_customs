import { C } from "../theme/colors";

export const tblWrap = { width: "100%", borderCollapse: "collapse", fontSize: 12 };

export const TH = (extra = {}) => ({
  padding: "9px 10px",
  textAlign: "left",
  background: C.headerBg,
  color: C.textMuted,
  fontWeight: 600,
  borderBottom: `2px solid ${C.border}`,
  borderRight: `1px solid ${C.border}`,
  whiteSpace: "nowrap",
  ...extra,
});

export const THl = { ...TH(), borderRight: "none" };

export const TD = (extra = {}) => ({
  padding: "8px 10px",
  borderBottom: `1px solid ${C.borderLight}`,
  borderRight: `1px solid ${C.borderLight}`,
  verticalAlign: "middle",
  ...extra,
});

export const TDl = (extra = {}) => ({ ...TD(), borderRight: "none", ...extra });
