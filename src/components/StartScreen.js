import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../theme";
import ColorPicker from "./ColorPicker";
import PrimaryButton from "./PrimaryButton";
import Stepper from "./Stepper";

export const TIMER_MIN = 10;
export const TIMER_MAX = 90;

function Setting({ title, children }) {
  const t = useTheme();
  return (
    <View style={styles.setting}>
      <Text style={[styles.settingTitle, { color: t.muted }]}>{title}</Text>
      {children}
    </View>
  );
}

// settings: { timerOn, seconds, palette }
export default function StartScreen({ category, settings, onChange, onPlay }) {
  const t = useTheme();
  const set = (patch) => onChange({ ...settings, ...patch });

  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Text style={[styles.title, { color: t.accent }]}>Trivia Showdown</Text>
      <Text style={[styles.category, { color: t.text }]}>{category}</Text>

      <Setting title="TIMER PER QUESTION">
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, { color: t.text }]}>
            {settings.timerOn ? "On" : "Off"}
          </Text>
          <Switch
            value={settings.timerOn}
            onValueChange={(timerOn) => set({ timerOn })}
            trackColor={{ true: t.accent, false: t.border }}
          />
        </View>
        <Stepper
          value={settings.seconds}
          min={TIMER_MIN}
          max={TIMER_MAX}
          step={5}
          unit="s"
          disabled={!settings.timerOn}
          onChange={(seconds) => set({ seconds })}
        />
      </Setting>

      <Setting title="COLOR THEME">
        <ColorPicker value={settings.palette} onChange={(palette) => set({ palette })} />
      </Setting>

      <PrimaryButton title="Play" onPress={onPlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 24, padding: 20 },
  title: { fontSize: 34, fontWeight: "900", textAlign: "center" },
  category: { fontSize: 18, fontWeight: "600", textAlign: "center", marginTop: 4, marginBottom: 12 },
  setting: { marginTop: 18, gap: 12 },
  settingTitle: { fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  switchLabel: { fontSize: 17, fontWeight: "600" },
});
