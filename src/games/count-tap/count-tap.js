import { createGameShell, goHome } from "../../shared/game-shell.js";
import { createWinOverlay } from "../../shared/win.js";
import { playChime } from "../../shared/sound.js";
import { buildRound, TOTAL_ROUNDS } from "./questions.js";

export const gameMeta = {
  id: "count",
  grade: "k",
  title: "Count & Tap",
  emoji: "🔢",
  description: "How many?",
  color: "#ed8936",
};

let cleanup = null;

export function mount(container) {
  document.body.dataset.theme = "count";

  const shell = createGameShell({ title: "Count & Tap", onBack: () => goHome("k") });
  let round = 0;
  let current = null;

  shell.content.innerHTML = `
    <p class="game-progress" id="count-progress" aria-live="polite">Round 1 / ${TOTAL_ROUNDS}</p>
    <div class="quiz-prompt">
      <h2 class="quiz-prompt__title">How many?</h2>
      <p class="quiz-prompt__objects" id="count-objects"></p>
    </div>
    <div class="choice-grid choice-grid--3" id="count-choices"></div>
  `;

  const progress = shell.content.querySelector("#count-progress");
  const objectsEl = shell.content.querySelector("#count-objects");
  const choicesEl = shell.content.querySelector("#count-choices");

  const win = createWinOverlay({
    onPlayAgain: () => {
      win.hide();
      round = 0;
      showRound();
    },
  });
  shell.root.appendChild(win.element);

  function showRound() {
    round += 1;
    current = buildRound();
    progress.textContent = `Round ${round} / ${TOTAL_ROUNDS}`;
    objectsEl.textContent = current.objects;

    choicesEl.innerHTML = "";
    current.answers.forEach((num) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn choice-btn--number";
      btn.textContent = String(num);
      btn.addEventListener("click", () => handleAnswer(num, btn));
      choicesEl.appendChild(btn);
    });
  }

  function handleAnswer(num, btn) {
    if (num === current.count) {
      playChime(720);
      btn.classList.add("choice-btn--correct");
      if (round >= TOTAL_ROUNDS) {
        setTimeout(() => {
          win.show({
            emoji: "🎉 🔢 ⭐ 🎉",
            subtitle: "You counted them all!",
            confettiColors: ["#ed8936", "#faf089", "#fc8181", "#68d391", "#63b3ed"],
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
    document.body.dataset.theme = "hub";
  };
}

export function unmount() {
  cleanup?.();
  cleanup = null;
}
