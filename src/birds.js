export const BIRDS = [
  { id: "robin", emoji: "🐦", name: "Robin", color: "#ffe4e1" },
  { id: "owl", emoji: "🦉", name: "Owl", color: "#e8dcc8" },
  { id: "penguin", emoji: "🐧", name: "Penguin", color: "#dceefb" },
  { id: "parrot", emoji: "🦜", name: "Parrot", color: "#d4f5d4" },
  { id: "eagle", emoji: "🦅", name: "Eagle", color: "#fff3cd" },
  { id: "duck", emoji: "🦆", name: "Duck", color: "#e0f7fa" },
  { id: "peacock", emoji: "🦚", name: "Peacock", color: "#e9d8fd" },
  { id: "flamingo", emoji: "🦩", name: "Flamingo", color: "#fed7e2" },
  { id: "swan", emoji: "🦢", name: "Swan", color: "#f7fafc" },
  { id: "hummingbird", emoji: "🐤", name: "Chick", color: "#fefcbf" },
];

export const DEFAULT_PAIR_COUNT = 4;
export const PAIR_OPTIONS = [4, 6];

function shuffleBirds(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getBirdsForGame(pairCount = DEFAULT_PAIR_COUNT) {
  return shuffleBirds(BIRDS).slice(0, pairCount);
}
