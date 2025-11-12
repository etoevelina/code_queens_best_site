// =========================================================
// 1️⃣ DATE & TIME
// =========================================================
function formatNow(d = new Date()) {
  return d.toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' });
}
const nowEl = document.getElementById('now');
if (nowEl) {
  nowEl.textContent = formatNow();
  setInterval(() => (nowEl.textContent = formatNow()), 60_000);
}

// =========================================================
// 2️⃣ BACKGROUND COLOR CHANGER (Body + Header)
// =========================================================
const bgBtn = document.getElementById('bg-btn');
const bgReset = document.getElementById('bg-reset');
const palette = ['#0f1530', '#111836', '#0a0f12', '#151c3d', '#1a1f3f', '#0e142c'];
const header = document.querySelector('.bg-nav');
const originalBodyBg = getComputedStyle(document.body).backgroundColor;
const originalHeaderBg = header ? getComputedStyle(header).background : '';

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

if (bgBtn) {
  bgBtn.addEventListener('click', () => {
    const newColor = pick(palette);
    document.body.style.backgroundColor = newColor;
    if (header) header.style.background = newColor;
  });
}

if (bgReset) {
  bgReset.addEventListener('click', () => {
    document.body.style.backgroundColor = originalBodyBg || '';
    if (header) header.style.background = originalHeaderBg || '';
  });
}

// =========================================================
// 3️⃣ USER RANKING TABLE
// =========================================================
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
  if (!table) return;
  table.innerHTML = '';
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.rank}</td>
      <td>${user.exercises}</td>`;
    table.appendChild(row);
  });
}
updateRanking();

// =========================================================
// 4️⃣ POPUP OPEN/CLOSE
// =========================================================
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
  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });
  window.addEventListener('keydown', (e) => {
    if (!popup.hidden && e.key === 'Escape') closePopup();
  });
}

// =========================================================
// 5️⃣ FORM VALIDATION
// =========================================================
const form = document.getElementById('signup-form');
if (form) {
  const errMsg = form.querySelector('[data-error]');
  const okMsg = form.querySelector('[data-success]');

  function showError(msg) {
    if (okMsg) {
      okMsg.hidden = true;
      okMsg.textContent = '';
    }
    if (errMsg) {
      errMsg.hidden = !msg;
      errMsg.textContent = msg || '';
    }
  }

  function showSuccess(msg) {
    if (errMsg) {
      errMsg.hidden = true;
      errMsg.textContent = '';
    }
    if (okMsg) {
      okMsg.hidden = !msg;
      okMsg.textContent = msg || '';
    }
  }

  function emailValid(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.elements.email.value.trim();
    const pass = form.elements.password.value;
    const conf = form.elements.confirm.value;

    form.querySelectorAll('input').forEach((i) => i.classList.remove('is-invalid'));

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

// =========================================================
// 🌞 / 🌙 THEME TOGGLE (Full Page + Header + Footer)
// =========================================================
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const body = document.body;
  const header = document.querySelector(".bg-nav");
  const toggle = document.getElementById("themeToggle");
  const loginBtn = document.querySelector('.auth a[href="login.html"]');
  const signupBtn = document.querySelector('.auth a[href="signup.html"]');
  const footer = document.querySelector(".site-footer");

  function applyTheme(isLight) {
    if (isLight) {
      // --- Light mode ---
      body.classList.add("light-theme");
      body.style.backgroundColor = "#f3f4ff";
      if (header) header.style.background = "#4a369c";
      if (footer) footer.style.background = "#ede9ff";
      if (loginBtn) loginBtn.style.color = "#fff";
      if (signupBtn) signupBtn.style.color = "#fff";
      if (toggle) toggle.textContent = "🌚 / ☀️";
    } else {
      // --- Dark mode ---
      body.classList.remove("light-theme");
      body.style.backgroundColor = "#0f1115";
      if (header)
        header.style.background =
          "linear-gradient(180deg, rgba(17,24,39,.85), rgba(17,24,39,.55) 60%, transparent)";
      if (footer)
        footer.style.background = "color-mix(in oklab, var(--bg), #000 2%)";
      if (loginBtn) loginBtn.style.color = "#fff";
      if (signupBtn) signupBtn.style.color = "#fff";
      if (toggle) toggle.textContent = "☀️ / 🌙";
    }
  }

  // Initialize theme
  applyTheme(saved === "light");

  // Toggle handler
  toggle?.addEventListener("click", () => {
    playClick();
    const isLight = !body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    applyTheme(isLight);
  });
})();

// ===== Footer Date =====
(function () {
  const footerTime = document.getElementById('footerTime');
  if (!footerTime) return;

  function updateDateTime() {
    const now = new Date();
    footerTime.textContent = now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  updateDateTime();
  setInterval(updateDateTime, 60000);
})();