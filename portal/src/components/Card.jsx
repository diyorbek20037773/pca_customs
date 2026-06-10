import { C } from "../theme/colors";

export const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    overflow: "hidden",
    ...style,
  }}>
    {children}
  </div>
);

export const CHead = ({ children, right }) => (
  <div style={{
    padding: "10px 16px",
    borderBottom: `1px solid ${C.border}`,
    fontSize: 12.5,
    fontWeight: 700,
    color: C.primary,
    letterSpacing: 0.2,
    display: "flex", alignItems: "center", justifyContent: "space-between",
  }}>
    <span>{children}</span>
    {right}
  </div>
);
