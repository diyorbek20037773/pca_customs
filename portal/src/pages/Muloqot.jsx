import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { C } from "../theme/colors";
import { MESSAGES } from "../data/mockData";

export const MuloqotPage = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([...MESSAGES].reverse());
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [list]);

  const send = () => {
    if (!text.trim()) return;
    setList([...list, {
      id: Date.now(),
      from: "Siz", role: "",
      time: "Hozir",
      text: text.trim(),
      own: true, unread: false,
    }]);
    setText("");
  };

  return (
    <div style={{
      padding: 24, maxWidth: 900, margin: "0 auto",
      height: "calc(100vh - 64px)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Auditor */}
      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 14, padding: 14, marginBottom: 14,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`,
          color: "white", fontSize: 14, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
        }}>
          AN
          <span style={{
            position: "absolute", bottom: 0, right: 0,
            width: 12, height: 12, borderRadius: "50%",
            background: C.success,
            border: `2px solid ${C.card}`,
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: C.textPrimary }}>
            Abdullayeva Nargiza
          </div>
          <div style={{ fontSize: 12.5, color: C.success }}>
            Onlayn
          </div>
        </div>
      </div>

      {/* Chat */}
      <div style={{
        flex: 1, background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        <div style={{
          flex: 1, overflowY: "auto", padding: 20,
          display: "flex", flexDirection: "column", gap: 14,
        }}>
          {list.map(m => <Bubble key={m.id} m={m} />)}
          <div ref={endRef} />
        </div>

        <div style={{
          padding: 14, borderTop: `1px solid ${C.borderLight}`,
          display: "flex", gap: 8, alignItems: "flex-end",
        }}>
          <button title="Fayl biriktirish"
            style={{
              width: 42, height: 42, borderRadius: 10,
              border: "none", background: C.cardAlt,
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
            <Paperclip size={18} color={C.textMuted} />
          </button>
          <textarea value={text} onChange={e => setText(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Xabar yozing..."
            rows={1}
            style={{
              flex: 1, border: `1px solid ${C.border}`,
              borderRadius: 10, padding: "11px 14px",
              fontSize: 14, outline: "none",
              resize: "none", maxHeight: 120,
              background: C.card,
            }} />
          <button onClick={send}
            style={{
              width: 42, height: 42, borderRadius: 10,
              border: "none", background: C.primary,
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
              color: "white",
            }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Bubble = ({ m }) => {
  if (m.system) {
    return (
      <div style={{ textAlign: "center", margin: "4px 0" }}>
        <span style={{
          background: C.cardAlt, color: C.textMuted,
          padding: "6px 14px", borderRadius: 20,
          fontSize: 11.5, fontWeight: 500,
        }}>
          {m.text}
        </span>
      </div>
    );
  }
  const own = m.own;
  return (
    <div style={{
      display: "flex",
      flexDirection: own ? "row-reverse" : "row",
      alignItems: "flex-end", gap: 8,
    }}>
      <div style={{ maxWidth: "75%" }}>
        <div style={{
          background: own ? C.primary : C.cardAlt,
          color: own ? "white" : C.textPrimary,
          padding: "11px 16px",
          borderRadius: 16,
          borderBottomRightRadius: own ? 4 : 16,
          borderBottomLeftRadius: own ? 16 : 4,
          fontSize: 14, lineHeight: 1.5,
        }}>
          {m.text}
        </div>
        <div style={{
          fontSize: 11, color: C.textLight,
          marginTop: 4, textAlign: own ? "right" : "left",
          paddingLeft: 6, paddingRight: 6,
        }}>{m.time}</div>
      </div>
    </div>
  );
};
