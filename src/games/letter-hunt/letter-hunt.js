import { createGameShell, goHome } from "../../shared/game-shell.js";
import { createWinOverlay } from "../../shared/win.js";
import { playChime } from "../../shared/sound.js";
import { buildRound, TOTAL_ROUNDS } from "./letters.js";

export const gameMeta = {
  id: "letters",
  title: "Letter Hunt",
  emoji: "🔤",
  description: "Find the letter",
  color: "#9f7aea",
};

let cleanup = null;

export function mount(container) {
  document.body.dataset.theme = "letters";

  const shell = createGameShell({ title: "Letter Hunt", onBack: goHome });
  let round = 0;
  let current = null;

  shell.content.innerHTML = `
    <p class="game-progress" id="letter-progress" aria-live="polite">Round 1 / ${TOTAL_ROUNDS}</p>
    <div class="quiz-prompt">
      <h2 class="quiz-prompt__title" id="letter-target">Find A</h2>
    </div>
    <div class="choice-grid choice-grid--4" id="letter-choices"></div>
  `;

  const progress = shell.content.querySelector("#letter-progress");
  const targetEl = shell.content.querySelector("#letter-target");
  const choicesEl = shell.content.querySelector("#letter-choices");

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
    targetEl.textContent = `Find ${current.target}`;

    choicesEl.innerHTML = "";
    current.choices.forEach((letter) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn choice-btn--letter";
      btn.textContent = letter;
      btn.addEventListener("click", () => handlePick(letter, btn));
      choicesEl.appendChild(btn);
    });
  }

  function handlePick(letter, btn) {
    if (letter === current.target) {
      playChime(680);
      btn.classList.add("choice-btn--correct");
      if (round >= TOTAL_ROUNDS) {
        setTimeout(() => {
          win.show({
            emoji: "🎉 🔤 ✨ 🎉",
            subtitle: "You know your ABCs!",
            confettiColors: ["#9f7aea", "#b794f4", "#faf089", "#68d391", "#63b3ed"],
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
