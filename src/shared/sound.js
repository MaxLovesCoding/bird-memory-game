const STORAGE_KEY = "toybox-sound-enabled";
export const SOUND_CHANGE_EVENT = "toybox-soundchange";

export function isSoundEnabled() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return true;
    return stored === "true";
  } catch {
    return true;
  }
}

export function setSoundEnabled(on) {
  try {
    localStorage.setItem(STORAGE_KEY, String(on));
  } catch {
    // Ignore storage failures.
  }
  window.dispatchEvent(new CustomEvent(SOUND_CHANGE_EVENT, { detail: { enabled: on } }));
}

export function toggleSound() {
  const next = !isSoundEnabled();
  setSoundEnabled(next);
  return next;
}

export function playChime(frequency = 660) {
  if (!isSoundEnabled()) return;
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.value = 0.08;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // Audio is optional.
  }
}

export function speakWord(text) {
  if (!isSoundEnabled()) return;
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  } catch {
    // Speech is optional.
  }
}
