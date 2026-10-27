import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AnimatedBackground from "./src/components/AnimatedBackground";
import HomeScreen from "./src/components/HomeScreen";
import SettingsScreen from "./src/components/SettingsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { CATEGORIES, DIFFICULTIES, QUESTIONS_PER_GAME } from "./src/data/categories";
import { fetchQuestions } from "./src/api/trivia";
import { getSeen, markSeen, resetSeen } from "./src/storage";
import { ThemeContext, useTheme } from "./src/theme";
import { shuffle, shuffleAnswers } from "./src/shuffle";
import MessageScreen from "./src/components/MessageScreen";
import QuestionCard from "./src/components/QuestionCard";
import ResultScreen from "./src/components/ResultScreen";
import ScoreBoard from "./src/components/ScoreBoard";

const newRound = { index: 0, score: 0, picked: null, timedOut: false, fiftyUsed: false, hidden: [] };

export default function App() {
  const [settings, setSettings] = useState({
    categories: [9],
    difficulty: "medium",
    timerOn: true,
    seconds: 30,
    palette: "grape",
    background: "sunrise",
  });
  return (
    <ThemeContext.Provider value={{ palette: settings.palette, background: settings.background }}>
      <Game settings={settings} setSettings={setSettings} />
    </ThemeContext.Provider>
  );
}

function Game({ settings, setSettings }) {
  const t = useTheme();
  // "home" | "settings" | "loading" | "play" | "result" | "error"
  const [screen, setScreen] = useState("home");
  const [problem, setProblem] = useState(null); // { title, body, exhausted }
  const [round, setRound] = useState(newRound);
  const [questions, setQuestions] = useState([]);
  const latestLoad = useRef(0);

  const total = questions.length;
  const answered = round.picked !== null || round.timedOut;
  const chosen = CATEGORIES.filter((c) => settings.categories.includes(c.id));
  const difficultyName = DIFFICULTIES.find((d) => d.id === settings.difficulty).name;
  const heading = `${chosen.length === 1 ? chosen[0].name : "Mixed categories"} · ${difficultyName}`;

  // A question counts as seen the moment it is shown, so it is never asked again.
  useEffect(() => {
    if (screen === "play" && questions[round.index]) markSeen(questions[round.index].text);
  }, [screen, round.index, questions]);

  const play = async () => {
    const load = ++latestLoad.current;
    setScreen("loading");
    try {
      const seen = await getSeen();
      const fresh = await fetchQuestions({
        categoryIds: settings.categories,
        difficulty: settings.difficulty,
        count: QUESTIONS_PER_GAME,
        seen,
      });
      if (load !== latestLoad.current) return; // cancelled
      if (fresh.length === 0) {
        setProblem({
          title: "No new questions",
          body: "You've already seen every question we could find for these settings. Try other categories or a different difficulty, or reset your history.",
          exhausted: true,
        });
        return setScreen("error");
      }
      setQuestions(fresh.map(shuffleAnswers));
      setRound(newRound);
      setScreen("play");
    } catch {
      if (load !== latestLoad.current) return;
      setProblem({
        title: "Couldn't load questions",
        body: "Check your internet connection and try again.",
        exhausted: false,
      });
      setScreen("error");
    }
  };

  const goTo = (target) => () => {
    latestLoad.current++; // cancels a load that is still in flight
    setScreen(target);
  };
  const categorySummary = chosen.length === 1 ? chosen[0].name : `${chosen.length} categories`;

  const clearHistory = async () => {
    await resetSeen();
    play();
  };

  // 50/50: hide two wrong answers; once per game.
  const fifty = () => {
    if (answered || round.fiftyUsed) return;
    const { correct, answers } = questions[round.index];
    const wrong = answers.map((_, i) => i).filter((i) => i !== correct);
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
    <View style={styles.root}>
      <AnimatedBackground id={settings.background} palette={settings.palette} />
      <SafeAreaView style={styles.safe}>
      <StatusBar style={t.background.tone === "dark" ? "light" : "dark"} />
      <ScrollView contentContainerStyle={styles.content}>
        {(screen === "play" || screen === "result") && (
          <View style={styles.header}>
            <Text style={[styles.title, { color: t.text }]}>{heading}</Text>
            <ScoreBoard score={round.score} total={total} />
          </View>
        )}

        {screen === "home" && (
          <HomeScreen
            categories={CATEGORIES}
            selected={settings.categories}
            onChange={(categories) => setSettings({ ...settings, categories })}
            onNext={goTo("settings")}
          />
        )}

        {screen === "settings" && (
          <SettingsScreen
            summary={categorySummary}
            difficulties={DIFFICULTIES}
            perGame={QUESTIONS_PER_GAME}
            settings={settings}
            onChange={setSettings}
            onBack={goTo("home")}
            onStart={play}
          />
        )}

        {screen === "loading" && (
          <MessageScreen
            loading
            title="Getting your questions…"
            body="This can take a few seconds."
            actions={[{ title: "Cancel", secondary: true, onPress: goTo("settings") }]}
          />
        )}

        {screen === "error" && problem && (
          <MessageScreen
            title={problem.title}
            body={problem.body}
            actions={[
              problem.exhausted
                ? { title: "Reset my history", onPress: clearHistory }
                : { title: "Try again", onPress: play },
              { title: "Change settings", secondary: true, onPress: goTo("settings") },
              { title: "Change categories", secondary: true, onPress: goTo("home") },
            ]}
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
            onSettings={goTo("settings")}
            onHome={goTo("home")}
          />
        )}
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  content: { padding: 16, flexGrow: 1, justifyContent: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  title: { fontSize: 16, fontWeight: "800", flexShrink: 1 },
});
