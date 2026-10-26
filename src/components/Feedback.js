import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

export default function Feedback({ correct, timedOut = false, correctAnswer }) {
  const t = useTheme();
  const message = correct
    ? "Correct!"
    : `${timedOut ? "Time's up!" : "Wrong."} The answer was ${correctAnswer}.`;
  return (
    <View
      accessibilityLiveRegion="polite"
      style={[styles.box, { backgroundColor: correct ? t.goodBg : t.badBg }]}
    >
      <Text style={[styles.text, { color: correct ? t.good : t.bad }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginTop: 16, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12 },
  text: { fontSize: 16, fontWeight: "700" },
});
