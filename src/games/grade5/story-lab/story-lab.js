import { createGameShell, goHome } from "../../../shared/game-shell.js";
import { createWinOverlay } from "../../../shared/win.js";
import { playChime, speakWord } from "../../../shared/sound.js";
import { pickSession, QUESTIONS_PER_SESSION, TYPE_LABELS } from "./passages.js";

export const gameMeta = {
  id: "read",
  grade: "g5",
  title: "Story Lab",
  emoji: "📖",
  description: "Understand the story",
  color: "#805ad5",
};

let cleanup = null;

export function mount(container) {
  document.body.dataset.theme = "g5-read";

  const shell = createGameShell({ title: "Story Lab", onBack: () => goHome("g5") });
  let round = 0;
  let session = pickSession();
  let current = null;

  shell.content.innerHTML = `
    <p class="game-progress" id="read-progress" aria-live="polite">Question 1 / ${QUESTIONS_PER_SESSION}</p>
    <article class="passage-card">
      <h2 class="passage-card__title" id="read-title"></h2>
      <p class="passage-card__text" id="read-text"></p>
    </article>
    <div class="quiz-prompt quiz-prompt--g5">
      <p class="question-tag" id="read-tag"></p>
      <h2 class="quiz-prompt__title quiz-prompt__title--g5" id="read-prompt"></h2>
    </div>
    <div class="choice-grid choice-grid--3" id="read-choices"></div>
  `;

  const progress = shell.content.querySelector("#read-progress");
  const titleEl = shell.content.querySelector("#read-title");
  const textEl = shell.content.querySelector("#read-text");
  const tagEl = shell.content.querySelector("#read-tag");
  const promptEl = shell.content.querySelector("#read-prompt");
  const choicesEl = shell.content.querySelector("#read-choices");

  titleEl.textContent = session.passage.title;
  textEl.textContent = session.passage.text;

  const win = createWinOverlay({
    onPlayAgain: () => {
      win.hide();
      round = 0;
      session = pickSession();
      titleEl.textContent = session.passage.title;
      textEl.textContent = session.passage.text;
      showRound();
    },
  });
  shell.root.appendChild(win.element);

  function showRound() {
    round += 1;
    current = session.questions[round - 1];
    progress.textContent = `Question ${round} / ${QUESTIONS_PER_SESSION}`;
    tagEl.textContent = TYPE_LABELS[current.type] ?? "Question";
    promptEl.textContent = current.prompt;
    speakWord(current.prompt);

    choicesEl.innerHTML = "";
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
    if (choice === current.answer) {
      playChime(620);
      btn.classList.add("choice-btn--correct");
      if (round >= QUESTIONS_PER_SESSION) {
        setTimeout(() => {
          win.show({
            emoji: "🎉 📖 ⭐ 🎉",
            subtitle: "Great reading!",
            confettiColors: ["#805ad5", "#b794f4", "#faf089", "#63b3ed", "#68d391"],
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
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  };
}

export function unmount() {
  cleanup?.();
  cleanup = null;
}
