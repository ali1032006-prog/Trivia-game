import { useColorScheme } from "react-native";

const light = {
  bg: "#f4f5f9",
  surface: "#ffffff",
  text: "#1c1e26",
  muted: "#666b7a",
  accent: "#4f46e5",
  good: "#1a8f4c",
  goodBg: "#e3f6ea",
  bad: "#c62e2e",
  badBg: "#fbe5e5",
  border: "#d9dce6",
};

const dark = {
  bg: "#14151b",
  surface: "#1f2129",
  text: "#eceef5",
  muted: "#9aa0b2",
  accent: "#8b85ff",
  good: "#5fd18b",
  goodBg: "#17382a",
  bad: "#ff7b7b",
  badBg: "#402020",
  border: "#353844",
};

export function useTheme() {
  return useColorScheme() === "dark" ? dark : light;
}
