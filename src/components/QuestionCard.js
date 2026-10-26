import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import AnswerButton from "./AnswerButton";
import Feedback from "./Feedback";
import FiftyFiftyButton from "./FiftyFiftyButton";
import PrimaryButton from "./PrimaryButton";
import TimerBar from "./TimerBar";

// question: { text, answers, correct }; picked: index tapped or null
// timerSeconds: null for no timer; timedOut: time ran out before a tap
export default function QuestionCard({
  question, index, total, picked, timedOut, timerSeconds, hidden = [], fiftyUsed, onFifty,
  onPick, onExpire, onNext,
}) {
  const t = useTheme();
  const answered = picked !== null || timedOut;
  const last = index === total - 1;

  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      {timerSeconds != null && (
        <TimerBar seconds={timerSeconds} running={!answered} onExpire={onExpire} />
      )}
      <View style={styles.topRow}>
        <Text style={[styles.progress, { color: t.accent }]}>
          Question {index + 1} of {total}
        </Text>
        <FiftyFiftyButton used={fiftyUsed} disabled={answered} onPress={onFifty} />
      </View>
      <Text style={[styles.question, { color: t.text }]}>{question.text}</Text>

      <View style={styles.answers}>
        {question.answers.map((label, i) => {
          if (hidden.includes(i)) return null;
          let state = "idle";
          if (answered && i === picked) state = i === question.correct ? "correct" : "wrong";
          else if (answered && i === question.correct) state = "reveal";
          return (
            <AnswerButton
              key={label}
              label={label}
              slot={i}
              state={state}
              disabled={answered}
              onPress={() => onPick(i)}
            />
          );
        })}
      </View>

      {answered && (
        <>
          <Feedback
            correct={picked === question.correct}
            timedOut={timedOut}
            correctAnswer={question.answers[question.correct]}
          />
          <PrimaryButton title={last ? "See results" : "Next question"} onPress={onNext} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 24, padding: 20 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  progress: { fontSize: 14, fontWeight: "800", textTransform: "uppercase" },
  question: { fontSize: 24, fontWeight: "800", marginBottom: 18 },
  answers: { gap: 12 },
});
