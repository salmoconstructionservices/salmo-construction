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

  /* ── HERO ANIMATIONS ──────────────────────────────────────── */
  function runHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Hero right (house SVG) fades + scales in
    tl.fromTo('#hero .hero-right', {
      opacity: 0,
      x: 60,
      scale: 0.94
    }, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.1
    }, 0);

    // Label
    tl.fromTo('#hero-label', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7
    }, 0.15);

    // Headline
    tl.fromTo('.hero-title', {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 0.85
    }, 0.3);

    // Subtitle
    tl.fromTo('.hero-subtitle', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7
    }, 0.5);

    // Description
    tl.fromTo('.hero-desc', {
      opacity: 0,
      y: 24
    }, {
      opacity: 1,
      y: 0,
      duration: 0.65
    }, 0.65);

    // CTA buttons
    tl.fromTo('.hero-ctas', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, 0.8);
  }

  // Play hero animations after loading screen OR immediately if already visited
  if (sessionStorage.getItem('salmo_visited')) {
    // Run right away (no loading screen)
    setTimeout(runHeroAnimations, 100);
  } else {
    document.addEventListener('salmo:loaded', runHeroAnimations);
  }


  /* ── SVG HOUSE DRAW ANIMATION ─────────────────────────────── */
  function initHouseAnimation() {
    const house = document.getElementById('hero-house');
    if (!house) return;

    const paths = house.querySelectorAll('.house-path');
    if (!paths.length) return;

    // Set up each path to start invisible
    paths.forEach(path => {
      let length;
      try {
        length = path.getTotalLength ? path.getTotalLength() : 200;
      } catch {
        length = 200;
      }
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });
    });

    // Draw in with white strokes
    function drawHouse() {
      gsap.to(paths, {
        strokeDashoffset: 0,
        stroke: '#FFFFFF',
        duration: 2.0,
        stagger: 0.035,
        ease: 'power2.inOut',
        delay: 0.3
      });
    }

    if (sessionStorage.getItem('salmo_visited')) {
      setTimeout(drawHouse, 100);
    } else {
      document.addEventListener('salmo:loaded', drawHouse);
    }

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
          start: 'top 88%',
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
          start: 'top 85%',
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
          start: 'top 85%',
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
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  initReveal();


  /* ── SERVICES CARDS STAGGER ────────────────────────────────── */
  (function initServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      // Each card's reveal is already handled by .reveal above.
      // Add an additional subtle stagger override
      const st = card._gsapST;
      if (st) st.delay(i * 0.08);
    });
  })();


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
          start: 'top 88%',
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
        start: 'top 85%',
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
          start: 'top 88%',
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
          start: 'top 90%',
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
          start: 'top 90%',
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
          start: 'top 90%',
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
          start: 'top 88%',
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
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.07
      });
    });
  })();

} // end initAnimations
