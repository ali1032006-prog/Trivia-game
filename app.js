const total = CATEGORY.questions.length;
const app = document.getElementById("app");

let state;

function reset() {
  state = { index: 0, score: 0, picked: null, done: false };
  render();
}

function pick(i) {
  if (state.picked !== null) return;
  state.picked = i;
  if (i === CATEGORY.questions[state.index].correct) state.score++;
  render();
}

function next() {
  if (state.index === total - 1) {
    state.done = true;
  } else {
    state.index++;
    state.picked = null;
  }
  render();
}

function render() {
  app.replaceChildren();

  const header = el("header", "header");
  header.append(el("h1", "", `Trivia: ${CATEGORY.name}`));
  header.append(ScoreBoard({ score: state.score, total }));
  app.append(header);

  app.append(
    state.done
      ? ResultScreen({ score: state.score, total, onRestart: reset })
      : QuestionCard({
          question: CATEGORY.questions[state.index],
          index: state.index,
          total,
          picked: state.picked,
          onPick: pick,
          onNext: next,
        })
  );
}

reset();
