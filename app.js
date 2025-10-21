// ---------- 1) DATE & TIME ----------
function formatNow(d = new Date()) {
  return d.toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' });
}
const nowEl = document.getElementById('now');
if (nowEl) {
  nowEl.textContent = formatNow();
  setInterval(() => (nowEl.textContent = formatNow()), 60_000);
}

// ---------- 2) BACKGROUND COLOR CHANGER ----------
const bgBtn = document.getElementById('bg-btn');
const bgReset = document.getElementById('bg-reset');
const originalBg = getComputedStyle(document.body).backgroundColor;
const palette = ['#0f1530','#111836','#0a0f12','#151c3d','#1a1f3f','#0e142c'];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
if (bgBtn) {
  bgBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = pick(palette);
  });
}
if (bgReset) {
  bgReset.addEventListener('click', () => {
    document.body.style.backgroundColor = originalBg || '';
  });
}

// ---------- 3) USER RANKING TABLE ----------
const users = [
  { name: 'John Doe', rank: '#1', exercises: 300 },
  { name: 'Alice Smith', rank: '#2', exercises: 290 },
  { name: 'Maria Lee', rank: '#3', exercises: 280 },
  { name: 'David Kim', rank: '#4', exercises: 270 },
  { name: 'Samir Ali', rank: '#5', exercises: 265 },
  { name: 'Nora Park', rank: '#6', exercises: 255 },
  { name: 'Liam Chen', rank: '#7', exercises: 245 },
  { name: 'Eva Brown', rank: '#8', exercises: 235 },
  { name: 'Olivia Cruz', rank: '#9', exercises: 225 },
  { name: 'Tom Brown', rank: '#10', exercises: 220 }
];

function updateRanking() {
  const table = document.getElementById('userTable');
  table.innerHTML = ''; // Clear the table
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${index + 1}</td><td>${user.name}</td><td>${user.rank}</td><td>${user.exercises}</td>`;
    table.appendChild(row);
  });
}
updateRanking(); // Initial ranking display

// ---------- 4) POPUP OPEN/CLOSE ----------
const popup = document.getElementById('popup');
const openBtn = document.getElementById('open-popup');

function openPopup() {
  popup.hidden = false;
  document.body.style.overflow = 'hidden';
  const first = popup.querySelector('input');
  if (first) first.focus();
}
function closePopup() {
  popup.hidden = true;
  document.body.style.overflow = '';
}

if (popup && openBtn) {
  const closeBtn = popup.querySelector('.popup-close');
  openBtn.addEventListener('click', openPopup);
  closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
  window.addEventListener('keydown', (e) => { if (!popup.hidden && e.key === 'Escape') closePopup(); });
}

// ---------- 5) FORM VALIDATION ----------
const form = document.getElementById('signup-form');
if (form) {
  const errMsg = form.querySelector('[data-error]');
  const okMsg = form.querySelector('[data-success]');

  function showError(msg) {
    if (okMsg) { okMsg.hidden = true; okMsg.textContent = ''; }
    if (errMsg) { errMsg.hidden = !msg; errMsg.textContent = msg || ''; }
  }
  function showSuccess(msg) {
    if (errMsg) { errMsg.hidden = true; errMsg.textContent = ''; }
    if (okMsg) { okMsg.hidden = !msg; okMsg.textContent = msg || ''; }
  }
  function emailValid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.elements.email.value.trim();
    const pass  = form.elements.password.value;
    const conf  = form.elements.confirm.value;

    form.querySelectorAll('input').forEach(i => i.classList.remove('is-invalid'));

    if (!emailValid(email)) {
      form.elements.email.classList.add('is-invalid');
      return showError('Please enter a valid email address.');
    }
    if (pass.length < 6) {
      form.elements.password.classList.add('is-invalid');
      return showError('Password must be at least 6 characters.');
    }
    if (pass !== conf) {
      form.elements.confirm.classList.add('is-invalid');
      return showError('Passwords do not match.');
    }

    showError('');
    showSuccess('Signed up successfully! (demo)');
    form.reset();
  });
}


