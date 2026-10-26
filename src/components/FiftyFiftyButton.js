import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../theme";

// One-use lifeline. Greyed out once used (or while the question is already answered).
export default function FiftyFiftyButton({ used, disabled, onPress }) {
  const t = useTheme();
  const off = used || disabled;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={used ? "50/50 already used" : "Use 50/50: remove two wrong answers"}
      accessibilityState={{ disabled: off }}
      disabled={off}
      onPress={onPress}
      style={[
        styles.pill,
        { borderColor: t.accent, backgroundColor: used ? "transparent" : t.accent, opacity: off ? 0.4 : 1 },
      ]}
    >
      <Text style={[styles.text, { color: used ? t.muted : "#fff" }]}>50/50</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: { borderWidth: 2, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 14 },
  text: { fontWeight: "900", fontSize: 14 },
});
