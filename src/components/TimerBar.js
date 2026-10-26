import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";

// Counts down from `seconds` while `running`; calls onExpire once at zero.
// Remount (change `key`) to restart it for the next question.
export default function TimerBar({ seconds, running, onExpire }) {
  const t = useTheme();
  const [left, setLeft] = useState(seconds);
  const expire = useRef(onExpire);
  expire.current = onExpire;

  useEffect(() => {
    if (!running) return;
    const end = Date.now() + left * 1000;
    const id = setInterval(() => {
      const remaining = Math.max(0, (end - Date.now()) / 1000);
      setLeft(remaining);
      if (remaining === 0) {
        clearInterval(id);
        expire.current();
      }
    }, 100);
    return () => clearInterval(id);
  }, [running]);

  const urgent = left <= 5;
  const fill = urgent ? t.bad : t.accent;

  return (
    <View style={styles.row}>
      <View style={[styles.track, { backgroundColor: t.border }]}>
        <View style={[styles.fill, { backgroundColor: fill, width: `${(left / seconds) * 100}%` }]} />
      </View>
      <Text style={[styles.text, { color: urgent ? t.bad : t.text }]}>{Math.ceil(left)}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  track: { flex: 1, height: 10, borderRadius: 5, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 5 },
  text: { width: 40, textAlign: "right", fontWeight: "800", fontSize: 16 },
});
