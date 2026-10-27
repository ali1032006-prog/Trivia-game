import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

// Small chips naming the question's category and difficulty.
// category: { emoji, short }; difficulty: { name, color }
export default function QuestionTags({ category, difficulty }) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      {category && (
        <View style={[styles.chip, { borderColor: t.border, backgroundColor: t.surface }]}>
          <Text style={[styles.text, { color: t.text }]}>
            {category.emoji} {category.short}
          </Text>
        </View>
      )}
      {difficulty && (
        <View style={[styles.chip, { borderColor: difficulty.color, backgroundColor: `${difficulty.color}1f` }]}>
          <Text style={[styles.text, { color: difficulty.color }]}>{difficulty.name}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 10 },
  chip: { borderWidth: 1.5, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10 },
  text: { fontSize: 13, fontWeight: "800" },
});
