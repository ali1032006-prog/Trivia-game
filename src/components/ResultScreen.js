import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import PrimaryButton from "./PrimaryButton";

export default function ResultScreen({ score, total, onRestart }) {
  const t = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Text style={[styles.title, { color: t.text }]}>Game over</Text>
      <Text style={[styles.score, { color: t.text }]}>
        {score} / {total}
      </Text>
      <PrimaryButton title="Play again" onPress={onRestart} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 16, padding: 20, alignItems: "stretch" },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center" },
  score: { fontSize: 48, fontWeight: "800", textAlign: "center", marginVertical: 8 },
});
