// Reusable UI components. Each returns a DOM element.

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// state: "idle" | "correct" | "wrong" | "reveal" (the right answer after a wrong tap)
function AnswerButton({ label, state = "idle", disabled = false, onClick }) {
  const btn = el("button", `answer ${state}`);
  btn.type = "button";
  btn.disabled = disabled;
  btn.append(el("span", "answer-label", label));
  if (state === "correct") btn.append(el("span", "answer-mark", "✓"));
  if (state === "wrong") btn.append(el("span", "answer-mark", "✗"));
  if (state === "reveal") btn.append(el("span", "answer-mark", "✓"));
  btn.addEventListener("click", onClick);
  return btn;
}

function Feedback({ correct, correctAnswer }) {
  const box = el("p", `feedback ${correct ? "correct" : "wrong"}`);
  box.setAttribute("role", "status");
  box.textContent = correct ? "Correct!" : `Wrong. The answer was ${correctAnswer}.`;
  return box;
}

// question: { text, answers, correct }; picked: index tapped or null
function QuestionCard({ question, index, total, picked, onPick, onNext }) {
  const answered = picked !== null;
  const card = el("section", "card");
  card.append(el("p", "progress", `Question ${index + 1} of ${total}`));
  card.append(el("h2", "question", question.text));

  const list = el("div", "answers");
  question.answers.forEach((label, i) => {
    let state = "idle";
    if (answered && i === picked) state = i === question.correct ? "correct" : "wrong";
    else if (answered && i === question.correct) state = "reveal";
    list.append(AnswerButton({ label, state, disabled: answered, onClick: () => onPick(i) }));
  });
  card.append(list);

  if (answered) {
    card.append(Feedback({
      correct: picked === question.correct,
      correctAnswer: question.answers[question.correct],
    }));
    const last = index === total - 1;
    const next = el("button", "primary", last ? "See results" : "Next question");
    next.type = "button";
    next.addEventListener("click", onNext);
    card.append(next);
  }
  return card;
}

function ScoreBoard({ score, total }) {
  return el("div", "score", `Score: ${score} / ${total}`);
}

function ResultScreen({ score, total, onRestart }) {
  const card = el("section", "card result");
  card.append(el("h2", "", "Game over"));
  card.append(el("p", "final-score", `${score} / ${total}`));
  const again = el("button", "primary", "Play again");
  again.type = "button";
  again.addEventListener("click", onRestart);
  card.append(again);
  return card;
}
