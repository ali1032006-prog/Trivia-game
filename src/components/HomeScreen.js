import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import CategoryPicker from "./CategoryPicker";
import PrimaryButton from "./PrimaryButton";

// Home page: pick the categories, then continue to settings.
export default function HomeScreen({ categories, selected, onChange, onNext }) {
  const t = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Text style={[styles.title, { color: t.accent }]}>Trivia Showdown</Text>
      <Text style={[styles.subtitle, { color: t.muted }]}>Pick one or more categories</Text>

      <View style={styles.picker}>
        <CategoryPicker options={categories} selected={selected} onChange={onChange} defaultOpen />
      </View>

      <PrimaryButton title="Next: settings" onPress={onNext} />
      <Text style={[styles.credit, { color: t.muted }]}>Questions from Open Trivia DB (opentdb.com)</Text>
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
