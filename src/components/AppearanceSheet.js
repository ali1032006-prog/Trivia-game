import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import BackgroundPicker from "./BackgroundPicker";
import ColorPicker from "./ColorPicker";
import PrimaryButton from "./PrimaryButton";

// Bottom sheet for color theme and background. Changes apply live behind it.
export default function AppearanceSheet({ visible, settings, onChange, onClose }) {
  const t = useTheme();
  const set = (patch) => onChange({ ...settings, ...patch });

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close appearance" />
      <View style={[styles.sheet, { backgroundColor: t.surface, borderColor: t.border }]}>
        <Text style={[styles.title, { color: t.text }]}>Appearance</Text>

        <Text style={[styles.section, { color: t.muted }]}>COLOR THEME</Text>
        <ColorPicker value={settings.palette} onChange={(palette) => set({ palette })} />

        <Text style={[styles.section, { color: t.muted }]}>BACKGROUND</Text>
        <BackgroundPicker value={settings.background} onChange={(background) => set({ background })} />

        <PrimaryButton title="Done" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.25)" },
  sheet: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    padding: 20,
    paddingBottom: 36,
  },
  title: { fontSize: 24, fontWeight: "900", textAlign: "center" },
  section: { fontSize: 12, fontWeight: "800", letterSpacing: 1, marginTop: 18, marginBottom: 12 },
});
