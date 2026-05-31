/* ============================================================
   SALMO CONSTRUCTION SERVICES — Interactive Components
   FAQ accordion | Floating FAB | Testimonial / Marquee pause
   ============================================================ */

'use strict';

/* ── FAQ ACCORDION ──────────────────────────────────────────── */
(function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen    = btn.classList.contains('open');
      const answerId  = btn.getAttribute('aria-controls');
      const answer    = answerId ? document.getElementById(answerId) : null;

      // Close all others
      questions.forEach(other => {
        if (other !== btn) {
          other.classList.remove('open');
          other.setAttribute('aria-expanded', 'false');
          const otherId = other.getAttribute('aria-controls');
          const otherAnswer = otherId ? document.getElementById(otherId) : null;
          if (otherAnswer) otherAnswer.classList.remove('open');
        }
      });

      // Toggle current
      if (isOpen) {
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        if (answer) answer.classList.remove('open');
      } else {
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.classList.add('open');
      }
    });

    // Keyboard: Enter / Space
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
})();


/* ── FLOATING CONTACT FAB ───────────────────────────────────── */
(function initFAB() {
  const fabBtn     = document.getElementById('fab-btn');
  const fabOptions = document.getElementById('fab-options');
  if (!fabBtn || !fabOptions) return;

  let isOpen = false;

  function openFAB() {
    if (isOpen) return;
    isOpen = true;
    fabBtn.classList.add('open');
    fabBtn.setAttribute('aria-expanded', 'true');
    fabOptions.setAttribute('aria-hidden', 'false');
    fabOptions.style.overflow = 'hidden';

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(fabOptions,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.32, ease: 'power2.out',
          onComplete: () => { fabOptions.style.overflow = 'visible'; fabOptions.style.pointerEvents = 'all'; }
        }
      );
    }
  }

  function closeFAB() {
    if (!isOpen) return;
    isOpen = false;
    fabBtn.classList.remove('open');
    fabBtn.setAttribute('aria-expanded', 'false');
    fabOptions.setAttribute('aria-hidden', 'true');
    fabOptions.style.overflow = 'hidden';
    fabOptions.style.pointerEvents = 'none';

    if (typeof gsap !== 'undefined') {
      gsap.to(fabOptions, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
  }

  fabBtn.addEventListener('click', () => { isOpen ? closeFAB() : openFAB(); });
  document.addEventListener('click', e => { if (isOpen && !e.target.closest('#contact-fab')) closeFAB(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeFAB(); });
})();


/* ── SERVICE CARD MODAL (mobile) ────────────────────────────── */
(function initServiceCards() {
  const cards   = document.querySelectorAll('.service-card');
  const modal   = document.getElementById('service-modal');
  if (!cards.length || !modal) return;

  const backdrop = modal.querySelector('.service-modal-backdrop');
  const closeBtn = modal.querySelector('.service-modal-close');
  const iconEl   = modal.querySelector('.service-modal-icon');
  const titleEl  = modal.querySelector('.service-modal-title');
  const listEl   = modal.querySelector('.service-modal-list');

  function isMobile() {
    return window.matchMedia('(hover: none)').matches;
  }

  function openModal(card) {
    const srcIcon  = card.querySelector('.service-icon');
    const srcTitle = card.querySelector('.service-title');

    iconEl.innerHTML    = srcIcon  ? srcIcon.innerHTML  : '';
    titleEl.textContent = srcTitle ? srcTitle.textContent.trim() : '';

    listEl.innerHTML = '';
    card.querySelectorAll('.service-items li').forEach(li => {
      const item = document.createElement('li');
      item.textContent = li.textContent.trim();
      listEl.appendChild(item);
    });

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (!isMobile()) return;
      openModal(card);
    });
  });

  backdrop?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
})();


/* ── PROJECTS GALLERY ───────────────────────────────────────── */
/*
 * All 20 projects are defined below. For each project, JS loads the photo
 * from assets/images/projects/. If the file exists, the card is rendered.
 * If the file does not exist, no card is shown — no placeholder, no gap.
 *
 * To make a card appear:
 *   1. Upload the photo to assets/images/projects/
 *   2. Name it exactly as shown (e.g. "project 1.png")
 *   3. Reload the page — the card appears automatically, no code changes needed.
 */
(function initProjectsGallery() {
  const gallery = document.getElementById('projects-gallery');
  if (!gallery) return;

  const BASE = 'assets/images/projects/';

  const PROJECTS = [
    // PROJECT 1 - Two Storey Mixed-Use Building
    // Location: San Jose City, Nueva Ecija
    // Photo: "project 1.png" — upload to assets/images/projects/ when ready
    { num: 1,  title: 'Two Storey Mixed-Use Building',                                       location: 'San Jose City, Nueva Ecija'   },

    // PROJECT 2 - Two Storey House Renovation and Extension
    // Location: San Jose City, Nueva Ecija
    // Photo: "project 2.png" — upload to assets/images/projects/ when ready
    { num: 2,  title: 'Two Storey House Renovation and Extension',                           location: 'San Jose City, Nueva Ecija'   },

    // PROJECT 3 - Two Storey Residential Building
    // Location: Imus City, Cavite
    // Photo: "project 3.png" — upload to assets/images/projects/ when ready
    { num: 3,  title: 'Two Storey Residential Building',                                     location: 'Imus City, Cavite'            },

    // PROJECT 4 - Two Storey Mixed-Use Building
    // Location: Imus City, Cavite
    // Photo: "project 4.png" — upload to assets/images/projects/ when ready
    { num: 4,  title: 'Two Storey Mixed-Use Building',                                       location: 'Imus City, Cavite'            },

    // PROJECT 5 - Two Storey Residential Building
    // Location: Munoz City, Nueva Ecija
    // Photo: "project 5.png" — upload to assets/images/projects/ when ready
    { num: 5,  title: 'Two Storey Residential Building',                                     location: 'Munoz City, Nueva Ecija'      },

    // PROJECT 6 - Addition of Dirty Kitchen & Laundry to Two Storey Residential Bldg
    // Location: San Jose City, Nueva Ecija
    // Photo: "project 6.png" — upload to assets/images/projects/ when ready
    { num: 6,  title: 'Addition of Dirty Kitchen & Laundry to Two Storey Residential Bldg', location: 'San Jose City, Nueva Ecija'   },

    // PROJECT 7 - Two Storey Residential Building
    // Location: San Jose City, Nueva Ecija
    // Photo: "project 7.png" — upload to assets/images/projects/ when ready
    { num: 7,  title: 'Two Storey Residential Building',                                     location: 'San Jose City, Nueva Ecija'   },

    // PROJECT 8 - Renovation of Two Storey Residential Bldg
    // Location: San Jose City, Nueva Ecija
    // Photo: "project 8.png" — upload to assets/images/projects/ when ready
    { num: 8,  title: 'Renovation of Two Storey Residential Bldg',                          location: 'San Jose City, Nueva Ecija'   },

    // PROJECT 9 - Four Bedroom Two Storey Residential Bldg
    // Location: Marikina City, Metro Manila
    // Photo: "project 9.png" — upload to assets/images/projects/ when ready
    { num: 9,  title: 'Four Bedroom Two Storey Residential Bldg',                           location: 'Marikina City, Metro Manila'  },

    // PROJECT 10 - Two Storey Residential Building
    // Location: Marikina City, Metro Manila
    // Photo: "project 10.png" — upload to assets/images/projects/ when ready
    { num: 10, title: 'Two Storey Residential Building',                                     location: 'Marikina City, Metro Manila'  },

    // PROJECT 11 - Two Storey Residential Building
    // Location: Antipolo City, Rizal
    // Photo: "project 11.png" — upload to assets/images/projects/ when ready
    { num: 11, title: 'Two Storey Residential Building',                                     location: 'Antipolo City, Rizal'         },

    // PROJECT 12 - Multifamily Dwelling Units
    // Location: Parañaque City, Metro Manila
    // Photo: "project 12.png" — upload to assets/images/projects/ when ready
    { num: 12, title: 'Multifamily Dwelling Units',                                          location: 'Parañaque City, Metro Manila' },

    // PROJECT 13 - One Storey Residential Building
    // Location: Antipolo City, Rizal
    // Photo: "project 13.png" — upload to assets/images/projects/ when ready
    { num: 13, title: 'One Storey Residential Building',                                     location: 'Antipolo City, Rizal'         },

    // PROJECT 14 - One Storey Residential Building
    // Location: Antipolo City, Rizal
    // Photo: "project 14.png" — upload to assets/images/projects/ when ready
    { num: 14, title: 'One Storey Residential Building',                                     location: 'Antipolo City, Rizal'         },

    // PROJECT 15 - Renovation of Two Storey
    // Location: Marikina City, Metro Manila
    // Photo: "project 15.png" — upload to assets/images/projects/ when ready
    { num: 15, title: 'Renovation of Two Storey',                                            location: 'Marikina City, Metro Manila'  },

    // PROJECT 16 - Renovation of One Storey
    // Location: Marikina City, Metro Manila
    // Photo: "project 16.png" — upload to assets/images/projects/ when ready
    { num: 16, title: 'Renovation of One Storey',                                            location: 'Marikina City, Metro Manila'  },

    // PROJECT 17 - Renovation of One Storey Residential Bldg
    // Location: Parañaque City, Metro Manila
    // Photo: "project 17.png" — upload to assets/images/projects/ when ready
    { num: 17, title: 'Renovation of One Storey Residential Bldg',                          location: 'Parañaque City, Metro Manila' },

    // PROJECT 18 - Two Storey Residential Building
    // Location: Antipolo City, Rizal
    // Photo: "project 18.png" — upload to assets/images/projects/ when ready
    { num: 18, title: 'Two Storey Residential Building',                                     location: 'Antipolo City, Rizal'         },

    // PROJECT 19 - Renovation of Two Storey Residential Bldg
    // Location: Las Piñas City, Metro Manila
    // Photo: "project 19.png" — upload to assets/images/projects/ when ready
    { num: 19, title: 'Renovation of Two Storey Residential Bldg',                          location: 'Las Piñas City, Metro Manila' },

    // PROJECT 20 - One Storey with Roof Deck
    // Location: Quezon City, Metro Manila
    // Photo: "project 20.png" — upload to assets/images/projects/ when ready
    { num: 20, title: 'One Storey with Roof Deck',                                           location: 'Quezon City, Metro Manila'    },
  ];

  PROJECTS.forEach(proj => {
    const src  = `${BASE}project ${proj.num}.png`;
    const test = new Image();

    test.onload = () => {
      const numPad = String(proj.num).padStart(2, '0');
      const card   = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('aria-label', `Project ${proj.num}: ${proj.title} — ${proj.location}`);
      /* Data attrs enable the lightbox and two-tap behavior */
      card.dataset.src   = src;
      card.dataset.title = proj.title;
      card.dataset.loc   = proj.location;
      card.style.cursor  = 'zoom-in';
      card.innerHTML =
        `<img class="project-card-img" src="${src}" alt="${proj.title} — ${proj.location}" loading="lazy" />` +
        `<div class="project-card-overlay" aria-hidden="true">` +
          `<span class="project-card-num">[ ${numPad} ]</span>` +
          `<span class="project-card-title">${proj.title}</span>` +
          `<span class="project-card-loc">${proj.location}</span>` +
        `</div>`;
      gallery.appendChild(card);
    };

    // No onload — image simply doesn't load and no card is created
    test.src = src;
  });
})();


/* ── TESTIMONIAL AVATARS ────────────────────────────────────── */
/*
 * For each .testimonial-avatar[data-review="N"], JS tries to load:
 *   assets/images/reviews/review-N.png
 * If the file exists → shows the photo.
 * If not → shows the default SVG avatar (navy circle, white silhouette).
 * Upload photos to assets/images/reviews/ — they appear automatically.
 */
(function initTestimonialAvatars() {
  const avatars = document.querySelectorAll('.testimonial-avatar[data-review]');
  if (!avatars.length) return;

  /* Default avatar: navy circle with white person silhouette */
  function makeDefaultAvatar() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 48 48');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML =
      '<circle cx="24" cy="24" r="24" fill="#011E3E"/>' +
      '<circle cx="24" cy="19" r="8" fill="rgba(255,255,255,0.55)"/>' +
      '<path d="M8 44 C8 35.163 15.163 28 24 28 S40 35.163 40 44" fill="rgba(255,255,255,0.55)"/>';
    return svg;
  }

  avatars.forEach(el => {
    const n   = el.dataset.review;
    const src = `assets/images/reviews/review-${n}.png`;

    /* Show default avatar immediately as placeholder */
    el.appendChild(makeDefaultAvatar());

    const test = new Image();

    test.onload = () => {
      /* Photo exists — replace avatar with the real photo */
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      el.innerHTML = '';
      el.appendChild(img);
    };

    /* test.onerror — default avatar already shown, nothing more to do */

    test.src = src;
  });
})();


/* ── TESTIMONIALS: READ MORE / READ LESS ────────────────────── */
/*
 * Truncates all testimonial text to 3 lines where content overflows.
 * Injects "Read more" / "Read less" buttons in cyan.
 * Works on both desktop (click) and mobile (tap or tap-card).
 * Pauses the carousel scroll whenever any card is expanded.
 */
(function initTestimonialReadMore() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;

  /* 3 lines at 13.5px font × 1.85 line-height */
  const THREE_LINE_H = Math.round(13.5 * 1.85 * 3); // ≈ 75px

  function pauseTrack() {
    track.style.animationPlayState = 'paused';
    track.dataset.holdPaused = '1';
  }

  function resumeTrack() {
    if (track.querySelector('.testimonial-text.is-expanded')) return;
    delete track.dataset.holdPaused;
    track.style.animationPlayState = 'running';
  }

  function expandText(textEl) {
    const card    = textEl.closest('.testimonial-card');
    const moreBtn = card?.querySelector('.read-more-btn');
    const lessBtn = card?.querySelector('.read-less-btn');
    textEl.classList.remove('is-clamped');
    textEl.classList.add('is-expanded');
    if (moreBtn) moreBtn.style.display = 'none';
    if (lessBtn) lessBtn.style.display = '';
    pauseTrack();
  }

  function collapseText(textEl) {
    const card    = textEl.closest('.testimonial-card');
    const moreBtn = card?.querySelector('.read-more-btn');
    const lessBtn = card?.querySelector('.read-less-btn');
    textEl.classList.remove('is-expanded');
    textEl.classList.add('is-clamped');
    if (moreBtn) moreBtn.style.display = '';
    if (lessBtn) lessBtn.style.display = 'none';
    resumeTrack();
  }

  function setup() {
    track.querySelectorAll('.testimonial-text').forEach(textEl => {
      /* Measure natural height before any constraint is applied */
      if (textEl.scrollHeight <= THREE_LINE_H + 3) return;

      textEl.classList.add('is-clamped');
      const card = textEl.closest('.testimonial-card');
      if (card) card.classList.add('has-long-review');

      const moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'read-more-btn';
      moreBtn.textContent = 'Read more →';
      moreBtn.setAttribute('aria-label', 'Read full review');

      const lessBtn = document.createElement('button');
      lessBtn.type = 'button';
      lessBtn.className = 'read-less-btn';
      lessBtn.textContent = 'Read less ←';
      lessBtn.setAttribute('aria-label', 'Collapse review');
      lessBtn.style.display = 'none';

      moreBtn.addEventListener('click', e => { e.stopPropagation(); expandText(textEl); });
      lessBtn.addEventListener('click', e => { e.stopPropagation(); collapseText(textEl); });

      textEl.insertAdjacentElement('afterend', moreBtn);
      moreBtn.insertAdjacentElement('afterend', lessBtn);
    });
  }

  /* Run after layout is settled so scrollHeight is accurate */
  if (document.readyState === 'complete') {
    setTimeout(setup, 150);
  } else {
    window.addEventListener('load', () => setTimeout(setup, 150));
  }

  /* Mobile: tap anywhere on a long-review card also toggles expand */
  track.addEventListener('click', e => {
    if (!window.matchMedia('(hover: none)').matches) return;
    if (e.target.closest('.read-more-btn, .read-less-btn')) return;

    const card = e.target.closest('.testimonial-card');
    if (!card?.classList.contains('has-long-review')) return;

    const textEl = card.querySelector('.testimonial-text.is-clamped, .testimonial-text.is-expanded');
    if (!textEl) return;

    if (textEl.classList.contains('is-expanded')) {
      collapseText(textEl);
    } else {
      track.querySelectorAll('.testimonial-text.is-expanded').forEach(other => {
        if (other !== textEl) collapseText(other);
      });
      expandText(textEl);
    }
  });
})();


/* ── TESTIMONIALS TRACK: PAUSE ON TOUCH ─────────────────────── */
/*
 * The photo marquee (.marquee-track) is now a native-scroll container on
 * touch devices (CSS: animation:none, overflow-x:auto). No JS pause needed.
 * The testimonials carousel still uses CSS animation, so we pause/resume it.
 */
(function initTestimonialsTrackPause() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;

  let resumeTimer = null;

  track.addEventListener('touchstart', () => {
    clearTimeout(resumeTimer);
    track.style.animationPlayState = 'paused';
  }, { passive: true });

  track.addEventListener('touchend', () => {
    clearTimeout(resumeTimer);
    if (track.dataset.holdPaused) return;
    resumeTimer = setTimeout(() => {
      track.style.animationPlayState = 'running';
    }, 1200);
  }, { passive: true });
})();


/* ── LOADING SCREEN LOGO SVG HOUSE (mini) ───────────────────── */
/* The loading screen uses text-based logo — no SVG needed there. */


/* ── INTERSECTION OBSERVER FALLBACK ─────────────────────────── */
/* For browsers without GSAP support, ensure .reveal elements still show */
(function revealFallback() {
  // Only run if GSAP is NOT loaded
  if (typeof gsap !== 'undefined') return;

  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!revealEls.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  } else {
    // Oldest fallback: just show everything
    revealEls.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
})();


/* ── HERO SCROLL HINT AUTO-HIDE ─────────────────────────────── */
(function initScrollHint() {
  const hint = document.querySelector('.hero-scroll-hint');
  if (!hint) return;

  window.addEventListener('scroll', () => {
    hint.style.opacity = window.scrollY > 80 ? '0' : '';
  }, { passive: true });
})();


/* ── ACTIVE NAV HIGHLIGHT REFINEMENT ─────────────────────────── */
/* Ensure home section (#hero) is active when at top */
(function initHeroActive() {
  window.addEventListener('scroll', () => {
    if (window.scrollY < 80) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    }
  }, { passive: true });
})();


/* ── LIGHTBOX (Canvas + Watermark + Two-tap on touch) ────────── */
/*
 * Desktop: single click on any project photo opens lightbox.
 * Touch:   first tap  → highlights item (tap-active overlay).
 *           second tap → opens lightbox.
 *           tap elsewhere → clears highlight.
 * Covers: bento grid, photo marquee, and project gallery cards.
 */
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const backdrop = document.getElementById('lightbox-backdrop');
  const closeBtn = document.getElementById('lightbox-close');
  const canvas   = document.getElementById('lightbox-canvas');
  const titleEl  = document.getElementById('lightbox-title');
  const locEl    = document.getElementById('lightbox-loc');
  if (!lightbox || !canvas) return;

  const ctx = canvas.getContext('2d');

  /* Preload watermark logo */
  let logoImg = null, logoReady = false;
  function tryLoad(srcs, onDone) {
    if (!srcs.length) { onDone(null); return; }
    const img = new Image();
    img.onload  = () => onDone(img);
    img.onerror = () => tryLoad(srcs.slice(1), onDone);
    img.src = srcs[0];
  }
  tryLoad(['assets/images/logo.png', 'assets/images/salmo.png'],
    img => { logoImg = img; logoReady = true; });

  function renderCanvas(photo) {
    const MAX_W = window.innerWidth  * 0.88;
    const MAX_H = window.innerHeight * 0.78;
    const scale = Math.min(MAX_W / photo.naturalWidth, MAX_H / photo.naturalHeight, 1);
    const w = Math.round(photo.naturalWidth  * scale);
    const h = Math.round(photo.naturalHeight * scale);
    canvas.width = w; canvas.height = h;
    ctx.drawImage(photo, 0, 0, w, h);
    ctx.save();
    if (logoReady && logoImg) {
      const logoW  = Math.round(w * 0.15);
      const logoH  = Math.round(logoW * logoImg.naturalHeight / logoImg.naturalWidth);
      const margin = Math.round(Math.min(w, h) * 0.015);
      ctx.globalAlpha = 0.20;
      ctx.drawImage(logoImg, w - logoW - margin, h - logoH - margin, logoW, logoH);
    } else {
      const fontSize = Math.max(11, Math.round(w * 0.022));
      const margin   = Math.round(Math.min(w, h) * 0.015);
      ctx.globalAlpha = 0.45;
      ctx.font = `600 ${fontSize}px Montserrat, sans-serif`;
      ctx.fillStyle = '#ffffff'; ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
      ctx.fillText('© Salmo Construction Services', w - margin, h - margin);
    }
    ctx.restore();
  }

  function openLightbox(src, title, loc) {
    titleEl.textContent = title || '';
    locEl.textContent   = loc   || '';
    const photo = new Image();
    photo.onload = () => {
      renderCanvas(photo);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
    photo.src = src;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { ctx.clearRect(0, 0, canvas.width, canvas.height); }, 350);
  }

  canvas.addEventListener('contextmenu', e => e.preventDefault());

  /* ── Two-tap state for touch devices ── */
  const isTouch = () => window.matchMedia('(hover: none)').matches;
  let tappedItem = null;

  function clearTap() {
    if (tappedItem) { tappedItem.classList.remove('tap-active'); tappedItem = null; }
  }

  function handleItemClick(item) {
    if (!isTouch()) {
      openLightbox(item.dataset.src, item.dataset.title, item.dataset.loc);
      return;
    }
    if (tappedItem === item) {
      clearTap();
      openLightbox(item.dataset.src, item.dataset.title, item.dataset.loc);
    } else {
      clearTap();
      tappedItem = item;
      item.classList.add('tap-active');
    }
  }

  /* Clear tap when clicking outside any photo item */
  document.addEventListener('click', e => {
    if (tappedItem && !e.target.closest('.bento-item, .marquee-item, .project-card')) {
      clearTap();
    }
  });

  /* Bento + marquee items (static HTML) */
  document.querySelectorAll('.bento-item[data-src], .marquee-item[data-src]').forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => handleItemClick(item));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item.dataset.src, item.dataset.title, item.dataset.loc);
      }
    });
  });

  /* Project gallery cards (dynamically rendered — use event delegation) */
  const gallery = document.getElementById('projects-gallery');
  if (gallery) {
    gallery.addEventListener('click', e => {
      const card = e.target.closest('.project-card[data-src]');
      if (card) handleItemClick(card);
    });
  }

  backdrop.addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();


/* ── HOUSE WIDGET — section-triggered build + popup messages ─── */
(function initHouseWidget() {
  if (typeof gsap === 'undefined') return;

  const fab      = document.getElementById('contact-fab');
  const hwSvg    = document.getElementById('hw-svg');
  if (!fab || !hwSvg) return;

  const progressEl = document.querySelector('.hw-progress');
  const messageEl  = document.getElementById('hw-message');
  const arrowEl    = document.getElementById('hw-arrow');

  /* ── Map each section to the path it draws ── */
  const STAGE_MAP = {
    'services':     'hw-ground',
    'how-we-work':  'hw-walls',
    'projects':     'hw-roof',
    'testimonials': 'hw-win-l',
    'trust':        'hw-win-r',
    'about':        'hw-door',
    'faq':          'hw-chimney'
  };

  /* Initialize all house paths as invisible */
  Object.values(STAGE_MAP).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    } catch (e) {}
  });

  /* ── Section messages — shown every time on scroll down, no sessionStorage gate ── */
  const MESSAGES = {
    'services':     'Foundation started!',
    'how-we-work':  'Walls are rising!',
    'projects':     'Roof is going up!',
    'testimonials': 'Windows are in!',
    'trust':        'Details being placed!',
    'about':        'Door is set!',
    'faq':          'Almost complete!',
    'contact':      'Your dream home\nis near!'
  };

  let pulseKill = null;

  function showMessage(text, persistent) {
    if (!messageEl) return;
    if (pulseKill) { pulseKill(); pulseKill = null; }
    messageEl.textContent = text;

    if (persistent) {
      let active = true;
      pulseKill = () => {
        active = false;
        gsap.killTweensOf(messageEl);
        gsap.set(messageEl, { opacity: 0 });
      };
      (function loop() {
        if (!active) return;
        gsap.fromTo(messageEl, { opacity: 0 }, {
          opacity: 1, duration: 0.5,
          onComplete: () => {
            if (!active) return;
            setTimeout(() => {
              gsap.to(messageEl, {
                opacity: 0, duration: 0.5,
                onComplete: () => { if (active) setTimeout(loop, 200); }
              });
            }, 2000);
          }
        });
      })();
    } else {
      gsap.killTweensOf(messageEl);
      gsap.fromTo(messageEl, { opacity: 0 }, { opacity: 1, duration: 0.35 });
      setTimeout(() => gsap.to(messageEl, { opacity: 0, duration: 0.4 }), 3000);
    }
  }

  /* ── Scroll → progress % counter ── */
  function getMaxScroll() {
    const el = document.getElementById('contact');
    return el ? Math.max(1, el.offsetTop - window.innerHeight * 0.5)
              : document.documentElement.scrollHeight - window.innerHeight;
  }

  function updateProgress() {
    const raw = Math.min(1, Math.max(0, window.scrollY / getMaxScroll()));
    if (progressEl) progressEl.textContent = Math.round(raw * 99) + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ── Section triggers: draw stage + bounce + message ── */
  const SECTIONS = ['services','how-we-work','projects','testimonials','trust','about','faq','contact'];
  let lastIdx = -1;

  function triggerSection(id) {
    const idx = SECTIONS.indexOf(id);
    if (idx <= lastIdx) return; /* scroll-down only */
    lastIdx = idx;

    /* Draw the matching house path */
    const pathId = STAGE_MAP[id];
    if (pathId) {
      const el = document.getElementById(pathId);
      if (el) gsap.to(el, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' });
    }

    /* Attention bounce */
    hwSvg.classList.remove('house-attention');
    void hwSvg.offsetWidth;
    hwSvg.classList.add('house-attention');
    setTimeout(() => hwSvg.classList.remove('house-attention'), 450);

    /* Progress counter pulse */
    if (progressEl) {
      progressEl.classList.remove('milestone');
      void progressEl.offsetWidth;
      progressEl.classList.add('milestone');
      setTimeout(() => progressEl.classList.remove('milestone'), 500);
    }

    /* Popup message — always show on scroll down */
    const msg = MESSAGES[id];
    if (msg) setTimeout(() => showMessage(msg, id === 'contact'), 220);

    /* Section 09 extras */
    if (id === 'contact') {
      if (arrowEl) arrowEl.classList.add('show');
      gsap.to(hwSvg, { filter: 'drop-shadow(0 0 5px rgba(0,180,216,0.7))', duration: 0.6, delay: 0.9 });
    }
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) triggerSection(e.target.id); });
    }, { threshold: 0.2 });
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ── Nav-click sync: snap house state to whichever section was jumped to ── */
  function resetHouse() {
    lastIdx = -1;
    SECTIONS.forEach(sId => {
      const el = document.getElementById(STAGE_MAP[sId]);
      if (!el) return;
      try { gsap.set(el, { strokeDashoffset: el.getTotalLength() }); } catch (e) {}
    });
  }

  function syncToSection(id) {
    const targetIdx = SECTIONS.indexOf(id);
    if (targetIdx < 0) return;

    /* Reset so triggerSection will run regardless of direction */
    lastIdx = targetIdx - 1;

    /* Instantly reveal every stage before the target */
    for (let i = 0; i < targetIdx; i++) {
      const el = document.getElementById(STAGE_MAP[SECTIONS[i]]);
      if (el) gsap.set(el, { strokeDashoffset: 0 });
    }
    /* Instantly hide every stage after the target */
    for (let i = targetIdx + 1; i < SECTIONS.length; i++) {
      const el = document.getElementById(STAGE_MAP[SECTIONS[i]]);
      if (!el) continue;
      try { gsap.set(el, { strokeDashoffset: el.getTotalLength() }); } catch (e) {}
    }
    /* Animate the target stage */
    triggerSection(id);
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const hash = link.getAttribute('href').slice(1);
      if (hash === 'hero' || hash === '') { resetHouse(); return; }
      if (SECTIONS.includes(hash)) setTimeout(() => syncToSection(hash), 80);
    });
  });

  /* ── Color: samples behind SVG, toggles on-light on #contact-fab ── */
  function updateColor() {
    const rect = hwSvg.getBoundingClientRect();
    fab.style.visibility = 'hidden';
    const el = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    fab.style.visibility = '';
    if (!el) return;
    let node = el, isDark = false;
    while (node && node !== document.body) {
      const cls = typeof node.className === 'string' ? node.className : '';
      if (cls.includes('black-bg') || cls.includes('blueprint-bg') || node.id === 'hero') {
        isDark = true; break;
      }
      node = node.parentElement;
    }
    fab.classList.toggle('on-light', !isDark);
  }

  window.addEventListener('scroll', updateColor, { passive: true });
  updateColor();

  /* ── On refresh: snap house to wherever the user already is ── */
  (function syncOnLoad() {
    if (window.scrollY < 50) return;
    const threshold = window.innerHeight * 0.5;
    let current = null;
    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i]);
      if (!el) continue;
      if (el.getBoundingClientRect().top < threshold) current = SECTIONS[i];
    }
    if (current) syncToSection(current);
  })();
})();
