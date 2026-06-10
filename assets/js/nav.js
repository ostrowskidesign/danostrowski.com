/* ============================================================
   NAV.JS — Scroll behavior, mobile menu, active states
   danostrowski.com
   ============================================================ */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const overlay = document.querySelector('.nav__overlay');
  const overlayLinks = document.querySelectorAll('.nav__overlay .nav__link');

  // ── Scroll handler ─────────────────────────────────────────
  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on init

  // ── Mobile menu ────────────────────────────────────────────
  if (toggle && overlay) {
    toggle.addEventListener('click', function () {
      const isOpen = overlay.classList.contains('nav__overlay--open');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on link click
    overlayLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function openMenu() {
    overlay.classList.add('nav__overlay--open');
    document.body.style.overflow = 'hidden';
    animateToggleOpen();
  }

  function closeMenu() {
    overlay.classList.remove('nav__overlay--open');
    document.body.style.overflow = '';
    animateToggleClose();
  }

  function animateToggleOpen() {
    const spans = toggle.querySelectorAll('span');
    if (spans.length >= 2) {
      spans[0].style.transform = 'translateY(6px) rotate(45deg)';
      spans[1].style.opacity = '0';
      if (spans[2]) spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    }
  }

  function animateToggleClose() {
    const spans = toggle.querySelectorAll('span');
    spans.forEach(function (s) {
      s.style.transform = '';
      s.style.opacity = '';
    });
  }

  // ── Active link state ──────────────────────────────────────
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    // Normalize paths
    const linkPath = href.replace(/\/$/, '') || '/';
    const pagePath = currentPath.replace(/\/$/, '') || '/';

    if (pagePath === linkPath || (linkPath !== '/' && pagePath.startsWith(linkPath))) {
      link.classList.add('nav__link--active');
    }
  });

})();
