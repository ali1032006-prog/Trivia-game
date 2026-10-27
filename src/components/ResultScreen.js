import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import PrimaryButton from "./PrimaryButton";

export default function ResultScreen({ score, total, onRestart, onSettings, onHome }) {
  const t = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Text style={[styles.title, { color: t.text }]}>Game over</Text>
      <Text style={[styles.score, { color: t.accent }]}>
        {score} / {total}
      </Text>
      <PrimaryButton title="Play again" onPress={onRestart} />
      <PrimaryButton title="Change settings" secondary onPress={onSettings} />
      <PrimaryButton title="Change categories" secondary onPress={onHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 24, padding: 20 },
  title: { fontSize: 24, fontWeight: "800", textAlign: "center" },
  score: { fontSize: 56, fontWeight: "900", textAlign: "center", marginVertical: 8 },
});
