import { useState } from "react";
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TrendingUp, CheckCircle, AlertCircle, Info,
  Target, Hourglass, RefreshCw, CheckCheck,
} from "lucide-react";

import { C, TINT } from "../theme/colors";
import { tblWrap, TH, THl, TD, TDl } from "../styles/table";
import { LINE_DATA, PIE_DATA, PIE_MAQSAD, REGS } from "../data/charts";

import { Card } from "../components/Card";
import { KPI } from "../components/KPI";
import { UzMap } from "../components/UzMap";
import { PeriodBtns } from "../components/PeriodBtns";

// ──────────────────────────────────────────────────────────
// Yagona "donut + label" pie chart komponenti — Dashboard'da
// 2 ta sektsiya uchun bir xil ko'rinish.
// ──────────────────────────────────────────────────────────
const DonutCard = ({ title, data, idKey }) => (
  <Card style={{
    display: "flex", flexDirection: "column",
    border: `1px solid ${C.borderLight}`, borderRadius: 14,
    boxShadow: `0 1px 3px ${C.shadow}`,
  }}>
    <div style={{ padding: "10px 14px 0" }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: C.primary, letterSpacing: 0.1 }}>
        {title}
      </div>
    </div>
    <div style={{ flex: 1, minHeight: 0 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 14, right: 22, bottom: 4, left: 22 }}>
          <defs>
            {data.map((e, i) => (
              <radialGradient key={i} id={`pg-${idKey}-${i}`} cx="40%" cy="30%" r="85%">
                <stop offset="0%"   stopColor={e.colorLight} stopOpacity={0.92} />
                <stop offset="45%"  stopColor={e.color} />
                <stop offset="100%" stopColor={e.colorDark} />
              </radialGradient>
            ))}
            <filter id={`sh-${idKey}`} x="-30%" y="-20%" width="160%" height="150%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
              <feOffset dx="0" dy="3" result="off" />
              <feComponentTransfer><feFuncA type="linear" slope=".18" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <Pie
            data={data} cx="50%" cy="52%"
            outerRadius="74%" innerRadius="38%"
            dataKey="value"
            paddingAngle={1.5}
            cornerRadius={4}
            startAngle={90} endAngle={-270}
            labelLine={{ stroke: C.textLight, strokeWidth: 1, strokeDasharray: "2 3" }}
            label={({ cx, cy, midAngle, outerRadius, value, index }) => {
              const RAD = Math.PI / 180;
              const r = outerRadius + 16;
              const x = cx + r * Math.cos(-midAngle * RAD);
              const y = cy + r * Math.sin(-midAngle * RAD);
              return (
                <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
                  fontSize={11} fontWeight={700} fill={data[index].color}
                  letterSpacing={0.2}>
                  {value}%
                </text>
              );
            }}
            filter={`url(#sh-${idKey})`}>
            {data.map((_, i) => (
              <Cell key={i} fill={`url(#pg-${idKey}-${i})`} stroke={C.card} strokeWidth={3} />
            ))}
          </Pie>
          <Tooltip contentStyle={{
            fontSize: 12, borderRadius: 8, border: `1px solid ${C.border}`,
            background: C.card, color: C.textPrimary, padding: "6px 10px",
          }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div style={{
      borderTop: `1px solid ${C.borderLight}`,
      padding: "8px 12px 10px", flexShrink: 0,
      display: "grid", gridTemplateColumns: "1fr 1fr",
      columnGap: 14, rowGap: 4,
    }}>
      {data.map(d => (
        <div key={d.name} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: 11, gap: 6, minWidth: 0,
        }}>
          <span style={{
            display: "flex", alignItems: "center", gap: 6, color: C.textPrimary,
            minWidth: 0, overflow: "hidden",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: d.color, display: "inline-block", flexShrink: 0,
            }} />
            <span style={{
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{d.name}</span>
          </span>
          <b style={{ color: C.textPrimary, fontWeight: 700, flexShrink: 0 }}>{d.value}%</b>
        </div>
      ))}
    </div>
  </Card>
);

export const DashboardPage = ({ goCandidates }) => {
  const [hov, setHov] = useState(null);
  const [mapPeriod, setMapPeriod] = useState("Barchasi");
  const hovReg = REGS.find(r => r.id === hov);

  return (
    <div style={{
      padding: 12, display: "flex", flexDirection: "column", gap: 12,
      height: "100%", boxSizing: "border-box",
    }}>
      {/* Row 1 — KPI cardlar */}
      <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
        <KPI label="Jami aniqlangan summa" value="160,2 mlrd sum"
          icon={TrendingUp}  color={C.primary} tint={TINT.primary} />
        <KPI label="Undirilgan"            value="80,3 mlrd sum"  sub="52% undirilgan"
          icon={CheckCircle} color={C.success} tint={TINT.success} pct={52} />
        <KPI label="Nazoratda"             value="44,2 mlrd sum"  sub="28%"
          icon={AlertCircle} color={C.warning} tint={TINT.warning} pct={28} />
        <KPI label="Bartaraf etilgan"      value="35,7 mlrd sum"  sub="20%"
          icon={Info}        color={C.danger}  tint={TINT.danger}  pct={20} />
      </div>

      {/* Row 2 — Line chart + 2 ta pie */}
      <div style={{
        display: "grid", gridTemplateColumns: "minmax(0,1.7fr) minmax(0,1fr) minmax(0,1fr)",
        gap: 12, flex: 1, minHeight: 0,
      }}>
        <Card style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            padding: "10px 14px 0",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 8,
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary }}>O'tkazilgan bojxona auditlari soni</span>
            <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.textMuted }}>
              <span>Jami - 1 650</span>
              <span style={{ color: "#0F766E" }}>● Ijobiy - 750</span>
              <span style={{ color: "#475569" }}>● Salbiy - 850</span>
            </div>
          </div>
          <div style={{ flex: 1, padding: "0 6px 6px", minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LINE_DATA} margin={{ top: 8, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, border: `1px solid ${C.border}` }} />
                <Line type="monotone" dataKey="ijobiy" stroke="#0F766E" strokeWidth={2.2} dot={{ r: 3, fill: "#0F766E" }} name="Ijobiy" />
                <Line type="monotone" dataKey="salbiy" stroke="#475569" strokeWidth={2.2} dot={{ r: 3, fill: "#475569" }} name="Salbiy" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <DonutCard title="Audit shakli bo'yicha"  data={PIE_DATA}    idKey="shakl"  />
        <DonutCard title="Audit maqsadi bo'yicha" data={PIE_MAQSAD} idKey="maqsad" />
      </div>

      {/* Row 3 — Xarita + Hududlar jadvali + Status */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr) 280px",
        gap: 12, flex: 1, minHeight: 0,
      }}>
        <Card style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            padding: "8px 12px", borderBottom: `1px solid ${C.border}`,
            display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap",
          }}>
            <PeriodBtns active={mapPeriod} onChange={setMapPeriod} />
            <span style={{ marginLeft: "auto", fontSize: 10.5, color: C.textMuted }}>
              01.01.2025 — 22.11.2025
            </span>
          </div>
          <div style={{
            flex: 1, padding: 6, minHeight: 0,
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            <div style={{ flex: 1, minHeight: 0 }}>
              <UzMap hov={hov} onHov={setHov} />
            </div>
            {hovReg && (
              <div style={{
                textAlign: "center", fontSize: 12, color: C.primary,
                fontWeight: 700, flexShrink: 0,
              }}>
                {hovReg.name}
              </div>
            )}
          </div>
        </Card>

        <Card style={{ overflow: "auto" }}>
          <table style={tblWrap}>
            <thead>
              <tr>
                <th style={TH()}>Hududlar</th>
                <th style={TH({ textAlign: "right" })}>Soni</th>
                <th style={TH({ textAlign: "right" })}>Ijobiy</th>
                <th style={TH({ textAlign: "right" })}>Salbiy</th>
                <th style={THl}>Summasi</th>
              </tr>
            </thead>
            <tbody>
              {REGS.map(r => {
                const on = hov === r.id;
                return (
                  <tr key={r.id}
                    onMouseEnter={() => setHov(r.id)}
                    onMouseLeave={() => setHov(null)}
                    style={{
                      background: on ? C.primary15 : "transparent",
                      cursor: "default",
                      transition: "background .15s",
                    }}>
                    <td style={TD({
                      fontSize: 11, fontWeight: on ? 700 : 400,
                      color: on ? C.primary : C.textPrimary,
                      borderLeft: on ? `3px solid ${C.primary}` : "3px solid transparent",
                      paddingLeft: on ? 7 : 10,
                    })}>{r.name}</td>
                    <td style={TD({ textAlign: "right" })}>{r.s}</td>
                    <td style={TD({ textAlign: "right", color: "#0F766E", fontWeight: 600 })}>{r.i}</td>
                    <td style={TD({ textAlign: "right", color: "#475569", fontWeight: 600 })}>{r.sa}</td>
                    <td style={TDl({ textAlign: "right", fontWeight: 600 })}>{r.sum}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <Card style={{
          boxShadow: `0 1px 3px ${C.shadow}`,
          border: `1px solid ${C.borderLight}`, borderRadius: 14,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.primary, letterSpacing: 0.1 }}>
              Audit maqomlari bo'yicha
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4, marginBottom: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: C.textPrimary, lineHeight: 1, letterSpacing: -0.5 }}>105</span>
              <span style={{ fontSize: 11.5, color: C.textMuted, fontWeight: 500 }}>Jami auditlar</span>
            </div>

            <div style={{
              display: "flex",
              height: 18, minHeight: 18, flexShrink: 0,
              borderRadius: 9, overflow: "hidden",
              marginBottom: 12, background: C.progressBg,
              boxShadow: `inset 0 1px 2px ${C.shadow}`,
              border: `1px solid ${C.borderLight}`,
            }}>
              {[
                { v: 8,  l: "Yangi",          c: "#5EEAD4", cL: "#A7F3D0" },
                { v: 50, l: "Tayyorgarlikda", c: "#14B8A6", cL: "#5EEAD4" },
                { v: 38, l: "Jarayonda",      c: "#0F766E", cL: "#14B8A6" },
                { v: 4,  l: "Yakunlangan",    c: "#134E4A", cL: "#0F766E" },
              ].map((s, i, a) => (
                <div key={i} title={`${s.l}: ${s.v}%`}
                  style={{
                    width: `${s.v}%`,
                    background: `linear-gradient(180deg, ${s.cL}, ${s.c})`,
                    borderRight: i < a.length - 1 ? `1.5px solid ${C.card}` : "none",
                    boxShadow: `inset 0 -1.5px 0 ${s.c}, inset 0 1px 0 rgba(255,255,255,0.35)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#FFFFFF", fontSize: 9.5, fontWeight: 800,
                    textShadow: "0 1px 1px rgba(0,0,0,0.4)",
                    overflow: "hidden", whiteSpace: "nowrap",
                  }}>
                  {s.v >= 30 ? `${s.v}%` : ""}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
              {[
                { l: "Yangi",          v: 24, pct: 8,  c: "#5EEAD4", cL: "#A7F3D0", icon: Target     },
                { l: "Tayyorgarlikda", v: 36, pct: 50, c: "#14B8A6", cL: "#5EEAD4", icon: Hourglass  },
                { l: "Jarayonda",      v: 28, pct: 38, c: "#0F766E", cL: "#14B8A6", icon: RefreshCw  },
                { l: "Yakunlangan",    v: 17, pct: 4,  c: "#134E4A", cL: "#0F766E", icon: CheckCheck },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <button key={s.l}
                    onClick={() => goCandidates(s.l)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 10px", borderRadius: 10,
                      background: `linear-gradient(90deg, ${s.c}10, transparent)`,
                      border: `1px solid ${s.c}26`,
                      cursor: "pointer", textAlign: "left", width: "100%",
                      transition: "transform .12s, box-shadow .12s, border-color .12s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateX(2px)";
                      e.currentTarget.style.boxShadow = `0 2px 8px ${s.c}33`;
                      e.currentTarget.style.borderColor = `${s.c}66`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = `${s.c}26`;
                    }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 9,
                      background: `linear-gradient(135deg, ${s.cL}, ${s.c})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: `0 2px 5px ${s.c}55, inset 0 1px 0 rgba(255,255,255,0.3)`,
                    }}>
                      <Icon size={15} color="white" strokeWidth={2.6} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 11.5, color: C.textMuted, fontWeight: 600, lineHeight: 1.1,
                      }}>{s.l}</div>
                      <div style={{
                        fontSize: 10.5, color: s.c, fontWeight: 700, marginTop: 2,
                      }}>{s.pct}%</div>
                    </div>
                    <div style={{
                      fontSize: 20, fontWeight: 800, color: C.textPrimary, lineHeight: 1,
                      flexShrink: 0,
                    }}>{s.v}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
