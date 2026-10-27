import { createContext, useContext } from "react";

// Customizable palettes: an accent plus one color per answer slot.
export const PALETTES = {
  grape: { label: "Grape", accent: "#7c3aed", answers: ["#ef476f", "#ffa62b", "#06b6a4", "#4361ee"] },
  ocean: { label: "Ocean", accent: "#0284c7", answers: ["#0ea5e9", "#14b8a6", "#6366f1", "#f59e0b"] },
  sunset: { label: "Sunset", accent: "#e8590c", answers: ["#f03e3e", "#f59f00", "#d6336c", "#7048e8"] },
  mint: { label: "Mint", accent: "#0d9488", answers: ["#12b886", "#40c057", "#3bc9db", "#fab005"] },
};

// Animated backdrops. `tone` decides whether text/cards use the light or dark neutrals.
// `kind` is the animation: rise | bubble | fall | twinkle. `particle: null` uses the answer colors.
export const BACKGROUNDS = {
  sunrise: {
    label: "Sunrise",
    tone: "light",
    gradient: ["#ffe3ec", "#ffd1a9", "#fff3b0"],
    kind: "rise",
    particle: "#ffffff",
  },
  night: {
    label: "Night Sky",
    tone: "dark",
    gradient: ["#0f1030", "#2a1a5e", "#4b2a7b"],
    kind: "twinkle",
    particle: "#ffffff",
  },
  ocean: {
    label: "Ocean",
    tone: "light",
    gradient: ["#c9f0ff", "#8fd3f4", "#5fb5e8"],
    kind: "bubble",
    particle: "#ffffff",
  },
  confetti: {
    label: "Confetti",
    tone: "light",
    gradient: ["#f6f3ff", "#fdf2ff", "#eef7ff"],
    kind: "fall",
    particle: null,
  },
};

const light = {
  text: "#1c1e26",
  surface: "#ffffff",
  muted: "#666b7a",
  good: "#1a8f4c",
  goodBg: "#dff7e8",
  bad: "#c62e2e",
  badBg: "#fde3e3",
  border: "#e1dff0",
};

const dark = {
  text: "#eceef5",
  surface: "#1f2129",
  muted: "#9aa0b2",
  good: "#5fd18b",
  goodBg: "#17382a",
  bad: "#ff7b7b",
  badBg: "#402020",
  border: "#353844",
};

export const ThemeContext = createContext({ palette: "grape", background: "sunrise" });

export function useTheme() {
  const { palette, background } = useContext(ThemeContext);
  const p = PALETTES[palette];
  const bg = BACKGROUNDS[background];
  const base = bg.tone === "dark" ? dark : light;
  return { ...base, accent: p.accent, answers: p.answers, background: bg };
}
