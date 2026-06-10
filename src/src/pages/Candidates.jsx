import { useState, useEffect } from "react";
import { Search, Download, Settings, X } from "lucide-react";

import { C } from "../theme/colors";
import { tblWrap, TH, THl, TD, TDl } from "../styles/table";
import { CANDIDATES } from "../data/mockData";

import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Pager } from "../components/Pager";
import { PeriodBtns } from "../components/PeriodBtns";
import { FillerRows } from "../components/TableFiller";

// Har KPI tugmasi bosilganda qaysi maqom bo'yicha filtrlash kerakligi:
// `null` — barchasi; "Yakunlangan" — Ijobiy + Salbiy yakunlanganlar.
const KPI_CARDS = [
  { l: "JAMI AUDITLAR",   v: "550", filter: null },
  { l: "YANGI AUDITLAR",  v: "38",  filter: "Yangi" },
  { l: "TAYYORGARLIKDA",  v: "471", s: "Kameral 311 | Sayyor 160", filter: "Tayyorgarlikda" },
  { l: "JARAYONDA",       v: "471", s: "Kameral 311 | Sayyor 160", filter: "Jarayonda" },
  { l: "YAKUNLANGAN",     v: "471", s: "Kameral 156 • Sayyor 156", filter: "Yakunlangan" },
];

const COLUMNS = [
  "T/r", "STIR", "Nomi", "Manzili", "Faoliyat hududi", "Asosiy faoliyat turi",
  "Maqomi", "Audit shakli", "Taqsimlangan xodim", "Taqsimlangan vaqt", "Qolgan muddat",
];

// Maqom mosligini tekshiradi. "Yakunlangan" — ham Ijobiy ham Salbiy yakunlangani.
const matchesStatus = (status, f) => {
  if (!f) return true;
  if (f === "Yakunlangan") return /yakunlangan/i.test(status);
  return status === f;
};

export const CandidatesPage = ({ setRoute, filter, setFilter }) => {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [period, setPeriod] = useState("Barchasi");
  const pp = 15;

  // Filter o'zgarsa, sahifani 1-ga qaytarish.
  useEffect(() => { setPage(1); }, [filter]);

  const filtered = CANDIDATES.filter(c =>
    matchesStatus(c.status, filter) &&
    (c.name.toLowerCase().includes(q.toLowerCase()) || c.stir.includes(q))
  );
  const paged = filtered.slice((page - 1) * pp, page * pp);

  return (
    <div style={{
      padding: 20, display: "flex", flexDirection: "column",
      gap: 14, minHeight: "100%", boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", gap: 12 }}>
        {KPI_CARDS.map(c => {
          const on = filter === c.filter;
          return (
            <button key={c.l}
              onClick={() => setFilter(c.filter)}
              style={{
                background: C.card,
                border: `1px solid ${on ? C.primary : C.border}`,
                borderRadius: 8, padding: "14px 16px", flex: 1,
                cursor: "pointer", textAlign: "left",
                boxShadow: on ? `0 0 0 3px ${C.primary15}` : "none",
                transition: "border-color .15s, box-shadow .15s, transform .12s",
                position: "relative",
              }}
              onMouseEnter={e => {
                if (!on) e.currentTarget.style.borderColor = C.primary;
              }}
              onMouseLeave={e => {
                if (!on) e.currentTarget.style.borderColor = C.border;
              }}>
              <div style={{
                fontSize: 10.5, color: on ? C.primary : C.textMuted,
                fontWeight: 700, letterSpacing: 0.5, marginBottom: 4,
              }}>{c.l}</div>
              <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1, color: C.textPrimary }}>{c.v}</div>
              {c.s && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>{c.s}</div>}
            </button>
          );
        })}
      </div>

      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 8, padding: "10px 14px",
        display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap",
      }}>
        <PeriodBtns active={period} onChange={setPeriod} />
        <span style={{ fontSize: 11, color: C.textMuted }}>01.01.2025 — 22.11.2025</span>
        {filter && (
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "4px 6px 4px 12px", borderRadius: 16,
            background: C.primary15, color: C.primary,
            fontSize: 12, fontWeight: 600,
          }}>
            <span>Maqomi: {filter}</span>
            <button onClick={() => setFilter(null)} title="Filtrni olib tashlash"
              style={{
                width: 18, height: 18, borderRadius: "50%", border: "none",
                background: C.primary, color: "white", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
              <X size={11} strokeWidth={3} />
            </button>
          </div>
        )}
        <div style={{ flex: 1 }} />
        <div style={{
          display: "flex", alignItems: "center",
          border: `1px solid ${C.border}`, borderRadius: 6,
          padding: "5px 10px", gap: 6, background: C.bg,
        }}>
          <Search size={13} color={C.textMuted} />
          <input value={q} onChange={e => { setQ(e.target.value); setPage(1); }}
            placeholder="Qidiruv..."
            style={{ border: "none", outline: "none", fontSize: 12, width: 160, background: "transparent", color: C.textPrimary }} />
        </div>
        <button style={{
          display: "flex", alignItems: "center", gap: 5,
          padding: "5px 12px", border: `1px solid ${C.border}`,
          borderRadius: 6, background: C.card, color: C.textPrimary, cursor: "pointer", fontSize: 12,
        }}><Download size={13} />Export</button>
        <button style={{
          padding: "5px 8px", border: `1px solid ${C.border}`,
          borderRadius: 6, background: C.card, color: C.textPrimary, cursor: "pointer",
        }}><Settings size={14} /></button>
      </div>

      <Card style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflow: "auto" }}>
          <table style={{ ...tblWrap, height: "100%" }}>
            <thead>
              <tr>
                {COLUMNS.map((h, i, a) => (
                  <th key={h} style={i === a.length - 1 ? THl : TH()}>{h}</th>
                ))}
              </tr>
              <tr style={{ background: C.filterBg }}>
                {Array(11).fill(0).map((_, i) => (
                  <td key={i} style={{
                    padding: "4px 6px",
                    borderBottom: `1px solid ${C.border}`,
                    borderRight: `1px solid ${C.borderLight}`,
                  }}>
                    {i > 0 && i < 6 && (
                      <input placeholder="Mezon" style={{
                        width: "100%", border: `1px solid ${C.border}`,
                        borderRadius: 4, padding: "2px 5px",
                        fontSize: 10.5, outline: "none",
                        color: C.textPrimary, background: C.card,
                      }} />
                    )}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((c, i) => (
                <tr key={c.id} onClick={() => setRoute(`/nomzodlar/${c.stir}`)}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.rowHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td style={TD({ color: C.textMuted })}>{(page - 1) * pp + i + 1}</td>
                  <td style={TD({ color: C.primary, fontWeight: 700 })}>{c.stir}</td>
                  <td style={TD({ maxWidth: 170, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" })}>{c.name}</td>
                  <td style={TD({ maxWidth: 150, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" })}>{c.address}</td>
                  <td style={TD()}>{c.region}</td>
                  <td style={TD({ maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" })}>{c.activity}</td>
                  <td style={TD()}><Badge s={c.status} /></td>
                  <td style={TD()}>{c.shape}</td>
                  <td style={TD({ whiteSpace: "nowrap" })}>{c.employee}</td>
                  <td style={TD({ whiteSpace: "nowrap", fontSize: 11, color: C.textMuted })}>{c.assignedDate}</td>
                  <td style={TDl({ fontSize: 12, color: c.daysLeft ? C.danger : C.textLight })}>
                    {c.daysLeft || "—"}
                  </td>
                </tr>
              ))}
              <FillerRows count={pp - paged.length} cols={11} />
            </tbody>
          </table>
        </div>
        <div style={{
          padding: "12px 16px", borderTop: `1px solid ${C.border}`,
          display: "flex", justifyContent: "center", flexShrink: 0,
        }}>
          <Pager total={filtered.length} page={page} pp={pp} onChange={setPage} />
        </div>
      </Card>
    </div>
  );
};
