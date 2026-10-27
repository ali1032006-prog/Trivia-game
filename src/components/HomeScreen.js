import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import AppearanceSheet from "./AppearanceSheet";
import CategoryPicker from "./CategoryPicker";
import PrimaryButton from "./PrimaryButton";

// Home page: pick the categories and the look, then continue to game settings.
export default function HomeScreen({ categories, settings, onChange, onNext }) {
  const t = useTheme();
  const [appearanceOpen, setAppearanceOpen] = useState(false);

  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Text style={[styles.title, { color: t.accent }]}>Trivia Showdown</Text>
      <Text style={[styles.subtitle, { color: t.muted }]}>Pick one or more categories</Text>

      <View style={styles.picker}>
        <CategoryPicker
          options={categories}
          selected={settings.categories}
          onChange={(selected) => onChange({ ...settings, categories: selected })}
          defaultOpen
        />
      </View>

      <PrimaryButton title="Next" onPress={onNext} />
      <PrimaryButton title="Appearance" secondary onPress={() => setAppearanceOpen(true)} />
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
  title: { fontSize: 34, fontWeight: "900", textAlign: "center" },
  subtitle: { fontSize: 16, fontWeight: "600", textAlign: "center", marginTop: 4 },
  picker: { marginTop: 18 },
  credit: { fontSize: 12, textAlign: "center", marginTop: 14 },
});
