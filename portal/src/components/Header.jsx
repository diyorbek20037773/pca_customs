import { Menu, Bell } from "lucide-react";
import { C } from "../theme/colors";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ORG } from "../data/mockData";

const TITLES = {
  "/":                  "Bosh sahifa",
  "/profil":            "Mening profilim",
  "/sorovlar":          "So'rovlar",
  "/hujjatlar":         "Hujjatlar",
  "/tekshiruvlar":      "Tekshiruvlar",
  "/muloqot":           "Muloqot",
  "/hisobotlar":        "Hisobotlar",
  "/bildirishnomalar":  "Bildirishnomalar",
  "/sozlamalar":        "Sozlamalar",
  "/yordam":            "Yordam",
};

export const Header = ({ route, onToggle, setRoute }) => {
  const title = TITLES[route] ||
    (route.startsWith("/sorovlar/")     ? "So'rov tafsiloti" :
     route.startsWith("/tekshiruvlar/") ? "Tekshiruv tafsiloti" : "Audit kabineti");

  const initials = ORG.director.split(" ").slice(0, 2).map(w => w[0]).join("");

  return (
    <header style={{
      background: C.card, borderBottom: `1px solid ${C.border}`,
      padding: "0 24px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onToggle}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 6,
            borderRadius: 8, display: "flex", alignItems: "center",
          }}
          onMouseEnter={e => e.currentTarget.style.background = C.cardAlt}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          <Menu size={22} color={C.textMuted} />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary }}>
          {title}
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ThemeSwitcher />
        <button onClick={() => setRoute("/bildirishnomalar")}
          title="Bildirishnomalar"
          style={{
            position: "relative", background: C.cardAlt, border: "none",
            cursor: "pointer", padding: 0,
            width: 38, height: 38, borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
          <Bell size={18} color={C.textPrimary} />
          <span style={{
            position: "absolute", top: 6, right: 6,
            background: C.danger,
            borderRadius: "50%", width: 9, height: 9,
            border: `2px solid ${C.card}`,
          }} />
        </button>
        <button onClick={() => setRoute("/sozlamalar")}
          title={ORG.director.split(" ").slice(0, 2).join(" ")}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            paddingLeft: 10, marginLeft: 4,
            borderLeft: `1px solid ${C.border}`,
            background: "none", border: "none", cursor: "pointer",
          }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700, fontSize: 13,
          }}>{initials}</div>
        </button>
      </div>
    </header>
  );
};
