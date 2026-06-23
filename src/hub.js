import { isSoundEnabled, SOUND_CHANGE_EVENT, toggleSound } from "./shared/sound.js";
import { goToGradePicker } from "./shared/game-shell.js";

function updateSoundButton(button) {
  const on = isSoundEnabled();
  button.textContent = on ? "🔊 Sound on" : "🔇 Sound off";
  button.setAttribute("aria-pressed", String(on));
  button.setAttribute("aria-label", on ? "Sound on. Tap to turn off." : "Sound off. Tap to turn on.");
}

export function mountHub(container, { grade, title, subtitle, games, theme = "hub" }) {
  document.body.dataset.theme = theme;

  container.innerHTML = `
    <div class="hub">
      <header class="hub__header">
        <button type="button" class="btn-switch-grade">Switch grade</button>
        <button type="button" class="sound-toggle" id="sound-toggle" aria-pressed="true">🔊 Sound on</button>
        <h1 class="hub__title">${title}</h1>
        <p class="hub__subtitle">${subtitle}</p>
      </header>
      <div class="hub__grid" role="list"></div>
    </div>
  `;

  const grid = container.querySelector(".hub__grid");
  const soundBtn = container.querySelector("#sound-toggle");

  updateSoundButton(soundBtn);
  soundBtn.addEventListener("click", () => {
    toggleSound();
    updateSoundButton(soundBtn);
  });

  container.querySelector(".btn-switch-grade").addEventListener("click", goToGradePicker);

  const onSoundChange = () => updateSoundButton(soundBtn);
  window.addEventListener(SOUND_CHANGE_EVENT, onSoundChange);

  const count = games.length;
  if (count % 2 === 1) {
    grid.classList.add("hub__grid--odd");
  }

  games.forEach(({ gameMeta }, index) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "hub-tile";
    if (count % 2 === 1 && index === count - 1) {
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
      location.hash = `#/${grade}/${gameMeta.id}`;
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
