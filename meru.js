// ===== Sound: short click tone =====
function playClickTone(){
    try{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle'; o.frequency.value = 880;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.13);
    }catch(e){}
  }
  
  // ===== Theme toggle =====
  const themeToggle = document.querySelector('#themeToggle');
  if(themeToggle){
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-night');
      const night = document.body.classList.contains('theme-night');
      themeToggle.textContent = night ? '🌙 Night' : '🌞 Day';
      themeToggle.setAttribute('aria-pressed', String(night));
      playClickTone();
    });
  }
  
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
    const tick = ()=>{ const now=new Date(); footerTime.textContent=`${fmtDate.format(now)} at ${fmtTime.format(now)}`; };
    tick(); setInterval(tick, 30000);
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
        setTimeout(()=> mainImage.style.transform='scale(1)', 200);
        playClickTone();
      });
    });
  }
  
  // ===== Keyboard nav (ArrowLeft/ArrowRight) =====
  const navItems = Array.from(document.querySelectorAll('#mainNav .nav-item'));
  document.addEventListener('keydown', (e) => {
    const idx = document.activeElement ? navItems.indexOf(document.activeElement) : -1;
    if(e.key === 'ArrowRight' && idx > -1){ e.preventDefault(); navItems[(idx+1)%navItems.length].focus(); }
    else if(e.key === 'ArrowLeft' && idx > -1){ e.preventDefault(); navItems[(idx-1+navItems.length)%navItems.length].focus(); }
  });
  
  // ===== Data + Switch + Arrays/Loops/HOFs =====
  const initialProducts = [
    { id:1, title:'Power Build', category:'strength', price:19, img:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop' },
    { id:2, title:'HIIT Express', category:'cardio',   price:12, img:'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=600&auto=format&fit=crop' },
    { id:3, title:'Mobility Flow', category:'mobility', price:9,  img:'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=600&auto=format&fit=crop' },
    { id:4, title:'Lean Strength', category:'strength', price:22, img:'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=600&auto=format&fit=crop' }
  ];
  const AppState = {
    products: [...initialProducts],
    addProducts(list){ this.products.push(...list); },
    filtered(category){
      const arr = category==='all' ? this.products : this.products.filter(p=> p.category===category);
      return arr.map(p=> ({ ...p, label: p.title.toUpperCase() })); // HOFs
    }
  };
  
  const productsEl = document.querySelector('#products');
  function renderProducts(list){
    if(!productsEl) return;
    productsEl.innerHTML = '';
    for(const p of list){ // loop
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
      requestAnimationFrame(()=> el.classList.add('show'));
    }
    document.querySelectorAll('.addBtn').forEach(btn=> btn.addEventListener('click', playClickTone));
  }
  if(productsEl){ renderProducts(AppState.filtered('all')); }
  
  const categorySelect = document.querySelector('#category');
  if(categorySelect){
    categorySelect.addEventListener('change', ()=>{
      const val = categorySelect.value;
      let list;
      switch(val){
        case 'strength': list = AppState.filtered('strength'); break;
        case 'cardio':   list = AppState.filtered('cardio');   break;
        case 'mobility': list = AppState.filtered('mobility'); break;
        case 'all':
        default:         list = AppState.filtered('all');
      }
      renderProducts(list); playClickTone();
    });
  }
  
 // ===== Load more via fetch (with OFFLINE fallback) =====
const loadMoreBtn = document.querySelector('#loadMoreBtn');

// локальный запасной массив на случай file:// или ошибки сети
const EXTRA_PRODUCTS_FALLBACK = [
  { id:5, title:'Engine Room',      category:'cardio',   price:14, img:'https://images.unsplash.com/photo-1526403226-eda5eb3f5f2c?q=80&w=600&auto=format&fit=crop' },
  { id:6, title:'Bulletproof Back', category:'mobility', price:11, img:'https://images.unsplash.com/photo-1541534401786-2077eed87a56?q=80&w=600&auto=format&fit=crop' },
  { id:7, title:'Max Strength',     category:'strength', price:25, img:'https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?q=80&w=600&auto=format&fit=crop' }
];

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('data/products.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const extra = await res.json();
      AppState.addProducts(extra);
    } catch {
      // оффлайн-фолбэк
      AppState.addProducts(EXTRA_PRODUCTS_FALLBACK);
    }
    renderProducts(AppState.filtered(categorySelect ? categorySelect.value : 'all'));
    playClickTone();
  });
}

  
  // ===== Multi-step form (callbacks + state) =====
  const wizForm = document.querySelector('#wizForm');
  const wizStatus = document.querySelector('#wizStatus');
  const steps = ['step1','step2','step3'].map(id=> document.getElementById(id));
  let currentStep = 0;
  const showStep = (idx)=> steps.forEach((s,i)=> s.classList.toggle('hidden', i!==idx));
  
  function nextStep(){
    if(currentStep < steps.length-1){ currentStep++; showStep(currentStep); playClickTone(); }
  }
  function prevStep(){
    if(currentStep > 0){ currentStep--; showStep(currentStep); playClickTone(); }
  }
  if(wizForm){
    wizForm.addEventListener('click', (e)=>{
      if(e.target.matches('[data-next]')) nextStep();
      if(e.target.matches('[data-back]')) prevStep();
    });
    wizForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(wizForm).entries());
      const onDone = (payload)=>{ // callback to update UI
        wizStatus.textContent = `✅ Saved: ${payload.name || '-'} • ${payload.email || '-'} • ${payload.goal || '-'}`;
        wizForm.reset();
        currentStep = 0; showStep(currentStep);
        playClickTone();
      };
      // имитация async
      setTimeout(()=> onDone(data), 400);
    });
  }
  showStep(currentStep);
  
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
      quoteText.textContent = `“${q.text}” — ${q.author}`;
    } catch {
      // оффлайн-фолбэк
      const q = QUOTES_FALLBACK[Math.floor(Math.random() * QUOTES_FALLBACK.length)];
      quoteText.textContent = `“${q.text}” — ${q.author}`;

    }
    playClickTone();
  });
}

  
  // ===== Accordion =====
  function setupAccordion(){
    const triggers = document.querySelectorAll('.accordion__trigger');
    if(!triggers.length) return;
    triggers.forEach(btn=>{
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded','false'); panel.style.maxHeight='0';
      btn.addEventListener('click', ()=>{
        const expanded = btn.getAttribute('aria-expanded')==='true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if(!expanded){ panel.classList.add('open'); panel.style.maxHeight = panel.scrollHeight + 'px'; }
        else{ panel.style.maxHeight = panel.scrollHeight + 'px'; requestAnimationFrame(()=>{ panel.style.maxHeight = '0'; panel.classList.remove('open'); }); }
        playClickTone();
      });
    });
  }
  setupAccordion();
  
  // ===== Modal =====
  function setupModal(){
    const openBtn = document.getElementById('openModal');
    const modal = document.getElementById('modal');
    if(!openBtn || !modal) return;
    const show = ()=> modal.setAttribute('aria-hidden','false');
    const hide = ()=> modal.setAttribute('aria-hidden','true');
    openBtn.addEventListener('click', show);
    modal.addEventListener('click', e=>{ if(e.target.matches('[data-close]')) hide(); });
    document.addEventListener('keydown', e=>{ if(e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') hide(); });
    const subForm = document.getElementById('subForm');
    const subEmail = document.getElementById('subEmail');
    const errSub = document.getElementById('err-sub');
    const subSuccess = document.getElementById('subSuccess');
    if(subForm){
      subForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        errSub.textContent=''; subSuccess.textContent='';
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(subEmail.value.trim());
        if(!ok){ errSub.textContent='Please enter a valid email.'; return; }
        subSuccess.textContent='🎉 Subscribed!'; subForm.reset(); setTimeout(hide, 1200); playClickTone();
      });
    }
  }
  setupModal();
  
  // ===== Background Color Switch =====
  function setupColorSwitcher(){
    const btn = document.getElementById('colorBtn');
    const label = document.getElementById('colorLabel');
    if(!btn || !label) return;
    const colors = ['#0f1115','#151b29','#1f2937','#022c22','#1d2433','#2b1b3f','#0b1b2a','#2a1f2f','#132a13','#1b263b'];
    let i = 0;
    const apply = (c)=>{ document.body.style.background = c; label.textContent = 'Background: ' + c; };
    btn.addEventListener('click', ()=>{ i = (i+1) % colors.length; apply(colors[i]); playClickTone(); });
    apply(colors[0]);
  }
  setupColorSwitcher();
  
  // ===== Reveal animations =====
  document.querySelectorAll('.pop').forEach(el=> requestAnimationFrame(()=> el.classList.add('show')));
  
  