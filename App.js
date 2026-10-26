import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CATEGORY } from "./src/data/generalKnowledge";
import { useTheme } from "./src/theme";
import QuestionCard from "./src/components/QuestionCard";
import ResultScreen from "./src/components/ResultScreen";
import ScoreBoard from "./src/components/ScoreBoard";

const total = CATEGORY.questions.length;
const initial = { index: 0, score: 0, picked: null, done: false };

export default function App() {
  const t = useTheme();
  const [game, setGame] = useState(initial);

  const pick = (i) => {
    if (game.picked !== null) return;
    const right = i === CATEGORY.questions[game.index].correct;
    setGame({ ...game, picked: i, score: game.score + (right ? 1 : 0) });
  };

  const next = () =>
    game.index === total - 1
      ? setGame({ ...game, done: true })
      : setGame({ ...game, index: game.index + 1, picked: null });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.bg }]}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: t.text }]}>Trivia: {CATEGORY.name}</Text>
          <ScoreBoard score={game.score} total={total} />
        </View>
        {game.done ? (
          <ResultScreen score={game.score} total={total} onRestart={() => setGame(initial)} />
        ) : (
          <QuestionCard
            question={CATEGORY.questions[game.index]}
            index={game.index}
            total={total}
            picked={game.picked}
            onPick={pick}
            onNext={next}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "700", flexShrink: 1 },
});
