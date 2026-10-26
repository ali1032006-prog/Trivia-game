import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../theme";

export default function PrimaryButton({ title, onPress }) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, { backgroundColor: t.accent }, pressed && { opacity: 0.8 }]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { marginTop: 16, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  text: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
