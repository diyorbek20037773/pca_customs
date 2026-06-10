import { C, ST } from "../theme/colors";

const STATUS_STYLES = {
  "Yangi":               ST.blue,
  "Jarayonda":           ST.violet,
  "Ijobiy":              ST.green,
  "Ijobiy yakunlangan":  ST.green,
  "Salbiy":              ST.red,
  "Salbiy yakunlangan":  ST.red,
  "Tayyorgarlikda":      ST.amber,
  "Aktiv":               ST.green,
  "Nofaol":              ST.red,
  "Yakunlangan":         ST.green,
  "Bekor qilingan":      ST.red,
  "Neytral":             ST.gray,
  "Qabul qilindi":       ST.green,
  "Ko'rib chiqilmoqda":  ST.amber,
  "Rad etildi":          ST.red,
  "Yuqori":              ST.red,
  "O'rta":               ST.amber,
  "Past":                ST.blue,
};

export const Badge = ({ s }) => {
  const m = STATUS_STYLES[s] || ST.gray;
  return (
    <span style={{
      background: m.bg, color: m.txt,
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
      display: "inline-block",
    }}>{s}</span>
  );
};

export const RBar = ({ v }) => {
  const c = v >= 80 ? C.success : v >= 50 ? C.warning : C.primary;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 7, background: C.progressBg, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${v}%`, height: "100%", background: c, borderRadius: 4 }} />
      </div>
      <span style={{ fontSize: 12, color: c, fontWeight: 700, minWidth: 34 }}>{v}%</span>
    </div>
  );
};
