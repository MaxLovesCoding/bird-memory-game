import { createGameShell, goHome } from "../../../shared/game-shell.js";
import { createWinOverlay } from "../../../shared/win.js";
import { playChime } from "../../../shared/sound.js";
import { pickQuestions, QUESTIONS_PER_SESSION } from "./questions.js";

export const gameMeta = {
  id: "math",
  grade: "g5",
  title: "Math Challenge",
  emoji: "🧮",
  description: "Numbers and logic",
  color: "#4299e1",
};

let cleanup = null;

export function mount(container) {
  document.body.dataset.theme = "g5-math";

  const shell = createGameShell({ title: "Math Challenge", onBack: () => goHome("g5") });
  let round = 0;
  let questions = pickQuestions();
  let current = null;

  shell.content.innerHTML = `
    <p class="game-progress" id="math-progress" aria-live="polite">Question 1 / ${QUESTIONS_PER_SESSION}</p>
    <div class="quiz-prompt quiz-prompt--g5">
      <h2 class="quiz-prompt__title quiz-prompt__title--g5" id="math-prompt"></h2>
    </div>
    <div class="choice-grid choice-grid--math" id="math-choices"></div>
  `;

  const progress = shell.content.querySelector("#math-progress");
  const promptEl = shell.content.querySelector("#math-prompt");
  const choicesEl = shell.content.querySelector("#math-choices");

  const win = createWinOverlay({
    onPlayAgain: () => {
      win.hide();
      round = 0;
      questions = pickQuestions();
      showRound();
    },
  });
  shell.root.appendChild(win.element);

  function showRound() {
    round += 1;
    current = questions[round - 1];
    progress.textContent = `Question ${round} / ${QUESTIONS_PER_SESSION}`;
    promptEl.textContent = current.prompt;

    choicesEl.innerHTML = "";
    choicesEl.className = `choice-grid choice-grid--${Math.min(current.choices.length, 4)}`;

    current.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn choice-btn--text";
      btn.textContent = choice;
      btn.addEventListener("click", () => handleAnswer(choice, btn));
      choicesEl.appendChild(btn);
    });
  }

  function handleAnswer(choice, btn) {
    if (String(choice) === current.answer) {
      playChime(740);
      btn.classList.add("choice-btn--correct");
      if (round >= QUESTIONS_PER_SESSION) {
        setTimeout(() => {
          win.show({
            emoji: "🎉 🧮 ⭐ 🎉",
            subtitle: "Math master!",
            confettiColors: ["#4299e1", "#63b3ed", "#faf089", "#9f7aea", "#68d391"],
          });
        }, 400);
      } else {
        setTimeout(showRound, 500);
      }
    } else {
      btn.classList.add("choice-btn--shake");
      setTimeout(() => btn.classList.remove("choice-btn--shake"), 500);
    }
  }

  container.appendChild(shell.root);
  showRound();

  cleanup = () => {
    document.body.dataset.theme = "g5-hub";
  };
}

export function unmount() {
  cleanup?.();
  cleanup = null;
}
