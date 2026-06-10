import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search, Inbox, Calendar, Paperclip,
  ArrowLeft, Upload, Send, CheckCircle2, Clock,
} from "lucide-react";
import { C } from "../theme/colors";
import { Btn, FA } from "../components/FormFields";
import { REQUESTS } from "../data/mockData";

const TABS = [
  { key: "kutilmoqda", label: "Kutilmoqda" },
  { key: "yakunlangan", label: "Yakunlangan" },
];

export const SorovlarPage = () => {
  const [tab, setTab] = useState("kutilmoqda");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = REQUESTS.filter(r => {
    const matchTab = tab === "kutilmoqda"
      ? r.status !== "Yakunlangan"
      : r.status === "Yakunlangan";
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: "0 auto" }}>
      {/* Tab + qidiruv */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 20, gap: 16, flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", gap: 6, background: C.cardAlt, padding: 4, borderRadius: 10 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{
                padding: "8px 18px", border: "none",
                background: tab === t.key ? C.card : "transparent",
                color: tab === t.key ? C.textPrimary : C.textMuted,
                fontSize: 14, fontWeight: 600,
                borderRadius: 8, cursor: "pointer",
                boxShadow: tab === t.key ? `0 1px 3px ${C.shadow}` : "none",
                transition: "all .15s",
              }}>{t.label}</button>
          ))}
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px",
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 10, minWidth: 280, flex: 1, maxWidth: 380,
        }}>
          <Search size={16} color={C.textMuted} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Qidirish..."
            style={{
              border: "none", outline: "none", background: "transparent",
              flex: 1, fontSize: 14,
            }} />
        </div>
      </div>

      {/* Ro'yxat */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 && (
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 14, padding: 50, textAlign: "center",
          }}>
            <Inbox size={36} color={C.textLight} style={{ marginBottom: 10 }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary, marginBottom: 4 }}>
              So'rov yo'q
            </div>
            <div style={{ fontSize: 13, color: C.textMuted }}>
              Bu kategoriyada hech narsa topilmadi
            </div>
          </div>
        )}

        {filtered.map(r => (
          <RequestCard key={r.id} r={r}
            onClick={() => navigate(`/sorovlar/${r.id}`)} />
        ))}
      </div>
    </div>
  );
};

const RequestCard = ({ r, onClick }) => {
  const isDone = r.status === "Yakunlangan";
  const urgent = !isDone && r.priority === "Yuqori";

  return (
    <button onClick={onClick}
      style={{
        background: C.card,
        border: `1px solid ${urgent ? C.danger + "40" : C.border}`,
        borderLeft: `4px solid ${isDone ? C.success : urgent ? C.danger : C.primary}`,
        borderRadius: 12, padding: "20px 22px",
        cursor: "pointer", textAlign: "left", width: "100%",
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
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: isDone ? C.success + "18" : urgent ? C.danger + "18" : C.primary + "18",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {isDone
            ? <CheckCircle2 size={22} color={C.success} />
            : <Inbox size={22} color={urgent ? C.danger : C.primary} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 16, fontWeight: 700, color: C.textPrimary,
            marginBottom: 6, lineHeight: 1.3,
          }}>{r.title}</div>
          <div style={{
            fontSize: 13.5, color: C.textMuted, marginBottom: 10,
            lineHeight: 1.5,
            display: "-webkit-box", WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>{r.description}</div>
          <div style={{
            display: "flex", gap: 16, fontSize: 12.5, color: C.textMuted,
            flexWrap: "wrap", alignItems: "center",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Calendar size={13} />
              {isDone ? "Bajarilgan" : "Muddat"}: <strong style={{
                color: isDone ? C.success : urgent ? C.danger : C.textPrimary,
              }}>{r.deadline}</strong>
            </span>
            {r.attachments > 0 && (
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Paperclip size={13} />{r.attachments} ta fayl
              </span>
            )}
            {urgent && (
              <span style={{
                background: C.danger + "18", color: C.danger,
                padding: "2px 10px", borderRadius: 12,
                fontSize: 11.5, fontWeight: 700,
              }}>Shoshilinch</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

// ─── Tafsilot ─────────────────────────────────────────────
export const SorovDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const r = REQUESTS.find(x => x.id === id);

  if (!r) {
    return (
      <div style={{ padding: 60, textAlign: "center" }}>
        <div style={{ fontSize: 16, color: C.textMuted, marginBottom: 16 }}>
          So'rov topilmadi
        </div>
        <Btn icon={ArrowLeft} onClick={() => navigate("/sorovlar")}>
          Orqaga
        </Btn>
      </div>
    );
  }

  const urgent = r.priority === "Yuqori";

  return (
    <div style={{ padding: 32, maxWidth: 850, margin: "0 auto" }}>
      <button onClick={() => navigate("/sorovlar")}
        style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          color: C.textMuted, fontSize: 14, marginBottom: 20,
          padding: 0,
        }}>
        <ArrowLeft size={16} /> So'rovlarga qaytish
      </button>

      {/* Asosiy karta */}
      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 14, padding: 28, marginBottom: 20,
      }}>
        {urgent && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: C.danger + "18", color: C.danger,
            padding: "5px 12px", borderRadius: 20,
            fontSize: 12, fontWeight: 700, marginBottom: 14,
          }}>
            <Clock size={13} /> Shoshilinch
          </div>
        )}
        <h1 style={{
          fontSize: 22, fontWeight: 800, color: C.textPrimary,
          marginBottom: 14, lineHeight: 1.3,
        }}>{r.title}</h1>
        <p style={{
          fontSize: 14.5, color: C.textPrimary, lineHeight: 1.7,
          marginBottom: 22,
        }}>{r.description}</p>
        <div style={{
          display: "flex", gap: 28, paddingTop: 18,
          borderTop: `1px solid ${C.borderLight}`,
          flexWrap: "wrap",
        }}>
          <DetailItem label="Auditor" value={r.auditor.split(" ").slice(0, 2).join(" ")} />
          <DetailItem label="Yuborilgan" value={r.sent} />
          <DetailItem label="Muddat" value={r.deadline}
            valueColor={urgent ? C.danger : C.textPrimary} />
        </div>
      </div>

      {/* Javob */}
      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 14, padding: 24,
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>
          Javob yuborish
        </h2>
        <FA rows={4} placeholder="Auditorga izohingizni yozing..." />
        <div style={{
          marginTop: 14,
          border: `2px dashed ${C.border}`,
          borderRadius: 12, padding: 28,
          textAlign: "center", color: C.textMuted,
          cursor: "pointer", background: C.cardAlt,
          transition: "border-color .15s",
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = C.primary}
        onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
          <Upload size={28} style={{ marginBottom: 8, color: C.primary }} />
          <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary, marginBottom: 4 }}>
            Hujjatlarni yuklang
          </div>
          <div style={{ fontSize: 12.5 }}>PDF, XLSX, DOCX yoki rasm</div>
        </div>
        <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
          <Btn icon={Send} size="lg">Javobni yuborish</Btn>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, valueColor }) => (
  <div>
    <div style={{ fontSize: 11.5, color: C.textMuted, marginBottom: 4, fontWeight: 600 }}>
      {label}
    </div>
    <div style={{ fontSize: 14, fontWeight: 700, color: valueColor || C.textPrimary }}>
      {value}
    </div>
  </div>
);
