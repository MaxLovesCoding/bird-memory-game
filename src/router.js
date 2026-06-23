import { mountHub } from "./hub.js";
import { games, gamesById } from "./games/registry.js";

let activeGame = null;
let appEl = null;

function getRoute() {
  return location.hash.replace(/^#\/?/, "").split("/")[0] || "";
}

function unmountActive() {
  if (activeGame) {
    activeGame.unmount();
    activeGame = null;
  }
  appEl.innerHTML = "";
}

function renderHub() {
  document.body.dataset.theme = "hub";
  document.title = "Toy Box";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#ffd166");
  mountHub(appEl, games);
}

function renderGame(route) {
  const game = gamesById[route];
  if (!game) {
    location.hash = "#/";
    return;
  }
  document.title = `${game.gameMeta.title} | Toy Box`;
  game.mount(appEl);
  activeGame = game;
}

export function initRouter(app) {
  appEl = app;

  function navigate() {
    const route = getRoute();
    unmountActive();

    if (!route) {
      renderHub();
      return;
    }

    renderGame(route);
  }

  window.addEventListener("hashchange", navigate);
  navigate();
}
