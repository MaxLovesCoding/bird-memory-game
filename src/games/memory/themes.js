export const DEFAULT_PAIR_COUNT = 4;
export const DEFAULT_THEME_ID = "birds";

function shuffleCards(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const THEMES = {
  birds: {
    id: "birds",
    label: "Birds",
    pickerEmoji: "🐦",
    title: "Bird Match!",
    subtitle: "Find the matching bird pairs",
    startEmoji: "🦜 🐧 🦉",
    winEmoji: "🎉 🦅 🐦 🦆 🎉",
    winSubtitle: "All the birds found their friends!",
    cardBack: "🪺",
    morePairsHint: "More birds!",
    cards: [
      { id: "robin", emoji: "🐦", name: "Robin", color: "#ffe4e1" },
      { id: "owl", emoji: "🦉", name: "Owl", color: "#e8dcc8" },
      { id: "penguin", emoji: "🐧", name: "Penguin", color: "#dceefb" },
      { id: "parrot", emoji: "🦜", name: "Parrot", color: "#d4f5d4" },
      { id: "eagle", emoji: "🦅", name: "Eagle", color: "#fff3cd" },
      { id: "duck", emoji: "🦆", name: "Duck", color: "#e0f7fa" },
      { id: "peacock", emoji: "🦚", name: "Peacock", color: "#e9d8fd" },
      { id: "flamingo", emoji: "🦩", name: "Flamingo", color: "#fed7e2" },
      { id: "swan", emoji: "🦢", name: "Swan", color: "#f7fafc" },
      { id: "chick", emoji: "🐤", name: "Chick", color: "#fefcbf" },
    ],
  },
  insects: {
    id: "insects",
    label: "Insects",
    pickerEmoji: "🐛",
    title: "Bug Match!",
    subtitle: "Find the matching insect pairs",
    startEmoji: "🦋 🐝 🐞",
    winEmoji: "🎉 🦋 🐜 🪲 🎉",
    winSubtitle: "All the bugs found their buddies!",
    cardBack: "🌿",
    morePairsHint: "More bugs!",
    cards: [
      { id: "butterfly", emoji: "🦋", name: "Butterfly", color: "#e9d8fd" },
      { id: "bee", emoji: "🐝", name: "Bee", color: "#fefcbf" },
      { id: "ladybug", emoji: "🐞", name: "Ladybug", color: "#fed7d7" },
      { id: "ant", emoji: "🐜", name: "Ant", color: "#e2e8f0" },
      { id: "cricket", emoji: "🦗", name: "Cricket", color: "#c6f6d5" },
      { id: "caterpillar", emoji: "🐛", name: "Caterpillar", color: "#b2f5ea" },
      { id: "beetle", emoji: "🪲", name: "Beetle", color: "#bee3f8" },
      { id: "mosquito", emoji: "🦟", name: "Mosquito", color: "#faf089" },
      { id: "spider", emoji: "🕷️", name: "Spider", color: "#d6bcfa" },
      { id: "worm", emoji: "🪱", name: "Worm", color: "#fbd38d" },
    ],
  },
  planets: {
    id: "planets",
    label: "Planets",
    pickerEmoji: "🪐",
    title: "Planet Match!",
    subtitle: "Find the matching planet pairs",
    startEmoji: "🌍 🪐 🔴",
    winEmoji: "🎉 🌍 🪐 🌕 🎉",
    winSubtitle: "You explored the whole solar system!",
    cardBack: "✨",
    morePairsHint: "More planets!",
    cards: [
      { id: "mercury", emoji: "🌑", name: "Mercury", color: "#cbd5e0" },
      { id: "venus", emoji: "🌕", name: "Venus", color: "#fefcbf" },
      { id: "earth", emoji: "🌍", name: "Earth", color: "#bee3f8" },
      { id: "mars", emoji: "🔴", name: "Mars", color: "#feb2b2" },
      { id: "jupiter", emoji: "🟠", name: "Jupiter", color: "#fbd38d" },
      { id: "saturn", emoji: "🪐", name: "Saturn", color: "#faf089" },
      { id: "uranus", emoji: "🔵", name: "Uranus", color: "#90cdf4" },
      { id: "neptune", emoji: "🌀", name: "Neptune", color: "#63b3ed" },
      { id: "sun", emoji: "☀️", name: "Sun", color: "#fef08a" },
      { id: "moon", emoji: "🌙", name: "Moon", color: "#e2e8f0" },
    ],
  },
};

export function getTheme(themeId = DEFAULT_THEME_ID) {
  return THEMES[themeId] ?? THEMES[DEFAULT_THEME_ID];
}

export function getCardsForGame(themeId, pairCount = DEFAULT_PAIR_COUNT) {
  const theme = getTheme(themeId);
  return shuffleCards(theme.cards).slice(0, pairCount);
}
