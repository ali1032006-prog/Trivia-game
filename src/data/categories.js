// Genres shown as sections on the home page, in this order.
export const GENRES = [
  { id: "entertainment", name: "Entertainment" },
  { id: "science", name: "Science & Tech" },
  { id: "world", name: "World & Culture" },
  { id: "more", name: "Sports, Animals & More" },
];

// Open Trivia DB category ids (https://opentdb.com/api_category.php).
// `short` is the label on the category button; `name` is shown during the game.
export const CATEGORIES = [
  { id: 10, name: "Entertainment: Books", short: "Books", genre: "entertainment", emoji: "📚" },
  { id: 11, name: "Entertainment: Film", short: "Film", genre: "entertainment", emoji: "🎬" },
  { id: 12, name: "Entertainment: Music", short: "Music", genre: "entertainment", emoji: "🎵" },
  { id: 13, name: "Entertainment: Musicals & Theatres", short: "Musicals & Theatre", genre: "entertainment", emoji: "🎭" },
  { id: 14, name: "Entertainment: Television", short: "Television", genre: "entertainment", emoji: "📺" },
  { id: 15, name: "Entertainment: Video Games", short: "Video Games", genre: "entertainment", emoji: "🎮" },
  { id: 16, name: "Entertainment: Board Games", short: "Board Games", genre: "entertainment", emoji: "🎲" },
  { id: 29, name: "Entertainment: Comics", short: "Comics", genre: "entertainment", emoji: "💥" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga", short: "Anime & Manga", genre: "entertainment", emoji: "🍥" },
  { id: 32, name: "Entertainment: Cartoon & Animations", short: "Cartoons", genre: "entertainment", emoji: "🐭" },

  { id: 17, name: "Science & Nature", short: "Science & Nature", genre: "science", emoji: "🔬" },
  { id: 18, name: "Science: Computers", short: "Computers", genre: "science", emoji: "💻" },
  { id: 19, name: "Science: Mathematics", short: "Math", genre: "science", emoji: "➗" },
  { id: 30, name: "Science: Gadgets", short: "Gadgets", genre: "science", emoji: "📱" },

  { id: 9, name: "General Knowledge", short: "General Knowledge", genre: "world", emoji: "🧠" },
  { id: 22, name: "Geography", short: "Geography", genre: "world", emoji: "🌍" },
  { id: 23, name: "History", short: "History", genre: "world", emoji: "🏛️" },
  { id: 24, name: "Politics", short: "Politics", genre: "world", emoji: "🗳️" },
  { id: 20, name: "Mythology", short: "Mythology", genre: "world", emoji: "🐉" },
  { id: 25, name: "Art", short: "Art", genre: "world", emoji: "🎨" },
  { id: 26, name: "Celebrities", short: "Celebrities", genre: "world", emoji: "⭐" },

  { id: 21, name: "Sports", short: "Sports", genre: "more", emoji: "⚽" },
  { id: 27, name: "Animals", short: "Animals", genre: "more", emoji: "🐾" },
  { id: 28, name: "Vehicles", short: "Vehicles", genre: "more", emoji: "🚗" },
];

export const DIFFICULTIES = [
  { id: "easy", name: "Easy", color: "#2f9e44" },
  { id: "medium", name: "Medium", color: "#e67700" },
  { id: "hard", name: "Hard", color: "#e03131" },
];

// Question count picker on the settings page.
export const QUESTION_COUNT = { min: 5, max: 30, step: 5, initial: 10 };
