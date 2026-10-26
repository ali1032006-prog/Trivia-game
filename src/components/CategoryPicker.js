import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

// Drop-down multi-select. `selected` is a list of option ids; at least one stays selected.
export default function CategoryPicker({ options, selected, onChange }) {
  const t = useTheme();
  const [open, setOpen] = useState(false);

  const allSelected = selected.length === options.length;
  const summary = allSelected
    ? `All categories (${options.length})`
    : options.filter((o) => selected.includes(o.id)).map((o) => o.name).join(", ");

  const toggle = (id) => {
    if (selected.includes(id)) {
      if (selected.length > 1) onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen(!open)}
        style={[styles.trigger, { borderColor: t.accent, backgroundColor: t.surface }]}
      >
        <Text numberOfLines={1} style={[styles.summary, { color: t.text }]}>{summary}</Text>
        <Text style={[styles.arrow, { color: t.accent }]}>{open ? "▴" : "▾"}</Text>
      </Pressable>

      {open && (
        <View style={[styles.menu, { borderColor: t.border, backgroundColor: t.surface }]}>
          <Row label="Select all" checked={allSelected} onPress={() => onChange(options.map((o) => o.id))} />
          {options.map((o) => (
            <Row key={o.id} label={o.name} checked={selected.includes(o.id)} onPress={() => toggle(o.id)} />
          ))}
        </View>
      )}
    </View>
  );
}

function Row({ label, checked, onPress }) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onPress}
      style={styles.row}
    >
      <View style={[styles.box, { borderColor: t.accent, backgroundColor: checked ? t.accent : "transparent" }]}>
        {checked && <Text style={styles.tick}>✓</Text>}
      </View>
      <Text style={[styles.rowLabel, { color: t.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 52,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderRadius: 14,
    gap: 8,
  },
  summary: { flex: 1, fontSize: 16, fontWeight: "600" },
  arrow: { fontSize: 18, fontWeight: "800" },
  menu: { marginTop: 8, borderWidth: 1, borderRadius: 14, paddingVertical: 4 },
  row: { flexDirection: "row", alignItems: "center", minHeight: 48, paddingHorizontal: 14, gap: 12 },
  box: { width: 24, height: 24, borderRadius: 7, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  tick: { color: "#fff", fontWeight: "900", fontSize: 14, lineHeight: 16 },
  rowLabel: { fontSize: 16 },
});
