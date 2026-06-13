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




/* ── FOOTER YEAR ────────────────────────────────────────────── */
(function() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();


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
