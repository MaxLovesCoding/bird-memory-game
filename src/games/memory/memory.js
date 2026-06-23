import { createGameShell, goHome } from "../../shared/game-shell.js";
import { createWinOverlay } from "../../shared/win.js";
import { playChime } from "../../shared/sound.js";
import { shuffle } from "../../shared/shuffle.js";
import {
  DEFAULT_PAIR_COUNT,
  DEFAULT_THEME_ID,
  getCardsForGame,
  getTheme,
} from "./themes.js";

export const gameMeta = {
  id: "memory",
  title: "Memory Match",
  emoji: "🃏",
  description: "Find the pairs",
  color: "#48bb78",
};

let cleanup = null;

export function mount(container) {
  const timeouts = [];
  const schedule = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timeouts.push(id);
    return id;
  };

  document.body.dataset.theme = DEFAULT_THEME_ID;

  const shell = createGameShell({
    title: "Memory Match",
    onBack: goHome,
  });

  let pairCount = DEFAULT_PAIR_COUNT;
  let themeId = DEFAULT_THEME_ID;
  let cards = [];
  let flipped = [];
  let matchedCount = 0;
  let lockInput = false;

  shell.content.innerHTML = `
    <p class="game-progress" id="memory-counter" aria-live="polite">Found: 0 / 4</p>
    <main class="board" id="memory-board" aria-label="Memory game board"></main>
    <div class="overlay" id="memory-start">
      <div class="overlay__panel">
        <p class="overlay__emoji memory-start-emoji" aria-hidden="true">🦜 🐧 🦉</p>
        <h2 class="overlay__title memory-start-title">Bird Match!</h2>
        <p class="overlay__subtitle memory-start-subtitle">Find the matching bird pairs</p>
        <div class="theme-picker" role="group" aria-label="Choose a theme">
          <button class="theme-btn theme-btn--active" type="button" data-theme="birds" aria-pressed="true">
            <span class="theme-btn__emoji">🐦</span> Birds
          </button>
          <button class="theme-btn" type="button" data-theme="insects" aria-pressed="false">
            <span class="theme-btn__emoji">🐛</span> Insects
          </button>
          <button class="theme-btn" type="button" data-theme="planets" aria-pressed="false">
            <span class="theme-btn__emoji">🪐</span> Planets
          </button>
        </div>
        <div class="mode-picker" role="group" aria-label="Choose game size">
          <button class="mode-btn mode-btn--active" type="button" data-pairs="4" aria-pressed="true">
            4 pairs <span class="mode-btn__hint">Easier</span>
          </button>
          <button class="mode-btn" type="button" data-pairs="6" aria-pressed="false">
            6 pairs <span class="mode-btn__hint memory-more-hint">More birds!</span>
          </button>
        </div>
        <button class="btn btn--play" type="button" id="memory-play">Play!</button>
      </div>
    </div>
  `;

  const board = shell.content.querySelector("#memory-board");
  const counter = shell.content.querySelector("#memory-counter");
  const startOverlay = shell.content.querySelector("#memory-start");
  const startEmoji = shell.content.querySelector(".memory-start-emoji");
  const startTitle = shell.content.querySelector(".memory-start-title");
  const startSubtitle = shell.content.querySelector(".memory-start-subtitle");
  const moreHint = shell.content.querySelector(".memory-more-hint");
  const modeButtons = shell.content.querySelectorAll(".mode-btn");
  const themeButtons = shell.content.querySelectorAll(".theme-btn");

  const win = createWinOverlay({
    onPlayAgain: () => {
      win.hide();
      startOverlay.classList.remove("overlay--hidden");
      startOverlay.setAttribute("aria-hidden", "false");
    },
  });

  shell.root.appendChild(win.element);

  function currentTheme() {
    return getTheme(themeId);
  }

  function buildDeck(count) {
    const items = getCardsForGame(themeId, count);
    return shuffle(
      items.flatMap((item) => [
        { ...item, uid: `${item.id}-a` },
        { ...item, uid: `${item.id}-b` },
      ]),
    );
  }

  function applyThemeToUi() {
    const theme = currentTheme();
    document.body.dataset.theme = theme.id;
    startEmoji.textContent = theme.startEmoji;
    startTitle.textContent = theme.title;
    startSubtitle.textContent = theme.subtitle;
    moreHint.textContent = theme.morePairsHint;
    shell.root.querySelector(".game-header__title").textContent = theme.title.replace("!", "");
  }

  function updateCounter() {
    counter.textContent = `Found: ${matchedCount} / ${pairCount}`;
  }

  function renderBoard() {
    const theme = currentTheme();
    board.innerHTML = "";
    board.classList.toggle("board--six-pair", pairCount === 6);
    board.style.setProperty("--cols", pairCount === 6 ? 4 : Math.min(cards.length / 2, 4));

    cards.forEach((card, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "card";
      button.setAttribute("aria-label", "Hidden card");
      button.innerHTML = `
        <span class="card__inner">
          <span class="card__face card__face--back" aria-hidden="true">${theme.cardBack}</span>
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

  function setCardFlipped(button, state) {
    button.classList.toggle("card--flipped", state);
    button.setAttribute("aria-pressed", String(state));
  }

  function setCardMatched(button) {
    button.classList.add("card--matched", "card--flipped");
    button.disabled = true;
  }

  function handleCardClick(index, button) {
    if (lockInput || button.classList.contains("card--flipped") || button.classList.contains("card--matched")) {
      return;
    }
    if (flipped.length >= 2) return;

    setCardFlipped(button, true);
    flipped.push({ button, cardId: cards[index].id });
    if (flipped.length < 2) return;

    lockInput = true;
    const [first, second] = flipped;

    if (first.cardId === second.cardId) {
      playChime(themeId === "planets" ? 520 : 660);
      first.button.classList.add("card--bounce");
      second.button.classList.add("card--bounce");
      schedule(() => {
        setCardMatched(first.button);
        setCardMatched(second.button);
        matchedCount += 1;
        updateCounter();
        flipped = [];
        lockInput = false;
        if (matchedCount === pairCount) {
          schedule(() => {
            const theme = currentTheme();
            const palettes = {
              birds: ["#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#8338ec"],
              insects: ["#68d391", "#faf089", "#f687b3", "#9ae6b4", "#f6ad55"],
              planets: ["#faf089", "#90cdf4", "#fbd38d", "#b794f4", "#fc8181"],
            };
            win.show({
              emoji: theme.winEmoji,
              subtitle: theme.winSubtitle,
              confettiColors: palettes[themeId],
            });
          }, 400);
        }
      }, 350);
      return;
    }

    schedule(() => {
      setCardFlipped(first.button, false);
      setCardFlipped(second.button, false);
      flipped = [];
      lockInput = false;
    }, 1000);
  }

  function startGame() {
    applyThemeToUi();
    startOverlay.classList.add("overlay--hidden");
    startOverlay.setAttribute("aria-hidden", "true");
    win.hide();
    matchedCount = 0;
    flipped = [];
    lockInput = false;
    cards = buildDeck(pairCount);
    updateCounter();
    renderBoard();
  }

  function setPairCount(count) {
    pairCount = count;
    modeButtons.forEach((btn) => {
      const selected = Number(btn.dataset.pairs) === count;
      btn.classList.toggle("mode-btn--active", selected);
      btn.setAttribute("aria-pressed", String(selected));
    });
  }

  function setTheme(nextId) {
    themeId = nextId;
    themeButtons.forEach((btn) => {
      const selected = btn.dataset.theme === nextId;
      btn.classList.toggle("theme-btn--active", selected);
      btn.setAttribute("aria-pressed", String(selected));
    });
    applyThemeToUi();
  }

  const onThemeClick = (e) => {
    const btn = e.target.closest("[data-theme]");
    if (btn) setTheme(btn.dataset.theme);
  };
  const onModeClick = (e) => {
    const btn = e.target.closest("[data-pairs]");
    if (btn) setPairCount(Number(btn.dataset.pairs));
  };
  const onPlay = () => startGame();

  shell.content.querySelector("#memory-play").addEventListener("click", onPlay);
  shell.content.querySelector(".theme-picker").addEventListener("click", onThemeClick);
  shell.content.querySelector(".mode-picker").addEventListener("click", onModeClick);

  setTheme(DEFAULT_THEME_ID);
  container.appendChild(shell.root);

  cleanup = () => {
    timeouts.forEach(clearTimeout);
    document.body.dataset.theme = "hub";
  };
}

export function unmount() {
  cleanup?.();
  cleanup = null;
}
