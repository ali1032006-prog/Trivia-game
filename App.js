import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { CATEGORIES, QUESTIONS_PER_GAME } from "./src/data/categories";
import { ThemeContext, useTheme } from "./src/theme";
import { shuffle, shuffleAnswers } from "./src/shuffle";
import QuestionCard from "./src/components/QuestionCard";
import ResultScreen from "./src/components/ResultScreen";
import ScoreBoard from "./src/components/ScoreBoard";
import StartScreen from "./src/components/StartScreen";

const newRound = { index: 0, score: 0, picked: null, timedOut: false, fiftyUsed: false, hidden: [] };

// Pool the chosen categories, then deal QUESTIONS_PER_GAME random ones with shuffled answers.
const dealQuestions = (categoryIds) =>
  shuffle(CATEGORIES.filter((c) => categoryIds.includes(c.id)).flatMap((c) => c.questions))
    .slice(0, QUESTIONS_PER_GAME)
    .map(shuffleAnswers);

export default function App() {
  const [settings, setSettings] = useState({
    categories: CATEGORIES.map((c) => c.id),
    timerOn: true,
    seconds: 30,
    palette: "grape",
  });
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
  const [questions, setQuestions] = useState([]);

  const total = questions.length;
  const answered = round.picked !== null || round.timedOut;
  const chosen = CATEGORIES.filter((c) => settings.categories.includes(c.id));
  const heading = chosen.length === 1 ? chosen[0].name : "Mixed categories";

  const play = () => {
    setQuestions(dealQuestions(settings.categories));
    setRound(newRound);
    setScreen("play");
  };

  // 50/50: hide two wrong answers; once per game.
  const fifty = () => {
    if (answered || round.fiftyUsed) return;
    const { correct } = questions[round.index];
    const wrong = questions[round.index].answers.map((_, i) => i).filter((i) => i !== correct);
    setRound({ ...round, fiftyUsed: true, hidden: shuffle(wrong).slice(0, 2) });
  };

  const pick = (i) => {
    if (answered) return;
    const right = i === questions[round.index].correct;
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
    setRound({ ...round, index: round.index + 1, picked: null, timedOut: false, hidden: [] });
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.bg }]}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        {screen !== "start" && (
          <View style={styles.header}>
            <Text style={[styles.title, { color: t.text }]}>{heading}</Text>
            <ScoreBoard score={round.score} total={total} />
          </View>
        )}

        {screen === "start" && (
          <StartScreen
            categories={CATEGORIES}
            perGame={QUESTIONS_PER_GAME}
            settings={settings}
            onChange={setSettings}
            onPlay={play}
          />
        )}

        {screen === "play" && (
          <QuestionCard
            key={round.index}
            question={questions[round.index]}
            index={round.index}
            total={total}
            picked={round.picked}
            timedOut={round.timedOut}
            hidden={round.hidden}
            fiftyUsed={round.fiftyUsed}
            onFifty={fifty}
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
