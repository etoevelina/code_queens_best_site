
$(document).ready(function() {
  console.log("jQuery is ready!");
});

// --- Form Validation ---
const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      emailError.textContent = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      emailError.textContent = 'Invalid email format';
      isValid = false;
    }

    if (!password.value.trim()) {
      passwordError.textContent = 'Password is required';
      isValid = false;
    } else if (password.value.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword.value.trim()) {
      confirmPasswordError.textContent = 'Please confirm your password';
      isValid = false;
    } else if (password.value !== confirmPassword.value) {
      confirmPasswordError.textContent = 'Passwords do not match';
      isValid = false;
    }

    if (isValid) {
      alert('✅ Form submitted successfully!');
      this.reset();
    }
  });
}

// --- Show current time ---
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

// --- Theme Toggle ---
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.textContent =
      document.body.classList.contains('dark-mode')
        ? '☀️ Light Mode'
        : '🌙 Dark Mode';
  });
  console.log("Theme script loaded ✅");
}

// --- Image Gallery ---
const mainImg = document.getElementById('mainDisplay');
const thumbnails = document.querySelectorAll('.gallery-item img');

if (mainImg && thumbnails.length) {
  thumbnails.forEach(img => {
    img.addEventListener('click', () => {
      mainImg.src = img.src;
      mainImg.classList.add('fade'); // эффект плавного перехода
      setTimeout(() => mainImg.classList.remove('fade'), 300);
    });
  });
}

// --- Event Handling ---
const showTimeBtn = document.getElementById('showTime');
const timeOutput = document.getElementById('timeOutput');

if (showTimeBtn && timeOutput) {
  showTimeBtn.addEventListener('click', () => {
    const now = new Date();
    timeOutput.textContent = now.toLocaleTimeString();
  });
}

// --- Play Sound Button ---
const playBtn = document.getElementById('playSound');
const clickSound = document.getElementById('clickSound');

if (playBtn && clickSound) {
  playBtn.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(err => {
      console.log('⚠️ Safari blocked autoplay until user interacts:', err);
    });
  });
}

// --- Random Cat + Quote with Modal ---
const quoteBtn = document.getElementById('getQuote');
const quoteText = document.getElementById('quoteText');
const catImage = document.getElementById('catImage');
const modalEl = document.getElementById('catModal');

if (quoteBtn && quoteText && catImage && modalEl) {
  const modal = new bootstrap.Modal(modalEl);

  quoteBtn.addEventListener('click', async () => {
    try {
      const quoteRes = await fetch('http://api.quotable.io/random');
      const quoteData = await quoteRes.json();
      quoteText.textContent = `"${quoteData.content}" — ${quoteData.author}`;

      catImage.classList.remove('fade-in');
      catImage.src = `https://cataas.com/cat?${Date.now()}`;
      catImage.onload = () => catImage.classList.add('fade-in');

      modal.show();
    } catch (err) {
      console.error('😿 Error loading cat or quote:', err);
      quoteText.textContent = '😿 Something went wrong while loading.';
      modal.show();
    }
  });
}

$(document).ready(function () {
  console.log("jQuery is ready!");

  $("#searchInput").on("keyup", function () {
    const value = $(this).val().toLowerCase();

    $(".gallery-item").filter(function () {
      const altText = $(this).find("img").attr("alt").toLowerCase();
      $(this).toggle(altText.includes(value));
    });
  });
});


(function(){
  const $bar = $("#scrollProgress .bar");
  const $pct = $("#scrollProgress .pct");

  function updateProgress(){
    const scrollTop = $(window).scrollTop();
    const docH = $(document).height();
    const winH = $(window).height();
    const max = Math.max(docH - winH, 1);
    const pct = Math.min(100, Math.max(0, (scrollTop / max) * 100));
    $bar.css("width", pct + "%");
    $pct.text(Math.round(pct) + "%");
  }

  $(window).on("scroll resize", updateProgress);
  updateProgress();
})();


$(document).ready(function () {
  function lazyLoad() {
    $("img[data-src]").each(function () {
      const $img = $(this);
      const imgTop = $img.offset().top;
      const scrollBottom = $(window).scrollTop() + $(window).height();

      if (imgTop < scrollBottom + 200) { 
        $img.attr("src", $img.data("src"));
        $img.removeAttr("data-src");
        $img.hide().fadeIn(600); 
      }
    });
  }

  $(window).on("scroll resize", lazyLoad);
  lazyLoad();
});