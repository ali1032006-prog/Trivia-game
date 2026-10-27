import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import CategoryTile from "./CategoryTile";

// Categories grouped by genre as toggle buttons. At least one stays selected.
export default function CategoryGrid({ genres, categories, selected, onChange }) {
  const t = useTheme();

  const update = (next) => {
    if (next.length > 0) onChange(next);
  };

  const toggle = (id) =>
    update(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);

  // Genre "All" pill: select the whole genre, or clear it if it's already all selected.
  const toggleGenre = (ids) => {
    const allOn = ids.every((id) => selected.includes(id));
    update(allOn ? selected.filter((s) => !ids.includes(s)) : [...new Set([...selected, ...ids])]);
  };

  const allSelected = selected.length === categories.length;

  return (
    <View>
      <View style={styles.topRow}>
        <Text style={[styles.count, { color: t.muted }]}>{selected.length} selected</Text>
        <Pill
          label={allSelected ? "All selected" : "Select all"}
          on={allSelected}
          onPress={() => onChange(categories.map((c) => c.id))}
        />
      </View>

      {genres.map((g) => {
        const items = categories.filter((c) => c.genre === g.id);
        const ids = items.map((c) => c.id);
        const allOn = ids.every((id) => selected.includes(id));
        return (
          <View key={g.id} style={styles.section}>
            <View style={styles.header}>
              <Text style={[styles.genre, { color: t.text }]}>{g.name}</Text>
              <Pill label="All" on={allOn} onPress={() => toggleGenre(ids)} />
            </View>
            <View style={styles.grid}>
              {items.map((c) => (
                <CategoryTile
                  key={c.id}
                  emoji={c.emoji}
                  label={c.short}
                  selected={selected.includes(c.id)}
                  onPress={() => toggle(c.id)}
                />
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

function Pill({ label, on, onPress }) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      onPress={onPress}
      style={[styles.pill, { borderColor: t.accent, backgroundColor: on ? t.accent : "transparent" }]}
    >
      <Text style={[styles.pillText, { color: on ? "#fff" : t.accent }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  count: { fontSize: 14, fontWeight: "700" },
  section: { marginTop: 18 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  genre: { fontSize: 18, fontWeight: "900" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  pill: { borderWidth: 2, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 14, minHeight: 36, justifyContent: "center" },
  pillText: { fontSize: 13, fontWeight: "800" },
});
