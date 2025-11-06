// ===== Date & Time =====
function formatNow(d = new Date()) {
  return d.toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' });
}
const nowEl = document.getElementById('now');
if (nowEl) {
  nowEl.textContent = formatNow();
  setInterval(() => (nowEl.textContent = formatNow()), 60_000);
}

// ===== User Data =====
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
  table.innerHTML = '';
  users.forEach((user, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${index + 1}</td><td>${user.name}</td><td>${user.rank}</td><td>${user.exercises}</td>`;
    table.appendChild(row);
  });
}
updateRanking();

// ===== jQuery Ready =====
$(document).ready(function () {
  console.log("jQuery is ready!");
  // ===== Dynamic FAQ Accordion =====
$(".accordion-button").on("click", function () {
  const target = $(this).data("target");
  const collapse = $(target);

  // Close other open sections
  $(".accordion-collapse").not(collapse).slideUp(300);
  // Scroll smoothly to the active question
$('html, body').animate({
  scrollTop: $(this).offset().top - 120
}, 400);

  $(".accordion-button").not(this).removeClass("active");

  // Toggle selected section
  collapse.slideToggle(300);
  $(this).toggleClass("active");
});

  // ===== Task 1: Real-Time Search =====
  $("#searchUser").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    $("#userTable tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // ===== Task 2: Autocomplete Suggestions =====
  const names = users.map(u => u.name);
  $("#searchUser").on("input", function () {
    const value = $(this).val().toLowerCase();
    $("#suggestions").remove();
    if (!value) return;
    const list = $("<ul id='suggestions' class='list-group mt-1'></ul>");
    names.filter(n => n.toLowerCase().includes(value)).forEach(n => {
      list.append(`<li class='list-group-item list-group-item-action'>${n}</li>`);
    });
    $(this).after(list);
    $("#suggestions li").on("click", function () {
      $("#searchUser").val($(this).text());
      $("#suggestions").remove();
      $("#searchUser").trigger("keyup");
    });
  });

  // ===== Task 3: Search Highlight =====
  $("#searchUser").on("keyup", function () {
    const term = $(this).val();
    $(".accordion-body").each(function () {
      const text = $(this).text();
      if (term) {
        const regex = new RegExp(`(${term})`, "gi");
        $(this).html(text.replace(regex, "<mark>$1</mark>"));
      } else $(this).text(text);
    });
  });

  // ===== Task 4: Scroll Progress Bar =====
  $(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const percent = (scrollTop / docHeight) * 100;
    $("#scrollProgress").css("width", percent + "%");
  });

  // ===== Task 5: Animated Counter =====
  $(".counter").each(function () {
    const $this = $(this);
    const countTo = parseInt($this.attr("data-target"));
    $({ countNum: 0 }).animate({ countNum: countTo }, {
      duration: 2000,
      easing: "swing",
      step: function () { $this.text(Math.floor(this.countNum)); },
      complete: function () { $this.text(this.countNum); }
    });
  });

  // ===== Task 6: Loading Spinner on Submit =====
  const form = $("#signup-form");
  form.on("submit", function (e) {
    e.preventDefault();
    const btn = $(this).find("button[type='submit']");
    const email = form.find("[name='email']").val().trim();
    const pass = form.find("[name='password']").val();
    const conf = form.find("[name='confirm']").val();

    form.find("input").removeClass("is-invalid");
    const err = form.find("[data-error]");
    const ok = form.find("[data-success]");

    function showError(msg) {
      err.text(msg).prop("hidden", !msg);
      ok.prop("hidden", true);
    }
    function showSuccess(msg) {
      ok.text(msg).prop("hidden", !msg);
      err.prop("hidden", true);
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      form.find("[name='email']").addClass("is-invalid");
      return showError("Please enter a valid email.");
    }
    if (pass.length < 6) {
      form.find("[name='password']").addClass("is-invalid");
      return showError("Password must be at least 6 characters.");
    }
    if (pass !== conf) {
      form.find("[name='confirm']").addClass("is-invalid");
      return showError("Passwords do not match.");
    }

    // Spinner effect
    btn.html('<span class="spinner-border spinner-border-sm"></span> Please wait...');
    btn.prop("disabled", true);

    setTimeout(() => {
      btn.html("Create account");
      btn.prop("disabled", false);
      showSuccess("Signed up successfully! (demo)");
      form[0].reset();
    }, 2000);
  });

  // ===== Task 7: Toast Notification =====
  function showToast(msg) {
    const toast = $("#toast");
    toast.find(".toast-body").text(msg);
    toast.fadeIn(400).delay(2000).fadeOut(400);
  }

  $("#bg-btn").on("click", function () {
    const palette = ['#0f1530', '#111836', '#0a0f12', '#151c3d', '#1a1f3f', '#0e142c'];
    const color = palette[Math.floor(Math.random() * palette.length)];
    $("body").css("background-color", color);
    showToast("Background color changed!");
  });

  $("#bg-reset").on("click", function () {
    $("body").css("background-color", "");
    showToast("Background reset!");
  });

  // ===== Task 8: Copy to Clipboard =====
  $(".copy-btn").on("click", function () {
    const code = $(this).siblings("code").text();
    navigator.clipboard.writeText(code).then(() => {
      $(this).html("✔ Copied!");
      showToast("Copied to clipboard!");
      setTimeout(() => $(this).html("Copy"), 1500);
    });
  });

  // ===== Task 9: Lazy Image Loading =====
  $(window).on("scroll", function () {
    $(".lazy").each(function () {
      const top = $(this).offset().top;
      const bottom = $(window).scrollTop() + $(window).height();
      if (top < bottom && !$(this).attr("src")) {
        $(this).attr("src", $(this).data("src"));
      }
    });
  });

  // ===== Popup Open / Close =====
  const popup = $("#popup");
  $("#open-popup").on("click", function () {
    popup.prop("hidden", false);
    $("body").css("overflow", "hidden");
    popup.find("input:first").focus();
  });
  popup.find(".popup-close").on("click", closePopup);
  popup.on("click", function (e) {
    if (e.target.id === "popup") closePopup();
  });
  $(window).on("keydown", function (e) {
    if (!popup.prop("hidden") && e.key === "Escape") closePopup();
  });

  function closePopup() {
    popup.prop("hidden", true);
    $("body").css("overflow", "");
  }
});
