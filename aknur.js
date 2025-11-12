const stars = document.querySelectorAll('.star');
const ratingText = document.getElementById('ratingText');


if (stars.length > 0) {
  stars.forEach(star => {
    star.addEventListener('click', () => {
       playClick();
      const rating = star.dataset.value;
      ratingText.textContent = `Your rating: ${rating}`;

      stars.forEach(s => s.style.color = s.dataset.value <= rating ? '#FFD700' : '#888');
    });
  });
}

// THEME TOGGLE
(function initTheme(){
  const saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
  if (saved === 'light') {
    document.body.classList.add('light-theme');
  }
})();

const toggle = document.getElementById('themeToggle');
toggle?.addEventListener('click', () => {
   playClick();
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// READ MORE TOGGLE (About page)
const readMoreBtn = document.getElementById('readMoreBtn');
const extraText = document.getElementById('extraText');

if (readMoreBtn && extraText) {
  readMoreBtn.addEventListener('click', () => {
    playClick();
    bump(readMoreBtn);
    const isHidden = extraText.style.display === 'none';
    extraText.style.display = isHidden ? 'inline' : 'none';
    readMoreBtn.textContent = isHidden ? 'Read Less' : 'Read More';
  });
}

// BACKGROUND COLOR CHANGE (local storage)
(function () {
  const bgColors = ['#0b0e16', '#1e293b', '#0f172a', '#334155', '#020617', '#8b5cf6'];
  const btn = document.getElementById('bgChangeBtn');
  if (!btn) return;

  const saved = localStorage.getItem('ef_bg');
  if (saved) document.documentElement.style.setProperty('--bg', saved);

  btn.addEventListener('click', () => {
    playClick();
    const color = bgColors[Math.floor(Math.random() * bgColors.length)];
    document.documentElement.style.setProperty('--bg', color);
    localStorage.setItem('ef_bg', color);
  });
})();

// Temporary one-time color (no localStorage)
// (function(){
//   const bgOneColor = document.getElementById("bgChangeOneColor");
//   if (bgOneColor) {
//     bgOneColor.addEventListener('click', ()=>{
//       document.body.style.backgroundColor = '#8b5cf6';
//     });
//   }
// })();

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

// console.log(programs[0].name); // HIIT
// console.log(programs[1].type); // Flexibility
// programs.forEach(p => console.log(p.name));


const sortedPrograms = programs
  .filter(p => p.name && p.type)
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(p => `${p.name} — ${p.type}`);

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

const clickSound = new Audio('assets/aknurclick.mp3');
function playClick() {
  try {
    clickSound.currentTime = 0;
    clickSound.play();
  } catch (_) {}
}

function bump(el) {
  if (!el) return;
  el.classList.remove('bump');
  el.offsetWidth; 
  el.classList.add('bump');
}

(function setupCategorySwitch(){
  const btns = document.querySelectorAll('.category-btn');
  const out = document.getElementById('categoryContent');
  if (!btns.length || !out) return;

  const categoryTexts = {
    sports: [
      'Strength programming 5x5 starts Monday.',
      'New assault bikes in Cardio Park.',
      'Saturday community run 5 km at 9:00.'
    ],
    tech: [
      'New tracking dashboard released.',
      'Face ID access improvements this week.',
      'Heart-rate live tiles rolled out to all treadmills.'
    ],
    health: [
      'Mobility & recovery workshop on Sunday.',
      'Nutrition seminar: Proteins & timing.',
      'Sauna maintenance complete. Back online.'
    ]
  };

  function renderList(items) {
    const html = `
      <ul class="list-group">
        ${items.map(i => `<li class="list-group-item bg-transparent text-white border-secondary">${i}</li>`).join('')}
      </ul>
    `;
    out.innerHTML = html;
    out.classList.remove('fade-in');
    // reflow, eslint-disable-next-line no-unused-expressions
    out.offsetWidth;
    out.classList.add('fade-in');
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      playClick(); 
      bump(btn); 

      const category = btn.dataset.category;
      switch (category) {
        case 'sports':
          renderList(categoryTexts.sports);
          break;
        case 'tech':
          renderList(categoryTexts.tech);
          break;
        case 'health':
          renderList(categoryTexts.health);
          break;
        case 'clear':
        default:
          out.innerHTML = '';
          out.classList.remove('fade-in');
      }
    });
  });
})();

