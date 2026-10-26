import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme";
import AnswerButton from "./AnswerButton";
import Feedback from "./Feedback";
import PrimaryButton from "./PrimaryButton";

// question: { text, answers, correct }; picked: index tapped or null
export default function QuestionCard({ question, index, total, picked, onPick, onNext }) {
  const t = useTheme();
  const answered = picked !== null;
  const last = index === total - 1;

  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
      <Text style={[styles.progress, { color: t.muted }]}>
        Question {index + 1} of {total}
      </Text>
      <Text style={[styles.question, { color: t.text }]}>{question.text}</Text>

      <View style={styles.answers}>
        {question.answers.map((label, i) => {
          let state = "idle";
          if (answered && i === picked) state = i === question.correct ? "correct" : "wrong";
          else if (answered && i === question.correct) state = "reveal";
          return (
            <AnswerButton
              key={label}
              label={label}
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
            correctAnswer={question.answers[question.correct]}
          />
          <PrimaryButton title={last ? "See results" : "Next question"} onPress={onNext} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 16, padding: 20 },
  progress: { fontSize: 14, marginBottom: 8 },
  question: { fontSize: 22, fontWeight: "700", marginBottom: 16 },
  answers: { gap: 10 },
});
