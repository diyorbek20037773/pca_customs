import { Menu, Bell, User, ChevronRight } from "lucide-react";
import { C } from "../theme/colors";
import { ThemeSwitcher } from "./ThemeSwitcher";

const BREADCRUMB_ROUTES = {
  "Bosh sahifa":         "/",
  "Nomzodlar":           "/nomzodlar",
  "Hujjatlar":           "/hujjatlar",
  "Mezonlar":            "/mezonlar",
  "Hisobotlar":          "/hisobotlar",
  "Integratsiya":        "/integratsiya",
  "Nazorat tadbirlari":  "/nazorat",
  "Modullar":            "/modullar",
};

export const Header = ({ bc, onToggle, setRoute }) => (
  <div style={{
    background: C.card, borderBottom: `1px solid ${C.border}`,
    padding: "0 20px", height: 52,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    position: "sticky", top: 0, zIndex: 100,
    boxShadow: "0 1px 3px rgba(0,0,0,.05)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button onClick={onToggle}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
        <Menu size={20} color={C.textMuted} />
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13 }}>
        {bc.map((b, i) => {
          const isLast = i === bc.length - 1;
          const target = BREADCRUMB_ROUTES[b];
          return (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {i > 0 && <ChevronRight size={12} color={C.textLight} />}
              {!isLast && target ? (
                <button onClick={() => setRoute(target)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "2px 4px", borderRadius: 4,
                    color: C.textMuted, fontSize: 13, transition: "all .15s",
                  }}
                  onMouseEnter={e => {
                    e.target.style.color = C.primary;
                    e.target.style.background = "#EFF6FF";
                    e.target.style.textDecoration = "underline";
                  }}
                  onMouseLeave={e => {
                    e.target.style.color = C.textMuted;
                    e.target.style.background = "none";
                    e.target.style.textDecoration = "none";
                  }}>
                  {b}
                </button>
              ) : (
                <span style={{
                  color: isLast ? C.textPrimary : C.textMuted,
                  fontWeight: isLast ? 600 : 400, padding: "2px 4px",
                }}>{b}</span>
              )}
            </span>
          );
        })}
      </div>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <ThemeSwitcher />
      <div style={{ position: "relative" }}>
        <Bell size={20} color={C.textMuted} />
        <span style={{
          position: "absolute", top: -4, right: -4,
          background: C.danger, color: "white",
          borderRadius: "50%", width: 14, height: 14,
          fontSize: 9, display: "flex",
          alignItems: "center", justifyContent: "center", fontWeight: 700,
        }}>0</span>
      </div>
      <div style={{
        width: 33, height: 33, borderRadius: "50%",
        background: C.primary, display: "flex",
        alignItems: "center", justifyContent: "center",
      }}><User size={16} color="white" /></div>
    </div>
  </div>
);
