// Function to show game in fullscreen iframe
function beep(url) {
  document.getElementById('all').hidden = true;

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.position = "absolute";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.zIndex = "1000";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Back";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.zIndex = "1001";
  closeButton.style.padding = "10px";
  closeButton.style.background = "black";
  closeButton.style.color = "white";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontFamily = "Bokor";

  closeButton.onclick = function () {
    document.body.removeChild(iframe);
    document.body.removeChild(closeButton);
    document.getElementById('all').hidden = false;
  };

  document.body.appendChild(iframe);
  document.body.appendChild(closeButton);
}

// Function to sort game tiles
function sortGames() {
  const grid = document.querySelector('.grid');
  const games = Array.from(grid.children);

  // Separate priority tiles from normal tiles
  const priorityTiles = games.filter(game => game.classList.contains('priority'));
  const normalTiles = games.filter(game => !game.classList.contains('priority'));

  // Sort normal tiles alphabetically by <p> text
  normalTiles.sort((a, b) => {
    const nameA = a.querySelector('p').textContent.toUpperCase();
    const nameB = b.querySelector('p').textContent.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  // Rebuild the grid: priority first, then sorted normal tiles
  grid.innerHTML = '';
  priorityTiles.forEach(game => grid.appendChild(game));
  normalTiles.forEach(game => grid.appendChild(game));
}

// Function to set up live search
function setupSearch() {
  const searchInput = document.getElementById('search-bar');
  const grid = document.querySelector('.grid');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toUpperCase();
    const games = grid.children;

    for (let game of games) {
      const name = game.querySelector('p').textContent.toUpperCase();
      game.style.display = name.includes(query) ? '' : 'none';
    }
  });
}

// Run everything on page load
window.onload = () => {
  sortGames();          // Sort tiles with priority first
  setupSearch();        // Enable live search
  if (typeof pass === "function") pass(); // existing onload function
};
