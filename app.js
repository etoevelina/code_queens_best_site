/* ===== Task 5: Date & Time ===== */
function startClock(){
    const el = document.getElementById('clock');
    if(!el) return;
    const fmt = new Intl.DateTimeFormat(undefined,{
      year:'numeric', month:'long', day:'numeric',
      hour:'numeric', minute:'2-digit', second:'2-digit'
    });
    const tick = ()=>{
      const now = new Date();
      el.textContent = fmt.format(now); // e.g. "October 13, 2025, 6:45:03 PM"
    };
    tick();
    setInterval(tick,1000);
  }
  function startFooterClock() {
  const el = document.getElementById('footerTime');
  if (!el) return;

  const fmtDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const fmtTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const tick = () => {
    const now = new Date();
    el.textContent = `${fmtDate.format(now)} at ${fmtTime.format(now)}`;
  };

  tick();
  setInterval(tick, 30000); // обновление каждые 30 сек
}

  /* ===== Task 1: Form Validation ===== */
  function setupSignupValidation(){
    const form = document.getElementById('signupForm');
    if(!form) return;
  
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm');
    const success = document.getElementById('formSuccess');
  
    const err = {
      name: document.getElementById('err-name'),
      email: document.getElementById('err-email'),
      password: document.getElementById('err-password'),
      confirm: document.getElementById('err-confirm'),
    };
  
    const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  
    function clearErrors(){
      Object.values(err).forEach(e=> e && (e.textContent=''));
      if(success) success.textContent='';
    }
  
    function validate(){
      clearErrors();
      let ok = true;
  
      if(!name.value.trim()){ err.name.textContent='Name is required.'; ok=false; }
      if(!email.value.trim()){ err.email.textContent='Email is required.'; ok=false; }
      else if(!emailOk(email.value)){ err.email.textContent='Enter a valid email (e.g., name@example.com).'; ok=false; }
  
      if(!password.value){ err.password.textContent='Password is required.'; ok=false; }
      else if(password.value.length<8){ err.password.textContent='Password must be at least 8 characters.'; ok=false; }
  
      if(!confirm.value){ err.confirm.textContent='Please confirm your password.'; ok=false; }
      else if(confirm.value!==password.value){ err.confirm.textContent='Passwords do not match.'; ok=false; }
  
      return ok;
    }
  
    ;[name,email,password,confirm].forEach(i=> i.addEventListener('input', validate));
  
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      if(validate()){
        success.textContent='✅ Form is valid! (demo submit)';
        form.reset();
        setTimeout(()=> success.textContent='', 2500);
      }
    });
  }
  
  /* ===== Task 2: Accordion ===== */
  function setupAccordion(){
    const triggers = document.querySelectorAll('.accordion__trigger');
    if(!triggers.length) return;
  
    triggers.forEach(btn=>{
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      // init closed
      btn.setAttribute('aria-expanded','false');
      panel.style.maxHeight='0';
  
      btn.addEventListener('click',()=>{
        const expanded = btn.getAttribute('aria-expanded')==='true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if(!expanded){
          panel.classList.add('open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }else{
          panel.style.maxHeight = panel.scrollHeight + 'px';
          requestAnimationFrame(()=>{
            panel.style.maxHeight = '0';
            panel.classList.remove('open');
          });
        }
      });
    });
  }
  
  /* ===== Task 3: Popup (Modal) ===== */
  function setupModal(){
    const openBtn = document.getElementById('openModal');
    const modal = document.getElementById('modal');
    if(!openBtn || !modal) return;
  
    const show = ()=> modal.setAttribute('aria-hidden','false');
    const hide = ()=> modal.setAttribute('aria-hidden','true');
  
    openBtn.addEventListener('click', show);
    modal.addEventListener('click', e=>{
      if(e.target.matches('[data-close]')) hide();
    });
    document.addEventListener('keydown', e=>{
      if(e.key==='Escape' && modal.getAttribute('aria-hidden')==='false') hide();
    });
  
    // small email check inside modal
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
        subSuccess.textContent='🎉 Subscribed! ';
        subForm.reset();
        setTimeout(hide, 1200);
      });
    }
  }
  
  /* ===== Task 4: Background Color Switch ===== */
  function setupColorSwitcher(){
    const btn = document.getElementById('colorBtn');
    const label = document.getElementById('colorLabel');
    if(!btn || !label) return;
  
    const colors = ['#0f1115','#151b29','#1f2937','#022c22','#1d2433','#2b1b3f','#0b1b2a','#2a1f2f','#132a13','#1b263b'];
    let i = 0;
  
    const apply = (c)=>{
      document.body.style.background = c; // минимально меняем фон страницы
      label.textContent = 'Background: ' + c;
    };
  
    btn.addEventListener('click', ()=>{
      i = (i+1) % colors.length;
      apply(colors[i]);
    });
  
    // init
    apply(colors[0]);
  }
  
  /* ===== Boot ===== */
  window.addEventListener('DOMContentLoaded', ()=>{
    startFooterClock(); // новая функция для футера
    setupSignupValidation();
    setupAccordion();
    setupModal();
    setupColorSwitcher();
  });
  