const DEFAULT_COLORS = ["#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#8338ec"];

export function createWinOverlay({ onPlayAgain, playAgainLabel = "Play again!" }) {
  const overlay = document.createElement("div");
  overlay.className = "overlay overlay--hidden";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="overlay__panel overlay__panel--win">
      <p class="overlay__emoji overlay__emoji--dance win-overlay__emoji" aria-hidden="true">🎉</p>
      <h2 class="overlay__title">You did it!</h2>
      <p class="overlay__subtitle win-overlay__subtitle"></p>
      <div class="confetti win-overlay__confetti" aria-hidden="true"></div>
      <button type="button" class="btn btn--play win-overlay__again">${playAgainLabel}</button>
    </div>
  `;

  const emojiEl = overlay.querySelector(".win-overlay__emoji");
  const subtitleEl = overlay.querySelector(".win-overlay__subtitle");
  const confettiEl = overlay.querySelector(".win-overlay__confetti");
  const againBtn = overlay.querySelector(".win-overlay__again");

  againBtn.addEventListener("click", onPlayAgain);

  function spawnConfetti(colors = DEFAULT_COLORS) {
    confettiEl.innerHTML = "";
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

  return {
    element: overlay,
    show({ emoji = "🎉", subtitle = "Great job!", confettiColors } = {}) {
      emojiEl.textContent = emoji;
      subtitleEl.textContent = subtitle;
      spawnConfetti(confettiColors ?? DEFAULT_COLORS);
      overlay.classList.remove("overlay--hidden");
      overlay.setAttribute("aria-hidden", "false");
    },
    hide() {
      overlay.classList.add("overlay--hidden");
      overlay.setAttribute("aria-hidden", "true");
    },
  };
}
