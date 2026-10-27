import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

// Toggle button for one category: picture on top, short name below.
// Tile widths leave room for the 8px gaps between columns.
const WIDTHS = { 3: "31%", 4: "23%", 5: "18.4%" };

export default function CategoryTile({ emoji, label, selected, columns = 3, onPress }) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        {
          width: WIDTHS[columns],
          borderColor: selected ? t.accent : t.border,
          backgroundColor: selected ? `${t.accent}22` : t.surface,
        },
        pressed && { transform: [{ scale: 0.96 }] },
      ]}
    >
      {selected && (
        <View style={[styles.check, { backgroundColor: t.accent }]}>
          <Text style={styles.checkText}>✓</Text>
        </View>
      )}
      <Text style={styles.emoji}>{emoji}</Text>
      <Text numberOfLines={2} style={[styles.label, { color: t.text, fontWeight: selected ? "800" : "600" }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    minHeight: 96,
    borderWidth: 2,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  emoji: { fontSize: 30 },
  label: { fontSize: 13, textAlign: "center" },
  check: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: { color: "#fff", fontSize: 12, fontWeight: "900" },
});
