import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

// Segmented multi-select: tap to toggle each difficulty; at least one stays on.
export default function DifficultyPicker({ options, selected, onChange }) {
  const t = useTheme();

  const toggle = (id) => {
    if (selected.includes(id)) {
      if (selected.length > 1) onChange(selected.filter((s) => s !== id));
    } else {
      onChange(options.map((o) => o.id).filter((o) => o === id || selected.includes(o)));
    }
  };

  return (
    <View style={[styles.row, { borderColor: t.accent }]}>
      {options.map((o, i) => {
        const on = selected.includes(o.id);
        return (
          <Pressable
            key={o.id}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: on }}
            onPress={() => toggle(o.id)}
            style={[
              styles.item,
              i > 0 && { borderLeftWidth: 2, borderLeftColor: t.accent },
              { backgroundColor: on ? t.accent : "transparent" },
            ]}
          >
            <Text style={[styles.text, { color: on ? "#fff" : t.text }]}>
              {on ? "✓ " : ""}
              {o.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", borderWidth: 2, borderRadius: 14, overflow: "hidden" },
  item: { flex: 1, minHeight: 48, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 16, fontWeight: "800" },
});
