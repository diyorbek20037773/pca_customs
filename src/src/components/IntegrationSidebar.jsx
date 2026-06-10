import { C } from "../theme/colors";
import { INTEGRATION_MENU } from "../data/integration";

export const IntegrationSidebar = ({ section, setSection }) => (
  <div style={{
    width: 270, minWidth: 270, background: C.card,
    borderRight: `1px solid ${C.border}`,
    // zoom: 1.2 ga moslab balandlikni 100vh / 1.2 qilamiz, aks holda viewport'dan oshadi
    height: "calc(100vh / 1.2)",
    position: "sticky", top: 0, zIndex: 40,
    display: "flex", flexDirection: "column", overflow: "hidden",
    zoom: 1.2,
  }}>
    <nav style={{ padding: 10, overflowY: "auto", flex: 1 }}>
      {INTEGRATION_MENU.map(item => {
        const on = section === item.key;
        return (
          <button key={item.key} onClick={() => setSection(item.key)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: "10px 12px",
              borderRadius: 8, border: "none", cursor: "pointer",
              marginBottom: 4,
              background: on ? C.primary : "transparent",
              color: on ? "white" : C.textPrimary,
              fontSize: 12.5, fontWeight: on ? 700 : 500, textAlign: "left",
              lineHeight: 1.3,
              transition: "background .15s",
            }}
            onMouseEnter={e => { if (!on) e.currentTarget.style.background = C.rowHover; }}
            onMouseLeave={e => { if (!on) e.currentTarget.style.background = "transparent"; }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: on ? "rgba(255,255,255,0.15)" : C.rowAlt,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, overflow: "hidden",
            }}>
              <img src={item.logo} alt=""
                style={{ width: 26, height: 26, objectFit: "contain" }} />
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  </div>
);
