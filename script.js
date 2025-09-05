// Function to show game in fullscreen iframe
function beep(url) {
  // Hide main content
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
  closeButton.style.top = "20px";
  closeButton.style.right = "20px";
  closeButton.style.zIndex = "1001";
  closeButton.style.padding = "12px 20px";
  closeButton.style.background = "rgba(0, 0, 0, 0.6)";
  closeButton.style.color = "#D0BF94";
  closeButton.style.border = "2px solid #B95A25";
  closeButton.style.borderRadius = "10px";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontFamily = "Bokor";
  closeButton.style.fontSize = "1rem";
  closeButton.style.transition = "all 0.2s ease";

  closeButton.onmouseover = () => {
    closeButton.style.background = "rgba(0, 0, 0, 0.8)";
    closeButton.style.boxShadow = "0 0 10px #B95A25";
  };
  closeButton.onmouseout = () => {
    closeButton.style.background = "rgba(0, 0, 0, 0.6)";
    closeButton.style.boxShadow = "none";
  };

  closeButton.onclick = function () {
    document.body.removeChild(iframe);
    document.body.removeChild(closeButton);
    document.getElementById('all').hidden = false;
  };

  document.body.appendChild(iframe);
  document.body.appendChild(closeButton);

  // Try loading iframe, if blocked by X-Frame-Options, open in new tab
  iframe.onload = function() {
    try {
      // Accessing contentDocument may throw if blocked
      const test = iframe.contentDocument.body;
    } catch (e) {
      // Remove iframe and open in new tab
      document.body.removeChild(iframe);
      document.body.removeChild(closeButton);
      document.getElementById('all').hidden = false;
      window.open(url, "_blank");
      alert("This game cannot be displayed in an iframe and has been opened in a new tab.");
    }
  };
}

// Function to sort game tiles
function sortGames() {
  const grid = document.querySelector('.grid');
  const games = Array.from(grid.children);

  const priorityTiles = games.filter(game => game.classList.contains('priority'));
  const normalTiles = games.filter(game => !game.classList.contains('priority'));

  normalTiles.sort((a, b) => {
    const nameA = a.querySelector('p').textContent.toUpperCase();
    const nameB = b.querySelector('p').textContent.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

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
  sortGames();
  setupSearch();
  if (typeof pass === "function") pass();
};
