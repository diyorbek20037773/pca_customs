import { useState } from "react";
import {
  Upload, Search, FileText, Download, MoreVertical,
  CheckCircle2, Clock, AlertTriangle,
} from "lucide-react";
import { C } from "../theme/colors";
import { Btn } from "../components/FormFields";
import { DOCUMENTS } from "../data/mockData";

const STATUS_META = {
  "Qabul qilindi":      { icon: CheckCircle2, color: C.success, label: "Qabul qilindi" },
  "Ko'rib chiqilmoqda": { icon: Clock,        color: C.warning, label: "Tekshirilmoqda" },
  "Rad etildi":         { icon: AlertTriangle, color: C.danger, label: "Rad etildi" },
};

export const HujjatlarPage = () => {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Hammasi");

  const categories = ["Hammasi", ...new Set(DOCUMENTS.map(d => d.category))];

  const filtered = DOCUMENTS.filter(d =>
    (cat === "Hammasi" || d.category === cat) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      {/* Yuklash maydoni */}
      <div style={{
        background: `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`,
        borderRadius: 16, padding: 28, marginBottom: 24,
        color: "white",
        display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
      }}>
        <div style={{
          width: 60, height: 60, borderRadius: 16,
          background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Upload size={28} />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
            Yangi hujjat yuklash
          </div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>
            Faylni tanlang yoki shu joyga sudrang
          </div>
        </div>
        <button style={{
          padding: "12px 22px",
          background: "white", color: C.primary,
          border: "none", borderRadius: 10,
          fontSize: 14, fontWeight: 700, cursor: "pointer",
        }}>Fayl tanlash</button>
      </div>

      {/* Filter */}
      <div style={{
        display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap",
        alignItems: "center",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 14px",
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 10, flex: 1, minWidth: 240,
        }}>
          <Search size={16} color={C.textMuted} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Hujjat qidirish..."
            style={{
              border: "none", outline: "none", background: "transparent",
              flex: 1, fontSize: 14,
            }} />
        </div>
        <div style={{
          display: "flex", gap: 4, background: C.cardAlt,
          padding: 4, borderRadius: 10, overflowX: "auto",
        }} className="no-scrollbar">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{
                padding: "8px 14px", border: "none",
                background: cat === c ? C.card : "transparent",
                color: cat === c ? C.textPrimary : C.textMuted,
                fontSize: 13, fontWeight: 600,
                borderRadius: 8, cursor: "pointer",
                boxShadow: cat === c ? `0 1px 3px ${C.shadow}` : "none",
                whiteSpace: "nowrap",
              }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Fayl gridi */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 14,
      }}>
        {filtered.map(d => <FileCard key={d.id} d={d} />)}
        {filtered.length === 0 && (
          <div style={{
            gridColumn: "1 / -1",
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 14, padding: 50, textAlign: "center",
          }}>
            <FileText size={36} color={C.textLight} style={{ marginBottom: 10 }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>
              Hujjat topilmadi
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FileCard = ({ d }) => {
  const meta = STATUS_META[d.status] || STATUS_META["Qabul qilindi"];
  const ext = d.name.split(".").pop().toLowerCase();
  const ICON_COLOR = {
    pdf:  "#EF4444",
    xlsx: "#10B981", xls: "#10B981",
    docx: "#2563EB", doc: "#2563EB",
    png:  "#8B5CF6", jpg: "#8B5CF6", jpeg: "#8B5CF6",
  }[ext] || C.primary;

  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`,
      borderRadius: 14, padding: 18,
      transition: "transform .15s, box-shadow .15s",
      cursor: "pointer",
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
        display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14,
      }}>
        <div style={{
          width: 44, height: 52, borderRadius: 8,
          background: ICON_COLOR + "18",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, position: "relative",
        }}>
          <FileText size={22} color={ICON_COLOR} />
          <span style={{
            position: "absolute", bottom: 4,
            background: ICON_COLOR, color: "white",
            fontSize: 8, fontWeight: 800,
            padding: "1px 4px", borderRadius: 2,
            textTransform: "uppercase",
          }}>{ext}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13.5, fontWeight: 700, color: C.textPrimary,
            lineHeight: 1.4, marginBottom: 3,
            overflow: "hidden", textOverflow: "ellipsis",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            wordBreak: "break-word",
          }}>{d.name}</div>
          <div style={{ fontSize: 11.5, color: C.textMuted }}>
            {d.size} • {d.uploaded}
          </div>
        </div>
        <button style={{
          background: "none", border: "none", cursor: "pointer",
          padding: 4, color: C.textLight,
        }}>
          <MoreVertical size={16} />
        </button>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", paddingTop: 12,
        borderTop: `1px solid ${C.borderLight}`,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 12, fontWeight: 600,
          color: meta.color,
        }}>
          <meta.icon size={13} />
          {meta.label}
        </div>
        <button title="Yuklab olish"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 6, borderRadius: 6, color: C.textMuted,
            display: "flex", alignItems: "center",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.cardAlt; e.currentTarget.style.color = C.primary; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMuted; }}>
          <Download size={15} />
        </button>
      </div>

      {d.note && (
        <div style={{
          marginTop: 10, padding: "8px 10px",
          background: C.danger + "12", borderRadius: 6,
          fontSize: 11.5, color: C.danger, lineHeight: 1.4,
        }}>{d.note}</div>
      )}
    </div>
  );
};
