import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import PrimaryButton from "./PrimaryButton";

// Loading spinner (no actions) or an error message with buttons.
// actions: [{ title, onPress, secondary }]
export default function MessageScreen({ title, body, loading = false, actions = [] }) {
  const t = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      {loading && <ActivityIndicator size="large" color={t.accent} style={styles.spinner} />}
      <Text style={[styles.title, { color: t.text }]}>{title}</Text>
      {body ? <Text style={[styles.body, { color: t.muted }]}>{body}</Text> : null}
      {actions.map((a) => (
        <PrimaryButton key={a.title} title={a.title} secondary={a.secondary} onPress={a.onPress} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 24, padding: 24 },
  spinner: { marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "800", textAlign: "center" },
  body: { fontSize: 15, textAlign: "center", marginTop: 8 },
});
