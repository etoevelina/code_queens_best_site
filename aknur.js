// POPUP LOGIC
const popup = document.getElementById('popupForm');
const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const emailInput = document.getElementById('subscriberEmail');

function openPopup() {
  popup.style.display = 'flex';
  emailInput.focus();
}

function closePopup() {
  popup.style.display = 'none';
}

if (openPopupBtn && closePopupBtn) {
  openPopupBtn.addEventListener('click', openPopup);
  closePopupBtn.addEventListener('click', closePopup);

  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });

  document.querySelector('.popup-content')?.addEventListener('click', (e) => e.stopPropagation());

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.style.display === 'flex') closePopup();
  });

  document.querySelector('#popupForm .btn.btn-success')?.addEventListener('click', () => {
    const val = emailInput.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (!ok) {
      emailInput.classList.add('is-invalid');
      emailInput.focus();
      return;
    }
    emailInput.classList.remove('is-invalid');
    alert('Thanks! You are subscribed.');
    closePopup();
  });
}

// RATING SYSTEM
const stars = document.querySelectorAll('.star');
const ratingText = document.getElementById('ratingText');

if (stars.length > 0) {
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = star.dataset.value;
      ratingText.textContent = `Your rating: ${rating}`;

      stars.forEach(s => s.style.color = s.dataset.value <= rating ? '#FFD700' : '#888');
    });
  });
}

// THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
  });
}

// READ MORE TOGGLE (About page)
const readMoreBtn = document.getElementById('readMoreBtn');
const extraText = document.getElementById('extraText');

if (readMoreBtn && extraText) {
  readMoreBtn.addEventListener('click', () => {
    const isHidden = extraText.style.display === 'none';
    extraText.style.display = isHidden ? 'inline' : 'none';
    readMoreBtn.textContent = isHidden ? 'Read Less' : 'Read More';
  });
}

// BACKGROUND COLOR CHANGE
(function () {
  const bgColors = ['#0b0e16', '#1e293b', '#0f172a', '#334155', '#020617', '#8b5cf6'];
  const btn = document.getElementById('bgChangeBtn');
  if (!btn) return;

  const saved = localStorage.getItem('ef_bg');
  if (saved) document.documentElement.style.setProperty('--bg', saved);

  btn.addEventListener('click', () => {
    const color = bgColors[Math.floor(Math.random() * bgColors.length)];
    document.documentElement.style.setProperty('--bg', color);
    localStorage.setItem('ef_bg', color);
  });
})();

// Temporary one-time color (no localStorage)
(function(){
  const bgOneColor = document.getElementById("bgChangeOneColor");
  if (bgOneColor) {
    bgOneColor.addEventListener('click', ()=>{
      document.body.style.backgroundColor = '#8b5cf6';
    });
  }
})();

// FOOTER DATE/TIME
(function () {
  const el = document.getElementById('currentDateTime');
  if (!el) return;

  function updateDateTime() {
    const now = new Date();
    el.textContent = now.toLocaleString('en-US', {
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

// OBJECTS & ARRAYS (DOM + console)
const user = {
  name: 'Aknur',
  level: 'Pro',
  greet() {
    return `Welcome back, ${this.name}! Your level: ${this.level}`;
  }
};

const greetEl = document.getElementById('userGreeting');
if (greetEl) {
  greetEl.textContent = user.greet();
} else {
  console.log(user.greet());
}

const programs = [
  { name: 'HIIT', type: 'Cardio' },
  { name: 'Yoga', type: 'Flexibility' },
  { name: 'Powerlifting', type: 'Strength' },
  { name: 'Pilates', type: 'Flexibility' },
  { name: 'CrossFit', type: 'Cardio' }
];

const sortedPrograms = programs
  .filter(p => p.name && p.type)             // filter
  .sort((a, b) => a.name.localeCompare(b.name)) // sort
  .map(p => `${p.name} — ${p.type}`);        // map

console.log('Programs:', sortedPrograms);

const programList = document.getElementById('programList');
if (programList) {
  programList.innerHTML = '';
  programs
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(p => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <span>${p.name}</span>
        <span class="badge bg-primary rounded-pill">${p.type}</span>
      `;
      programList.appendChild(li);
    });
}
