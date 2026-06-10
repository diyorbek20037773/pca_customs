import { useState } from "react";
import {
  User, Lock, Bell, Users, Plus, Trash2,
} from "lucide-react";
import { C } from "../theme/colors";
import { Btn, FF, FI } from "../components/FormFields";
import { TEAM, ORG } from "../data/mockData";

const TABS = [
  { key: "akkaunt",      label: "Akkaunt",         icon: User },
  { key: "xavfsizlik",   label: "Xavfsizlik",      icon: Lock },
  { key: "bildirishnoma", label: "Bildirishnomalar", icon: Bell },
  { key: "xodimlar",     label: "Xodimlar",        icon: Users },
];

export const SozlamalarPage = () => {
  const [tab, setTab] = useState("akkaunt");

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: "0 auto" }}>
      {/* Tab tanlash — gorizontal */}
      <div style={{
        display: "flex", gap: 4, background: C.cardAlt,
        padding: 4, borderRadius: 12, marginBottom: 22,
        overflowX: "auto",
      }} className="no-scrollbar">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              padding: "10px 18px", border: "none",
              background: tab === t.key ? C.card : "transparent",
              color: tab === t.key ? C.textPrimary : C.textMuted,
              fontSize: 14, fontWeight: 600,
              borderRadius: 10, cursor: "pointer",
              boxShadow: tab === t.key ? `0 1px 3px ${C.shadow}` : "none",
              display: "flex", alignItems: "center", gap: 8,
              whiteSpace: "nowrap",
            }}>
            <t.icon size={15} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "akkaunt" && <AkkauntTab />}
      {tab === "xavfsizlik" && <XavfsizlikTab />}
      {tab === "bildirishnoma" && <BildirishnomaTab />}
      {tab === "xodimlar" && <XodimlarTab />}
    </div>
  );
};

const Card = ({ children, title }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 14, padding: 24, marginBottom: 14,
  }}>
    {title && (
      <h2 style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 18 }}>
        {title}
      </h2>
    )}
    {children}
  </div>
);

const AkkauntTab = () => (
  <Card title="Shaxsiy ma'lumotlar">
    <div style={{
      display: "flex", gap: 18, marginBottom: 22,
      paddingBottom: 22, borderBottom: `1px solid ${C.borderLight}`,
      alignItems: "center", flexWrap: "wrap",
    }}>
      <div style={{
        width: 76, height: 76, borderRadius: 20,
        background: `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`,
        color: "white", fontSize: 30, fontWeight: 800,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>K</div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>
          {ORG.director.split(" ").slice(0, 2).join(" ")}
        </div>
        <div style={{ fontSize: 13, color: C.textMuted }}>Direktor</div>
      </div>
      <Btn kind="ghost">Rasmni o'zgartirish</Btn>
    </div>

    <div style={{
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 14, marginBottom: 16,
    }}>
      <FF label="Email"><FI value={ORG.email} /></FF>
      <FF label="Telefon"><FI value={ORG.phone} /></FF>
    </div>
    <Btn>Saqlash</Btn>
  </Card>
);

const XavfsizlikTab = () => (
  <>
    <Card title="Parolni o'zgartirish">
      <div style={{ maxWidth: 400 }}>
        <FF label="Joriy parol"><FI type="password" /></FF>
        <FF label="Yangi parol"><FI type="password" /></FF>
        <FF label="Qayta kiriting"><FI type="password" /></FF>
        <Btn>Yangilash</Btn>
      </div>
    </Card>

    <Card title="Ikki bosqichli himoya">
      <ToggleRow title="SMS orqali tasdiqlash"
        desc="Kirishda telefoningizga kod yuboriladi" on />
      <ToggleRow title="E-imzo orqali kirish"
        desc="ERI sertifikati bilan ishlash" />
    </Card>
  </>
);

const ToggleRow = ({ title, desc, on }) => {
  const [active, setActive] = useState(!!on);
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 0", borderBottom: `1px solid ${C.borderLight}`,
      gap: 16,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 3 }}>
          {title}
        </div>
        <div style={{ fontSize: 12.5, color: C.textMuted }}>{desc}</div>
      </div>
      <button onClick={() => setActive(a => !a)}
        style={{
          width: 44, height: 24, borderRadius: 12,
          border: "none", cursor: "pointer",
          background: active ? C.success : C.border,
          position: "relative", transition: "background .2s",
          padding: 0,
        }}>
        <span style={{
          position: "absolute", top: 2,
          left: active ? 22 : 2,
          width: 20, height: 20, borderRadius: "50%",
          background: "white",
          transition: "left .2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </button>
    </div>
  );
};

const BildirishnomaTab = () => {
  const items = [
    "Yangi so'rov keldi",
    "Yangi xabar",
    "Audit bosqichi o'zgardi",
    "Hujjat statusi o'zgardi",
    "Yakuniy hisobot tayyor",
  ];
  return (
    <Card title="Bildirishnomalarni qabul qilish">
      <div style={{
        display: "flex", padding: "10px 0",
        borderBottom: `1px solid ${C.borderLight}`,
      }}>
        <div style={{ flex: 1, fontSize: 12, color: C.textMuted, fontWeight: 600 }}>
          Hodisa
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 12, color: C.textMuted, fontWeight: 600 }}>
          <span style={{ width: 50, textAlign: "center" }}>Email</span>
          <span style={{ width: 50, textAlign: "center" }}>SMS</span>
          <span style={{ width: 50, textAlign: "center" }}>Telegram</span>
        </div>
      </div>
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", padding: "14px 0",
          borderBottom: i < items.length - 1 ? `1px solid ${C.borderLight}` : "none",
          alignItems: "center",
        }}>
          <div style={{ flex: 1, fontSize: 14, color: C.textPrimary, fontWeight: 500 }}>
            {item}
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {[0, 1, 2].map(k => (
              <div key={k} style={{ width: 50, display: "flex", justifyContent: "center" }}>
                <input type="checkbox" defaultChecked={k < 2}
                  style={{
                    width: 18, height: 18,
                    accentColor: C.primary, cursor: "pointer",
                  }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Card>
  );
};

const XodimlarTab = () => (
  <Card>
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "center", marginBottom: 18,
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary }}>
        Xodimlar ({TEAM.length})
      </h2>
      <Btn icon={Plus} size="sm">Taklif qilish</Btn>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {TEAM.map((t, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "12px 14px",
          background: C.cardAlt, borderRadius: 10,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`,
            color: "white", fontSize: 13, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>{t.name.split(" ").slice(0, 2).map(w => w[0]).join("")}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>
              {t.name.split(" ").slice(0, 2).join(" ")}
            </div>
            <div style={{ fontSize: 12.5, color: C.textMuted }}>{t.role}</div>
          </div>
          <span style={{
            background: C.primary + "18", color: C.primary,
            padding: "4px 10px", borderRadius: 8,
            fontSize: 11.5, fontWeight: 600,
          }}>{t.access}</span>
          <button style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 6, color: C.textLight,
          }}
          onMouseEnter={e => e.currentTarget.style.color = C.danger}
          onMouseLeave={e => e.currentTarget.style.color = C.textLight}>
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  </Card>
);
