import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

// Segmented control: exactly one option is selected.
export default function DifficultyPicker({ options, value, onChange }) {
  const t = useTheme();
  return (
    <View style={[styles.row, { borderColor: t.accent }]}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <Pressable
            key={o.id}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.id)}
            style={[styles.item, { backgroundColor: on ? t.accent : "transparent" }]}
          >
            <Text style={[styles.text, { color: on ? "#fff" : t.text }]}>{o.name}</Text>
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
