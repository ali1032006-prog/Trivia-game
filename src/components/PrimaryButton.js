import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../theme";

export default function PrimaryButton({ title, onPress, secondary = false }) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary
          ? { borderColor: t.accent, borderWidth: 2 }
          : { backgroundColor: t.accent },
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
      ]}
    >
      <Text style={[styles.text, { color: secondary ? t.accent : "#fff" }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { marginTop: 14, paddingVertical: 16, borderRadius: 16, alignItems: "center" },
  text: { fontSize: 17, fontWeight: "700" },
});
