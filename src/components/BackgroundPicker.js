import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BACKGROUNDS, useTheme } from "../theme";

// Tiles previewing each animated background; tap to choose one.
export default function BackgroundPicker({ value, onChange }) {
  const t = useTheme();
  return (
    <View style={styles.grid}>
      {Object.entries(BACKGROUNDS).map(([id, b]) => {
        const on = id === value;
        return (
          <Pressable
            key={id}
            accessibilityRole="button"
            accessibilityLabel={`${b.label} background`}
            accessibilityState={{ selected: on }}
            onPress={() => onChange(id)}
            style={styles.item}
          >
            <LinearGradient
              colors={b.gradient}
              style={[styles.tile, { borderColor: on ? t.accent : "transparent" }]}
            >
              <Text style={[styles.glyph, { color: b.tone === "dark" ? "#fff" : "#0006" }]}>
                {{ rise: "●", twinkle: "✦", bubble: "○", fall: "▮" }[b.kind]}
              </Text>
            </LinearGradient>
            <Text style={[styles.label, { color: t.text, fontWeight: on ? "800" : "500" }]}>{b.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  item: { flex: 1, alignItems: "center", gap: 6 },
  tile: {
    width: "100%",
    height: 64,
    borderRadius: 14,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  glyph: { fontSize: 22 },
  label: { fontSize: 12 },
});
