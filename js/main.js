/* ============================================================
   SALMO CONSTRUCTION SERVICES — Main JS
   General interactions: loading screen, navbar, scroll spy,
   mobile menu
   ============================================================ */

'use strict';

/* ── LOADING SCREEN ─────────────────────────────────────────── */
(function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) {
    /* Loading screen removed — fire salmo:loaded (deferred so the later
       scripts have registered their listeners) so the hero animations and
       section deep-links still run. */
    document.body.style.overflow = '';
    setTimeout(() => document.dispatchEvent(new Event('salmo:loaded')), 0);
    return;
  }

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


/* ── SCROLL-SPY URL ─────────────────────────────────────────────
   As the visitor scrolls, keep the address bar in sync with the
   section on screen (via replaceState, so it never spams history or
   causes a jump). Copy the URL at any point to share that section —
   e.g. scroll to the booking area → URL becomes /#book. Skipped while
   a project lightbox is open (its hash is #project=…). */
(function initScrollHashSpy() {
  const ids = ['services','how-we-work','projects','trust','about','faq','book','contact']; // 'testimonials' omitted while that section is hidden
  const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;

  let ticking = false, current = location.hash;

  function update() {
    ticking = false;
    if ((location.hash || '').indexOf('=') !== -1) return;   // leave #project=… alone
    const mid = window.scrollY + window.innerHeight * 0.4;
    let active = '';
    for (const s of sections) {
      if (s.getBoundingClientRect().top + window.scrollY <= mid) active = s.id;
    }
    const newHash = active ? '#' + active : '';   // near the top (hero) → clean URL
    if (newHash !== current) {
      current = newHash;
      history.replaceState(null, '', location.pathname + location.search + newHash);
    }
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
})();


/* ── SECTION DEEP-LINKS ─────────────────────────────────────────
   Landing via a shared link like salmoconstruction.com/#book should
   scroll to that section. The loading screen locks scroll (~2.2s) and
   lazy images shift layout, so the browser's native jump misses — we
   re-assert the position once things settle, but never fight the user
   if they've already started scrolling. (Project deep-links #project=…
   are handled separately in components.js.) */
(function initSectionDeepLink() {
  const hash = location.hash;
  if (!hash || hash.indexOf('=') !== -1) return;      // skip #project=slug etc.
  const target = document.getElementById(hash.slice(1));
  if (!target) return;

  let userScrolled = false;
  const mark = () => { userScrolled = true; };
  window.addEventListener('wheel', mark, { passive: true, once: true });
  window.addEventListener('touchmove', mark, { passive: true, once: true });
  window.addEventListener('keydown', e => {
    if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key)) mark();
  }, { once: true });

  function go() {
    if (userScrolled) return;
    const vh = window.innerHeight;
    if (!vh) return;                       // viewport not ready yet — a later run handles it
    const navH    = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 24;
    const rectTop = target.getBoundingClientRect().top + window.scrollY;
    const secH    = target.offsetHeight;
    /* If the section fits on screen (e.g. Book), centre it vertically so a
       shared link lands nicely framed; taller sections just align to the top. */
    const top = secH < vh - navH
      ? rectTop - Math.max(navH, (vh - secH) / 2)
      : rectTop - navH;
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
  }

  document.addEventListener('salmo:loaded', () => { go(); setTimeout(go, 300); }); // first visit (after loader)
  window.addEventListener('load', () => { go(); setTimeout(go, 300); });           // repeat visit / resources done
  setTimeout(go, 400);                                                             // fallback
  setTimeout(go, 900);                                                             // late fallback (slow layout/viewport)
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
