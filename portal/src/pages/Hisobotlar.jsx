import { Download, Award, FileCheck2, Calendar } from "lucide-react";
import { C } from "../theme/colors";

export const HisobotlarPage = () => {
  const REPORTS_LOCAL = [
    { id: 1, title: "Audit yakuniy hisoboti",     date: "25.10.2025", type: "Sayyor audit",   color: C.primary },
    { id: 2, title: "Audit yakuniy hisoboti",     date: "15.04.2024", type: "Kameral audit",  color: C.primary },
    { id: 3, title: "Tavsiyalar ro'yxati",       date: "30.10.2025", type: "Tavsiyalar",     color: C.warning },
    { id: 4, title: "Audit sertifikati",          date: "20.04.2024", type: "Sertifikat",     color: C.success },
  ];

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 14,
      }}>
        {REPORTS_LOCAL.map(r => (
          <div key={r.id}
            style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: 22,
              transition: "transform .15s, box-shadow .15s",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 10px 24px ${C.shadow}`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: r.color + "18",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 14,
            }}>
              {r.type === "Sertifikat"
                ? <Award size={26} color={r.color} />
                : <FileCheck2 size={26} color={r.color} />}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4, fontWeight: 600 }}>
              {r.type}
            </div>
            <div style={{
              fontSize: 16, fontWeight: 700, color: C.textPrimary,
              marginBottom: 10, lineHeight: 1.3,
            }}>{r.title}</div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 12.5, color: C.textMuted, marginBottom: 16,
            }}>
              <Calendar size={13} />{r.date}
            </div>
            <button style={{
              width: "100%",
              padding: "10px 14px",
              background: r.color, color: "white",
              border: "none", borderRadius: 10,
              fontSize: 13, fontWeight: 600,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <Download size={15} /> Yuklab olish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
