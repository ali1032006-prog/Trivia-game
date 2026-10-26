import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

// A -/+ control for a number between min and max.
export default function Stepper({ value, min, max, step = 1, unit = "", disabled = false, onChange }) {
  const t = useTheme();
  const clamp = (n) => Math.min(max, Math.max(min, n));

  const Button = ({ label, delta }) => {
    const off = disabled || clamp(value + delta) === value;
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={delta > 0 ? "Increase" : "Decrease"}
        disabled={off}
        onPress={() => onChange(clamp(value + delta))}
        style={[styles.btn, { backgroundColor: t.accent, opacity: off ? 0.35 : 1 }]}
      >
        <Text style={styles.btnText}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.row}>
      <Button label="−" delta={-step} />
      <Text style={[styles.value, { color: t.text, opacity: disabled ? 0.4 : 1 }]}>
        {value}
        {unit}
      </Text>
      <Button label="+" delta={step} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  btn: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  btnText: { color: "#fff", fontSize: 28, fontWeight: "700", lineHeight: 32 },
  value: { fontSize: 32, fontWeight: "900" },
});
