import { mountGradePicker, unmountGradePicker } from "./grade-picker.js";
import { mountHub, unmountHub } from "./hub.js";
import {
  gamesByRoute,
  getHubConfig,
  LEGACY_ROUTES,
} from "./games/registry.js";

let activeGame = null;
let activeView = null;
let appEl = null;

function parseHash() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (parts.length === 0) return { type: "picker" };
  if (parts.length === 1) {
    const grade = parts[0];
    if (grade === "k" || grade === "g5") return { type: "hub", grade };
    if (LEGACY_ROUTES[parts[0]]) {
      return { type: "legacy", legacyId: parts[0] };
    }
    return { type: "invalid" };
  }
  if (parts.length === 2) {
    return { type: "game", routeKey: `${parts[0]}/${parts[1]}` };
  }
  return { type: "invalid" };
}

function unmountActive() {
  if (activeGame) {
    activeGame.unmount();
    activeGame = null;
  } else if (activeView === "hub") {
    unmountHub(appEl);
  } else if (activeView === "picker") {
    unmountGradePicker(appEl);
  }
  activeView = null;
  appEl.innerHTML = "";
}

function renderPicker() {
  document.title = "Learning Toy Box";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#ffd166");
  mountGradePicker(appEl);
  activeView = "picker";
}

function renderHub(grade) {
  const config = getHubConfig(grade);
  if (!config) {
    location.hash = "#/";
    return;
  }
  document.title = config.documentTitle;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", config.themeColor);
  mountHub(appEl, config);
  activeView = "hub";
}

function renderGame(routeKey) {
  const game = gamesByRoute[routeKey];
  if (!game) {
    location.hash = "#/";
    return;
  }
  document.title = `${game.gameMeta.title} | Learning Toy Box`;
  game.mount(appEl);
  activeGame = game;
}

export function initRouter(app) {
  appEl = app;

  function navigate() {
    const route = parseHash();
    unmountActive();

    if (route.type === "picker") {
      renderPicker();
      return;
    }

    if (route.type === "legacy") {
      location.hash = LEGACY_ROUTES[route.legacyId];
      return;
    }

    if (route.type === "hub") {
      renderHub(route.grade);
      return;
    }

    if (route.type === "game") {
      renderGame(route.routeKey);
      return;
    }

    location.hash = "#/";
  }

  window.addEventListener("hashchange", navigate);
  navigate();
}
