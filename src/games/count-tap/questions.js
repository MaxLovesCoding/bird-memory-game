export const EMOJI_POOL = ["🍎", "⭐", "🐶", "🌸", "⚽", "🐠", "🍌", "🦋"];

export const TOTAL_ROUNDS = 8;

export function buildRound() {
  const count = Math.floor(Math.random() * 5) + 1;
  const emoji = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
  const options = new Set([count]);
  while (options.size < 3) {
    const n = Math.floor(Math.random() * 5) + 1;
    options.add(n);
  }
  return {
    count,
    emoji,
    objects: Array.from({ length: count }, () => emoji).join("  "),
    answers: [...options].sort(() => Math.random() - 0.5),
  };
}
