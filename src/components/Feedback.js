import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

export default function Feedback({ correct, correctAnswer }) {
  const t = useTheme();
  return (
    <View
      accessibilityLiveRegion="polite"
      style={[styles.box, { backgroundColor: correct ? t.goodBg : t.badBg }]}
    >
      <Text style={[styles.text, { color: correct ? t.good : t.bad }]}>
        {correct ? "Correct!" : `Wrong. The answer was ${correctAnswer}.`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginTop: 16, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  text: { fontSize: 16, fontWeight: "600" },
});
