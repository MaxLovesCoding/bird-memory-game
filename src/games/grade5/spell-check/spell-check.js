import { createGameShell, goHome } from "../../../shared/game-shell.js";
import { createWinOverlay } from "../../../shared/win.js";
import { playChime } from "../../../shared/sound.js";
import { pickRounds, ROUNDS_PER_SESSION } from "./words.js";

export const gameMeta = {
  id: "spell",
  grade: "g5",
  title: "Spell Check",
  emoji: "✍️",
  description: "Pick correct spelling",
  color: "#38b2ac",
};

let cleanup = null;

export function mount(container) {
  document.body.dataset.theme = "g5-spell";

  const shell = createGameShell({ title: "Spell Check", onBack: () => goHome("g5") });
  let round = 0;
  let rounds = pickRounds();
  let current = null;

  shell.content.innerHTML = `
    <p class="game-progress" id="g5-spell-progress" aria-live="polite">Round 1 / ${ROUNDS_PER_SESSION}</p>
    <div class="quiz-prompt quiz-prompt--g5">
      <h2 class="quiz-prompt__title quiz-prompt__title--g5">Which spelling is correct?</h2>
      <p class="quiz-prompt__hint" id="g5-spell-hint"></p>
    </div>
    <div class="choice-grid choice-grid--3" id="g5-spell-choices"></div>
  `;

  const progress = shell.content.querySelector("#g5-spell-progress");
  const hintEl = shell.content.querySelector("#g5-spell-hint");
  const choicesEl = shell.content.querySelector("#g5-spell-choices");

  const win = createWinOverlay({
    onPlayAgain: () => {
      win.hide();
      round = 0;
      rounds = pickRounds();
      showRound();
    },
  });
  shell.root.appendChild(win.element);

  function showRound() {
    round += 1;
    current = rounds[round - 1];
    progress.textContent = `Round ${round} / ${ROUNDS_PER_SESSION}`;
    hintEl.textContent = current.hint.replace("___", "______");

    choicesEl.innerHTML = "";
    current.choices.forEach((word) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn choice-btn--text";
      btn.textContent = word;
      btn.addEventListener("click", () => handlePick(word, btn));
      choicesEl.appendChild(btn);
    });
  }

  function handlePick(word, btn) {
    if (word === current.correct) {
      playChime(700);
      btn.classList.add("choice-btn--correct");
      if (round >= ROUNDS_PER_SESSION) {
        setTimeout(() => {
          win.show({
            emoji: "🎉 ✍️ ⭐ 🎉",
            subtitle: "Spelling superstar!",
            confettiColors: ["#38b2ac", "#4fd1c5", "#faf089", "#805ad5", "#63b3ed"],
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
