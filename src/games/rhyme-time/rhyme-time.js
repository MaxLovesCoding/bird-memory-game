import { createGameShell, goHome } from "../../shared/game-shell.js";
import { createWinOverlay } from "../../shared/win.js";
import { playChime, speakWord } from "../../shared/sound.js";
import { buildChoices, pickSets, TOTAL_ROUNDS } from "./rhymes.js";

export const gameMeta = {
  id: "rhyme",
  grade: "k",
  title: "Rhyme Time",
  emoji: "🎵",
  description: "Which rhymes?",
  color: "#ed64a6",
};

let cleanup = null;

export function mount(container) {
  document.body.dataset.theme = "rhyme";

  const shell = createGameShell({ title: "Rhyme Time", onBack: () => goHome("k") });
  let round = 0;
  let sets = pickSets();
  let current = null;

  shell.content.innerHTML = `
    <p class="game-progress" id="rhyme-progress" aria-live="polite">Round 1 / ${TOTAL_ROUNDS}</p>
    <div class="quiz-prompt">
      <p class="quiz-prompt__target-word" id="rhyme-target-word">CAT</p>
      <p class="quiz-prompt__target-emoji" id="rhyme-target-emoji">🐱</p>
      <h2 class="quiz-prompt__title">Which rhymes?</h2>
    </div>
    <div class="choice-grid choice-grid--3" id="rhyme-choices"></div>
  `;

  const progress = shell.content.querySelector("#rhyme-progress");
  const wordEl = shell.content.querySelector("#rhyme-target-word");
  const emojiEl = shell.content.querySelector("#rhyme-target-emoji");
  const choicesEl = shell.content.querySelector("#rhyme-choices");

  const win = createWinOverlay({
    onPlayAgain: () => {
      win.hide();
      round = 0;
      sets = pickSets();
      showRound();
    },
  });
  shell.root.appendChild(win.element);

  function showRound() {
    round += 1;
    current = sets[round - 1];
    progress.textContent = `Round ${round} / ${TOTAL_ROUNDS}`;
    wordEl.textContent = current.target.word;
    emojiEl.textContent = current.target.emoji;
    speakWord(current.target.word.toLowerCase());

    choicesEl.innerHTML = "";
    buildChoices(current).forEach((choice) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn choice-btn--word";
      btn.innerHTML = `<span class="choice-btn__emoji">${choice.emoji}</span><span class="choice-btn__label">${choice.word}</span>`;
      btn.addEventListener("click", () => handlePick(choice.word, btn));
      choicesEl.appendChild(btn);
    });
  }

  function handlePick(word, btn) {
    if (word === current.rhyme.word) {
      playChime(640);
      btn.classList.add("choice-btn--correct");
      if (round >= TOTAL_ROUNDS) {
        setTimeout(() => {
          win.show({
            emoji: "🎉 🎵 ✨ 🎉",
            subtitle: "You're a rhyming star!",
            confettiColors: ["#ed64a6", "#f687b3", "#faf089", "#9f7aea", "#63b3ed"],
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
