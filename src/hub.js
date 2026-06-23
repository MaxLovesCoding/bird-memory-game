export function mountHub(container, games) {
  container.innerHTML = `
    <div class="hub">
      <header class="hub__header">
        <h1 class="hub__title">🧸 Toy Box</h1>
        <p class="hub__subtitle">Pick a game to play!</p>
      </header>
      <div class="hub__grid" role="list"></div>
    </div>
  `;

  const grid = container.querySelector(".hub__grid");

  games.forEach(({ gameMeta }) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "hub-tile";
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
}
