import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Palette, Check } from "lucide-react";
import { C } from "../theme/colors";
import { useTheme, PRESETS, FONTS } from "../theme/ThemeContext";

export const ThemeSwitcher = () => {
  const { mode, preset, font, toggle, setPreset, setFont } = useTheme();
  const [open, setOpen] = useState(false);
  const popRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (popRef.current && !popRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const presetEntries = Object.entries(PRESETS);
  const fontEntries   = Object.entries(FONTS);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <button onClick={toggle} title={mode === "dark" ? "Kun rejimi" : "Tun rejimi"}
        style={{
          width: 34, height: 34, borderRadius: 8,
          border: `1px solid ${C.border}`, background: C.card,
          cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center",
          color: C.textPrimary,
        }}>
        {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <div style={{ position: "relative" }} ref={popRef}>
        <button onClick={() => setOpen(o => !o)} title="Mavzu sozlash"
          style={{
            width: 34, height: 34, borderRadius: 8,
            border: `1px solid ${C.border}`, background: C.card,
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            color: C.textPrimary,
          }}>
          <Palette size={16} />
        </button>

        {open && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 12, padding: 14, width: 300,
            boxShadow: `0 12px 32px ${C.shadowStrong}`, zIndex: 200,
          }}>
            {/* ─── Rang shabloni ──────────────────────────────── */}
            <div style={{
              fontSize: 12, fontWeight: 700, color: C.textMuted,
              marginBottom: 8, letterSpacing: 0.4, textTransform: "uppercase",
            }}>
              Rang shabloni
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8,
              marginBottom: 16,
            }}>
              {presetEntries.map(([key, p]) => {
                const on = preset === key;
                return (
                  <button key={key} onClick={() => setPreset(key)}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "8px 10px",
                      border: `2px solid ${on ? p.color : C.border}`,
                      borderRadius: 10, cursor: "pointer",
                      background: on ? `${p.color}12` : C.card,
                      transition: "border-color .15s, background .15s",
                      textAlign: "left", position: "relative",
                    }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: 7,
                      background: `linear-gradient(135deg, ${p.color}, ${p.vars["--c-sidebar"]})`,
                      flexShrink: 0,
                      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.25)`,
                    }} />
                    <span style={{
                      fontSize: 12, fontWeight: on ? 700 : 500,
                      color: C.textPrimary, flex: 1, minWidth: 0,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>{p.name}</span>
                    {on && <Check size={13} color={p.color} strokeWidth={3} />}
                  </button>
                );
              })}
            </div>

            {/* ─── Shrift ─────────────────────────────────────── */}
            <div style={{
              fontSize: 12, fontWeight: 700, color: C.textMuted,
              marginBottom: 8, letterSpacing: 0.4, textTransform: "uppercase",
            }}>
              Shrift
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8,
            }}>
              {fontEntries.map(([key, f]) => {
                const on = font === key;
                return (
                  <button key={key} onClick={() => setFont(key)}
                    style={{
                      padding: "10px 10px",
                      border: `2px solid ${on ? C.primary : C.border}`,
                      borderRadius: 10, cursor: "pointer",
                      background: on ? C.primary15 : C.card,
                      transition: "all .15s",
                      fontFamily: f.family,
                      fontSize: 13, fontWeight: on ? 700 : 500,
                      color: on ? C.primary : C.textPrimary,
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      gap: 6,
                    }}>
                    <span style={{
                      flex: 1, minWidth: 0, textAlign: "left",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>{f.name}</span>
                    {on && <Check size={13} color={C.primary} strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
