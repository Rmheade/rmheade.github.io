// Function to show game in fullscreen iframe with hover-reveal Back button
function beep(url) {
  // Hide main UI and prevent background scroll
  const appRoot = document.getElementById('all');
  appRoot.hidden = true;
  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  // Create fullscreen iframe
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.position = 'fixed';
  iframe.style.inset = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.zIndex = '1000';
  iframe.setAttribute('allowfullscreen', 'true');
  iframe.setAttribute('allow', 'fullscreen');

  // Create Back button (initially hidden)
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Back';
  closeButton.style.position = 'fixed';
  closeButton.style.top = '20px';
  closeButton.style.right = '20px';
  closeButton.style.zIndex = '1002';
  closeButton.style.padding = '12px 20px';
  closeButton.style.background = 'rgba(0, 0, 0, 0.6)';
  closeButton.style.color = '#D0BF94';
  closeButton.style.border = '2px solid #B95A25';
  closeButton.style.borderRadius = '10px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.fontFamily = 'Bokor';
  closeButton.style.fontSize = '1rem';
  closeButton.style.transition = 'opacity 0.25s ease, background 0.2s ease, box-shadow 0.2s ease';
  closeButton.style.opacity = '0';            // hidden
  closeButton.style.pointerEvents = 'none';   // non-interactive while hidden

  closeButton.onmouseover = () => {
    closeButton.style.background = 'rgba(0, 0, 0, 0.8)';
    closeButton.style.boxShadow = '0 0 10px #B95A25';
  };
  closeButton.onmouseout = () => {
    closeButton.style.background = 'rgba(0, 0, 0, 0.6)';
    closeButton.style.boxShadow = 'none';
  };

  // Invisible hover zone to detect cursor at top-right (sits ABOVE the iframe)
  const hoverZone = document.createElement('div');
  hoverZone.style.position = 'fixed';
  hoverZone.style.top = '0';
  hoverZone.style.right = '0';
  hoverZone.style.width = '160px';
  hoverZone.style.height = '160px';
  hoverZone.style.zIndex = '1001';     // above iframe, below button is fine
  hoverZone.style.background = 'transparent';
  hoverZone.style.pointerEvents = 'auto';

  let hideTimer = null;
  let overButton = false;

  function showButton() {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    closeButton.style.opacity = '1';
    closeButton.style.pointerEvents = 'auto';
  }

  function hideButtonSoon() {
    if (overButton) return; // don't hide while hovering the button
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!overButton) {
        closeButton.style.opacity = '0';
        closeButton.style.pointerEvents = 'none';
      }
    }, 400);
  }

  hoverZone.addEventListener('mouseenter', showButton);
  hoverZone.addEventListener('mouseleave', hideButtonSoon);
  closeButton.addEventListener('mouseenter', () => { overButton = true; showButton(); });
  closeButton.addEventListener('mouseleave', () => { overButton = false; hideButtonSoon(); });

  // Close logic
  closeButton.onclick = function () {
    document.body.removeChild(iframe);
    document.body.removeChild(closeButton);
    document.body.removeChild(hoverZone);
    appRoot.hidden = false;
    document.body.style.overflow = prevOverflow;
  };

  // Mount
  document.body.appendChild(iframe);
  document.body.appendChild(hoverZone);
  document.body.appendChild(closeButton);
}

// Function to sort game tiles
function sortAndFilterGames(query = '') {
  const grid = document.querySelector('.grid');
  const games = Array.from(grid.children);

  const priorityTiles = games.filter(game => game.classList.contains('priority'));
  const normalTiles = games.filter(game => !game.classList.contains('priority'));

  // Filter normal tiles by search query
  normalTiles.forEach(game => {
    const name = game.querySelector('p').textContent.toUpperCase();
    game.style.display = name.includes(query) ? '' : 'none';
  });

  // Clear grid and append tiles
  grid.innerHTML = '';
  priorityTiles.forEach(tile => grid.appendChild(tile)); // always first
  normalTiles.forEach(tile => {
    if (tile.style.display !== 'none') grid.appendChild(tile);
  });
}

function setupSearch() {
  const searchInput = document.getElementById('search-bar');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toUpperCase();
    sortAndFilterGames(query);
  });
}

// Run everything on page load
window.onload = () => {
  sortAndFilterGames(); // initial sort with no filter
  setupSearch();
  if (typeof pass === 'function') pass();
};


// Run everything on page load
window.onload = () => {
  sortGames();
  setupSearch();
  if (typeof pass === 'function') pass();
};
