// $(document).ready(function(){ ... });

$(function(){
  console.log('jQuery is ready!');

  const programs = [
    { name: 'HIIT', type: 'Cardio' },
    { name: 'Yoga', type: 'Flexibility' },
    { name: 'Powerlifting', type: 'Strength' },
    { name: 'Pilates', type: 'Flexibility' },
    { name: 'CrossFit', type: 'Cardio' }
  ];

 //live filter (filters #programList <li>)
 $('#liveSearch').on('input', function () {
  const q = this.value.trim().toLowerCase();

  $('#programList > li').each(function () {
    const name = $(this).find('span').first().text().toLowerCase();
    const show = !q || name.includes(q);
    $(this).toggle(show);
  });

  renderSuggestions(q);
});

  // autocomplete suggestions
  function renderSuggestions(query){
    const $wrap = $('#suggestions');
    $wrap.empty();
    if (!query) return;

    const items = programs
      .map(p => p.name)
      .filter(n => n.toLowerCase().includes(query))
      .slice(0,6);

    if (!items.length) return;

    const $ul = $('<div class="suggestion-list"></div>');
    items.forEach(name => {
      $('<div class="suggestion-item"></div>')
        .text(name)
        .on('click', function(){
          $('#liveSearch').val(name).trigger('keyup');
          $wrap.empty();
        })
        .appendTo($ul);
    });
    $wrap.append($ul);
  }

  // Close suggestions on click away
  $(document).on('click', function(e){
    if (!$(e.target).closest('#liveSearch, #suggestions').length){
      $('#suggestions').empty();
    }
  });

  // highlight matches in FAQ (index page)
  $('#hlBtn').on('click', function(){
    const q = $('#hlInput').val().trim();
    const $scope = $('.faq');
    clearHighlights($scope);
    if (!q) return;

    // Wrap matches in <mark class="hl">
    $scope.find('.accordion-body, .accordion-button').each(function(){
      const html = $(this).html();
      try{
        const rx = new RegExp(`(${escapeReg(q)})`, 'gi');
        const newHtml = html.replace(rx, '<mark class="hl">$1</mark>');
        $(this).html(newHtml);
      }catch(_){}
    });
  });

  $('#hlClear').on('click', function(){
    clearHighlights($('.faq'));
    $('#hlInput').val('');
  });

  function clearHighlights($root){
    $root.find('mark.hl').each(function(){
      $(this).replaceWith($(this).text());
    });
  }
  function escapeReg(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  // scroll progress bar
  const $bar = $('#scrollProgress');
  const onScroll = () => {
    const h = $(document).height() - $(window).height();
    const y = $(window).scrollTop();
    const pct = h > 0 ? (y / h) * 100 : 0;
    $bar.css('width', pct + '%');
  };
  $(window).on('scroll resize', onScroll);
  onScroll();

  // animated number counter (elements with .countup)
  // Starts when they appear in viewport
  const started = new Set();
  function runCountersIfVisible(){
    $('.countup').each(function(){
      const el = this;
      if (started.has(el)) return;
      if (!isInView(el)) return;

      started.add(el);
      const $el = $(el);
      const target = parseInt($el.data('target'), 10) || 0;
      const duration = 1200;
      const start = performance.now();

      function tick(now){
        const p = Math.min(1, (now - start)/duration);
        const eased = 1 - (1-p)*(1-p);
        const val = Math.floor(target * eased);
        $el.text(val);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
  function isInView(el){
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
  $(window).on('scroll resize', runCountersIfVisible);
  runCountersIfVisible();

  // Loading spinner on submit (newsletter)
  $('#subscribeBtn').on('click', function(e){
  e.preventDefault();
  e.stopImmediatePropagation();

  const $btn = $(this);
  if ($btn.prop('disabled')) return;

  const $input = $('#subscriberEmail');
  const val = ($input.val() || '').trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  if (!ok){
    showToast('Please enter a valid email.');
    $input.focus();
    return;
  }

  const original = $btn.html();
  $btn.prop('disabled', true).html(`<span class="spinner"></span>Please wait…`);

  setTimeout(function(){
    $btn.prop('disabled', false).html(original);
    showToast('Subscribed successfully!');
    // $('#popupForm').hide();
  }, 1200);
});

function showToast(msg){
  const $t = $('#toast');
  $t.text(msg).addClass('show');
  clearTimeout($t.data('timer'));
  const timer = setTimeout(()=> $t.removeClass('show'), 1800);
  $t.data('timer', timer);
}

  // Toast helper
  function showToast(msg){
    const $t = $('#toast');
    $t.text(msg).addClass('show');
    clearTimeout($t.data('timer'));
    const timer = setTimeout(()=> $t.removeClass('show'), 1800);
    $t.data('timer', timer);
  }
  window.showToast = showToast;

  // Copy to clipboard
  $('.copyBtn').on('click', function(){
    const target = $(this).data('target');
    const text = $(target).text().trim();
    navigator.clipboard.writeText(text).then(()=>{
      const $btn = $(this);
      const old = $btn.html();
      $btn.html('Copied');
      showToast('Copied to clipboard!');
      setTimeout(()=> $btn.html(old), 900);
    });
  });

  // Task 9: Lazy loading images
  // const $lazy = $('img.lazy');
  // function lazyCheck(){
  //   $lazy.each(function(){
  //     const $img = $(this);
  //     if ($img.attr('data-loaded')) return;
  //     if (isInView(this)){
  //       const src = $img.attr('data-src');
  //       if (src){
  //         $img.attr('src', src);
  //         $img.attr('data-loaded', '1');
  //       }
  //     }
  //   });
  // }
  // $(window).on('scroll resize', lazyCheck);
  // lazyCheck();



  $(function(){
  $('#openPopupBtn').on('click', ()=> $('#popupForm').css('display','flex'));
  $('#closePopupBtn').on('click', ()=> $('#popupForm').hide());
  $('#popupForm').on('click', e => { if (e.target.id === 'popupForm') $('#popupForm').hide(); });
});
});


