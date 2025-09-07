// ========================
// Password Wall
// ========================
function pass() {
  const correctHash = '5d3017004abba56e7c08c25c89cefbd8d5eda88a90f87ad0bdd231b9d68c7b0b'; // SHA-256 of N0@dm1n
  const overlay = document.getElementById('password-overlay');
  const input = document.getElementById('password-input');
  const submit = document.getElementById('password-submit');
  const error = document.getElementById('password-error');

  function hashPassword(password) {
    return sha256(password); // uses js-sha256 library
  }

  submit.addEventListener('click', () => {
    const inputHash = hashPassword(input.value);
    if (inputHash === correctHash) {
      overlay.style.display = 'none';
    } else {
      error.textContent = 'Incorrect password';
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submit.click();
  });
}


// ========================
// Fullscreen iframe + Back button for games
// ========================
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
// Search + Sort
// ========================
let masterTiles = [];

function sortAndFilterGames(rawQuery = '') {
  const grid = document.querySelector('.grid');
  if (!grid) return;

  if (masterTiles.length === 0) {
    masterTiles = Array.from(grid.querySelectorAll('.game')).map(tile => ({
      node: tile,
      title: tile.querySelector('p')?.textContent?.trim() || '',
      isPriority: tile.classList.contains('priority')
    }));
  }

  const query = rawQuery.trim().toUpperCase();
  const visibleTiles = masterTiles.filter(t => query === '' || t.title.toUpperCase().includes(query));
  const priorityTiles = visibleTiles.filter(t => t.isPriority);
  const normalTiles = visibleTiles.filter(t => !t.isPriority);

  priorityTiles.sort((a,b)=>a.title.toUpperCase().localeCompare(b.title.toUpperCase()));
  normalTiles.sort((a,b)=>a.title.toUpperCase().localeCompare(b.title.toUpperCase()));

  grid.innerHTML = '';
  priorityTiles.forEach(t => grid.appendChild(t.node));
  normalTiles.forEach(t => grid.appendChild(t.node));

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

function setupSearch() {
  const searchInput = document.getElementById('search-bar');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => sortAndFilterGames(searchInput.value));
}

// ========================
// Header scroll effect
// ========================
const topHeader = document.getElementById('top-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) topHeader.classList.add('scrolled');
  else topHeader.classList.remove('scrolled');
});

// ========================
// Back-to-top button
// ========================
// Back-to-top button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');   // fade in
  } else {
    backToTop.classList.remove('visible'); // fade out
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ========================
// On page load
// ========================
window.onload = () => {
  sortAndFilterGames();
  setupSearch();
  if (typeof pass === 'function') pass();
};
