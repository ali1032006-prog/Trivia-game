import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

export default function ScoreBoard({ score, total }) {
  const t = useTheme();
  return (
    <View style={[styles.pill, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Text style={[styles.text, { color: t.text }]}>
        Score: {score} / {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { borderWidth: 1, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 14 },
  text: { fontWeight: "700", fontSize: 15 },
});
