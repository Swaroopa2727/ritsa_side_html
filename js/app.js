/* EPMMS – app.js */
(function () {
  'use strict';

  const sidebar  = document.getElementById('sidebar');
  const toggle   = document.getElementById('sidebarToggle');
  const wrapper  = document.getElementById('mainWrapper');
  const userMenu = document.querySelector('.user-menu');
  const userToggle = document.getElementById('userMenuToggle');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  function isMobile() { return window.innerWidth < 992; }

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  toggle && toggle.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay.addEventListener('click', closeSidebar);

  // Close on resize to desktop
  window.addEventListener('resize', function () {
    if (!isMobile()) closeSidebar();
  });

  if (userMenu && userToggle) {
    userToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = userMenu.classList.toggle('show');
      userToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!userMenu.contains(e.target)) {
        userMenu.classList.remove('show');
        userToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        userMenu.classList.remove('show');
        userToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Chevron rotation for collapse items
  document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (el) {
    const target = document.querySelector(el.dataset.bsTarget);
    if (!target) return;

    target.addEventListener('show.bs.collapse', function () {
      el.querySelector('.chev') && (el.querySelector('.chev').style.transform = 'rotate(180deg)');
    });
    target.addEventListener('hide.bs.collapse', function () {
      el.querySelector('.chev') && (el.querySelector('.chev').style.transform = 'rotate(0deg)');
    });
  });

  // Quick action ripple feedback
  document.querySelectorAll('.quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.style.transform = 'scale(.97)';
      setTimeout(function () { btn.style.transform = ''; }, 150);
    });
  });

  // Live clock in date badge
  var dateBadgeSpan = document.querySelector('.date-badge span');
  if (dateBadgeSpan) {
    function updateClock() {
      var now = new Date();
      var opts = { month: 'long', day: 'numeric', year: 'numeric' };
      var datePart = now.toLocaleDateString('en-IN', opts);
      var h = now.getHours(), m = now.getMinutes();
      var ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      var timePart = h + ':' + (m < 10 ? '0' : '') + m + ' ' + ampm;
      dateBadgeSpan.textContent = datePart + ' \u2022 ' + timePart;
    }
    updateClock();
    setInterval(updateClock, 60000);
  }

})();
