import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../theme";

// state: "idle" | "correct" | "wrong" | "reveal" (the right answer after a wrong tap)
export default function AnswerButton({ label, state = "idle", disabled = false, onPress }) {
  const t = useTheme();
  const colors = {
    idle: { borderColor: t.border, backgroundColor: t.surface },
    correct: { borderColor: t.good, backgroundColor: t.goodBg },
    reveal: { borderColor: t.good, backgroundColor: t.goodBg, borderStyle: "dashed" },
    wrong: { borderColor: t.bad, backgroundColor: t.badBg },
  }[state];
  const mark = state === "wrong" ? "✗" : state === "idle" ? "" : "✓";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, colors, pressed && { opacity: 0.7 }]}
    >
      <Text style={[styles.label, { color: t.text }]}>{label}</Text>
      <Text style={[styles.mark, { color: t.text }]}>{mark}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 52,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  label: { fontSize: 16, flexShrink: 1 },
  mark: { fontSize: 18, fontWeight: "700" },
});
