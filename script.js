// Function to show game in fullscreen iframe
function beep(url) {
  document.getElementById('all').hidden = true;

  var iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.position = "absolute";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.zIndex = "1000";

  var closeButton = document.createElement("button");
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

// Function to sort all game tiles alphabetically by the text in <p>
function sortGames() {
  const grid = document.querySelector('.grid');
  const games = Array.from(grid.children);

  games.sort((a, b) => {
    const nameA = a.querySelector('p').textContent.toUpperCase();
    const nameB = b.querySelector('p').textContent.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  // Re-add sorted tiles to the grid
  grid.innerHTML = '';
  games.forEach(game => grid.appendChild(game));
}

// Run sorting and your existing onload logic
window.onload = () => {
  sortGames();
  if (typeof pass === "function") pass(); // your existing function
};

// Live search function
function setupSearch() {
  const searchInput = document.getElementById('search-bar');
  const games = document.querySelectorAll('.grid .game');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toUpperCase();

    games.forEach(game => {
      const name = game.querySelector('p').textContent.toUpperCase();
      if (name.includes(query)) {
        game.style.display = ''; // show matching
      } else {
        game.style.display = 'none'; // hide non-matching
      }
    });
  });
}

// Call search setup on page load
window.onload = () => {
  sortGames();          // your sorting function
  setupSearch();        // new search function
  if (typeof pass === "function") pass(); // existing logic
};
