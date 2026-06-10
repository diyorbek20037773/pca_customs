import { useState } from "react";
import {
  Phone, Mail, MessageCircle, Book,
  ChevronDown, HelpCircle,
} from "lucide-react";
import { C } from "../theme/colors";

const FAQS = [
  {
    q: "Auditor so'roviga qanday javob beraman?",
    a: "So'rovlar bo'limidan kerakli so'rovni oching, izoh yozing va hujjatlarni yuklang.",
  },
  {
    q: "Hujjat rad etilsa nima qilaman?",
    a: "Sababi hujjat ostida ko'rsatiladi. Tuzatib, qayta yuklang.",
  },
  {
    q: "Audit natijasiga e'tiroz bildira olamanmi?",
    a: "Ha. Hisobot e'lon qilingandan 30 kun ichida e'tiroz bildirishingiz mumkin.",
  },
  {
    q: "Xodimni qanday qo'shaman?",
    a: "Sozlamalar → Xodimlar bo'limidan taklif yuborib, ruxsatini belgilang.",
  },
  {
    q: "Qaysi formatdagi fayllar qabul qilinadi?",
    a: "PDF, XLSX, DOCX, PNG, JPG. Maksimal hajm — 50 MB.",
  },
];

export const YordamPage = () => {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      {/* Aloqa kanallari */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 12, marginBottom: 24,
      }}>
        <ContactCard icon={Phone} label="Telefon" value="200-66-77" color={C.primary} />
        <ContactCard icon={MessageCircle} label="Telegram" value="@audit_uz" color="#0EA5E9" />
        <ContactCard icon={Mail} label="Email" value="support@audit.uz" color={C.success} />
        <ContactCard icon={Book} label="Qo'llanma" value="Hujjatlar" color={C.warning} />
      </div>

      {/* SSS */}
      <h2 style={{
        fontSize: 17, fontWeight: 700, color: C.textPrimary,
        marginBottom: 14, display: "flex", alignItems: "center", gap: 8,
      }}>
        <HelpCircle size={18} color={C.primary} />
        Ko'p so'raladigan savollar
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{
            background: C.card,
            border: `1px solid ${open === i ? C.primary + "60" : C.border}`,
            borderRadius: 12,
            overflow: "hidden",
            transition: "border-color .15s",
          }}>
            <button onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                width: "100%", padding: "16px 18px",
                background: "transparent", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 12,
                textAlign: "left",
              }}>
              <span style={{
                flex: 1, fontSize: 14.5, fontWeight: 600,
                color: open === i ? C.primary : C.textPrimary,
              }}>{f.q}</span>
              <ChevronDown size={18}
                color={open === i ? C.primary : C.textMuted}
                style={{
                  transform: open === i ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform .2s",
                }} />
            </button>
            {open === i && (
              <div style={{
                padding: "0 18px 16px",
                fontSize: 14, color: C.textMuted, lineHeight: 1.6,
              }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactCard = ({ icon: Icon, label, value, color }) => (
  <button style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 14, padding: 18,
    cursor: "pointer", textAlign: "left",
    display: "flex", alignItems: "center", gap: 12,
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
      width: 42, height: 42, borderRadius: 12,
      background: color + "18",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <Icon size={20} color={color} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 11.5, color: C.textMuted, marginBottom: 2, fontWeight: 600 }}>
        {label}
      </div>
      <div style={{
        fontSize: 14, fontWeight: 700, color: C.textPrimary,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>{value}</div>
    </div>
  </button>
);
