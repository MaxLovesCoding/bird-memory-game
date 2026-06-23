import { isSoundEnabled, SOUND_CHANGE_EVENT, toggleSound } from "./shared/sound.js";

function updateSoundButton(button) {
  const on = isSoundEnabled();
  button.textContent = on ? "🔊 Sound on" : "🔇 Sound off";
  button.setAttribute("aria-pressed", String(on));
  button.setAttribute("aria-label", on ? "Sound on. Tap to turn off." : "Sound off. Tap to turn on.");
}

export function mountHub(container, games) {
  container.innerHTML = `
    <div class="hub">
      <header class="hub__header">
        <button type="button" class="sound-toggle" id="sound-toggle" aria-pressed="true">🔊 Sound on</button>
        <h1 class="hub__title">🧸 Toy Box</h1>
        <p class="hub__subtitle">Pick a game to play!</p>
      </header>
      <div class="hub__grid hub__grid--five" role="list"></div>
    </div>
  `;

  const grid = container.querySelector(".hub__grid");
  const soundBtn = container.querySelector("#sound-toggle");

  updateSoundButton(soundBtn);
  soundBtn.addEventListener("click", () => {
    toggleSound();
    updateSoundButton(soundBtn);
  });

  const onSoundChange = () => updateSoundButton(soundBtn);
  window.addEventListener(SOUND_CHANGE_EVENT, onSoundChange);

  games.forEach(({ gameMeta }, index) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "hub-tile";
    if (index === games.length - 1 && games.length === 5) {
      tile.classList.add("hub-tile--wide");
    }
    tile.style.setProperty("--tile-color", gameMeta.color);
    tile.setAttribute("role", "listitem");
    tile.innerHTML = `
      <span class="hub-tile__emoji">${gameMeta.emoji}</span>
      <span class="hub-tile__title">${gameMeta.title}</span>
      <span class="hub-tile__desc">${gameMeta.description}</span>
    `;
    tile.addEventListener("click", () => {
      location.hash = `#/${gameMeta.id}`;
    });
    grid.appendChild(tile);
  });

  container._hubCleanup = () => {
    window.removeEventListener(SOUND_CHANGE_EVENT, onSoundChange);
  };
}

export function unmountHub(container) {
  container._hubCleanup?.();
}
