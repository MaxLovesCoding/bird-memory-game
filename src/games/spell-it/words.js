export const WORDS = [
  { word: "CAT", emoji: "🐱", missingIndex: 0 },
  { word: "DOG", emoji: "🐶", missingIndex: 1 },
  { word: "SUN", emoji: "☀️", missingIndex: 1 },
  { word: "HAT", emoji: "🎩", missingIndex: 0 },
  { word: "BED", emoji: "🛏️", missingIndex: 0 },
  { word: "PIG", emoji: "🐷", missingIndex: 1 },
  { word: "CUP", emoji: "☕", missingIndex: 1 },
  { word: "BUG", emoji: "🐛", missingIndex: 0 },
  { word: "STAR", emoji: "⭐", missingIndex: 2 },
  { word: "FISH", emoji: "🐟", missingIndex: 0 },
  { word: "BALL", emoji: "⚽", missingIndex: 0 },
  { word: "TREE", emoji: "🌳", missingIndex: 2 },
];

export const LETTER_POOL = "ABCDEFGHJKMNPQRSTUVWXYZ".split("");

export const TOTAL_ROUNDS = 8;

export function formatWordWithBlank(word, missingIndex) {
  return word
    .split("")
    .map((letter, i) => (i === missingIndex ? "_" : letter))
    .join("");
}

export function pickDistractors(answer) {
  const pool = LETTER_POOL.filter((l) => l !== answer);
  const picked = [];
  while (picked.length < 2) {
    const letter = pool[Math.floor(Math.random() * pool.length)];
    if (!picked.includes(letter)) picked.push(letter);
  }
  return picked;
}

export function pickRounds(count = TOTAL_ROUNDS) {
  const copy = [...WORDS].sort(() => Math.random() - 0.5);
  return copy.slice(0, count).map((entry) => {
    const answer = entry.word[entry.missingIndex];
    return {
      ...entry,
      answer,
      display: formatWordWithBlank(entry.word, entry.missingIndex),
      choices: [answer, ...pickDistractors(answer)].sort(() => Math.random() - 0.5),
    };
  });
}
