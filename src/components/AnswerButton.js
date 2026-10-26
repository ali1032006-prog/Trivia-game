import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

// state: "idle" | "correct" | "wrong" | "reveal" (the right answer after a wrong tap or timeout)
// slot: 0-3, picks this button's color from the palette
export default function AnswerButton({ label, slot = 0, state = "idle", disabled = false, onPress }) {
  const t = useTheme();
  const tint = t.answers[slot % t.answers.length];
  const colors = {
    idle: { borderColor: tint, backgroundColor: t.surface },
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
      style={({ pressed }) => [styles.button, colors, pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] }]}
    >
      <View style={[styles.dot, { backgroundColor: state === "idle" ? tint : "transparent" }]} />
      <Text style={[styles.label, { color: t.text }]}>{label}</Text>
      <Text style={[styles.mark, { color: t.text }]}>{mark}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 56,
    paddingHorizontal: 14,
    borderWidth: 3,
    borderRadius: 16,
    gap: 12,
  },
  dot: { width: 14, height: 14, borderRadius: 7 },
  label: { flex: 1, fontSize: 17, fontWeight: "600" },
  mark: { fontSize: 20, fontWeight: "800" },
});
