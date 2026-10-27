import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../theme";
import DifficultyPicker from "./DifficultyPicker";
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

// settings: { difficulties, count, timerOn, seconds }
export default function SettingsScreen({ summary, difficulties, countRange, settings, onChange, onBack, onStart }) {
  const t = useTheme();
  const set = (patch) => onChange({ ...settings, ...patch });

  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Text style={[styles.title, { color: t.accent }]}>Settings</Text>
      <Text style={[styles.subtitle, { color: t.muted }]}>
        {summary} · questions never repeat
      </Text>

      <Setting title="NUMBER OF QUESTIONS">
        <Stepper
          value={settings.count}
          min={countRange.min}
          max={countRange.max}
          step={countRange.step}
          onChange={(count) => set({ count })}
        />
      </Setting>

      <Setting title="DIFFICULTY (PICK ONE OR MORE)">
        <DifficultyPicker
          options={difficulties}
          selected={settings.difficulties}
          onChange={(selected) => set({ difficulties: selected })}
        />
      </Setting>

      <Setting title="TIMER PER QUESTION">
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, { color: t.text }]}>{settings.timerOn ? "On" : "Off"}</Text>
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

      <PrimaryButton title="Start" onPress={onStart} />
      <PrimaryButton title="Back" secondary onPress={onBack} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 24, padding: 20 },
  title: { fontSize: 30, fontWeight: "900", textAlign: "center" },
  subtitle: { fontSize: 14, fontWeight: "600", textAlign: "center", marginTop: 4 },
  setting: { marginTop: 18, gap: 12 },
  settingTitle: { fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  switchLabel: { fontSize: 17, fontWeight: "600" },
});
