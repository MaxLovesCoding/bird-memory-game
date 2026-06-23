import { createGameShell, goHome } from "../../shared/game-shell.js";
import { createWinOverlay } from "../../shared/win.js";
import { playChime, speakWord } from "../../shared/sound.js";
import { pickRounds, TOTAL_ROUNDS } from "./words.js";

export const gameMeta = {
  id: "spell",
  grade: "k",
  title: "Spell It",
  emoji: "✏️",
  description: "Fill the letter",
  color: "#38b2ac",
};

let cleanup = null;

export function mount(container) {
  document.body.dataset.theme = "spell";

  const shell = createGameShell({ title: "Spell It", onBack: () => goHome("k") });
  let round = 0;
  let rounds = pickRounds();
  let current = null;

  shell.content.innerHTML = `
    <p class="game-progress" id="spell-progress" aria-live="polite">Round 1 / ${TOTAL_ROUNDS}</p>
    <div class="quiz-prompt">
      <p class="quiz-prompt__target-emoji" id="spell-emoji">🐱</p>
      <p class="quiz-prompt__target-word" id="spell-word">_AT</p>
      <h2 class="quiz-prompt__title">Which letter?</h2>
    </div>
    <div class="choice-grid choice-grid--3" id="spell-choices"></div>
  `;

  const progress = shell.content.querySelector("#spell-progress");
  const emojiEl = shell.content.querySelector("#spell-emoji");
  const wordEl = shell.content.querySelector("#spell-word");
  const choicesEl = shell.content.querySelector("#spell-choices");

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
    progress.textContent = `Round ${round} / ${TOTAL_ROUNDS}`;
    emojiEl.textContent = current.emoji;
    wordEl.textContent = current.display;
    speakWord(current.word.toLowerCase());

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
    if (letter === current.answer) {
      playChime(700);
      btn.classList.add("choice-btn--correct");
      if (round >= TOTAL_ROUNDS) {
        setTimeout(() => {
          win.show({
            emoji: "🎉 ✏️ ⭐ 🎉",
            subtitle: "Great spelling!",
            confettiColors: ["#38b2ac", "#4fd1c5", "#faf089", "#63b3ed", "#9f7aea"],
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
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  };
}

export function unmount() {
  cleanup?.();
  cleanup = null;
}
