export const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ".split("");

export const TOTAL_ROUNDS = 10;

export function pickDistractors(target) {
  const pool = ALPHABET.filter((l) => l !== target);
  const picked = [];
  while (picked.length < 3) {
    const letter = pool[Math.floor(Math.random() * pool.length)];
    if (!picked.includes(letter)) picked.push(letter);
  }
  return picked;
}

export function buildRound() {
  const target = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  const choices = [target, ...pickDistractors(target)].sort(() => Math.random() - 0.5);
  return { target, choices };
}
