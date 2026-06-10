import { createContext, useContext, useEffect, useState, useCallback } from "react";

export const PRESETS = {
  blue: {
    name: "Royal Blue",
    color: "#2563EB",
    vars: {
      "--c-sidebar":      "#1E3A8A",
      "--c-primary":      "#2563EB",
      "--c-primary-soft": "#DBEAFE",
      "--c-primary-15":   "rgba(37, 99, 235, 0.14)",
      "--c-tint-primary": "rgba(37, 99, 235, 0.22)",
      "--c-tabActive":    "#DBEAFE",
      "--c-tabActiveTxt": "#1D4ED8",
    },
  },
  teal: {
    name: "Teal",
    color: "#0F766E",
    vars: {
      "--c-sidebar":      "#0F4E47",
      "--c-primary":      "#0F766E",
      "--c-primary-soft": "#D1FAE5",
      "--c-primary-15":   "rgba(15, 118, 110, 0.14)",
      "--c-tint-primary": "rgba(15, 118, 110, 0.22)",
      "--c-tabActive":    "#CCFBF1",
      "--c-tabActiveTxt": "#0F766E",
    },
  },
  forest: {
    name: "Forest",
    color: "#15803D",
    vars: {
      "--c-sidebar":      "#14532D",
      "--c-primary":      "#15803D",
      "--c-primary-soft": "#DCFCE7",
      "--c-primary-15":   "rgba(21, 128, 61, 0.14)",
      "--c-tint-primary": "rgba(21, 128, 61, 0.22)",
      "--c-tabActive":    "#D1FAE5",
      "--c-tabActiveTxt": "#065F46",
    },
  },
  indigo: {
    name: "Indigo",
    color: "#4F46E5",
    vars: {
      "--c-sidebar":      "#312E81",
      "--c-primary":      "#4F46E5",
      "--c-primary-soft": "#E0E7FF",
      "--c-primary-15":   "rgba(79, 70, 229, 0.14)",
      "--c-tint-primary": "rgba(79, 70, 229, 0.22)",
      "--c-tabActive":    "#E0E7FF",
      "--c-tabActiveTxt": "#4338CA",
    },
  },
};

export const FONTS = {
  inter:    { name: "Inter",       family: "'Inter', system-ui, sans-serif" },
  manrope:  { name: "Manrope",     family: "'Manrope', system-ui, sans-serif" },
  roboto:   { name: "Roboto",      family: "'Roboto', system-ui, sans-serif" },
  serif:    { name: "Merriweather",family: "'Merriweather', Georgia, serif" },
};

const STORAGE = "portal-theme-v1";
const ThemeCtx = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) {
        const p = JSON.parse(raw);
        return {
          mode:   p.mode   || "light",
          preset: p.preset || "blue",
          font:   p.font   || "inter",
        };
      }
    } catch {}
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return {
      mode:   prefersDark ? "dark" : "light",
      preset: "blue",
      font:   "inter",
    };
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", state.mode);

    const preset = PRESETS[state.preset];
    if (preset) {
      Object.entries(preset.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    }

    const font = FONTS[state.font];
    if (font) root.style.setProperty("--c-font", font.family);

    try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch {}
  }, [state]);

  const toggle    = useCallback(() => setState(s => ({ ...s, mode: s.mode === "dark" ? "light" : "dark" })), []);
  const setMode   = useCallback(mode   => setState(s => ({ ...s, mode })),   []);
  const setPreset = useCallback(preset => setState(s => ({ ...s, preset })), []);
  const setFont   = useCallback(font   => setState(s => ({ ...s, font })),   []);

  return (
    <ThemeCtx.Provider value={{
      mode: state.mode, preset: state.preset, font: state.font,
      toggle, setMode, setPreset, setFont,
    }}>
      {children}
    </ThemeCtx.Provider>
  );
};

export const useTheme = () => {
  const v = useContext(ThemeCtx);
  if (!v) throw new Error("useTheme must be used inside ThemeProvider");
  return v;
};
