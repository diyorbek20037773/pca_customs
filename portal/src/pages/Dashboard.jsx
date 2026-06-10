import {
  Inbox, FileText, ShieldCheck, MessageSquare,
  ChevronRight, ArrowRight, Calendar, Clock,
} from "lucide-react";
import { C } from "../theme/colors";
import { ORG, KPIS, REQUESTS, INSPECTIONS } from "../data/mockData";

export const DashboardPage = ({ setRoute }) => {
  const upcoming = REQUESTS.filter(r => r.status !== "Yakunlangan").slice(0, 3);
  const activeInspection = INSPECTIONS.find(i => i.status === "Jarayonda");
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Xayrli tong" : hour < 18 ? "Xayrli kun" : "Xayrli kech";

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      {/* Salom */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 4 }}>
          {greeting},
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: C.textPrimary }}>
          {ORG.director.split(" ")[0]} 👋
        </h1>
      </div>

      {/* Vazifalar (eng muhim qism) */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "baseline", marginBottom: 14,
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: C.textPrimary }}>
            Sizdan kutilmoqda
          </h2>
          {upcoming.length > 0 && (
            <button onClick={() => setRoute("/sorovlar")}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: C.primary, fontSize: 13, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 4,
              }}>
              Hammasi <ChevronRight size={14} />
            </button>
          )}
        </div>

        {upcoming.length === 0 ? (
          <EmptyHero />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {upcoming.map(r => (
              <TaskCard key={r.id} r={r} onClick={() => setRoute(`/sorovlar/${r.id}`)} />
            ))}
          </div>
        )}
      </div>

      {/* Audit holati */}
      {activeInspection && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>
            Joriy tekshiruv
          </h2>
          <AuditCard ins={activeInspection} onClick={() => setRoute(`/tekshiruvlar/${activeInspection.id}`)} />
        </div>
      )}

      {/* Tezkor kirish */}
      <div>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>
          Tezkor kirish
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
        }}>
          <QuickAction icon={Inbox} label="So'rovlar" count={KPIS.openRequests}
            color={C.primary} onClick={() => setRoute("/sorovlar")} />
          <QuickAction icon={FileText} label="Hujjatlar" count={KPIS.pendingDocs}
            color={C.warning} onClick={() => setRoute("/hujjatlar")} />
          <QuickAction icon={MessageSquare} label="Xabarlar" count={KPIS.unreadMessages}
            color={C.danger} onClick={() => setRoute("/muloqot")} />
          <QuickAction icon={ShieldCheck} label="Tekshiruvlar" count={KPIS.activeAudits}
            color={C.success} onClick={() => setRoute("/tekshiruvlar")} />
        </div>
      </div>
    </div>
  );
};

// ─── Vazifa kartasi ──────────────────────────────────────────
const TaskCard = ({ r, onClick }) => {
  const urgent = r.priority === "Yuqori";
  return (
    <button onClick={onClick}
      style={{
        background: C.card,
        border: `1px solid ${urgent ? C.danger + "40" : C.border}`,
        borderLeft: `4px solid ${urgent ? C.danger : C.primary}`,
        borderRadius: 12, padding: "18px 20px",
        cursor: "pointer", textAlign: "left",
        display: "flex", alignItems: "center", gap: 16,
        transition: "transform .15s, box-shadow .15s",
        width: "100%",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 20px ${C.shadow}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: urgent ? C.danger + "18" : C.primary + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Inbox size={22} color={urgent ? C.danger : C.primary} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 15, fontWeight: 700, color: C.textPrimary,
          marginBottom: 4, lineHeight: 1.3,
        }}>{r.title}</div>
        <div style={{
          fontSize: 13, color: C.textMuted,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <Calendar size={13} />
          Muddat: <strong style={{ color: urgent ? C.danger : C.textPrimary }}>{r.deadline}</strong>
        </div>
      </div>
      <ArrowRight size={20} color={C.textLight} style={{ flexShrink: 0 }} />
    </button>
  );
};

// ─── Audit kartasi ───────────────────────────────────────────
const AuditCard = ({ ins, onClick }) => (
  <button onClick={onClick}
    style={{
      width: "100%", textAlign: "left", cursor: "pointer",
      background: `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`,
      border: "none", borderRadius: 16, padding: 24,
      color: "white",
      transition: "transform .15s",
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
      <div>
        <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 4 }}>
          {ins.type}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          {ins.stage}
        </div>
        <div style={{ fontSize: 13, opacity: 0.85 }}>
          Auditor: {ins.leadAuditor.split(" ").slice(0, 2).join(" ")}
        </div>
      </div>
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: "rgba(255,255,255,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <ShieldCheck size={28} />
      </div>
    </div>

    <div style={{
      height: 8, background: "rgba(255,255,255,0.22)",
      borderRadius: 4, overflow: "hidden", marginBottom: 8,
    }}>
      <div style={{
        height: "100%", width: `${ins.progress}%`,
        background: "white", borderRadius: 4,
        transition: "width .3s",
      }} />
    </div>
    <div style={{
      display: "flex", justifyContent: "space-between",
      fontSize: 12, opacity: 0.9,
    }}>
      <span><Clock size={12} style={{ verticalAlign: "middle", marginRight: 4 }} />
        {ins.deadline} gacha</span>
      <span style={{ fontWeight: 700 }}>{ins.progress}%</span>
    </div>
  </button>
);

// ─── Tezkor kirish ──────────────────────────────────────────
const QuickAction = ({ icon: Icon, label, count, color, onClick }) => (
  <button onClick={onClick}
    style={{
      background: C.card, border: `1px solid ${C.border}`,
      borderRadius: 14, padding: 18,
      cursor: "pointer", textAlign: "left",
      display: "flex", alignItems: "center", gap: 14,
      transition: "transform .15s, border-color .15s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.borderColor = color;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.borderColor = C.border;
    }}>
    <div style={{
      width: 44, height: 44, borderRadius: 12,
      background: color + "18",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <Icon size={20} color={color} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: C.textPrimary, lineHeight: 1 }}>
        {count}
      </div>
    </div>
  </button>
);

// ─── Bo'sh holat ────────────────────────────────────────────
const EmptyHero = () => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 14, padding: "32px 24px",
    textAlign: "center",
  }}>
    <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
    <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>
      Hech narsa kutilmaydi
    </div>
    <div style={{ fontSize: 13, color: C.textMuted }}>
      Barcha so'rovlar bajarildi
    </div>
  </div>
);
