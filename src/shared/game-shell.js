export function createGameShell({ title, onBack }) {
  const root = document.createElement("div");
  root.className = "game-view";
  root.innerHTML = `
    <header class="game-header">
      <button type="button" class="btn-back" aria-label="Back to games">← Back</button>
      <h1 class="game-header__title"></h1>
    </header>
    <div class="game-content"></div>
  `;

  root.querySelector(".game-header__title").textContent = title;
  root.querySelector(".btn-back").addEventListener("click", onBack);

  return {
    root,
    content: root.querySelector(".game-content"),
  };
}

export function goHome(grade) {
  location.hash = `#/${grade}`;
}

export function goToGradePicker() {
  location.hash = "#/";
}
