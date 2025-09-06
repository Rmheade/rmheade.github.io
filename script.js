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

// Function to sort and filter game tiles
function sortAndFilterGames(rawQuery = '') {
  const grid = document.querySelector('.grid');
  if (!grid) return;

  const wrappers = Array.from(grid.children).filter(n => n.nodeType === Node.ELEMENT_NODE);

  const tiles = wrappers.map(node => {
    const innerGame = node.classList.contains('game') ? node : node.querySelector('.game') || node;
    const title = innerGame?.querySelector('p')?.textContent?.trim() || '';
    const isPriority = innerGame?.classList?.contains('priority');
    return { node, title, isPriority };
  });

  const query = rawQuery.toUpperCase();

  const priorityTiles = tiles.filter(t => t.isPriority);
  const normalTiles = tiles.filter(t => !t.isPriority);

  normalTiles.forEach(t => {
    const match = query === '' || t.title.toUpperCase().includes(query);
    t.node.style.display = match ? '' : 'none';
  });

  priorityTiles.forEach(t => { t.node.style.display = ''; });

  const visibleNormal = normalTiles
    .filter(t => t.node.style.display !== 'none')
    .sort((a, b) => a.title.toUpperCase().localeCompare(b.title.toUpperCase()));

  const frag = document.createDocumentFragment();
  priorityTiles.forEach(t => frag.appendChild(t.node));
  visibleNormal.forEach(t => frag.appendChild(t.node));
  grid.innerHTML = '';
  grid.appendChild(frag);
}

function setupSearch() {
  const searchInput = document.getElementById('search-bar');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
    sortAndFilterGames(searchInput.value);
  });
}

// Run on page load
window.onload = () => {
  sortAndFilterGames();
  setupSearch();
  if (typeof pass === 'function') pass();
};

// ===== Header background on scroll =====
const topHeader = document.getElementById('top-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    topHeader.classList.add('scrolled');
  } else {
    topHeader.classList.remove('scrolled');
  }
});
