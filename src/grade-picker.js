import { isSoundEnabled, SOUND_CHANGE_EVENT, toggleSound } from "./shared/sound.js";

function updateSoundButton(button) {
  const on = isSoundEnabled();
  button.textContent = on ? "🔊 Sound on" : "🔇 Sound off";
  button.setAttribute("aria-pressed", String(on));
  button.setAttribute("aria-label", on ? "Sound on. Tap to turn off." : "Sound off. Tap to turn on.");
}

export function mountGradePicker(container) {
  document.body.dataset.theme = "picker";

  container.innerHTML = `
    <div class="grade-picker">
      <header class="grade-picker__header">
        <button type="button" class="sound-toggle" id="sound-toggle" aria-pressed="true">🔊 Sound on</button>
        <h1 class="grade-picker__title">Learning Toy Box</h1>
        <p class="grade-picker__subtitle">Choose your grade level</p>
      </header>
      <div class="grade-picker__grid">
        <button type="button" class="grade-tile grade-tile--k" data-grade="k">
          <span class="grade-tile__emoji">🧸</span>
          <span class="grade-tile__title">Kindergarten</span>
          <span class="grade-tile__desc">Toy Box games for ages 4–6</span>
        </button>
        <button type="button" class="grade-tile grade-tile--g5" data-grade="g5">
          <span class="grade-tile__emoji">📚</span>
          <span class="grade-tile__title">5th Grade</span>
          <span class="grade-tile__desc">Math, reading, and spelling</span>
        </button>
      </div>
    </div>
  `;

  const soundBtn = container.querySelector("#sound-toggle");
  updateSoundButton(soundBtn);
  soundBtn.addEventListener("click", () => {
    toggleSound();
    updateSoundButton(soundBtn);
  });

  const onSoundChange = () => updateSoundButton(soundBtn);
  window.addEventListener(SOUND_CHANGE_EVENT, onSoundChange);

  container.querySelectorAll("[data-grade]").forEach((btn) => {
    btn.addEventListener("click", () => {
      location.hash = `#/${btn.dataset.grade}`;
    });
  });

  container._pickerCleanup = () => {
    window.removeEventListener(SOUND_CHANGE_EVENT, onSoundChange);
  };
}

export function unmountGradePicker(container) {
  container._pickerCleanup?.();
}
