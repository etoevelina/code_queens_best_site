// date & time
function formatNow(d = new Date()) {
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const footerTimeEl = document.getElementById('footerTime');
if (footerTimeEl) {
  footerTimeEl.textContent = formatNow();
  setInterval(() => {
    footerTimeEl.textContent = formatNow();
  }, 60_000);
}

// user ranking table 
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

// theme toggle
(function initTheme(){
  const saved = localStorage.getItem('theme');
  const toggle = document.getElementById('themeToggle');

  if (saved === 'light') {
    document.body.classList.add('light-theme');
    if (toggle) toggle.textContent = '🌙';
  } else {
    document.body.classList.remove('light-theme');
    if (toggle) toggle.textContent = '🌞';
  }
})();

const toggle = document.getElementById('themeToggle');

function playClick() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.13);
  } catch (e) {}
}

if (toggle) {
  toggle.addEventListener('click', () => {
    playClick();
    const isLight = !document.body.classList.contains('light-theme');
    

    document.body.classList.toggle('light-theme');
    

    toggle.textContent = isLight ? '🌙' : '🌞';

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// accordion
document.addEventListener('DOMContentLoaded', function() {
  const accordionButtons = document.querySelectorAll('.accordion-button');
  
  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      playClick(); 
      
      const targetId = this.getAttribute('data-target');
      if (targetId) {
        const target = document.querySelector(targetId);
        const accordionItem = this.closest('.accordion-item');
        
        if (target) {

          const isCollapsed = this.classList.contains('collapsed');
          

          document.querySelectorAll('.accordion-collapse.show').forEach(openItem => {
            if (openItem.id !== targetId.replace('#', '')) {
              openItem.classList.remove('show');
              openItem.previousElementSibling.querySelector('.accordion-button').classList.add('collapsed');
            }
          });
          

          if (isCollapsed) {
            target.classList.add('show');
            this.classList.remove('collapsed');
            
            accordionItem.classList.add('pulse');
            setTimeout(() => {
              accordionItem.classList.remove('pulse');
            }, 600);
          } else {
            target.classList.remove('show');
            this.classList.add('collapsed');
          }
          
          this.setAttribute('aria-expanded', !isCollapsed);
        }
      }
    });
  });
  
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('fade-in');
  });
});

// additional animation
function bump(el) {
  if (!el) return;
  el.classList.remove('bump');
  el.offsetWidth;
  el.classList.add('bump');
}