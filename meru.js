// ===== Sound: short click tone =====
function playClickTone(){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle'; 
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    o.connect(g);
    g.connect(ctx.destination); 
    o.start(); 
    o.stop(ctx.currentTime + 0.13);
  }catch(e){
    console.log('Audio not supported');
  }
}

// ===== Theme toggle =====
(function initTheme(){
  const saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
  if (saved === 'light') {
    document.body.classList.add('light-theme');
  }
})();

const toggle = document.getElementById('themeToggle');
toggle?.addEventListener('click', () => {
  playClickTone();
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===== Toast Notification =====
function showToast(message) {
  let toast = document.getElementById('highlightToast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'highlightToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--surface);
      color: var(--text);
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid var(--line);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      font-size: 14px;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== Show time =====
  const timeBtn = document.querySelector('#timeBtn');
  const timeOut = document.querySelector('#timeOut');
  if(timeBtn && timeOut){
    timeBtn.addEventListener('click', () => {
      timeOut.textContent = new Date().toLocaleTimeString();
      playClickTone();
    });
  }
  
  // ===== Footer clock =====
  const footerTime = document.querySelector('#footerTime');
  if(footerTime){
    const fmtDate = new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric'});
    const fmtTime = new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',hour12:true});
    const tick = ()=>{ 
      const now = new Date(); 
      footerTime.textContent = `${fmtDate.format(now)} at ${fmtTime.format(now)}`; 
    };
    tick(); 
    setInterval(tick, 30000);
  }
  
  // ===== Greeting + reset =====
  const greetForm = document.querySelector('#greetForm');
  const nameInput = document.querySelector('#nameInput');
  const greeting = document.querySelector('#greeting');
  const resetInputs = document.querySelector('#resetInputs');
  
  if(greetForm && nameInput && greeting){
    greetForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = nameInput.value.trim();
      greeting.textContent = name ? `Programs — welcome, ${name}!` : 'Programs';
      playClickTone();
    });
  }
  
  if(resetInputs){
    resetInputs.addEventListener('click', ()=>{
      document.querySelectorAll('input').forEach(i=> i.value = '');
      if(greeting) greeting.textContent = 'Programs';
      playClickTone();
    });
  }
  
  // ===== Read more toggle =====
  const readMoreBtn = document.querySelector('#readMoreBtn');
  const moreText = document.querySelector('#moreText');
  if(readMoreBtn && moreText){
    readMoreBtn.addEventListener('click', ()=>{
      moreText.classList.toggle('hidden');
      readMoreBtn.textContent = moreText.classList.contains('hidden') ? 'Read more' : 'Show less';
      playClickTone();
    });
  }
  
  // ===== Rating =====
  const stars = document.querySelectorAll('.star');
  const ratingOutput = document.querySelector('#ratingOutput');
  let rating = 0;
  
  if(stars.length && ratingOutput){
    stars.forEach(star=>{
      star.addEventListener('click', ()=>{
        rating = Number(star.dataset.value);
        stars.forEach(s=> s.classList.toggle('active', Number(s.dataset.value) <= rating));
        ratingOutput.textContent = `Your rating: ${rating}/5`;
        playClickTone();
      });
    });
  }
  
  // ===== Gallery =====
  const mainImage = document.querySelector('#mainImage');
  const thumbs = document.querySelectorAll('.thumb');
  
  if(mainImage && thumbs.length){
    thumbs.forEach(th=>{
      th.addEventListener('click', ()=>{
        mainImage.style.transform = 'scale(.98)';
        const src = th.getAttribute('src').replace('w=300','w=1200');
        mainImage.setAttribute('src', src);
        mainImage.setAttribute('alt', th.getAttribute('alt'));
        setTimeout(()=> mainImage.style.transform = 'scale(1)', 200);
        playClickTone();
      });
    });
  }
  
  // ===== Data + Switch + Arrays/Loops/HOFs =====
  const initialProducts = [
    { id:1, title:'Power Build', category:'strength', price:19, img:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop' },
    { id:2, title:'HIIT Express', category:'cardio',   price:12, img:'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=600&auto=format&fit=crop' },
    { id:3, title:'Mobility Flow', category:'mobility', price:9,  img:'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=600&auto=format&fit=crop' },
    { id:4, title:'Lean Strength', category:'strength', price:22, img:'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=600&auto=format&fit=crop' }
  ];
  
  const AppState = {
    products: [...initialProducts],
    addProducts: function(list){ 
      this.products.push(...list); 
    },
    filtered: function(category){
      const arr = category === 'all' ? this.products : this.products.filter(p => p.category === category);
      return arr.map(p => ({ ...p, label: p.title.toUpperCase() }));
    }
  };
  
  const productsEl = document.querySelector('#products');
  
  function renderProducts(list){
    if(!productsEl) return;
    productsEl.innerHTML = '';
    
    list.forEach(p => {
      const el = document.createElement('article');
      el.className = 'product';
      el.innerHTML = `
        <img src="${p.img}" alt="${p.title}">
        <div class="p-body">
          <h3>${p.title}</h3>
          <div class="meta"><span>${p.category}</span><span>$${p.price}</span></div>
          <button class="btn addBtn" data-id="${p.id}">Add</button>
        </div>`;
      productsEl.appendChild(el);
      
      const addBtn = el.querySelector('.addBtn');
      if(addBtn){
        addBtn.addEventListener('click', function() {
          playClickTone();
          showToast(`Added ${p.title} to cart`);
        });
      }
      
      requestAnimationFrame(() => el.classList.add('show'));
    });
  }
  
  // Инициализация продуктов при загрузке
  if(productsEl){ 
    renderProducts(AppState.filtered('all')); 
  }
  
  const categorySelect = document.querySelector('#category');
  if(categorySelect){
    categorySelect.addEventListener('change', ()=>{
      const val = categorySelect.value;
      let list;
      
      switch(val){
        case 'strength': 
          list = AppState.filtered('strength'); 
          break;
        case 'cardio':   
          list = AppState.filtered('cardio');   
          break;
        case 'mobility': 
          list = AppState.filtered('mobility'); 
          break;
        case 'all':
        default:         
          list = AppState.filtered('all');
      }
      renderProducts(list); 
      playClickTone();
    });
  }
  
  // ===== Load More Plans =====
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if(loadMoreBtn){
    loadMoreBtn.addEventListener('click', () => {
      const additionalProducts = [
        { id:5, title:'Cardio Blast', category:'cardio', price:15, img:'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600&auto=format&fit=crop' },
        { id:6, title:'Flex Master', category:'mobility', price:11, img:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop' }
      ];
      
      AppState.addProducts(additionalProducts);
      renderProducts(AppState.filtered(categorySelect ? categorySelect.value : 'all'));
      playClickTone();
      showToast('Loaded more plans!');
    });
  }
  
  // ===== Random Quote (with OFFLINE fallback) =====
  const newQuoteBtn = document.querySelector('#newQuoteBtn');
  const quoteText   = document.querySelector('#quoteText');
  
  const QUOTES_FALLBACK = [
    { text: "Discipline is choosing what you want most over what you want now.", author: "Craig Groeschel" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "It never gets easier, you just get stronger.", author: "Unknown" },
    { text: "Motivation gets you going, habit keeps you growing.", author: "John C. Maxwell" }
  ];
  
  if (newQuoteBtn && quoteText) {
    newQuoteBtn.addEventListener('click', async () => {
      try {
        const res = await fetch('data/quotes.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const quotes = await res.json();
        const q = quotes[Math.floor(Math.random() * quotes.length)];
        quoteText.textContent = `"${q.text}" — ${q.author}`;
      } catch {
        // оффлайн-фолбэк
        const q = QUOTES_FALLBACK[Math.floor(Math.random() * QUOTES_FALLBACK.length)];
        quoteText.textContent = `"${q.text}" — ${q.author}`;
      }
      playClickTone();
    });
  }
  
 // ===== Search Highlighting =====
function setupSearchHighlighting() {
    const searchInput = document.getElementById('searchInput');
    const highlightBtn = document.getElementById('highlightBtn');
    const clearHighlightBtn = document.getElementById('clearHighlightBtn');
    const productsSection = document.getElementById('products');

    if (!searchInput || !highlightBtn || !clearHighlightBtn || !productsSection) {
        console.log('Search elements not found');
        return;
    }

    let originalHTML = productsSection.innerHTML;
    console.log('Search initialized, original HTML saved');

    function highlightText(text, searchTerm) {
        if (!searchTerm.trim()) return text;
        try {
            const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            return text.replace(regex, '<mark class="highlight">$1</mark>');
        } catch (e) {
            console.log('Regex error:', e);
            return text;
        }
    }

    function highlightContent() {
        const searchTerm = searchInput.value.trim();
        console.log('Highlighting:', searchTerm);
        
        if (!searchTerm) {
            showToast('Please enter a search term');
            return;
        }

        // Восстанавливаем оригинальный HTML перед подсветкой
        productsSection.innerHTML = originalHTML;

        // Подсвечиваем только в названиях программ и категориях
        const textElements = productsSection.querySelectorAll('h3, .meta span:first-child');
        console.log('Text elements found:', textElements.length);
        
        let found = false;
        textElements.forEach(element => {
            const originalText = element.textContent;
            const highlightedText = highlightText(originalText, searchTerm);
            
            if (highlightedText !== originalText) {
                element.innerHTML = highlightedText;
                found = true;
                console.log('Highlighted in:', originalText);
            }
        });

        playClickTone();
        if (found) {
            showToast(`Highlighted "${searchTerm}" in programs`);
        } else {
            showToast(`No results for "${searchTerm}"`);
        }
    }

    function clearHighlight() {
        console.log('Clearing highlight');
        // Полностью восстанавливаем оригинальный HTML чтобы убрать всю подсветку
        productsSection.innerHTML = originalHTML;
        searchInput.value = '';
        playClickTone();
        showToast('Highlight cleared');
    }

    highlightBtn.addEventListener('click', highlightContent);
    clearHighlightBtn.addEventListener('click', clearHighlight);

    // Также подсвечиваем при нажатии Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            highlightContent();
        }
    });

    // Обновляем originalHTML при изменении контента (фильтрация, загрузка больше и т.д.)
    const observer = new MutationObserver(() => {
        originalHTML = productsSection.innerHTML;
        console.log('Content changed, updated original HTML');
    });
    observer.observe(productsSection, { childList: true, subtree: true });
}
  // Вызываем функцию поиска после рендера продуктов
  setTimeout(() => {
    setupSearchHighlighting();
  }, 100);
  
  // ===== Accordion =====
  function setupAccordion(){
    const triggers = document.querySelectorAll('.accordion__trigger');
    if(!triggers.length) return;
    
    triggers.forEach(btn=>{
      const panelId = btn.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      
      if(!panel) return;
      
      btn.setAttribute('aria-expanded','false'); 
      panel.style.maxHeight = '0';
      
      btn.addEventListener('click', ()=>{
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        
        if(!expanded){
          panel.classList.add('open'); 
          panel.style.maxHeight = panel.scrollHeight + 'px'; 
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px'; 
          requestAnimationFrame(()=>{ 
            panel.style.maxHeight = '0'; 
            panel.classList.remove('open'); 
          }); 
        }
        playClickTone();
      });
    });
  }
  setupAccordion();
  
  // ===== Book Class Form =====
  const bookClassForm = document.getElementById('bookClassForm');
  if(bookClassForm){
    bookClassForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const classSelect = document.getElementById('classSelect').value;
      
      alert(`Class reserved for ${name} (${email}) in ${classSelect}`);
      playClickTone();
      bookClassForm.reset();
    });
  }
  
 // ===== Exercises API (API Ninjas) =====
const API_KEY = "4R2xYsWrwe6DCJCQeGUee5A==w5HAxqQH0bkcnCH";

// Fallback данные для демонстрации
const FALLBACK_EXERCISES = {
  biceps: [
    {
      name: "Barbell Curl",
      muscle: "biceps",
      type: "strength",
      equipment: "barbell",
      difficulty: "beginner",
      instructions: "Stand holding a barbell with a shoulder-width underhand grip. Curl the weight upward while keeping your elbows close to your torso."
    },
    {
      name: "Hammer Curl",
      muscle: "biceps",
      type: "strength", 
      equipment: "dumbbell",
      difficulty: "beginner",
      instructions: "Hold dumbbells with a neutral grip. Curl the weights while keeping your palms facing each other."
    }
  ],
  chest: [
    {
      name: "Bench Press",
      muscle: "chest",
      type: "strength",
      equipment: "barbell",
      difficulty: "intermediate",
      instructions: "Lie on a flat bench. Lower the barbell to your chest, then press it back to the starting position."
    },
    {
      name: "Push Ups",
      muscle: "chest",
      type: "strength",
      equipment: "body only",
      difficulty: "beginner",
      instructions: "Place hands shoulder-width apart. Lower your body until chest nearly touches the floor, then push back up."
    }
  ],
  legs: [
    {
      name: "Squats",
      muscle: "legs",
      type: "strength",
      equipment: "barbell",
      difficulty: "intermediate",
      instructions: "Stand with feet shoulder-width apart. Lower your body as if sitting in a chair, then return to standing."
    }
  ],
  triceps: [
    {
      name: "Tricep Dips",
      muscle: "triceps",
      type: "strength",
      equipment: "body weight",
      difficulty: "beginner",
      instructions: "Use parallel bars or a bench. Lower your body by bending elbows, then push back up."
    }
  ],
  abs: [
    {
      name: "Crunches",
      muscle: "abs",
      type: "strength",
      equipment: "body only",
      difficulty: "beginner",
      instructions: "Lie on your back with knees bent. Lift your upper body toward your knees, then lower back down."
    }
  ]
};

const loadExercisesBtn = document.getElementById('loadExercisesBtn');
const exercisesList = document.getElementById('exercisesList');
const muscleSelect = document.getElementById('muscle');

if (loadExercisesBtn && exercisesList && muscleSelect) {
  loadExercisesBtn.addEventListener('click', async function() {
    const muscle = muscleSelect.value;
    exercisesList.innerHTML = `<p style="color: var(--muted);">Loading ${muscle} exercises...</p>`;

    try {
      console.log('Fetching exercises for muscle:', muscle);
      
      const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
        method: 'GET',
        headers: { 
          "X-Api-Key": API_KEY,
          "Content-Type": "application/json"
        }
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Data received:', data);

      if (!data || !data.length) {
        exercisesList.innerHTML = `<p style="color: var(--muted);">No exercises found for ${muscle}. Try another muscle group.</p>`;
        showToast(`No exercises found for ${muscle}`);
        return;
      }

      // Отображаем упражнения
      exercisesList.innerHTML = data.map(exercise => `
        <article class="product show" style="background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 16px;">
          <div class="p-body">
            <h3 style="color: var(--brand); margin-bottom: 12px;">${exercise.name}</h3>
            <div class="meta" style="color: var(--muted); margin-bottom: 12px;">
              <span><strong>Muscle:</strong> ${exercise.muscle}</span>
              <span><strong>Type:</strong> ${exercise.type}</span>
            </div>
            <p style="margin-bottom: 8px;"><strong>Equipment:</strong> ${exercise.equipment || "None"}</p>
            <p style="margin-bottom: 12px;"><strong>Difficulty:</strong> ${exercise.difficulty}</p>
            <p style="color: var(--text); line-height: 1.5;">${exercise.instructions || "No instructions available."}</p>
          </div>
        </article>
      `).join("");

      showToast(`Loaded ${data.length} ${muscle} exercises`);
      playClickTone();

    } catch (error) {
      console.error("API Error, using fallback data:", error);
      
      // Используем fallback данные
      const fallbackData = FALLBACK_EXERCISES[muscle] || [];
      if (fallbackData.length > 0) {
        // Отображаем fallback данные
        exercisesList.innerHTML = fallbackData.map(exercise => `
          <article class="product show" style="background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 16px;">
            <div class="p-body">
              <h3 style="color: var(--brand); margin-bottom: 12px;">${exercise.name} (Demo)</h3>
              <div class="meta" style="color: var(--muted); margin-bottom: 12px;">
                <span><strong>Muscle:</strong> ${exercise.muscle}</span>
                <span><strong>Type:</strong> ${exercise.type}</span>
              </div>
              <p style="margin-bottom: 8px;"><strong>Equipment:</strong> ${exercise.equipment}</p>
              <p style="margin-bottom: 12px;"><strong>Difficulty:</strong> ${exercise.difficulty}</p>
              <p style="color: var(--text); line-height: 1.5;">${exercise.instructions}</p>
            </div>
          </article>
        `).join("");
        
        showToast(`Demo: Loaded ${fallbackData.length} ${muscle} exercises (API offline)`);
      } else {
        exercisesList.innerHTML = `<p style="color: var(--muted);">API unavailable and no demo data for ${muscle}</p>`;
      }
      playClickTone();
    }
  });
}
  
  // ===== Reveal animations =====
  document.querySelectorAll('.pop').forEach(el => {
    requestAnimationFrame(() => el.classList.add('show'));
  });
});