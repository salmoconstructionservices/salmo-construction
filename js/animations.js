/* ============================================================
   SALMO CONSTRUCTION SERVICES — GSAP Animations
   Requires: gsap.min.js + ScrollTrigger.min.js (CDN)
   ============================================================ */

'use strict';

// Guard: run only when GSAP is available
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  initAnimations();
}

function initAnimations() {

  /* On phones, reveals fire earlier (as soon as an element peeks in) and run
     faster, so content appears with the slightest scroll instead of lagging. */
  const MOBILE = window.matchMedia('(max-width: 640px)').matches;

  /* ── HERO ANIMATIONS ──────────────────────────────────────────
     One paused timeline holds the whole hero entrance (text, house image,
     line-drawn house). It plays every time the page opens — first load,
     reload, or Back/Forward — and replays whenever the visitor scrolls
     back up to the hero after it has fully left the screen. Visitors who
     prefer reduced motion get the finished state with no animation. */
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroTl  = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

  // Hero right (house SVG) fades + scales in
  heroTl.fromTo('#hero .hero-right',
    { opacity: 0, x: 60, scale: 0.94 },
    { opacity: 1, x: 0, scale: 1, duration: 1.1 }, 0);

  // Headline → subtitle → description → CTA buttons
  heroTl.fromTo('.hero-title',    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.85 }, 0.3);
  heroTl.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7  }, 0.5);
  heroTl.fromTo('.hero-desc',     { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 }, 0.65);
  heroTl.fromTo('.hero-ctas',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6  }, 0.8);

  /* SVG house draw — each line traces itself in white */
  const house = document.getElementById('hero-house');
  const housePaths = house ? house.querySelectorAll('.house-path') : [];
  if (housePaths.length) {
    housePaths.forEach(path => {
      let length;
      try {
        length = path.getTotalLength ? path.getTotalLength() : 200;
      } catch {
        length = 200;
      }
      gsap.set(path, { strokeDasharray: length });
      path.dataset.len = length;
    });
    heroTl.fromTo(housePaths,
      { strokeDashoffset: i => housePaths[i].dataset.len },
      { strokeDashoffset: 0, stroke: '#FFFFFF', duration: 2.0, stagger: 0.035, ease: 'power2.inOut' }, 0.3);
  }

  function playHero() {
    if (REDUCED) heroTl.progress(1);   // show finished state, no motion
    else heroTl.restart();
  }

  /* Page open: play once the page is ready (salmo:loaded), with a timed
     fallback so the hero can never stay blank if that event is missed. */
  let introDone = false;
  const intro = () => { if (introDone) return; introDone = true; playHero(); };
  document.addEventListener('salmo:loaded', intro, { once: true });
  setTimeout(intro, 2600);

  /* Back/Forward restores the page from cache without re-running scripts —
     replay the entrance so it still "loads" every time the page opens. */
  window.addEventListener('pageshow', e => { if (e.persisted) playHero(); });

  /* Scrolling back to the top: once the hero has completely left the screen,
     rewind it (invisible to the visitor), then replay as it comes back. */
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    onLeave: () => { if (!REDUCED) heroTl.pause(0); },
    onEnterBack: playHero
  });


  /* ── HOUSE: dim once scrolled past ─────────────────────────── */
  function initHouseAnimation() {
    if (!house || !housePaths.length) return;
    const paths = housePaths;

    // Scroll past hero: dim + add subtle fills
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 65%',
      onEnter: () => {
        house.classList.add('house-filled');
        gsap.to(paths, { opacity: 0.5, duration: 0.8, ease: 'power2.out' });
      },
      onLeaveBack: () => {
        house.classList.remove('house-filled');
        gsap.to(paths, { opacity: 1, duration: 0.5 });
      }
    });
  }

  initHouseAnimation();


  /* ── GENERIC SCROLL REVEAL ─────────────────────────────────── */
  function initReveal() {
    // .reveal — fade up
    gsap.utils.toArray('.reveal').forEach((el, i) => {
      gsap.fromTo(el, {
        opacity: 0,
        y: 36
      }, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: MOBILE ? 'top 98%' : 'top 88%',
          toggleActions: 'play none none none'
        },
        delay: (i % 4) * 0.06
      });
    });

    // .reveal-left — slide from left
    gsap.utils.toArray('.reveal-left').forEach(el => {
      gsap.fromTo(el, {
        opacity: 0,
        x: -50
      }, {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: MOBILE ? 'top 98%' : 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // .reveal-right — slide from right
    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.fromTo(el, {
        opacity: 0,
        x: 50
      }, {
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: MOBILE ? 'top 98%' : 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    // .reveal-scale — scale in
    gsap.utils.toArray('.reveal-scale').forEach(el => {
      gsap.fromTo(el, {
        opacity: 0,
        scale: 0.92
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: el,
          start: MOBILE ? 'top 98%' : 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  initReveal();




  /* ── STEP ITEMS STAGGER ─────────────────────────────────────── */
  (function initSteps() {
    const steps = document.querySelectorAll('.step');
    if (!steps.length) return;

    steps.forEach((step, i) => {
      gsap.fromTo(step, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: MOBILE ? 'top 98%' : 'top 88%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.12
      });
    });
  })();


  /* ── COUNTER ANIMATION ──────────────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('.counter-val');
    if (!counters.length) return;

    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10) || 0;

      ScrollTrigger.create({
        trigger: counter,
        start: MOBILE ? 'top 98%' : 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo({ val: 0 }, { val: target }, {
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: function () {
              counter.textContent = Math.round(this.targets()[0].val);
            }
          });
        }
      });
    });
  }

  initCounters();


  /* ── TRUST BADGES STAGGER ───────────────────────────────────── */
  (function initTrustBadges() {
    const badges = document.querySelectorAll('.trust-badge');
    if (!badges.length) return;

    badges.forEach((badge, i) => {
      gsap.fromTo(badge, {
        opacity: 0,
        y: 30,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: badge,
          start: MOBILE ? 'top 98%' : 'top 88%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.1
      });
    });
  })();


  /* ── WHY ITEMS STAGGER ──────────────────────────────────────── */
  (function initWhyItems() {
    const items = document.querySelectorAll('.why-item');
    if (!items.length) return;

    items.forEach((item, i) => {
      gsap.fromTo(item, {
        opacity: 0,
        x: -20
      }, {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: MOBILE ? 'top 98%' : 'top 90%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.07
      });
    });
  })();


  /* ── VALUE CARDS STAGGER ────────────────────────────────────── */
  (function initValueCards() {
    const cards = document.querySelectorAll('.value-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: 24
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: MOBILE ? 'top 98%' : 'top 90%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.1
      });
    });
  })();


  /* ── FAQ ITEMS STAGGER ──────────────────────────────────────── */
  (function initFaqReveal() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item, i) => {
      gsap.fromTo(item, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: MOBILE ? 'top 98%' : 'top 90%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.06
      });
    });
  })();


  /* ── BENTO GRID REVEAL ──────────────────────────────────────── */
  (function initBento() {
    const items = document.querySelectorAll('.bento-item');
    if (!items.length) return;

    items.forEach((item, i) => {
      gsap.fromTo(item, {
        opacity: 0,
        scale: 0.96
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: MOBILE ? 'top 98%' : 'top 88%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.1
      });
    });
  })();


  /* ── CONTACT ITEMS STAGGER ──────────────────────────────────── */
  (function initContactItems() {
    const items = document.querySelectorAll('.contact-item');
    if (!items.length) return;

    items.forEach((item, i) => {
      gsap.fromTo(item, {
        opacity: 0,
        x: -16
      }, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: MOBILE ? 'top 98%' : 'top 90%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.07
      });
    });
  })();


  /* ── MOBILE SPEED-UP ────────────────────────────────────────────
     Run every scroll-reveal tween ~2x quicker and trim the stagger so
     content snaps in with the slightest scroll rather than lingering.
     Re-applied on load in case the mobile viewport settles after this
     script first runs (idempotent — the < 2 guard skips already-sped tweens). */
  function applyMobileSpeedup() {
    if (!window.matchMedia('(max-width: 640px)').matches) return;
    ScrollTrigger.getAll().forEach(st => {
      const tween = st.animation;
      if (!tween || typeof tween.timeScale !== 'function' || tween.timeScale() >= 2) return;
      tween.timeScale(2.2);
      if (typeof tween.delay === 'function' && tween.delay() > 0.03) tween.delay(0.03);
    });
  }
  /* Apply across several settle points so it lands regardless of when the
     mobile viewport / loading screen resolves (idempotent). */
  applyMobileSpeedup();
  window.addEventListener('load', applyMobileSpeedup);
  document.addEventListener('salmo:loaded', applyMobileSpeedup);
  setTimeout(applyMobileSpeedup, 2500);
  const mq = window.matchMedia('(max-width: 640px)');
  if (mq.addEventListener) mq.addEventListener('change', applyMobileSpeedup);

  /* Recalculate scroll-trigger positions as the page settles. Without the old
     loading screen, eager marquee/bento images load and shift the layout after
     the triggers were measured — stale positions make reveals fire at the wrong
     scroll spots (glitches when scrolling). Refresh on load and as images land. */
  function refreshTriggers() { try { ScrollTrigger.refresh(); } catch (e) {} }
  window.addEventListener('load', refreshTriggers);
  [700, 1600, 3200].forEach(t => setTimeout(refreshTriggers, t));
  document.querySelectorAll('.bento-img, .marquee-item img').forEach(img => {
    if (!img.complete) img.addEventListener('load', refreshTriggers, { once: true });
  });

} // end initAnimations
