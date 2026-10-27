import { shuffle } from "../shuffle";

const BASE = "https://opentdb.com/api.php";
// Open Trivia DB allows one request per IP every 5 seconds.
const GAP_MS = 5300;
const MAX_REQUESTS = 5;
// With several categories picked, draw from at least this many so games feel mixed.
const MIN_CATEGORIES = 2;
const MAX_AMOUNT = 50; // API limit per request

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
function toQuestion(item, categoryId) {
  const dec = decodeURIComponent;
  return {
    text: dec(item.question),
    answers: [dec(item.correct_answer), ...item.incorrect_answers.map(dec)],
    correct: 0,
    categoryId,
    difficulty: dec(item.difficulty),
  };
}

// `difficulty` is null for "any difficulty".
async function fetchCategory(categoryId, difficulty, wanted) {
  // Small categories may not have enough questions, so step down until one succeeds.
  const amounts = [...new Set([Math.min(MAX_AMOUNT, wanted), 20, 10, 5])].filter((a) => a <= wanted || a === 5);
  for (const amount of amounts) {
    const url =
      `${BASE}?amount=${amount}&category=${categoryId}&type=multiple&encode=url3986` +
      (difficulty ? `&difficulty=${difficulty}` : "");
    let data = await getJson(url);
    if (data.response_code === 5) data = await getJson(url); // rate limited: retry once
    if (data.response_code === 0) return data.results.map((r) => toQuestion(r, categoryId));
    if (data.response_code !== 1) throw new Error(`Trivia API error (code ${data.response_code})`);
  }
  return [];
}

// Returns up to `count` questions that are not in the `seen` set (keyed by question text),
// drawn from `categoryIds` and matching one of `difficulties`.
export async function fetchQuestions({ categoryIds, difficulties, count, seen }) {
  // One difficulty: ask the API for it. Several: ask for any and filter here.
  const single = difficulties.length === 1 ? difficulties[0] : null;
  const order = shuffle(categoryIds).slice(0, MAX_REQUESTS);
  const minRequests = Math.min(MIN_CATEGORIES, order.length);
  const wanted = count * 2; // headroom for seen questions and filtering
  const found = [];
  const have = new Set();
  let requests = 0;

  for (const id of order) {
    const items = await fetchCategory(id, single, wanted);
    requests++;
    for (const q of items) {
      if (!difficulties.includes(q.difficulty)) continue;
      if (seen.has(q.text) || have.has(q.text)) continue;
      have.add(q.text);
      found.push(q);
    }
    if (found.length >= count && requests >= minRequests) break;
  }
  return shuffle(found).slice(0, count);
}
