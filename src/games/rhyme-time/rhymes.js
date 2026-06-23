export const RHYME_SETS = [
  { target: { word: "CAT", emoji: "🐱" }, rhyme: { word: "HAT", emoji: "🎩" }, wrong: [{ word: "DOG", emoji: "🐶" }, { word: "SUN", emoji: "☀️" }] },
  { target: { word: "DOG", emoji: "🐶" }, rhyme: { word: "LOG", emoji: "🪵" }, wrong: [{ word: "CAT", emoji: "🐱" }, { word: "BED", emoji: "🛏️" }] },
  { target: { word: "SUN", emoji: "☀️" }, rhyme: { word: "FUN", emoji: "🎉" }, wrong: [{ word: "PIG", emoji: "🐷" }, { word: "HAT", emoji: "🎩" }] },
  { target: { word: "HOP", emoji: "🐰" }, rhyme: { word: "TOP", emoji: "🔝" }, wrong: [{ word: "CAT", emoji: "🐱" }, { word: "CUP", emoji: "☕" }] },
  { target: { word: "BED", emoji: "🛏️" }, rhyme: { word: "RED", emoji: "🔴" }, wrong: [{ word: "DOG", emoji: "🐶" }, { word: "FUN", emoji: "🎉" }] },
  { target: { word: "BUG", emoji: "🐛" }, rhyme: { word: "MUG", emoji: "☕" }, wrong: [{ word: "SUN", emoji: "☀️" }, { word: "TOP", emoji: "🔝" }] },
  { target: { word: "PIG", emoji: "🐷" }, rhyme: { word: "WIG", emoji: "💇" }, wrong: [{ word: "HAT", emoji: "🎩" }, { word: "LOG", emoji: "🪵" }] },
  { target: { word: "CUP", emoji: "☕" }, rhyme: { word: "PUP", emoji: "🐶" }, wrong: [{ word: "RED", emoji: "🔴" }, { word: "MUG", emoji: "☕" }] },
  { target: { word: "STAR", emoji: "⭐" }, rhyme: { word: "CAR", emoji: "🚗" }, wrong: [{ word: "BUG", emoji: "🐛" }, { word: "WIG", emoji: "💇" }] },
  { target: { word: "BEE", emoji: "🐝" }, rhyme: { word: "TREE", emoji: "🌳" }, wrong: [{ word: "CAR", emoji: "🚗" }, { word: "PUP", emoji: "🐶" }] },
  { target: { word: "FISH", emoji: "🐟" }, rhyme: { word: "DISH", emoji: "🍽️" }, wrong: [{ word: "TREE", emoji: "🌳" }, { word: "STAR", emoji: "⭐" }] },
  { target: { word: "BALL", emoji: "⚽" }, rhyme: { word: "TALL", emoji: "📏" }, wrong: [{ word: "DISH", emoji: "🍽️" }, { word: "FUN", emoji: "🎉" }] },
];

export const TOTAL_ROUNDS = 6;

export function pickSets(count = TOTAL_ROUNDS) {
  const copy = [...RHYME_SETS].sort(() => Math.random() - 0.5);
  return copy.slice(0, count);
}

export function buildChoices(set) {
  return [set.rhyme, ...set.wrong].sort(() => Math.random() - 0.5);
}
