(function () {
  const el = document.getElementById('currentDateTime');
  if (!el) return;
  function updateDateTime() {
    const now = new Date();
    el.textContent = now.toLocaleString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
  updateDateTime();
  setInterval(updateDateTime, 60000);
})();

const clickSound = new Audio('assets/aknurclick.mp3');
function playClick() {
  try {
    clickSound.currentTime = 0;
    clickSound.play();
  } catch (_) {}
}

(function initTheme(){
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-theme');
    document.documentElement.classList.add('light-theme');
  }
})();

(function() {
  let toggleAttached = false;
  
  function attachToggle() {
    if (toggleAttached) return;
    
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggleAttached = true;
      toggle.addEventListener('click', () => {
        playClick();
        document.body.classList.toggle('light-theme');
        document.documentElement.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      });
      return true;
    }
    return false;
  }
  
  if (!attachToggle()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachToggle);
    } else {
      setTimeout(attachToggle, 50);
      setTimeout(attachToggle, 200);
    }
  }
  
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      if (e.newValue === 'light') {
        document.body.classList.add('light-theme');
        document.documentElement.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
        document.documentElement.classList.remove('light-theme');
      }
    }
  });
  
  setInterval(() => {
    const saved = localStorage.getItem('theme');
    const hasLight = document.body.classList.contains('light-theme');
    if (saved === 'light' && !hasLight) {
      document.body.classList.add('light-theme');
      document.documentElement.classList.add('light-theme');
    } else if (saved !== 'light' && hasLight) {
      document.body.classList.remove('light-theme');
      document.documentElement.classList.remove('light-theme');
    }
  }, 100);
})();

(function setupNavLinksSound() {
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      playClick();
    });
  });
})();

const mainImg = document.getElementById('mainDisplay');
const thumbnails = document.querySelectorAll('.gallery-item img');

if (mainImg && thumbnails.length) {
  thumbnails.forEach(img => {
    img.addEventListener('click', () => {
      mainImg.src = img.src;
      mainImg.classList.add('fade');
      setTimeout(() => mainImg.classList.remove('fade'), 300);
    });
  });
}

(function setupScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  
  function updateProgress() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.pageYOffset || document.documentElement.scrollTop;
    const pct = h > 0 ? (y / h) * 100 : 0;
    bar.style.width = pct + '%';
  }
  
  window.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();