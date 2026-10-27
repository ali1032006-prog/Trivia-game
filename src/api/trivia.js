import { shuffle } from "../shuffle";

const BASE = "https://opentdb.com/api.php";
// Open Trivia DB allows one request per IP every 5 seconds.
const GAP_MS = 5300;
const MAX_REQUESTS = 4;
// With several categories picked, draw from at least this many so games feel mixed.
const MIN_CATEGORIES = 2;

let lastRequestAt = 0;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url) {
  const wait = lastRequestAt + GAP_MS - Date.now();
  if (wait > 0) await sleep(wait);
  lastRequestAt = Date.now();
  const res = await fetch(url);
  if (res.status === 429) return { response_code: 5 };
  if (!res.ok) throw new Error(`Trivia server error (${res.status})`);
  return res.json();
}

// encode=url3986 avoids HTML entities in the text.
function toQuestion(item) {
  const dec = decodeURIComponent;
  return {
    text: dec(item.question),
    answers: [dec(item.correct_answer), ...item.incorrect_answers.map(dec)],
    correct: 0,
  };
}

async function fetchCategory(categoryId, difficulty) {
  // Small categories may not have 10 questions at a difficulty, so fall back to 5.
  for (const amount of [10, 5]) {
    const url =
      `${BASE}?amount=${amount}&category=${categoryId}&difficulty=${difficulty}` +
      `&type=multiple&encode=url3986`;
    let data = await getJson(url);
    if (data.response_code === 5) data = await getJson(url); // rate limited: retry once
    if (data.response_code === 0) return data.results.map(toQuestion);
    if (data.response_code !== 1) throw new Error(`Trivia API error (code ${data.response_code})`);
  }
  return [];
}

// Returns up to `count` questions that are not in the `seen` set (keyed by question text).
export async function fetchQuestions({ categoryIds, difficulty, count, seen }) {
  const order = shuffle(categoryIds).slice(0, MAX_REQUESTS);
  const minRequests = Math.min(MIN_CATEGORIES, order.length);
  const found = [];
  const have = new Set();
  let requests = 0;

  for (const id of order) {
    const items = await fetchCategory(id, difficulty);
    requests++;
    for (const q of items) {
      if (seen.has(q.text) || have.has(q.text)) continue;
      have.add(q.text);
      found.push(q);
    }
    if (found.length >= count && requests >= minRequests) break;
  }
  return shuffle(found).slice(0, count);
}
