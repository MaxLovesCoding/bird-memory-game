import "./styles.css";
import { DEFAULT_PAIR_COUNT, getBirdsForGame } from "./birds.js";

const board = document.getElementById("board");
const pairCounter = document.getElementById("pair-counter");
const startOverlay = document.getElementById("start-overlay");
const winOverlay = document.getElementById("win-overlay");
const playBtn = document.getElementById("play-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const confettiEl = document.getElementById("confetti");
const modeButtons = document.querySelectorAll(".mode-btn");

let pairCount = DEFAULT_PAIR_COUNT;
let cards = [];
let flipped = [];
let matchedCount = 0;
let lockInput = false;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildDeck(count) {
  const birds = getBirdsForGame(count);
  return shuffle(
    birds.flatMap((bird) => [
      { ...bird, uid: `${bird.id}-a` },
      { ...bird, uid: `${bird.id}-b` },
    ]),
  );
}

function updateCounter() {
  pairCounter.textContent = `Found: ${matchedCount} / ${pairCount}`;
}

function playMatchChime() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 660;
    gain.gain.value = 0.08;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // Audio is optional; ignore if blocked.
  }
}

function spawnConfetti() {
  confettiEl.innerHTML = "";
  const colors = ["#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#8338ec"];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti__piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.animationDuration = `${1.2 + Math.random()}s`;
    confettiEl.appendChild(piece);
  }
}

function showWin() {
  spawnConfetti();
  winOverlay.classList.remove("overlay--hidden");
  winOverlay.setAttribute("aria-hidden", "false");
}

function hideWin() {
  winOverlay.classList.add("overlay--hidden");
  winOverlay.setAttribute("aria-hidden", "true");
}

function hideStart() {
  startOverlay.classList.add("overlay--hidden");
  startOverlay.setAttribute("aria-hidden", "true");
}

function showStart() {
  startOverlay.classList.remove("overlay--hidden");
  startOverlay.setAttribute("aria-hidden", "false");
}

function renderBoard() {
  board.innerHTML = "";
  board.classList.toggle("board--six-pair", pairCount === 6);
  board.style.setProperty("--cols", pairCount === 6 ? 4 : Math.min(cards.length / 2, 4));

  cards.forEach((card, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card";
    button.dataset.index = String(index);
    button.setAttribute("aria-label", "Hidden bird card");

    button.innerHTML = `
      <span class="card__inner">
        <span class="card__face card__face--back" aria-hidden="true">🪺</span>
        <span class="card__face card__face--front" style="background:${card.color}">
          <span class="card__emoji">${card.emoji}</span>
          <span class="card__name">${card.name}</span>
        </span>
      </span>
    `;

    button.addEventListener("click", () => handleCardClick(index, button));
    board.appendChild(button);
  });
}

function setCardFlipped(button, flippedState) {
  button.classList.toggle("card--flipped", flippedState);
  button.setAttribute("aria-pressed", String(flippedState));
}

function setCardMatched(button) {
  button.classList.add("card--matched", "card--flipped");
  button.disabled = true;
  button.setAttribute("aria-label", `${button.querySelector(".card__name").textContent} matched`);
}

function handleCardClick(index, button) {
  if (lockInput) return;
  if (button.classList.contains("card--flipped")) return;
  if (button.classList.contains("card--matched")) return;
  if (flipped.length >= 2) return;

  setCardFlipped(button, true);
  flipped.push({ index, button, birdId: cards[index].id });

  if (flipped.length < 2) return;

  lockInput = true;
  const [first, second] = flipped;

  if (first.birdId === second.birdId) {
    playMatchChime();
    first.button.classList.add("card--bounce");
    second.button.classList.add("card--bounce");
    setTimeout(() => {
      setCardMatched(first.button);
      setCardMatched(second.button);
      matchedCount += 1;
      updateCounter();
      flipped = [];
      lockInput = false;

      if (matchedCount === pairCount) {
        setTimeout(showWin, 400);
      }
    }, 350);
    return;
  }

  setTimeout(() => {
    setCardFlipped(first.button, false);
    setCardFlipped(second.button, false);
    flipped = [];
    lockInput = false;
  }, 1000);
}

function startGame() {
  hideStart();
  hideWin();
  matchedCount = 0;
  flipped = [];
  lockInput = false;
  cards = buildDeck(pairCount);
  updateCounter();
  renderBoard();
}

function setPairCount(count) {
  pairCount = count;
  modeButtons.forEach((button) => {
    const selected = Number(button.dataset.pairs) === count;
    button.classList.toggle("mode-btn--active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPairCount(Number(button.dataset.pairs));
  });
});

playBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);

showStart();
board.innerHTML = "";
