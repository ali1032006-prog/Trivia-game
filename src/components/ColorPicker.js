import { Pressable, StyleSheet, Text, View } from "react-native";
import { PALETTES, useTheme } from "../theme";

export default function ColorPicker({ value, onChange }) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      {Object.entries(PALETTES).map(([key, p]) => (
        <Pressable
          key={key}
          accessibilityRole="button"
          accessibilityLabel={`${p.label} theme`}
          accessibilityState={{ selected: key === value }}
          onPress={() => onChange(key)}
          style={styles.item}
        >
          <View
            style={[
              styles.swatch,
              { backgroundColor: p.accent, borderColor: key === value ? t.text : "transparent" },
            ]}
          />
          <Text style={[styles.label, { color: t.text, fontWeight: key === value ? "800" : "500" }]}>
            {p.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
  item: { alignItems: "center", gap: 6 },
  swatch: { width: 52, height: 52, borderRadius: 26, borderWidth: 4 },
  label: { fontSize: 13 },
});
