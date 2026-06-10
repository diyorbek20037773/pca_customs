import { C } from "../theme/colors";
import { MENU } from "../data/menu";

export const Sidebar = ({ route, setRoute, collapsed = false }) => {
  const active =
    route.startsWith("/nomzodlar")    ? "/nomzodlar" :
    route.startsWith("/hujjatlar")    ? "/hujjatlar" :
    route.startsWith("/integratsiya") ? "/integratsiya" : route;

  const width = collapsed ? 64 : 220;

  return (
    <div style={{
      width, minWidth: width, background: C.sidebar,
      display: "flex", flexDirection: "column",
      // zoom: 1.2 — ekranda 1.2× ko'rsatadi, shuning uchun balandlik 100vh / 1.2 ≈ 83.33vh
      height: "calc(100vh / 1.2)",
      position: "sticky", top: 0, zIndex: 50,
      transition: "width .25s ease, min-width .25s ease",
      overflow: "hidden",
      zoom: 1.2,
    }}>
      <div style={{
        padding: collapsed ? "20px 10px 16px" : "20px 16px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}>
        <button onClick={() => setRoute("/")} title="Bosh sahifa"
          style={{
            display: "flex", alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start", gap: 12,
            width: "100%", background: "transparent", border: "none",
            padding: 0, cursor: "pointer", color: "inherit",
            textAlign: "left",
          }}>
          <img src="/logo.png"
            alt="O'zbekiston Respublikasi Davlat Bojxona Xizmati"
            style={{
              width: collapsed ? 40 : 52, height: collapsed ? 40 : 52,
              objectFit: "contain", flexShrink: 0,
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
            }} />
          {!collapsed && (
            <div style={{ lineHeight: 1, flex: 1, minWidth: 0 }}>
              <div style={{
                color: "white", fontWeight: 800, fontSize: 19,
                lineHeight: 1.05, letterSpacing: 0.3,
              }}>Bojxona</div>
              <div style={{
                color: "#93C5FD", fontSize: 14, fontStyle: "italic",
                fontWeight: 500, lineHeight: 1.1, marginTop: 2,
              }}>auditi</div>
            </div>
          )}
        </button>
      </div>

      <nav style={{ padding: collapsed ? "10px 6px" : "10px 8px", overflowY: "auto", flex: 1 }}>
        {MENU.map(({ key, label, icon: Icon }) => {
          const on = active === key;
          return (
            <button key={key} onClick={() => setRoute(key)} title={collapsed ? label : undefined}
              style={{
                display: "flex", alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: 9,
                width: "100%",
                padding: collapsed ? "11px 0" : "11px 12px",
                borderRadius: 6, border: "none", cursor: "pointer",
                marginBottom: 5,
                background: on ? "white" : "transparent",
                color: on ? C.primary : "rgba(255,255,255,0.84)",
                fontSize: 10.5, fontWeight: on ? 700 : 400, textAlign: "left",
              }}>
              <Icon size={collapsed ? 18 : 15} style={{ flexShrink: 0 }} />
              {!collapsed && label}
            </button>
          );
        })}
      </nav>

    </div>
  );
};
