import * as memory from "./memory/memory.js";
import * as countTap from "./count-tap/count-tap.js";
import * as letterHunt from "./letter-hunt/letter-hunt.js";
import * as rhymeTime from "./rhyme-time/rhyme-time.js";
import * as spellIt from "./spell-it/spell-it.js";
import * as mathChallenge from "./grade5/math-challenge/math-challenge.js";
import * as storyLab from "./grade5/story-lab/story-lab.js";
import * as spellCheck from "./grade5/spell-check/spell-check.js";

export const kindergartenGames = [memory, countTap, letterHunt, rhymeTime, spellIt];
export const grade5Games = [mathChallenge, storyLab, spellCheck];

export const gamesByRoute = Object.fromEntries(
  [...kindergartenGames, ...grade5Games].map((game) => [
    `${game.gameMeta.grade}/${game.gameMeta.id}`,
    game,
  ]),
);

export const LEGACY_ROUTES = Object.fromEntries(
  kindergartenGames.map((game) => [`${game.gameMeta.id}`, `#/k/${game.gameMeta.id}`]),
);

const HUB_CONFIGS = {
  k: {
    grade: "k",
    title: "🧸 Toy Box",
    subtitle: "Pick a game to play!",
    games: kindergartenGames,
    theme: "hub",
    documentTitle: "Toy Box | Learning Toy Box",
    themeColor: "#ffd166",
  },
  g5: {
    grade: "g5",
    title: "📚 5th Grade Games",
    subtitle: "Math, reading, and spelling",
    games: grade5Games,
    theme: "g5-hub",
    documentTitle: "5th Grade | Learning Toy Box",
    themeColor: "#667eea",
  },
};

export function getHubConfig(grade) {
  return HUB_CONFIGS[grade] ?? null;
}
