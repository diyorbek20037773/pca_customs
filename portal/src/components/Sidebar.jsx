import { LogOut } from "lucide-react";
import { C } from "../theme/colors";
import { MENU } from "../data/menu";
import { ORG } from "../data/mockData";

export const Sidebar = ({ route, setRoute }) => {
  const active =
    route.startsWith("/sorovlar")     ? "/sorovlar" :
    route.startsWith("/hujjatlar")    ? "/hujjatlar" :
    route.startsWith("/tekshiruvlar") ? "/tekshiruvlar" :
    route.startsWith("/muloqot")      ? "/muloqot" :
    route.startsWith("/hisobotlar")   ? "/hisobotlar" :
    route.startsWith("/profil")       ? "/profil" :
    route.startsWith("/sozlamalar")   ? "/sozlamalar" : route;

  return (
    <aside style={{
      width: 260, minWidth: 260,
      background: C.card,
      borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0, zIndex: 50,
    }}>
      {/* Brend */}
      <div style={{
        padding: "22px 22px 18px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: 800, fontSize: 18,
          boxShadow: `0 4px 12px ${C.primary}33`,
        }}>A</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.textPrimary, lineHeight: 1.1 }}>
            Audit
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
            kabineti
          </div>
        </div>
      </div>

      {/* Tashkilot — soddalashtirilgan */}
      <div style={{
        margin: "0 14px 14px",
        padding: "12px 14px",
        background: C.cardAlt,
        borderRadius: 12,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: C.primary, color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, flexShrink: 0,
        }}>{ORG.shortName[0]}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontSize: 13, fontWeight: 700, color: C.textPrimary,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{ORG.shortName}</div>
          <div style={{ fontSize: 11, color: C.textMuted }}>Tashkilot</div>
        </div>
      </div>

      {/* Menyu */}
      <nav style={{ flex: 1, padding: "0 10px", overflowY: "auto" }} className="no-scrollbar">
        {MENU.map(({ key, label, icon: Icon, badge }) => {
          const on = active === key;
          return (
            <button key={key} onClick={() => setRoute(key)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                width: "100%",
                padding: "11px 14px",
                borderRadius: 10, border: "none", cursor: "pointer",
                marginBottom: 3,
                background: on ? C.primary : "transparent",
                color: on ? "white" : C.textPrimary,
                fontSize: 14, fontWeight: on ? 600 : 500, textAlign: "left",
                transition: "background .15s",
              }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = C.cardAlt; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}>
              <Icon size={18} style={{ flexShrink: 0, opacity: on ? 1 : 0.7 }} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge ? (
                <span style={{
                  background: on ? "rgba(255,255,255,0.25)" : C.danger,
                  color: "white",
                  fontSize: 11, fontWeight: 700,
                  padding: "1px 8px", borderRadius: 10,
                  minWidth: 22, textAlign: "center",
                }}>{badge}</span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Chiqish */}
      <div style={{ padding: 14, borderTop: `1px solid ${C.borderLight}` }}>
        <button title="Chiqish"
          style={{
            width: "100%", padding: "10px 14px",
            background: "transparent",
            border: `1px solid ${C.border}`,
            borderRadius: 10, cursor: "pointer",
            color: C.textMuted,
            fontSize: 13, fontWeight: 500,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "color .15s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = C.danger}
          onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
          <LogOut size={15} />Chiqish
        </button>
      </div>
    </aside>
  );
};
