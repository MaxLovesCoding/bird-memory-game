export const QUESTIONS_PER_SESSION = 10;

const multiply = (a, b) => ({
  type: "multiply",
  prompt: `${a} × ${b} = ?`,
  choices: shuffleUnique([a * b, a * b + a, a * b - b, a + b].filter((n) => n > 0)).slice(0, 4),
  answer: String(a * b),
});

const fractionCompare = (left, right, symbol, answer) => ({
  type: "fraction",
  prompt: `Which is greater: ${left} or ${right}?`,
  choices: [left, right, "They are equal"],
  answer,
});

const wordProblem = (prompt, answer, wrong) => ({
  type: "word",
  prompt,
  choices: shuffleUnique([answer, ...wrong]),
  answer: String(answer),
});

function shuffleUnique(nums) {
  return [...new Set(nums.map(String))].sort(() => Math.random() - 0.5);
}

export function buildQuestionPool() {
  return [
    multiply(12, 8),
    multiply(15, 6),
    multiply(11, 9),
    multiply(24, 4),
    fractionCompare("3/5", "2/3", ">", "3/5"),
    fractionCompare("1/2", "3/8", ">", "1/2"),
    fractionCompare("4/6", "2/3", "=", "They are equal"),
    wordProblem(
      "A library has 6 shelves with 14 books each. How many books is that in all?",
      84,
      [68, 90, 20],
    ),
    wordProblem(
      "Mia had 45 stickers. She gave 18 to her brother. How many does she have left?",
      27,
      [33, 63, 18],
    ),
    wordProblem(
      "A recipe needs 3 cups of flour for each batch. How much flour is needed for 7 batches?",
      21,
      [10, 24, 28],
    ),
    wordProblem(
      "There are 8 rows of chairs with 9 chairs in each row. How many chairs are there?",
      72,
      [63, 81, 17],
    ),
  ];
}

export function pickQuestions(count = QUESTIONS_PER_SESSION) {
  return [...buildQuestionPool()].sort(() => Math.random() - 0.5).slice(0, count);
}
