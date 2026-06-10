import { useState } from "react";
import {
  Inbox, MessageSquare, FileText, ShieldCheck, Settings,
  CheckCheck, Bell,
} from "lucide-react";
import { C } from "../theme/colors";
import { NOTIFICATIONS } from "../data/mockData";

const ICONS = {
  request:    { icon: Inbox,         color: "#2563EB" },
  message:    { icon: MessageSquare, color: "#7C3AED" },
  document:   { icon: FileText,      color: "#EF4444" },
  inspection: { icon: ShieldCheck,   color: "#10B981" },
  system:     { icon: Settings,      color: "#64748B" },
};

export const BildirishnomalarPage = () => {
  const [list, setList] = useState(NOTIFICATIONS);
  const unreadCount = list.filter(n => n.unread).length;

  const markAll = () => setList(list.map(n => ({ ...n, unread: false })));

  return (
    <div style={{ padding: 32, maxWidth: 800, margin: "0 auto" }}>
      {unreadCount > 0 && (
        <div style={{
          marginBottom: 18,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontSize: 14, color: C.textMuted }}>
            <strong style={{ color: C.textPrimary }}>{unreadCount}</strong> ta yangi
          </div>
          <button onClick={markAll}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: C.primary, fontSize: 13, fontWeight: 600,
              display: "flex", alignItems: "center", gap: 6,
            }}>
            <CheckCheck size={15} /> Hammasini o'qildi
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {list.length === 0 && (
          <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 14, padding: 50, textAlign: "center",
          }}>
            <Bell size={36} color={C.textLight} style={{ marginBottom: 10 }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary }}>
              Bildirishnoma yo'q
            </div>
          </div>
        )}

        {list.map(n => {
          const m = ICONS[n.type] || ICONS.system;
          const Icon = m.icon;
          return (
            <div key={n.id} style={{
              background: n.unread ? m.color + "0E" : C.card,
              border: `1px solid ${n.unread ? m.color + "30" : C.border}`,
              borderRadius: 12, padding: "14px 16px",
              display: "flex", gap: 12, alignItems: "flex-start",
              cursor: "pointer",
              transition: "transform .15s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateX(3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: m.color + "18",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={18} color={m.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "baseline", marginBottom: 3, gap: 8,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>
                    {n.title}
                  </div>
                  <div style={{ fontSize: 11.5, color: C.textLight, flexShrink: 0 }}>
                    {n.time}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.4 }}>
                  {n.desc}
                </div>
              </div>
              {n.unread && (
                <div style={{
                  width: 9, height: 9, borderRadius: "50%",
                  background: m.color, marginTop: 6, flexShrink: 0,
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
