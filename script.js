// Function to show game in fullscreen iframe with hover-reveal Back button
function beep(url) {
  const appRoot = document.getElementById('all');
  appRoot.hidden = true;
  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

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
  closeButton.style.opacity = '0';
  closeButton.style.pointerEvents = 'none';

  closeButton.onmouseover = () => {
    closeButton.style.background = 'rgba(0, 0, 0, 0.8)';
    closeButton.style.boxShadow = '0 0 10px #B95A25';
  };
  closeButton.onmouseout = () => {
    closeButton.style.background = 'rgba(0, 0, 0, 0.6)';
    closeButton.style.boxShadow = 'none';
  };

  const hoverZone = document.createElement('div');
  hoverZone.style.position = 'fixed';
  hoverZone.style.top = '0';
  hoverZone.style.right = '0';
  hoverZone.style.width = '160px';
  hoverZone.style.height = '160px';
  hoverZone.style.zIndex = '1001';
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
    if (overButton) return;
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

  closeButton.onclick = function () {
    document.body.removeChild(iframe);
    document.body.removeChild(closeButton);
    document.body.removeChild(hoverZone);
    appRoot.hidden = false;
    document.body.style.overflow = prevOverflow;
  };

  document.body.appendChild(iframe);
  document.body.appendChild(hoverZone);
  document.body.appendChild(closeButton);
}

// ========================
// Search + Sort + "No results"
// ========================

// Keep a master list of tiles so we can always rebuild
let masterTiles = [];

function sortAndFilterGames(rawQuery = '') {
  const grid = document.querySelector('.grid');
  if (!grid) return;

  // Build masterTiles if empty (first run)
  if (masterTiles.length === 0) {
    masterTiles = Array.from(grid.querySelectorAll('.game')).map(tile => ({
      node: tile,
      title: tile.querySelector('p')?.textContent?.trim() || '',
      isPriority: tile.classList.contains('priority')
    }));
  }

  const query = rawQuery.trim().toUpperCase();

  // Filter tiles
  const visibleTiles = masterTiles.filter(t => query === '' || t.title.toUpperCase().includes(query));

  // Separate priority and normal tiles
  const priorityTiles = visibleTiles.filter(t => t.isPriority);
  const normalTiles = visibleTiles.filter(t => !t.isPriority);

  // Sort alphabetically
  priorityTiles.sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase()));
  normalTiles.sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase()));

  // Rebuild grid
  grid.innerHTML = '';
  priorityTiles.forEach(t => grid.appendChild(t.node));
  normalTiles.forEach(t => grid.appendChild(t.node));

  // "No results found"
  let noResults = document.getElementById('no-results');
  if (!noResults) {
    noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.style.textAlign = 'center';
    noResults.style.fontSize = '1.2rem';
    noResults.style.fontWeight = 'bold';
    noResults.style.padding = '20px';
    noResults.style.color = '#B95A25';
    grid.parentNode.insertBefore(noResults, grid.nextSibling);
  }

  noResults.textContent = (query !== '' && visibleTiles.length === 0) ? 'No results found' : '';
}

// Setup search input
function setupSearch() {
  const searchInput = document.getElementById('search-bar');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => sortAndFilterGames(searchInput.value));
}

// Run on page load
window.onload = () => {
  sortAndFilterGames();
  setupSearch();
  if (typeof pass === 'function') pass();
};

// Header background on scroll
const topHeader = document.getElementById('top-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) topHeader.classList.add('scrolled');
  else topHeader.classList.remove('scrolled');
});
