/* ============================================================
   SALMO CONSTRUCTION SERVICES — Main JS
   General interactions: loading screen, navbar, scroll spy,
   mobile menu, cookie bar
   ============================================================ */

'use strict';

/* ── LOADING SCREEN ─────────────────────────────────────────── */
(function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  // Skip loading screen on repeat visits within the same session
  if (sessionStorage.getItem('salmo_visited')) {
    screen.style.display = 'none';
    document.body.style.overflow = '';
    return;
  }

  // Lock scroll while loading
  document.body.style.overflow = 'hidden';

  // Hide after animation completes (progress bar = ~2.1s + fade)
  setTimeout(() => {
    screen.classList.add('hidden');
    document.body.style.overflow = '';
    sessionStorage.setItem('salmo_visited', '1');
    // Trigger hero animations after load
    document.dispatchEvent(new Event('salmo:loaded'));
  }, 2200);
})();


/* ── NAVBAR SCROLL EFFECT + CTA REVEAL ─────────────────────── */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const hero    = document.getElementById('hero');
  if (!navbar) return;

  let ticking = false;

  function updateNav() {
    const scrollY    = window.scrollY;
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;

    navbar.classList.toggle('scrolled',   scrollY > 20);
    navbar.classList.toggle('past-hero',  scrollY >= heroBottom - 80);
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Run once on load so state is correct if page is refreshed mid-scroll
  updateNav();
})();


/* ── ACTIVE NAV LINK (scroll spy) ──────────────────────────── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const sectionMap = {};
  sections.forEach(s => { sectionMap[s.id] = s; });

  function getActiveSection() {
    const scrollY = window.scrollY;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - navH - 80;
      if (scrollY >= top) current = section.id;
    });

    return current;
  }

  let lastActive = '';
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const active = getActiveSection();
        if (active !== lastActive) {
          lastActive = active;
          navLinks.forEach(link => {
            const href = link.getAttribute('href')?.replace('#', '');
            link.classList.toggle('active', href === active);
          });
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ── MOBILE MENU ────────────────────────────────────────────── */
const hamburger    = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('nav-mobile');

function openMobileMenu() {
  hamburger.classList.add('active');
  mobileOverlay.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  hamburger.classList.remove('active');
  mobileOverlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});

// Expose closeMobileMenu globally (used in HTML onclick attributes)
window.closeMobileMenu = closeMobileMenu;


/* ── COOKIE BAR ─────────────────────────────────────────────── */
(function initCookieBar() {
  const bar    = document.getElementById('cookie-bar');
  const btn    = document.getElementById('cookie-accept');
  if (!bar || !btn) return;

  // Show only on first visit (localStorage persists across sessions)
  if (localStorage.getItem('salmo_cookies_accepted')) {
    bar.classList.add('hidden');
    return;
  }

  btn.addEventListener('click', () => {
    bar.classList.add('hidden');
    localStorage.setItem('salmo_cookies_accepted', '1');
  });
})();


/* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── CONTACT FORM SUBMISSION ────────────────────────────────── */
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = form?.querySelector('.form-success');
  const submit  = form?.querySelector('.form-submit');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const action = form.getAttribute('action');
    // If Formspree ID hasn't been set, show placeholder message
    if (!action || action.includes('YOUR_FORM_ID')) {
      if (success) {
        success.style.display = 'block';
        success.textContent   = 'Form not yet connected. Please contact us directly via phone or email.';
      }
      return;
    }

    const data = new FormData(form);

    try {
      if (submit) { submit.disabled = true; submit.textContent = 'Sending...'; }

      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (success) { success.style.display = 'block'; }
        if (submit)  { submit.style.display = 'none'; }
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      if (submit) { submit.disabled = false; submit.textContent = 'Try again — or call us directly'; }
    }
  });
})();
