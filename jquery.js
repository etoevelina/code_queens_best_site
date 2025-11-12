// === Assignment 7 — jQuery Features ===
$(document).ready(function(){

    console.log("jQuery is ready!");
  
    /* ---------------- PART 1: jQuery Search ---------------- */
  
    // Task 1: Real-time search & live filter for products
    const $searchBar = $('<input type="text" id="liveSearch" placeholder="Search program..." class="btn" style="margin:10px 0;width:100%;">');
    $('#shop').prepend($searchBar);
  
    $searchBar.on('keyup', function(){
      const val = $(this).val().toLowerCase();
      $('#products .product').each(function(){
        const text = $(this).text().toLowerCase();
        $(this).toggle(text.includes(val));
      });
    });
  
    // Task 2: Autocomplete Search Suggestions
    const programNames = ['Power Build','HIIT Express','Mobility Flow','Lean Strength','Engine Room','Bulletproof Back','Max Strength'];
    const $suggestions = $('<ul id="autoList" style="background:#0f1626;border-radius:8px;list-style:none;padding:6px;display:none;position:absolute;z-index:5;"></ul>');
    $('#shop').css('position','relative').append($suggestions);
  
    $searchBar.on('input', function(){
      const query = $(this).val().toLowerCase();
      $suggestions.empty();
      if(!query){ $suggestions.hide(); return; }
      const matches = programNames.filter(p => p.toLowerCase().includes(query));
      matches.forEach(m => $suggestions.append(`<li style="padding:4px 8px;cursor:pointer;">${m}</li>`));
      $suggestions.show();
    });
  
    $suggestions.on('click','li',function(){
      $searchBar.val($(this).text());
      $suggestions.hide();
    });
  
    // Task 3: Highlight matching words in FAQ
    const $faqInput = $('<input type="text" id="faqSearch" placeholder="Search FAQ..." class="btn" style="margin-bottom:10px;width:100%;">');
    $('#faq').prepend($faqInput);
  
    $faqInput.on('keyup', function(){
      const keyword = $(this).val();
      $('#faq p').each(function(){
        const original = $(this).text();
        if(keyword){
          const regex = new RegExp(`(${keyword})`,'gi');
          $(this).html(original.replace(regex, '<mark style="background:yellow;">$1</mark>'));
        } else $(this).text(original);
      });
    });
  
  
    /* ---------------- PART 2: UX Engagement ---------------- */
  
    // Task 4: Scroll progress bar
    const $bar = $('<div id="scrollBar"></div>').css({
      position:'fixed',top:0,left:0,height:'6px',width:'0%',
      background:'linear-gradient(90deg,#38bdf8,#7c3aed)',zIndex:1000
    });
    $('body').append($bar);
  
    $(window).on('scroll', function(){
      const scrolled = ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100;
      $bar.css('width', scrolled + '%');
    });
  
    // Task 5: Animated number counter
    const $counterBox = $('<div class="counterBox" style="text-align:center;margin:30px 0;"><h3 style="font-size:32px;">Users trained: <span id="numCounter">0</span>+</h3></div>');
    $('#rating').after($counterBox);
  
    function animateCounter(){
      $({count:0}).animate({count:1000},{
        duration:2500,
        easing:'swing',
        step:function(now){ $('#numCounter').text(Math.floor(now)); }
      });
    }
    animateCounter();
  
    // Task 6: Loading spinner on Submit (booking form in Schedule)
    $('form').on('submit', function(e){
      const $btn = $(this).find('button[type="submit"]');
      $btn.prop('disabled', true).text('⏳ Please wait...');
      setTimeout(()=> $btn.prop('disabled', false).text('Submit'), 2000);
    });
  
  
    /* ---------------- PART 3: Functionality ---------------- */
  
    // Task 7: Notification toast
    const $toast = $('<div id="toastMsg"></div>').css({
      display:'none',position:'fixed',bottom:'25px',right:'25px',
      background:'#111827',color:'#fff',padding:'10px 20px',
      borderRadius:'10px',zIndex:9999
    }).text('Action successful!');
    $('body').append($toast);
  
    $(document).on('click','.addBtn',function(){
      $toast.stop(true,true).fadeIn(300).delay(1500).fadeOut(600);
    });
  
    // Task 8: Copy to clipboard
    const $copyBlock = $(`
      <div id="copyBlock" style="margin-top:20px;">
        <p id="copyText">https://courageous-manatee-93f835.netlify.app</p>
        <button id="copyBtn" class="btn">Copy</button>
      </div>`);
    $('#popup').append($copyBlock);
  
    $('#copyBtn').on('click', function(){
      navigator.clipboard.writeText($('#copyText').text());
      $(this).text('Copied! ✅');
      setTimeout(()=> $(this).text('Copy'), 1500);
    });
  
    // Task 9: Lazy loading for images
    $('img').each(function(){
      const src = $(this).attr('src');
      $(this).attr('data-src', src).removeAttr('src');
    });
  
    function lazyLoad(){
      $('img[data-src]').each(function(){
        const $img = $(this);
        if($img.offset().top < $(window).scrollTop() + $(window).height()){
          $img.attr('src', $img.data('src')).removeAttr('data-src');
        }
      });
    }
  
    $(window).on('scroll', lazyLoad);
    lazyLoad();
  
  });
  
// ===== Search Highlighting with jQuery =====
function setupSearchHighlighting() {
  const searchInput = $('#searchInput');
  const highlightBtn = $('#highlightBtn');
  const clearHighlightBtn = $('#clearHighlightBtn');
  const productsSection = $('#shop');

  if (!searchInput.length || !highlightBtn.length || !clearHighlightBtn.length || !productsSection.length) return;

  let originalHTML = '';

  // Сохраняем оригинальный HTML после загрузки продуктов
  setTimeout(() => {
    originalHTML = productsSection.html();
  }, 100);

  function highlightContent() {
    const searchTerm = searchInput.val().trim();
    
    if (!searchTerm) {
      showToast('Please enter a search term');
      return;
    }

    // Восстанавливаем оригинальный HTML
    if (originalHTML) {
      productsSection.html(originalHTML);
    }

    // Подсвечиваем текст с помощью jQuery
    productsSection.find('h2, h3, h4, h5, h6, p, span, .meta span:first-child, .p-body h3').each(function() {
      const $element = $(this);
      const originalText = $element.text();
      
      // Пропускаем элементы с ценами
      if (originalText.includes('$')) return;
      
      const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const newText = originalText.replace(regex, '<mark class="highlight">$1</mark>');
      
      if (newText !== originalText) {
        $element.html(newText);
      }
    });

    playClickTone();
    showToast(`Highlighted "${searchTerm}" in programs section`);
  }

  function clearHighlight() {
    if (originalHTML) {
      productsSection.html(originalHTML);
    }
    searchInput.val('');
    playClickTone();
    showToast('Highlight cleared');
  }

  highlightBtn.on('click', highlightContent);
  clearHighlightBtn.on('click', clearHighlight);

  searchInput.on('keypress', (e) => {
    if (e.which === 13) {
      highlightContent();
    }
  });
}
