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

    showError('');
    showSuccess('Signed up successfully! (demo)');
    form.reset();
  });
}


