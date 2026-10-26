import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { CATEGORY } from "./src/data/animals";
import { ThemeContext, useTheme } from "./src/theme";
import QuestionCard from "./src/components/QuestionCard";
import ResultScreen from "./src/components/ResultScreen";
import ScoreBoard from "./src/components/ScoreBoard";
import StartScreen from "./src/components/StartScreen";

const total = CATEGORY.questions.length;
const newRound = { index: 0, score: 0, picked: null, timedOut: false };

export default function App() {
  const [settings, setSettings] = useState({ timerOn: true, seconds: 30, palette: "grape" });
  return (
    <ThemeContext.Provider value={settings.palette}>
      <Game settings={settings} setSettings={setSettings} />
    </ThemeContext.Provider>
  );
}

function Game({ settings, setSettings }) {
  const t = useTheme();
  const [screen, setScreen] = useState("start"); // "start" | "play" | "result"
  const [round, setRound] = useState(newRound);

  const answered = round.picked !== null || round.timedOut;

  const play = () => {
    setRound(newRound);
    setScreen("play");
  };

  const pick = (i) => {
    if (answered) return;
    const right = i === CATEGORY.questions[round.index].correct;
    Haptics.notificationAsync(
      right ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error
    );
    setRound({ ...round, picked: i, score: round.score + (right ? 1 : 0) });
  };

  const expire = () => {
    if (answered) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setRound((r) => (r.picked === null ? { ...r, timedOut: true } : r));
  };

  const next = () => {
    if (round.index === total - 1) return setScreen("result");
    setRound({ ...round, index: round.index + 1, picked: null, timedOut: false });
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.bg }]}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        {screen !== "start" && (
          <View style={styles.header}>
            <Text style={[styles.title, { color: t.text }]}>{CATEGORY.name}</Text>
            <ScoreBoard score={round.score} total={total} />
          </View>
        )}

        {screen === "start" && (
          <StartScreen
            category={CATEGORY.name}
            settings={settings}
            onChange={setSettings}
            onPlay={play}
          />
        )}

        {screen === "play" && (
          <QuestionCard
            key={round.index}
            question={CATEGORY.questions[round.index]}
            index={round.index}
            total={total}
            picked={round.picked}
            timedOut={round.timedOut}
            timerSeconds={settings.timerOn ? settings.seconds : null}
            onPick={pick}
            onExpire={expire}
            onNext={next}
          />
        )}

        {screen === "result" && (
          <ResultScreen
            score={round.score}
            total={total}
            onRestart={play}
            onSettings={() => setScreen("start")}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16, flexGrow: 1, justifyContent: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "800", flexShrink: 1 },
});
