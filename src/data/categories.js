import { CATEGORY as generalKnowledge } from "./generalKnowledge";
import { CATEGORY as animals } from "./animals";
import { CATEGORY as geography } from "./geography";

// To add a category: create its data file (10 questions) and list it here.
export const CATEGORIES = [
  { id: "general", ...generalKnowledge },
  { id: "animals", ...animals },
  { id: "geography", ...geography },
];

export const QUESTIONS_PER_GAME = 5;
