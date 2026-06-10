import { useParams, useNavigate } from "react-router-dom";
import {
  ShieldCheck, Calendar, ArrowLeft, MessageSquare,
  CheckCircle2, Circle, Clock,
} from "lucide-react";
import { C } from "../theme/colors";
import { Btn } from "../components/FormFields";
import { INSPECTIONS } from "../data/mockData";

const STATUS_META = {
  "Jarayonda":           { color: C.warning, label: "Jarayonda" },
  "Ijobiy yakunlangan":  { color: C.success, label: "Ijobiy" },
  "Salbiy yakunlangan":  { color: C.danger,  label: "Salbiy" },
};

export const TekshiruvlarPage = () => {
  const navigate = useNavigate();
  const active = INSPECTIONS.filter(i => i.status === "Jarayonda");
  const past   = INSPECTIONS.filter(i => i.status !== "Jarayonda");

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: "0 auto" }}>
      {active.length > 0 && (
        <Section title="Joriy">
          {active.map(ins => (
            <InspectionCard key={ins.id} ins={ins} active
              onClick={() => navigate(`/tekshiruvlar/${ins.id}`)} />
          ))}
        </Section>
      )}

      <Section title="Tarixi">
        {past.map(ins => (
          <InspectionCard key={ins.id} ins={ins}
            onClick={() => navigate(`/tekshiruvlar/${ins.id}`)} />
        ))}
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 28 }}>
    <h2 style={{ fontSize: 17, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>
      {title}
    </h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
  </div>
);

const InspectionCard = ({ ins, active, onClick }) => {
  const meta = STATUS_META[ins.status] || STATUS_META["Jarayonda"];

  if (active) {
    return (
      <button onClick={onClick}
        style={{
          width: "100%", textAlign: "left", cursor: "pointer", border: "none",
          background: `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`,
          color: "white", borderRadius: 16, padding: 24,
          transition: "transform .15s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 6 }}>
              {ins.type}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              {ins.stage}
            </div>
            <div style={{ fontSize: 13, opacity: 0.85 }}>
              {ins.leadAuditor.split(" ").slice(0, 2).join(" ")}
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
          height: 8, background: "rgba(255,255,255,0.25)",
          borderRadius: 4, marginBottom: 8,
        }}>
          <div style={{
            height: "100%", width: `${ins.progress}%`,
            background: "white", borderRadius: 4,
          }} />
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontSize: 12, opacity: 0.9,
        }}>
          <span>{ins.deadline} gacha</span>
          <span style={{ fontWeight: 700 }}>{ins.progress}%</span>
        </div>
      </button>
    );
  }

  return (
    <button onClick={onClick}
      style={{
        width: "100%", textAlign: "left", cursor: "pointer",
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 14, padding: 20,
        display: "flex", alignItems: "center", gap: 16,
        transition: "transform .15s, box-shadow .15s",
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
        width: 50, height: 50, borderRadius: 12,
        background: meta.color + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <CheckCircle2 size={24} color={meta.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>
          {ins.type}
        </div>
        <div style={{
          fontSize: 13, color: C.textMuted,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <Calendar size={13} />
          {ins.started}
        </div>
      </div>
      <div style={{
        background: meta.color + "18", color: meta.color,
        padding: "5px 14px", borderRadius: 20,
        fontSize: 12, fontWeight: 700, flexShrink: 0,
      }}>{meta.label}</div>
    </button>
  );
};

// ─── Tafsilot ─────────────────────────────────────────────
export const TekshiruvDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ins = INSPECTIONS.find(x => x.id === id);

  if (!ins) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <div style={{ fontSize: 16, color: C.textMuted, marginBottom: 16 }}>
          Tekshiruv topilmadi
        </div>
        <Btn icon={ArrowLeft} onClick={() => navigate("/tekshiruvlar")}>
          Orqaga
        </Btn>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, maxWidth: 850, margin: "0 auto" }}>
      <button onClick={() => navigate("/tekshiruvlar")}
        style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          color: C.textMuted, fontSize: 14, marginBottom: 20,
          padding: 0,
        }}>
        <ArrowLeft size={16} /> Orqaga
      </button>

      {/* Hero */}
      <div style={{
        background: ins.status === "Jarayonda"
          ? `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`
          : C.card,
        color: ins.status === "Jarayonda" ? "white" : C.textPrimary,
        border: ins.status === "Jarayonda" ? "none" : `1px solid ${C.border}`,
        borderRadius: 16, padding: 28, marginBottom: 22,
      }}>
        <div style={{
          fontSize: 12,
          opacity: ins.status === "Jarayonda" ? 0.85 : 1,
          color: ins.status === "Jarayonda" ? "white" : C.textMuted,
          marginBottom: 6, fontWeight: 600,
        }}>{ins.type}</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10, lineHeight: 1.2 }}>
          {ins.stage}
        </h1>
        <div style={{
          fontSize: 14,
          opacity: ins.status === "Jarayonda" ? 0.9 : 1,
          color: ins.status === "Jarayonda" ? "white" : C.textMuted,
          marginBottom: 18,
        }}>
          Auditor: {ins.leadAuditor}
        </div>
        {ins.status === "Jarayonda" && (
          <>
            <div style={{
              height: 10, background: "rgba(255,255,255,0.25)",
              borderRadius: 5, marginBottom: 8,
            }}>
              <div style={{
                height: "100%", width: `${ins.progress}%`,
                background: "white", borderRadius: 5,
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ opacity: 0.9 }}>
                {ins.started} → {ins.deadline}
              </span>
              <span style={{ fontWeight: 700 }}>{ins.progress}%</span>
            </div>
          </>
        )}
      </div>

      {/* Bosqichlar */}
      {ins.timeline && (
        <div style={{
          background: C.card, border: `1px solid ${C.border}`,
          borderRadius: 14, padding: 24, marginBottom: 18,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 18 }}>
            Bosqichlar
          </h2>
          {ins.timeline.map((s, i) => (
            <div key={i} style={{
              display: "flex", gap: 14, paddingBottom: 16,
              position: "relative",
            }}>
              {i < ins.timeline.length - 1 && (
                <div style={{
                  position: "absolute", left: 11, top: 24, bottom: 0,
                  width: 2, background: s.done ? C.success : C.borderLight,
                }} />
              )}
              <div style={{ flexShrink: 0, paddingTop: 1, zIndex: 1 }}>
                {s.done ? (
                  <CheckCircle2 size={24} color={C.success} fill={C.card} />
                ) : s.active ? (
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: C.warning,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 0 0 4px ${C.warning}33`,
                  }}>
                    <Clock size={13} color="white" />
                  </div>
                ) : (
                  <Circle size={24} color={C.borderLight} fill={C.card} />
                )}
              </div>
              <div style={{ flex: 1, paddingTop: 1 }}>
                <div style={{
                  fontSize: 14, fontWeight: 700,
                  color: s.done ? C.success : s.active ? C.warning : C.textMuted,
                  marginBottom: 2,
                }}>{s.title}</div>
                <div style={{ fontSize: 12.5, color: C.textMuted }}>{s.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {ins.result && (
        <div style={{
          background: C.success + "12",
          border: `1px solid ${C.success}40`,
          borderRadius: 12, padding: 18, marginBottom: 18,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.success, marginBottom: 6 }}>
            ✓ Yakuniy natija
          </div>
          <div style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.6 }}>
            {ins.result}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Btn icon={MessageSquare} onClick={() => navigate("/muloqot")}>
          Auditor bilan yozishish
        </Btn>
        {ins.status !== "Jarayonda" && (
          <Btn kind="ghost">E'tiroz bildirish</Btn>
        )}
      </div>
    </div>
  );
};
