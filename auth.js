// =========================================================
// 1️⃣ THEME TOGGLE
// =========================================================
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

// =========================================================
// 2️⃣ DATE & TIME IN FOOTER
// =========================================================
function formatNow(d = new Date()) {
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const footerTimeEl = document.getElementById('currentDateTime');
if (footerTimeEl) {
  footerTimeEl.textContent = formatNow();
  setInterval(() => {
    footerTimeEl.textContent = formatNow();
  }, 60_000);
}

// =========================================================
// 3️⃣ FORM VALIDATION UTILITIES
// =========================================================
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(inputId + 'Error');
  
  if (input && errorElement) {
    input.style.borderColor = '#ff4757';
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(inputId + 'Error');
  
  if (input && errorElement) {
    input.style.borderColor = '';
    errorElement.style.display = 'none';
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateName(name) {
  return name.trim().length >= 2;
}

// =========================================================
// 4️⃣ LOGIN FORM HANDLING
// =========================================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    playClick();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    let isValid = true;
    
    // Clear previous errors
    clearError('email');
    clearError('password');
    
    // Validate email
    if (!email) {
      showError('email', 'Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      showError('password', 'Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      showError('password', 'Password must be at least 6 characters');
      isValid = false;
    }
    
    if (isValid) {
      // Simulate login process
      const successMessage = document.getElementById('successMessage');
      const submitButton = loginForm.querySelector('button[type="submit"]');
      
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner"></span> Logging in...';
      
      // Simulate API call
      setTimeout(() => {
        // Store user session (in real app, this would be a proper auth token)
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Redirect to dashboard/home after 2 seconds
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
      }, 1500);
    }
  });
  
  // Real-time validation
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (emailInput.value.trim()) {
        clearError('email');
      }
    });
  }
  
  if (passwordInput) {
    passwordInput.addEventListener('input', () => {
      if (passwordInput.value) {
        clearError('password');
      }
    });
  }
}

// =========================================================
// 5️⃣ SIGN UP FORM HANDLING
// =========================================================
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    playClick();
    
    const first = document.getElementById('first').value.trim();
    const last = document.getElementById('last').value.trim();
    const email = document.getElementById('email2').value.trim();
    const password = document.getElementById('pass1').value;
    const confirm = document.getElementById('pass2').value;
    const terms = document.getElementById('agree').checked;
    
    let isValid = true;
    
    // Clear previous errors
    clearError('first');
    clearError('last');
    clearError('email2');
    clearError('pass1');
    clearError('pass2');
    clearError('terms');
    
    // Validate first name
    if (!first) {
      showError('first', 'First name is required');
      isValid = false;
    } else if (!validateName(first)) {
      showError('first', 'First name must be at least 2 characters');
      isValid = false;
    }
    
    // Validate last name
    if (!last) {
      showError('last', 'Last name is required');
      isValid = false;
    } else if (!validateName(last)) {
      showError('last', 'Last name must be at least 2 characters');
      isValid = false;
    }
    
    // Validate email
    if (!email) {
      showError('email2', 'Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('email2', 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      showError('pass1', 'Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      showError('pass1', 'Password must be at least 6 characters');
      isValid = false;
    }
    
    // Validate password confirmation
    if (!confirm) {
      showError('pass2', 'Please confirm your password');
      isValid = false;
    } else if (password !== confirm) {
      showError('pass2', 'Passwords do not match');
      isValid = false;
    }
    
    // Validate terms
    if (!terms) {
      showError('terms', 'You must agree to the terms');
      isValid = false;
    }
    
    if (isValid) {
      // Simulate signup process
      const successMessage = document.getElementById('successMessage');
      const submitButton = signupForm.querySelector('button[type="submit"]');
      
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner"></span> Creating account...';
      
      // Simulate API call
      setTimeout(() => {
        // Store user data (in real app, this would be sent to backend)
        const userData = {
          firstName: first,
          lastName: last,
          email: email,
          joinDate: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }, 1500);
    }
  });
  
  // Real-time validation for all inputs
  const inputs = ['first', 'last', 'email2', 'pass1', 'pass2'];
  inputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          clearError(inputId);
        }
      });
    }
  });
  
  // Terms checkbox validation
  const termsCheckbox = document.getElementById('agree');
  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', () => {
      if (termsCheckbox.checked) {
        clearError('terms');
      }
    });
  }
  
  // Password confirmation real-time check
  const pass1Input = document.getElementById('pass1');
  const pass2Input = document.getElementById('pass2');
  
  if (pass1Input && pass2Input) {
    pass2Input.addEventListener('input', () => {
      if (pass2Input.value && pass1Input.value !== pass2Input.value) {
        showError('pass2', 'Passwords do not match');
      } else if (pass2Input.value) {
        clearError('pass2');
      }
    });
  }
}

// =========================================================
// 6️⃣ SOCIAL LOGIN HANDLERS
// =========================================================
const googleLogin = document.getElementById('googleLogin');
const appleLogin = document.getElementById('appleLogin');

if (googleLogin) {
  googleLogin.addEventListener('click', function(e) {
    e.preventDefault();
    playClick();
    
    // Simulate Google OAuth
    alert('Google login would be implemented here');
    // In real implementation: window.location.href = '/auth/google';
  });
}

if (appleLogin) {
  appleLogin.addEventListener('click', function(e) {
    e.preventDefault();
    playClick();
    
    // Simulate Apple OAuth
    alert('Apple login would be implemented here');
    // In real implementation: window.location.href = '/auth/apple';
  });
}

// =========================================================
// 7️⃣ CHECK AUTH STATUS (for other pages)
// =========================================================
function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userEmail = localStorage.getItem('userEmail');
  
  if (isLoggedIn === 'true' && userEmail) {
    // User is logged in
    console.log('User is logged in:', userEmail);
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userData');
  window.location.href = 'login.html';
}

// =========================================================
// 8️⃣ SPINNER STYLES (inline in JS for convenience)
// =========================================================
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  .spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 0.2rem solid rgba(255, 255, 255, 0.3);
    border-top: 0.2rem solid #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);