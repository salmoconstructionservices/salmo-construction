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


/* ── PROJECT DATA ───────────────────────────────────────────── */
/*
 * All projects are defined here. Each entry has:
 *   num      — project number
 *   title    — project description
 *   location — city / province
 *   base     — folder path (trailing slash, spaces allowed)
 *   photos   — ordered array: cover first, then extras
 *   featured — true = appears in the bento grid
 *
 * To add a new project: copy a block, set the fields, add files to the folder.
 * To remove a project: delete its block. No other code changes needed.
 */
const PROJECTS = [
  // PROJECT 1
  { num: 1,  title: 'Two Storey Mixed-Use Building',
             location: 'San Jose City, Nueva Ecija',
             base: 'assets/images/marquee/Project 1/',
             photos: ['Project 1.png', 'Project 1.1.png'],
             featured: false },

  // PROJECT 2
  { num: 2,  title: 'Two Storey House Renovation and Extension',
             location: 'San Jose City, Nueva Ecija',
             base: 'assets/images/marquee/Project 2/',
             photos: ['Project 2.png', 'Project 2.1.png'],
             featured: false },

  // PROJECT 3
  { num: 3,  title: 'Two Storey Residential Building',
             location: 'Imus City, Cavite',
             base: 'assets/images/bento/Project 3/',
             photos: ['Project 3.JPG','Project 3.1.JPG','Project 3.2.JPG','Project 3.3.JPG',
                      'Project 3.4.JPG','Project 3.5.JPG','Project 3.6.JPG','Project 3.7.JPG',
                      'Project 3.8.JPG','Project 3.9.JPG'],
             featured: true },

  // PROJECT 4
  { num: 4,  title: 'Two Storey Mixed-Use Building',
             location: 'Imus City, Cavite',
             base: 'assets/images/marquee/Project 4/',
             photos: ['Project 4.png', 'Project 4.1.png'],
             featured: false },

  // PROJECT 5
  { num: 5,  title: 'Two Storey Residential Building',
             location: 'Munoz City, Nueva Ecija',
             base: 'assets/images/marquee/Project 5/',
             photos: ['Project 5.JPG','Project 5.1.JPG','Project 5.2.JPG','Project 5.3.JPG'],
             featured: false },

  // PROJECT 6
  { num: 6,  title: 'Addition of Dirty Kitchen & Laundry to Two Storey Residential Bldg',
             location: 'San Jose City, Nueva Ecija',
             base: 'assets/images/marquee/Project 6/',
             photos: ['Project 6.JPG','Project 6.1.JPG','Project 6.2.JPG',
                      'Project 6.3.JPG','Project 6.4.JPG','Project 6.5.JPG'],
             featured: false },

  // PROJECT 7
  { num: 7,  title: 'Two Storey Residential Building',
             location: 'San Jose City, Nueva Ecija',
             base: 'assets/images/bento/Project 7/',
             photos: ['Project 7.JPG','Project 7.1.JPG','Project 7.2.JPG'],
             featured: true },

  // PROJECT 8
  { num: 8,  title: 'Renovation of Two Storey Residential Bldg',
             location: 'San Jose City, Nueva Ecija',
             base: 'assets/images/marquee/Project 8/',
             photos: ['Project 8.JPG','Project 8.1.JPG','Project 8.2.JPG'],
             featured: false },

  // PROJECT 9
  { num: 9,  title: 'Four Bedroom Two Storey Residential Bldg',
             location: 'Marikina City, Metro Manila',
             base: 'assets/images/marquee/Project 9/',
             photos: ['Project 9.JPG','Project 9.1.JPG','Project 9.2.JPG','Project 9.3.JPG',
                      'Project 9.4.JPG','Project 9.5.JPG','Project 9.6.JPG','Project 9.7.JPG',
                      'Project 9.8.JPG','Project 9.9.JPG','Project 9.10.JPG','Project 9.11.JPG',
                      'Project 9.12.JPG','Project 9.13.JPG','Project 9.14.JPG','Project 9.15.JPG',
                      'Project 9.16.JPG','Project 9.17.JPG'],
             featured: false },

  // PROJECT 10
  { num: 10, title: 'Two Storey Residential Building',
             location: 'Marikina City, Metro Manila',
             base: 'assets/images/marquee/Project 10/',
             photos: ['Project 10.JPG','Project 10.1.JPG','Project 10.2.JPG','Project 10.3.JPG',
                      'Project 10.4.JPG','Project 10.5.JPG','Project 10.6.JPG','Project 10.7.JPG',
                      'Project 10.8.JPG','Project 10.9.JPG','Project 10.10.JPG','Project 10.11.JPG',
                      'Project 10.12.JPG','Project 10.13.JPG','Project 10.14.JPG','Project 10.15.JPG'],
             featured: false },

  // PROJECT 11
  { num: 11, title: 'Two Storey Residential Building',
             location: 'Antipolo City, Rizal',
             base: 'assets/images/marquee/Project 11/',
             photos: ['Project 11.png','Project 11.1.png'],
             featured: false },

  // PROJECT 12
  { num: 12, title: 'Multifamily Dwelling Units',
             location: 'Parañaque City, Metro Manila',
             base: 'assets/images/marquee/Project 12/',
             photos: ['Project 12.JPG','Project 12.1.png','Project 12.2.png'],
             featured: false },

  // PROJECT 13
  { num: 13, title: 'One Storey Residential Building',
             location: 'Antipolo City, Rizal',
             base: 'assets/images/marquee/Project 13/',
             photos: ['Project 13.png','Project 13.1.png'],
             featured: false },

  // PROJECT 14
  { num: 14, title: 'One Storey Residential Building',
             location: 'Antipolo City, Rizal',
             base: 'assets/images/bento/Project 14/',
             photos: ['Project 14.JPG','Project 14.1.JPG','Project 14.2.JPG',
                      'Project 14.3.JPG','Project 14.4.JPG','Project 14.5.JPG'],
             featured: true },

  // PROJECT 15
  { num: 15, title: 'Renovation of Two Storey',
             location: 'Marikina City, Metro Manila',
             base: 'assets/images/marquee/Project 15/',
             photos: ['Project 15.JPG','Project 15.1.JPG','Project 15.2.JPG','Project 15.3.JPG'],
             featured: false },

  // PROJECT 16
  { num: 16, title: 'Renovation of One Storey',
             location: 'Marikina City, Metro Manila',
             base: 'assets/images/marquee/Project 16/',
             photos: ['Project 16.JPG','Project 16.1.JPG','Project 16.2.JPG','Project 16.3.JPG',
                      'Project 16.4.JPG','Project 16.5.JPG','Project 16.6.JPG','Project 16.7.JPG'],
             featured: false },

  // PROJECT 17
  { num: 17, title: 'Renovation of One Storey Residential Bldg',
             location: 'Parañaque City, Metro Manila',
             base: 'assets/images/marquee/Project 17/',
             photos: ['Project 17.png','Project 17.1.png'],
             featured: false },

  // PROJECT 18
  { num: 18, title: 'Two Storey Residential Building',
             location: 'Antipolo City, Rizal',
             base: 'assets/images/marquee/Project 18/',
             photos: ['Project 18.JPG','Project 18.1.JPG','Project 18.2.JPG','Project 18.3.JPG',
                      'Project 18.4.JPG','Project 18.5.JPG','Project 18.6.JPG','Project 18.7.JPG',
                      'Project 18.8.JPG','Project 18.9.JPG','Project 18.10.JPG'],
             featured: false },

  // PROJECT 19
  { num: 19, title: 'Renovation of Two Storey Residential Bldg',
             location: 'Las Piñas City, Metro Manila',
             base: 'assets/images/marquee/Project 19/',
             photos: ['Project 19.JPG','Project 19.1.JPG','Project 19.2.JPG',
                      'Project 19.3.JPG','Project 19.4.JPG'],
             featured: false },

  // PROJECT 20
  { num: 20, title: 'One Storey with Roof Deck',
             location: 'Quezon City, Metro Manila',
             base: 'assets/images/marquee/Project 20/',
             photos: ['Project 20.png'],
             featured: false },

  // PROJECT 21
  { num: 21, title: '',
             location: '',
             base: 'assets/images/marquee/Project 21/',
             photos: ['Project 21.png','Project 21.1.png'],
             featured: false },

  // PROJECT 22
  { num: 22, title: '',
             location: '',
             base: 'assets/images/marquee/Project 22/',
             photos: ['Project 22.png'],
             featured: false },
];

/* Helper: encode spaces in a file path so Image() loads correctly */
function encodeImgPath(rawPath) {
  return rawPath.replace(/ /g, '%20');
}


/* ── MARQUEE STRIP ──────────────────────────────────────────── */
/*
 * Generates cover-photo items for all projects and injects them into
 * #marquee-track. Duplicates the set so translateX(-50%) loops seamlessly.
 * Animation duration is scaled to keep scroll speed consistent regardless
 * of project count.
 */
(function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  function makeItem(proj, isClone) {
    const coverSrc = encodeImgPath(proj.base + proj.photos[0]);
    const div = document.createElement('div');
    div.className = 'marquee-item';
    div.dataset.projectNum = proj.num;
    div.dataset.src   = coverSrc;
    div.dataset.title = proj.title;
    div.dataset.loc   = proj.location;

    if (isClone) {
      div.setAttribute('aria-hidden', 'true');
    } else {
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      const label = proj.title
        ? `Project ${proj.num} — ${proj.title}${proj.location ? ', ' + proj.location : ''}`
        : `Project ${proj.num}`;
      div.setAttribute('aria-label', label);
    }

    const altText = proj.title
      ? `${proj.title}${proj.location ? ' — ' + proj.location : ''}`
      : `Project ${proj.num}`;
    div.innerHTML =
      `<img src="${coverSrc}" loading="lazy" alt="${isClone ? '' : altText}" />` +
      `<div class="marquee-overlay"><div class="bento-info">` +
        (proj.title ? `<span class="bento-label">${proj.title}</span>` : '') +
        (proj.location ? `<span class="bento-location">${proj.location}</span>` : '') +
      `</div></div>`;
    return div;
  }

  /* First set */
  const firstSet = PROJECTS.map(p => makeItem(p, false));
  firstSet.forEach(el => track.appendChild(el));

  /* Duplicate set for seamless loop */
  PROJECTS.forEach(p => track.appendChild(makeItem(p, true)));

  /* Scale animation duration: ~4.5 s per project keeps visual speed consistent */
  track.style.animationDuration = Math.max(30, PROJECTS.length * 4.5) + 's';
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


/* ── LIGHTBOX CAROUSEL ──────────────────────────────────────── */
/*
 * Desktop : arrows + single canvas + infinite loop (modulo wrap).
 * Mobile  : full-screen CSS scroll-snap strip, arrows hidden.
 *           Infinite loop via clone slides: [last-clone][…photos…][first-clone].
 *           After snapping to a clone the strip silently jumps to the real slide.
 * Both    : Canvas watermark, dots, counter, X/ESC close.
 */
(function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const backdrop    = document.getElementById('lightbox-backdrop');
  const closeBtn    = document.getElementById('lightbox-close');
  const canvas      = document.getElementById('lightbox-canvas');
  const titleEl     = document.getElementById('lightbox-title');
  const locEl       = document.getElementById('lightbox-loc');
  const counterEl   = document.getElementById('lightbox-counter');
  const prevBtn     = document.getElementById('lightbox-prev');
  const nextBtn     = document.getElementById('lightbox-next');
  const dotsEl      = document.getElementById('lightbox-dots');
  const mobileStrip = document.getElementById('lb-mobile-strip');
  if (!lightbox || !canvas) return;

  const ctx = canvas.getContext('2d');

  /* ── Watermark logo preload ── */
  let logoImg = null;
  (function tryLoadLogo(srcs) {
    if (!srcs.length) return;
    const img = new Image();
    img.onload  = () => { logoImg = img; };
    img.onerror = () => tryLoadLogo(srcs.slice(1));
    img.src = srcs[0];
  })(['assets/images/logo.png', 'assets/images/salmo.png']);

  /* ── Carousel state ── */
  let carouselPhotos = [];
  let carouselIndex  = 0;
  let certLightbox   = false;

  const isMobile = () => window.innerWidth <= 640;

  /* ── Shared watermark stamp ── */
  function stampWatermark(c, cx, w, h) {
    cx.save();
    if (logoImg) {
      const logoW  = Math.round(w * 0.15);
      const logoH  = Math.round(logoW * logoImg.naturalHeight / logoImg.naturalWidth);
      const margin = Math.round(Math.min(w, h) * 0.018);
      cx.globalAlpha = 0.20;
      cx.drawImage(logoImg, w - logoW - margin, h - logoH - margin, logoW, logoH);
    } else {
      const sz  = Math.max(10, Math.round(w * 0.022));
      const mg  = Math.round(Math.min(w, h) * 0.018);
      cx.globalAlpha = 0.45;
      cx.font        = `600 ${sz}px Montserrat, sans-serif`;
      cx.fillStyle   = '#ffffff';
      cx.textAlign   = 'right';
      cx.textBaseline = 'bottom';
      cx.fillText('© Salmo Construction Services', w - mg, h - mg);
    }
    cx.restore();
  }

  /* ── Certificate watermark: centered, large, subtle ── */
  function stampCertWatermark(c, cx, w, h) {
    cx.save();
    if (logoImg) {
      const logoW = Math.round(w * 0.45);
      const logoH = Math.round(logoW * logoImg.naturalHeight / logoImg.naturalWidth);
      cx.globalAlpha = 0.17;
      cx.drawImage(logoImg, Math.round((w - logoW) / 2), Math.round((h - logoH) / 2), logoW, logoH);
    } else {
      const sz = Math.max(14, Math.round(w * 0.035));
      cx.globalAlpha = 0.35;
      cx.font        = `600 ${sz}px Montserrat, sans-serif`;
      cx.fillStyle   = '#ffffff';
      cx.textAlign   = 'center';
      cx.textBaseline = 'middle';
      cx.fillText('© Salmo Construction Services', w / 2, h / 2);
    }
    cx.restore();
  }

  /* ── Desktop: render at display size × DPR — sharp on all screens ── */
  function renderDesktopCanvas(photo) {
    if (!photo.naturalWidth || !photo.naturalHeight) return;
    const dpr   = window.devicePixelRatio || 1;
    const nw    = photo.naturalWidth;
    const nh    = photo.naturalHeight;
    const MAX_W = Math.max(120, window.innerWidth * 0.88 - 128);
    const MAX_H = window.innerHeight * 0.65;
    const ds    = Math.min(MAX_W / nw, MAX_H / nh, 1);  // display scale
    const dw    = Math.round(nw * ds);
    const dh    = Math.round(nh * ds);

    canvas.width  = dw * dpr;
    canvas.height = dh * dpr;
    canvas.style.width  = dw + 'px';
    canvas.style.height = dh + 'px';

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.scale(dpr, dpr);
    ctx.drawImage(photo, 0, 0, dw, dh);
    (certLightbox ? stampCertWatermark : stampWatermark)(canvas, ctx, dw, dh);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  /* ── Mobile: render at display size × DPR — sharp on retina ── */
  function renderMobileSlide(sc, photo) {
    if (!photo.naturalWidth || !photo.naturalHeight) return;
    const dpr = window.devicePixelRatio || 1;
    const nw  = photo.naturalWidth;
    const nh  = photo.naturalHeight;
    const ds  = Math.min(window.innerWidth / nw, window.innerHeight / nh, 1);
    const dw  = Math.round(nw * ds);
    const dh  = Math.round(nh * ds);

    sc.width  = dw * dpr;
    sc.height = dh * dpr;
    sc.style.width  = dw + 'px';
    sc.style.height = dh + 'px';

    const cx = sc.getContext('2d');
    cx.imageSmoothingEnabled = true;
    cx.imageSmoothingQuality = 'high';
    cx.scale(dpr, dpr);
    cx.drawImage(photo, 0, 0, dw, dh);
    (certLightbox ? stampCertWatermark : stampWatermark)(sc, cx, dw, dh);
    cx.setTransform(1, 0, 0, 1, 0, 0);

    /* Store display height so syncUI can position dots under this image */
    sc.parentElement.dataset.dh = String(dh);
    positionDotsUnderSlide(carouselIndex);
  }

  /* Position dots 12 px below the active image's bottom edge */
  function positionDotsUnderSlide(idx) {
    if (!dotsEl || !mobileStrip || !isMobile()) return;
    const total = carouselPhotos.length;
    if (total <= 1) return;
    const slides = mobileStrip.querySelectorAll('.lb-mobile-slide');
    const slide  = slides[idx + 1]; /* +1 skips clone-last */
    const dh     = slide ? parseInt(slide.dataset.dh || '0') : 0;
    if (!dh) return;
    const top = Math.min(
      Math.round((window.innerHeight + dh) / 2) + 12,
      window.innerHeight - 50
    );
    dotsEl.style.top    = top + 'px';
    dotsEl.style.bottom = 'auto';
  }

  /* ── Sync counter + dots ── */
  function syncUI(idx) {
    if (counterEl) counterEl.textContent = `${idx + 1} / ${carouselPhotos.length}`;
    if (dotsEl) {
      dotsEl.querySelectorAll('.lightbox-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
    }
    positionDotsUnderSlide(idx);
  }

  /* ── Build dots ── */
  function buildDots(count) {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    if (count <= 1) return;
    for (let i = 0; i < count; i++) {
      const btn = document.createElement('button');
      btn.className = 'lightbox-dot';
      btn.setAttribute('aria-label', `Photo ${i + 1}`);
      btn.addEventListener('click', () => showPhoto(i));
      dotsEl.appendChild(btn);
    }
  }

  /* ── Mobile: build strip with clone slides for infinite loop ── */
  /*
   * Strip layout: [clone-last] [photo-0] … [photo-N-1] [clone-first]
   * scrollLeft:        0           1*W  …     N*W           (N+1)*W
   * Real photos start at position 1*W; initial scroll = (startIndex+1)*W.
   */
  function buildMobileStrip(photos, startIndex) {
    if (!mobileStrip) return;
    mobileStrip.innerHTML = '';

    function addSlide(src) {
      const slide = document.createElement('div');
      slide.className = 'lb-mobile-slide';
      const sc = document.createElement('canvas');
      slide.appendChild(sc);
      mobileStrip.appendChild(slide);
      const img = new Image();
      img.onload = () => renderMobileSlide(sc, img);
      img.src = src;
    }

    const total = photos.length;
    if (total === 1) { addSlide(photos[0]); return; }

    addSlide(photos[total - 1]);   // clone-last at pos 0
    photos.forEach(src => addSlide(src));
    addSlide(photos[0]);           // clone-first at pos N+1

    requestAnimationFrame(() => {
      const slideW = mobileStrip.clientWidth || window.innerWidth;
      mobileStrip.scrollLeft = (startIndex + 1) * slideW;
    });
  }

  /* ── Mobile scroll handler: sync UI + infinite wrap ── */
  let isWrapping  = false;
  let wrapTimer   = null;

  if (mobileStrip) {
    mobileStrip.addEventListener('scroll', () => {
      if (isWrapping || !carouselPhotos.length) return;
      const total  = carouselPhotos.length;
      if (total <= 1) return;

      const slideW  = mobileStrip.clientWidth || window.innerWidth;
      const pos     = mobileStrip.scrollLeft;
      const snap    = Math.round(pos / slideW);

      /* Real index maps snap → 0-based photo index */
      const realIdx = snap <= 0          ? total - 1
                    : snap >= total + 1  ? 0
                    : snap - 1;

      if (realIdx !== carouselIndex) { carouselIndex = realIdx; syncUI(realIdx); }

      /* Detect scroll settle and silently jump from clone to real slide */
      clearTimeout(wrapTimer);
      wrapTimer = setTimeout(() => {
        if (isWrapping) return;
        const curSnap = Math.round(mobileStrip.scrollLeft / slideW);

        function jumpTo(target) {
          isWrapping = true;
          mobileStrip.style.scrollSnapType = 'none';
          mobileStrip.scrollLeft = target * slideW;
          requestAnimationFrame(() => requestAnimationFrame(() => {
            mobileStrip.style.scrollSnapType = 'x mandatory';
            isWrapping = false;
          }));
        }

        if (curSnap === 0)          jumpTo(total);   // clone-last → real last
        else if (curSnap === total + 1) jumpTo(1);   // clone-first → real first
      }, 260);
    }, { passive: true });
  }

  /* ── Show photo by index ── */
  function showPhoto(index) {
    const total = carouselPhotos.length;
    if (!total) return;
    carouselIndex = ((index % total) + total) % total;
    syncUI(carouselIndex);

    if (isMobile() && mobileStrip) {
      if (total > 1) {
        const slideW = mobileStrip.clientWidth || window.innerWidth;
        mobileStrip.scrollTo({ left: (carouselIndex + 1) * slideW, behavior: 'smooth' });
      }
    } else {
      /* Desktop: arrows visible only when more than 1 photo */
      const multi = total > 1;
      if (prevBtn) prevBtn.style.display = multi ? '' : 'none';
      if (nextBtn) nextBtn.style.display = multi ? '' : 'none';

      const photo = new Image();
      photo.onload = () => renderDesktopCanvas(photo);
      photo.src    = carouselPhotos[carouselIndex];
    }
  }

  /* ── Open carousel for a project ── */
  function openCarousel(proj, startIndex, isCert) {
    carouselPhotos = proj.photos.map(f => encodeImgPath(proj.base + f));
    carouselIndex  = startIndex || 0;
    certLightbox   = !!isCert;

    if (titleEl) titleEl.textContent = proj.title    || '';
    if (locEl)   locEl.textContent   = proj.location || '';

    buildDots(carouselPhotos.length);

    if (isMobile()) {
      buildMobileStrip(carouselPhotos, carouselIndex);
      syncUI(carouselIndex);
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    } else {
      showPhoto(carouselIndex);
    }

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  /* ── Close ── */
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    clearTimeout(wrapTimer);
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (mobileStrip) { mobileStrip.innerHTML = ''; isWrapping = false; }
      carouselPhotos = [];
      carouselIndex  = 0;
      certLightbox   = false;
      if (dotsEl) dotsEl.innerHTML = '';
    }, 350);
  }

  /* ── Desktop navigation (infinite loop via modulo in showPhoto) ── */
  function prevPhoto() { showPhoto(carouselIndex - 1); }
  function nextPhoto() { showPhoto(carouselIndex + 1); }

  if (prevBtn) prevBtn.addEventListener('click', prevPhoto);
  if (nextBtn) nextBtn.addEventListener('click', nextPhoto);

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
  });

  canvas.addEventListener('contextmenu', e => e.preventDefault());
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  /* ── Two-tap on touch devices ── */
  const isTouch = () => window.matchMedia('(hover: none)').matches;
  let tappedItem = null;

  function clearTap() {
    if (tappedItem) { tappedItem.classList.remove('tap-active'); tappedItem = null; }
  }

  function handleItemClick(item) {
    const num  = parseInt(item.dataset.projectNum, 10);
    const proj = PROJECTS.find(p => p.num === num);
    if (!proj) return;

    if (!isTouch()) { openCarousel(proj, 0); return; }

    if (tappedItem === item) { clearTap(); openCarousel(proj, 0); }
    else { clearTap(); tappedItem = item; item.classList.add('tap-active'); }
  }

  document.addEventListener('click', e => {
    if (tappedItem && !e.target.closest('.bento-item, .marquee-item, .project-card')) clearTap();
  });

  document.querySelectorAll('.bento-item[data-project-num]').forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => handleItemClick(item));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const proj = PROJECTS.find(p => p.num === parseInt(item.dataset.projectNum, 10));
        if (proj) openCarousel(proj, 0);
      }
    });
  });

  const track = document.getElementById('marquee-track');
  if (track) {
    track.addEventListener('click', e => {
      const item = e.target.closest('.marquee-item[data-project-num]');
      if (item && !item.getAttribute('aria-hidden')) handleItemClick(item);
    });
    track.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const item = e.target.closest('.marquee-item[data-project-num]');
      if (!item) return;
      e.preventDefault();
      const proj = PROJECTS.find(p => p.num === parseInt(item.dataset.projectNum, 10));
      if (proj) openCarousel(proj, 0);
    });
  }

  const gallery = document.getElementById('projects-gallery');
  if (gallery) {
    gallery.addEventListener('click', e => {
      const card = e.target.closest('.project-card[data-project-num]');
      if (card) handleItemClick(card);
    });
  }

  /* ── Certificate badge click → open lightbox ── */
  const CERT_DATA = {
    bir: { title: 'BIR Certificate of Registration', location: '', base: 'assets/images/certificates/BIR/', photos: ['BIR1.png','BIR2.png','BIR3.png'] },
    dti: { title: 'DTI Certificate',                 location: '', base: 'assets/images/certificates/DTI/', photos: ['Dti.png'] },
    prc: { title: 'PRC Licensed Civil Engineer',     location: '', base: 'assets/images/certificates/PRC/', photos: ['engineer1.png'] }
  };

  document.querySelectorAll('[data-cert]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const cert = CERT_DATA[el.dataset.cert];
      if (cert) openCarousel(cert, 0, true);
    });
  });
})();


/* ── GLASS NAVIGATION ───────────────────────────────────────── */
/*
 * Two modes: NAV (default) ↔ CONTACT.
 * Tapping Contact trigger slides in the contact panel from the right.
 * Back button slides back to nav.
 * Scroll spy highlights active section. Compact class on scroll-down.
 */
(function initGlassNav() {
  const nav          = document.getElementById('glass-nav');
  const pillEl       = document.getElementById('glass-pill');
  const navPanEl     = document.getElementById('dock-nav-panel');
  const ctPanEl      = document.getElementById('dock-contact-panel');
  const ctTriggerEl  = document.getElementById('dock-contact-trigger');
  const backBtnEl    = document.getElementById('dock-back-btn');
  if (!nav || !pillEl) return;

  const navItems = navPanEl ? navPanEl.querySelectorAll('.gn-item[data-section]') : [];

  /* Full-width bar — no width sizing needed, both panels fill 100% via CSS */

  /* ── Mode switching ── */
  let inContactMode = false;

  function activateContact() {
    if (inContactMode) return;
    inContactMode = true;
    pillEl.classList.add('contact-mode');
    if (ctTriggerEl) ctTriggerEl.setAttribute('aria-expanded', 'true');
    if (ctPanEl) ctPanEl.removeAttribute('aria-hidden');
    if (navPanEl) navPanEl.setAttribute('aria-hidden', 'true');
  }

  function deactivateContact() {
    if (!inContactMode) return;
    inContactMode = false;
    pillEl.classList.remove('contact-mode');
    if (ctTriggerEl) ctTriggerEl.setAttribute('aria-expanded', 'false');
    if (navPanEl) navPanEl.removeAttribute('aria-hidden');
    if (ctPanEl) ctPanEl.setAttribute('aria-hidden', 'true');
  }

  if (ctTriggerEl) ctTriggerEl.addEventListener('click', activateContact);
  if (backBtnEl)  backBtnEl.addEventListener('click', deactivateContact);

  /* Close contact mode when clicking outside the dock */
  document.addEventListener('click', e => {
    if (inContactMode && !e.target.closest('#glass-nav')) deactivateContact();
  });

  /* ── Scroll spy: active section ── */
  const TRACKED = ['hero', 'services', 'projects', 'faq', 'contact'];

  function getActiveId() {
    const scrollY = window.scrollY + window.innerHeight * 0.40;
    let active = 'hero';
    TRACKED.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) active = id;
    });
    return active;
  }

  function setActive(id) {
    navItems.forEach(item => item.classList.toggle('active', item.dataset.section === id));
  }

  /* ── Compact on scroll-down ── */
  let lastY   = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > lastY && y > 100) nav.classList.add('compact');
      else if (y < lastY)       nav.classList.remove('compact');
      lastY = y;
      setActive(getActiveId());
      ticking = false;
    });
  }, { passive: true });

  setActive(getActiveId());

  /* ── Nav item clicks: smooth scroll to section ── */
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(item.dataset.section);
      if (!target) return;
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 24;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  });
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
  const hwMessenger = document.getElementById('hw-messenger');

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
    const reveal = raw >= 0.9;
    if (arrowEl)    arrowEl.classList.toggle('hw-revealed', reveal);
    if (hwMessenger) hwMessenger.classList.toggle('hw-revealed', reveal);
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ── Bidirectional house state — mirrors scroll position exactly ── */
  const SECTIONS = ['services','how-we-work','projects','testimonials','trust','about','faq','contact'];
  let currentIdx     = -1;   /* -1 = hero / empty house */
  let suppressScroll = false;

  function getPathLen(el) {
    try { return el.getTotalLength(); } catch(e) { return 1000; }
  }

  /* Set house to exactly targetIdx.
     All stages below targetIdx: instantly drawn.
     Stage at targetIdx: animated in if going forward, otherwise snapped.
     All stages above targetIdx: instantly erased. */
  function applyHouseState(targetIdx, animateLeading) {
    if (targetIdx === currentIdx) return;
    const wasIdx  = currentIdx;
    currentIdx    = targetIdx;
    const goingFwd = targetIdx > wasIdx;

    SECTIONS.forEach((id, i) => {
      const pathId = STAGE_MAP[id];
      if (!pathId) return;
      const el = document.getElementById(pathId);
      if (!el) return;
      gsap.killTweensOf(el);

      if (i < targetIdx) {
        gsap.set(el, { strokeDashoffset: 0 });
      } else if (i === targetIdx && animateLeading && goingFwd) {
        gsap.fromTo(el,
          { strokeDashoffset: getPathLen(el) },
          { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' }
        );
      } else if (i === targetIdx) {
        gsap.set(el, { strokeDashoffset: 0 });
      } else {
        gsap.set(el, { strokeDashoffset: getPathLen(el) });
      }
    });

    /* Side-effects only when building forward */
    if (animateLeading && goingFwd && targetIdx >= 0) {
      const id = SECTIONS[targetIdx];

      hwSvg.classList.remove('house-attention');
      void hwSvg.offsetWidth;
      hwSvg.classList.add('house-attention');
      setTimeout(() => hwSvg.classList.remove('house-attention'), 450);

      if (progressEl) {
        progressEl.classList.remove('milestone');
        void progressEl.offsetWidth;
        progressEl.classList.add('milestone');
        setTimeout(() => progressEl.classList.remove('milestone'), 500);
      }

      const msg = MESSAGES[id];
      if (msg) setTimeout(() => showMessage(msg, id === 'contact'), 220);

      if (id === 'contact') {
        if (arrowEl) arrowEl.classList.add('show');
        gsap.to(hwSvg, { filter: 'drop-shadow(0 0 5px rgba(0,180,216,0.7))', duration: 0.6, delay: 0.9 });
      }
    }

    /* Going back above contact section: remove glow and arrow */
    if (targetIdx < SECTIONS.indexOf('contact')) {
      if (arrowEl) arrowEl.classList.remove('show');
      gsap.set(hwSvg, { clearProps: 'filter' });
    }
  }

  /* Returns index of the highest section whose top has passed 40 % viewport height */
  function getCurrentSectionIdx() {
    const threshold = window.innerHeight * 0.4;
    let idx = -1;
    for (let i = 0; i < SECTIONS.length; i++) {
      const el = document.getElementById(SECTIONS[i]);
      if (el && el.getBoundingClientRect().top <= threshold) idx = i;
    }
    return idx;
  }

  /* Scroll → live bidirectional mirror */
  window.addEventListener('scroll', () => {
    if (suppressScroll) return;
    applyHouseState(getCurrentSectionIdx(), true);
  }, { passive: true });

  /* Nav clicks → snap to exact state instantly, then allow scroll to take over */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const hash = link.getAttribute('href').slice(1);
      suppressScroll = true;
      if (hash === 'hero' || hash === '') {
        applyHouseState(-1, false);
      } else {
        const targetIdx = SECTIONS.indexOf(hash);
        if (targetIdx >= 0) applyHouseState(targetIdx, false);
      }
      setTimeout(() => { suppressScroll = false; }, 700);
    });
  });

  /* ── Messenger button: hides arrow on click ── */
  if (hwMessenger && arrowEl) {
    hwMessenger.addEventListener('click', () => arrowEl.classList.remove('show'));
  }

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

  /* ── On load: snap house to current scroll position ── */
  applyHouseState(getCurrentSectionIdx(), false);
})();
