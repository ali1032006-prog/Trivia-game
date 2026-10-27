import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import AppearanceSheet from "./AppearanceSheet";
import CategoryGrid from "./CategoryGrid";
import PrimaryButton from "./PrimaryButton";

// Home page: pick the categories and the look, then continue to game settings.
export default function HomeScreen({ genres, categories, settings, onChange, onNext }) {
  const t = useTheme();
  const [appearanceOpen, setAppearanceOpen] = useState(false);

  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Appearance: color theme and background"
          onPress={() => setAppearanceOpen(true)}
          hitSlop={8}
          style={({ pressed }) => [
            styles.appearance,
            { borderColor: t.accent, backgroundColor: `${t.accent}1a` },
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.appearanceIcon}>🎨</Text>
          <Text style={[styles.appearanceText, { color: t.accent }]}>Appearance</Text>
        </Pressable>
      </View>
      <Text style={[styles.title, { color: t.accent }]}>Trivia Showdown</Text>
      <Text style={[styles.subtitle, { color: t.muted }]}>Pick one or more categories</Text>

      <View style={styles.picker}>
        <CategoryGrid
          genres={genres}
          categories={categories}
          selected={settings.categories}
          onChange={(selected) => onChange({ ...settings, categories: selected })}
        />
      </View>

      <PrimaryButton title="Next" onPress={onNext} />
      <Text style={[styles.credit, { color: t.muted }]}>Questions from Open Trivia DB (opentdb.com)</Text>

      <AppearanceSheet
        visible={appearanceOpen}
        settings={settings}
        onChange={onChange}
        onClose={() => setAppearanceOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 24, padding: 20 },
  topBar: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 8 },
  appearance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 44,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderRadius: 999,
  },
  appearanceIcon: { fontSize: 18 },
  appearanceText: { fontSize: 15, fontWeight: "800" },
  title: { fontSize: 34, fontWeight: "900", textAlign: "center" },
  subtitle: { fontSize: 16, fontWeight: "600", textAlign: "center", marginTop: 4 },
  picker: { marginTop: 12 },
  credit: { fontSize: 12, textAlign: "center", marginTop: 14 },
});
