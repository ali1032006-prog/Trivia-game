// Fisher-Yates shuffle; returns a new array.
export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Reorders a question's answers and keeps `correct` pointing at the right one.
export function shuffleAnswers(question) {
  const right = question.answers[question.correct];
  const answers = shuffle(question.answers);
  return { ...question, answers, correct: answers.indexOf(right) };
}
