import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

// Customizable palettes: an accent plus one color per answer slot.
export const PALETTES = {
  grape: { label: "Grape", accent: "#7c3aed", answers: ["#ef476f", "#ffa62b", "#06b6a4", "#4361ee"] },
  ocean: { label: "Ocean", accent: "#0284c7", answers: ["#0ea5e9", "#14b8a6", "#6366f1", "#f59e0b"] },
  sunset: { label: "Sunset", accent: "#e8590c", answers: ["#f03e3e", "#f59f00", "#d6336c", "#7048e8"] },
  mint: { label: "Mint", accent: "#0d9488", answers: ["#12b886", "#40c057", "#3bc9db", "#fab005"] },
};

const light = {
  bg: "#f6f3ff",
  surface: "#ffffff",
  text: "#1c1e26",
  muted: "#666b7a",
  good: "#1a8f4c",
  goodBg: "#dff7e8",
  bad: "#c62e2e",
  badBg: "#fde3e3",
  border: "#e1dff0",
};

const dark = {
  bg: "#14151b",
  surface: "#1f2129",
  text: "#eceef5",
  muted: "#9aa0b2",
  good: "#5fd18b",
  goodBg: "#17382a",
  bad: "#ff7b7b",
  badBg: "#402020",
  border: "#353844",
};

export const ThemeContext = createContext("grape");

export function useTheme() {
  const palette = PALETTES[useContext(ThemeContext)];
  const base = useColorScheme() === "dark" ? dark : light;
  return { ...base, accent: palette.accent, answers: palette.answers };
}
