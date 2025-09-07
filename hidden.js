// ========================
// Password Setup
// ========================
const PASSWORD_HASH = "5d3017004abba56e7c08c25c89cefbd8d5eda88a90f87ad0bdd231b9d68c7b0b"; // SHA-256 of N0@dm1n

async function hashPassword(pwd) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pwd);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2,'0')).join('');
}

document.getElementById('password-submit').addEventListener('click', async () => {
  const input = document.getElementById('password-input').value;
  const hashed = await hashPassword(input);
  if (hashed === PASSWORD_HASH) {
    document.getElementById('password-screen').hidden = true;
    document.getElementById('all').hidden = false;
    initGames(); // initialize games after password is correct
  } else {
    const err = document.getElementById('password-error');
    err.style.display = 'block';
  }
});

// ========================
// Game data (hidden)
// ========================
const games = [
  { title: "Infinite Mario", url: "/pages/mario/main.html", img: "images/mario.jpg" },
  { title: "Geometry Dash", url: "/pages/geodash/index.html", img: "images/goedash.png" },
  { title: "Breakout", url: "/pages/breakout/index.html", img: "images/breakout.png" },
  // ...add all your other games here
];

// ========================
// Game loading
// ========================
function renderGames() {
  const grid = document.querySelector('.grid');
  grid.innerHTML = '';
  games.forEach(game => {
    const div = document.createElement('div');
    div.className = 'game';
    div.onclick = () => beep(game.url);
    div.innerHTML = `<img src="${game.img}" alt="${game.title}"><p>${game.title}</p>`;
    grid.appendChild(div);
  });
}

// ========================
// Search filter
// ========================
function setupSearch() {
  const input = document.getElementById('search-bar');
  input.addEventListener('input', () => {
    const query = input.value.toUpperCase();
    document.querySelectorAll('.game').forEach(g => {
      g.style.display = g.querySelector('p').textContent.toUpperCase().includes(query) ? '' : 'none';
    });
  });
}

// ========================
// Full page init after password
// ========================
function initGames() {
  renderGames();
  setupSearch();
}
