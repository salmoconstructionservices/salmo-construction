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
             photos: ['Project 1.jpg', 'Project 1.1.jpg'],
             featured: false },

  // PROJECT 2
  { num: 2,  title: 'Two Storey House Renovation and Extension',
             location: 'San Jose City, Nueva Ecija',
             base: 'assets/images/marquee/Project 2/',
             photos: ['Project 2.jpg', 'Project 2.1.jpg'],
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
             photos: ['Project 4.jpg', 'Project 4.1.jpg'],
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
             photos: ['Project 11.jpg','Project 11.1.jpg'],
             featured: false },

  // PROJECT 12
  { num: 12, title: 'Multifamily Dwelling Units',
             location: 'Parañaque City, Metro Manila',
             base: 'assets/images/marquee/Project 12/',
             photos: ['Project 12.JPG','Project 12.1.jpg','Project 12.2.jpg'],
             featured: false },

  // PROJECT 13
  { num: 13, title: 'One Storey Residential Building',
             location: 'Antipolo City, Rizal',
             base: 'assets/images/marquee/Project 13/',
             photos: ['Project 13.jpg','Project 13.1.jpg'],
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
             photos: ['Project 17.jpg','Project 17.1.jpg'],
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
             photos: ['Project 20.jpg'],
             featured: false },

  // PROJECT 21
  { num: 21, title: '',
             location: '',
             base: 'assets/images/marquee/Project 21/',
             photos: ['Project 21.jpg','Project 21.1.jpg'],
             featured: false },

  // PROJECT 22
  { num: 22, title: '',
             location: '',
             base: 'assets/images/marquee/Project 22/',
             photos: ['Project 22.jpg'],
             featured: false },
];

/* Helper: point project photos at their WebP version and encode spaces so
   Image() loads correctly. Project photos ship as .webp; the PROJECTS data
   still lists the original .jpg/.png names, so we swap the extension here —
   the single funnel every project image path passes through. */
function encodeImgPath(rawPath) {
  return rawPath.replace(/\.(jpe?g|png)$/i, '.webp').replace(/ /g, '%20');
}

/* ── Per-project deep-link slugs — stable, readable, unique ──
 * Each project gets a shareable URL (#project=<slug>). Titles repeat
 * across projects, so a duplicated title falls back to appending its
 * stable project number; empty titles use "project-<num>". */
function slugifyTitle(s) {
  return String(s || '').toLowerCase().trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
(function assignProjectSlugs() {
  const counts = {};
  PROJECTS.forEach(p => { const b = slugifyTitle(p.title); if (b) counts[b] = (counts[b] || 0) + 1; });
  PROJECTS.forEach(p => {
    const b = slugifyTitle(p.title);
    p.slug = !b ? ('project-' + p.num) : (counts[b] > 1 ? (b + '-' + p.num) : b);
  });
})();
const PROJECT_BY_SLUG = {};
PROJECTS.forEach(p => { PROJECT_BY_SLUG[p.slug] = p; });


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
  const stageEl     = document.getElementById('lb-stage');
  const guideEl     = document.getElementById('lb-guide');
  const shareBtn    = document.getElementById('lightbox-share');
  const saveBtn     = document.getElementById('lightbox-save');
  const counterFact = counterEl ? counterEl.closest('.lb__fact') : null;
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
  let openProjectSlug = null;   /* slug of the open project, for deep links */
  let openFileBase    = 'salmo-photo';  /* filename stem for Save */

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
    /* Fit within the image stage (excludes the right post panel),
       leaving room for the circular edge arrows and breathing space. */
    const stageW = stageEl && stageEl.clientWidth  ? stageEl.clientWidth  : (window.innerWidth - 384);
    const stageH = stageEl && stageEl.clientHeight ? stageEl.clientHeight : window.innerHeight;
    const MAX_W = Math.max(120, stageW - 130);
    const MAX_H = Math.max(120, stageH - 90);
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
    /* Fit within the strip (the stage area above the info bar), not the
       whole window — the compact info bar occupies the bottom. */
    const availW = (mobileStrip && mobileStrip.clientWidth)  || window.innerWidth;
    const availH = (mobileStrip && mobileStrip.clientHeight) || window.innerHeight;
    const ds  = Math.min(availW / nw, availH / nh, 1);
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

  }

  /* ── Sync counter + dots ── */
  function syncUI(idx) {
    if (counterEl) counterEl.textContent = `${idx + 1} / ${carouselPhotos.length}`;
    if (dotsEl) {
      dotsEl.querySelectorAll('span').forEach((dot, i) => {
        dot.classList.toggle('on', i === idx);
      });
    }
  }

  /* ── Build the pill dots (Facebook / Artsons style) ── */
  function buildDots(count) {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    if (count <= 1) return;
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      if (i === 0) span.className = 'on';
      span.setAttribute('role', 'button');
      span.setAttribute('aria-label', `Photo ${i + 1}`);
      span.addEventListener('click', () => showPhoto(i));
      dotsEl.appendChild(span);
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

  /* ── Toast (Save / Share feedback) ── */
  let toastEl, toastTimer;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'lb-toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  /* ── Share the current project via its deep link ── */
  function shareCurrent() {
    if (!openProjectSlug) return;
    const url = location.origin + location.pathname + '#project=' + encodeURIComponent(openProjectSlug);
    const title = 'Salmo Construction Services — ' + (titleEl ? titleEl.textContent : 'Project');
    if (navigator.share) { navigator.share({ title, url }).catch(() => {}); return; }
    const done = ok => showToast(ok ? 'Link copied' : 'Could not copy — check the address bar');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => done(true), () => done(false));
    } else {
      try {
        const ta = document.createElement('textarea');
        ta.value = url; ta.style.position = 'fixed'; ta.style.top = '-9999px';
        document.body.appendChild(ta); ta.select();
        done(document.execCommand('copy')); ta.remove();
      } catch (e) { done(false); }
    }
  }

  /* ── The watermarked canvas currently on screen ── */
  function currentCanvas() {
    if (isMobile() && mobileStrip) {
      const slides = mobileStrip.querySelectorAll('.lb-mobile-slide');
      const slide  = slides[carouselIndex + 1];   /* +1 skips the clone-last */
      return slide ? slide.querySelector('canvas') : null;
    }
    return canvas;
  }

  /* ── Save the current photo (exports the already-watermarked canvas) ── */
  function saveCurrent() {
    const cv = currentCanvas();
    if (!cv || !cv.width || cv.width <= 300) { showToast('Photo still loading — try again'); return; }
    const filename = openFileBase + '-' + String(carouselIndex + 1).padStart(2, '0') + '.jpg';
    try {
      cv.toBlob(blob => {
        if (!blob) { showToast('Could not save the photo'); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
        showToast('Photo saved');
      }, 'image/jpeg', 0.92);
    } catch (e) { showToast('Could not save the photo'); }
  }

  if (shareBtn) shareBtn.addEventListener('click', shareCurrent);
  if (saveBtn)  saveBtn.addEventListener('click', saveCurrent);

  /* ── Open carousel for a project ── */
  /* fromHistory = the open was driven by Back/Forward or a shared link,
     so we must NOT push another history entry. */
  function openCarousel(proj, startIndex, isCert, fromHistory) {
    carouselPhotos = proj.photos.map(f => encodeImgPath(proj.base + f));
    carouselIndex  = startIndex || 0;
    certLightbox   = !!isCert;

    /* Reflect the open project in the URL so it can be shared/deep-linked.
       Certificates are documents, not projects → no deep link. */
    openProjectSlug = certLightbox ? null : (proj.slug || null);
    if (openProjectSlug && !fromHistory) {
      const url = '#project=' + encodeURIComponent(openProjectSlug);
      if ((location.hash || '') !== url) {
        history.pushState({ salmoProject: openProjectSlug }, '', url);
      }
    }

    if (titleEl) titleEl.textContent = proj.title    || '';
    if (locEl)   locEl.textContent   = proj.location || '';
    const locFactEl = document.getElementById('lightbox-loc2');
    if (locFactEl) locFactEl.textContent = proj.location || '—';

    /* Save filename stem + tool visibility (Share = projects only, Save = all) */
    openFileBase = 'Salmo-' + (slugifyTitle(proj.title) || (certLightbox ? 'certificate' : 'photo'));
    if (shareBtn) shareBtn.style.display = certLightbox ? 'none' : '';
    if (saveBtn)  saveBtn.style.display  = certLightbox ? 'none' : '';  /* no download for certificates */

    /* Cert = document; keep the flag for the centered watermark + no deep link */
    lightbox.classList.toggle('lb--cert', certLightbox);

    /* Photo-count fact only meaningful for multi-photo sets */
    if (counterFact) counterFact.style.display = carouselPhotos.length > 1 ? '' : 'none';

    buildDots(carouselPhotos.length);

    /* Reveal first so the stage has real dimensions to size the image to */
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (isMobile()) {
      buildMobileStrip(carouselPhotos, carouselIndex);
      syncUI(carouselIndex);
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      showGuide();
    } else {
      showPhoto(carouselIndex);
    }
  }

  /* ── Mobile gesture guide — a brief swipe hint each time the viewer opens.
     pointer-events:none, so it never blocks the swipe it's teaching; it fades
     on the first touch or after a short delay. ── */
  let guideTimer = null;
  function showGuide() {
    if (!guideEl || !isMobile()) return;
    clearTimeout(guideTimer);
    guideEl.classList.remove('hide');
    guideEl.classList.add('show');
    guideEl.setAttribute('aria-hidden', 'false');
    guideTimer = setTimeout(hideGuide, 2600);
  }
  function hideGuide() {
    if (!guideEl || !guideEl.classList.contains('show')) return;
    clearTimeout(guideTimer);
    guideEl.classList.add('hide');
    guideEl.setAttribute('aria-hidden', 'true');
    setTimeout(() => guideEl.classList.remove('show', 'hide'), 400);
  }

  /* ── Close ── */
  /* exitDir: -1 = swiped up, 1 = swiped down → animate the viewer out that way. */
  function closeLightbox(fromHistory, exitDir) {
    /* Restore the URL when dismissing a deep-linked project (unless Back
       itself drove the close, which already popped our entry). */
    if (openProjectSlug && !fromHistory) {
      if (history.state && history.state.salmoProject) history.back();
      else history.replaceState(null, '', '#projects');
    }
    openProjectSlug = null;

    if (exitDir) {
      /* Keep .open on so the viewer stays visible while .lb slides out.
         The CSS animation is itself gated on prefers-reduced-motion. */
      lightbox.style.setProperty('--lb-exit-y', exitDir < 0 ? '-30vh' : '30vh');
      lightbox.classList.add('lb-exit');
    } else {
      lightbox.classList.remove('open');
    }
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    clearTimeout(wrapTimer);
    setTimeout(() => {
      lightbox.classList.remove('open', 'lb-exit');
      lightbox.style.removeProperty('--lb-exit-y');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (mobileStrip) { mobileStrip.innerHTML = ''; isWrapping = false; }
      if (guideEl) { clearTimeout(guideTimer); guideEl.classList.remove('show', 'hide'); }
      if (dotsEl) dotsEl.innerHTML = '';
      carouselPhotos = [];
      carouselIndex  = 0;
      certLightbox   = false;
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
  /* Wrap so the click Event isn't passed as the fromHistory argument */
  if (backdrop) backdrop.addEventListener('click', () => closeLightbox());
  if (closeBtn) closeBtn.addEventListener('click', () => closeLightbox());

  /* Click the empty dark stage area (not the image / arrows / dots) closes */
  if (stageEl) stageEl.addEventListener('click', e => {
    if (e.target === stageEl || e.target.classList.contains('lightbox-photo-row')) {
      closeLightbox();
    }
  });

  /* Mobile: swipe up or down on the photo to dismiss (like a photo app).
     Passive listeners — the horizontal swipe carousel keeps working; a
     gesture only dismisses when it's clearly vertical. */
  if (stageEl) {
    let sx = null, sy = null, st = 0;
    stageEl.addEventListener('touchstart', e => {
      if (!lightbox.classList.contains('open')) return;
      hideGuide();                       /* first touch dismisses the swipe hint */
      const t = e.changedTouches[0]; sx = t.clientX; sy = t.clientY; st = Date.now();
    }, { passive: true });
    stageEl.addEventListener('touchend', e => {
      if (sy === null || !lightbox.classList.contains('open')) { sx = sy = null; return; }
      const t = e.changedTouches[0], dy = t.clientY - sy, dx = t.clientX - sx;
      const vy = Math.abs(dy) / (Date.now() - st || 1);
      if (Math.abs(dy) > Math.abs(dx) * 1.3 && (Math.abs(dy) > 70 || vy > 0.35)) {
        closeLightbox(false, dy < 0 ? -1 : 1);
      }
      sx = sy = null;
    }, { passive: true });
  }

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
    bir: { title: 'BIR Certificate of Registration', location: 'Bureau of Internal Revenue',      base: 'assets/images/certificates/BIR/', photos: ['BIR1.jpg','BIR2.jpg','BIR3.jpg'] },
    dti: { title: 'DTI Certificate',                 location: 'Department of Trade and Industry', base: 'assets/images/certificates/DTI/', photos: ['Dti.jpg'] },
    prc: { title: 'PRC Licensed Civil Engineer',     location: 'Professional Regulation Commission', base: 'assets/images/certificates/PRC/', photos: ['engineer1.jpg'] }
  };

  document.querySelectorAll('[data-cert]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const cert = CERT_DATA[el.dataset.cert];
      if (cert) openCarousel(cert, 0, true);
    });
  });

  /* ── Deep linking: #project=<slug> opens that project (shareable URLs) ── */
  function projectFromHash() {
    const m = /^#project=(.+)$/.exec(location.hash || '');
    if (!m) return null;
    return PROJECT_BY_SLUG[decodeURIComponent(m[1])] || null;
  }

  /* Back / Forward drives the viewer: a project URL opens it; leaving closes it. */
  window.addEventListener('popstate', () => {
    const proj = projectFromHash();
    const open = lightbox.classList.contains('open');
    if (proj) {
      if (!open || openProjectSlug !== proj.slug) openCarousel(proj, 0, false, true);
    } else if (open && openProjectSlug) {
      closeLightbox(true);
    }
  });

  /* Opened directly from a shared link: seed a #projects entry underneath so
     Back / dismiss lands on the live site, then open the project over it. */
  (function openFromInitialHash() {
    const proj = projectFromHash();
    if (!proj) return;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    history.replaceState(null, '', '#projects');
    history.pushState({ salmoProject: proj.slug }, '', '#project=' + encodeURIComponent(proj.slug));
    openCarousel(proj, 0, false, true);
  })();

  /* ── Project photo cyclers ─────────────────────────────────────
     Crossfade through each project's photos. Desktop: while hovering a
     bento or moving-marquee item. Mobile (no hover): when scrolling
     stops, whatever's on screen cycles; it resets the moment you scroll. */
  (function initPhotoCyclers() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const HOLD = 2000;   /* ms each photo is held */
    const FADE = 0.64;   /* s crossfade */
    const cyclers = [];

    function makeCycler(item, baseImg, srcs, mode) {
      /* Overlay image used for the crossfade (fades in over the base, then
         the base is committed underneath and the overlay snaps back to 0). */
      const layer = document.createElement('img');
      layer.alt = ''; layer.setAttribute('aria-hidden', 'true');
      if (mode === 'bento') {
        layer.className = 'bento-img';   /* inherits cover sizing + hover-scale */
        layer.style.cssText = 'position:absolute;top:0;left:0;opacity:0;pointer-events:none;' +
          'transition:opacity ' + FADE + 's ease, transform 0.6s cubic-bezier(0.23,1,0.32,1);';
      } else {
        layer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;' +
          'filter:saturate(0.85) brightness(0.95);opacity:0;pointer-events:none;transition:opacity ' + FADE + 's ease;';
      }
      baseImg.insertAdjacentElement('afterend', layer);

      let idx = 0, timer = null, commit = null;

      /* Each step loads only the next photo (just-in-time) so we never
         burst-download a whole project's set — matters on mobile data. */
      function step() {
        const next = (idx + 1) % srcs.length;
        const pre = new Image();
        pre.onload = () => {
          layer.src = srcs[next];
          requestAnimationFrame(() => { layer.style.opacity = '1'; });
          commit = setTimeout(() => { baseImg.src = srcs[next]; layer.style.opacity = '0'; idx = next; }, FADE * 1000);
        };
        pre.src = srcs[next];
      }

      return {
        item,
        start() {
          if (timer) return;
          /* Marquee items are width:auto — lock the width and cover-fill so
             different photo aspect ratios don't reflow the strip. */
          if (mode === 'marquee' && item.offsetWidth) {
            item.style.width = item.offsetWidth + 'px';
            baseImg.style.width = '100%'; baseImg.style.height = '100%'; baseImg.style.objectFit = 'cover';
          }
          step();
          timer = setInterval(step, HOLD);
        },
        stop() {
          if (!timer && idx === 0) return;
          if (timer) { clearInterval(timer); timer = null; }
          clearTimeout(commit);
          layer.style.opacity = '0';
          if (idx !== 0) { idx = 0; baseImg.src = srcs[0]; }
          if (mode === 'marquee') {
            item.style.width = ''; baseImg.style.width = ''; baseImg.style.height = ''; baseImg.style.objectFit = '';
          }
        }
      };
    }

    function collect(sel, imgSel, mode) {
      document.querySelectorAll(sel).forEach(item => {
        const proj = PROJECTS.find(p => p.num === parseInt(item.dataset.projectNum, 10));
        if (!proj || !proj.photos || proj.photos.length < 2) return;
        const img = item.querySelector(imgSel);
        if (!img) return;
        cyclers.push(makeCycler(item, img, proj.photos.map(f => encodeImgPath(proj.base + f)), mode));
      });
    }

    collect('.bento-item[data-project-num]', '.bento-img', 'bento');
    collect('.marquee-item[data-project-num]', 'img', 'marquee');
    if (!cyclers.length) return;

    if (window.matchMedia('(hover: hover)').matches) {
      cyclers.forEach(c => {
        c.item.addEventListener('mouseenter', c.start);
        c.item.addEventListener('mouseleave', c.stop);
      });
    } else {
      /* Mobile: cycle whatever's visible once scrolling settles. */
      const inView = el => {
        const r = el.getBoundingClientRect();
        return r.bottom > 8 && r.top < window.innerHeight - 8 && r.right > 8 && r.left < window.innerWidth - 8;
      };
      let idle = null;
      const onMove = () => {
        cyclers.forEach(c => c.stop());
        clearTimeout(idle);
        idle = setTimeout(() => cyclers.forEach(c => { if (inView(c.item)) c.start(); }), 450);
      };
      window.addEventListener('scroll', onMove, { passive: true });
      const mq = document.querySelector('.marquee-wrap');
      if (mq) mq.addEventListener('scroll', onMove, { passive: true });
      setTimeout(() => cyclers.forEach(c => { if (inView(c.item)) c.start(); }), 900);
    }
  })();
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
  const houseTriggerEl = document.getElementById('house-widget');
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
    if (houseTriggerEl) houseTriggerEl.setAttribute('aria-expanded', 'true');
    if (ctPanEl) ctPanEl.removeAttribute('aria-hidden');
    if (navPanEl) navPanEl.setAttribute('aria-hidden', 'true');
  }

  function deactivateContact() {
    if (!inContactMode) return;
    inContactMode = false;
    pillEl.classList.remove('contact-mode');
    if (ctTriggerEl) ctTriggerEl.setAttribute('aria-expanded', 'false');
    if (houseTriggerEl) houseTriggerEl.setAttribute('aria-expanded', 'false');
    if (navPanEl) navPanEl.removeAttribute('aria-hidden');
    if (ctPanEl) ctPanEl.setAttribute('aria-hidden', 'true');
  }

  /* Smooth-scroll to a section, offset for the fixed nav height. */
  function scrollToSection(target) {
    if (!target) return;
    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
    ) || 24;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  if (ctTriggerEl) ctTriggerEl.addEventListener('click', () => {
    activateContact();
    /* Also jump to the Contact section (right after FAQ) so the
       options being opened here have context on screen. */
    scrollToSection(document.getElementById('contact'));
  });
  if (backBtnEl)  backBtnEl.addEventListener('click', deactivateContact);

  /* House widget (bottom-right FAB) is a second entry point into the
     same contact panel — see initHouseWidget below, which dispatches
     this event instead of calling activateContact() directly since
     the two live in separate IIFEs. */
  document.addEventListener('salmo:open-contact', activateContact);

  /* Close contact mode when clicking outside the dock — the house
     widget is excluded because a click there is the *open* trigger,
     not a dismiss click, and would otherwise close it in the same tick. */
  document.addEventListener('click', e => {
    if (inContactMode && !e.target.closest('#glass-nav') && !e.target.closest('#house-widget')) {
      deactivateContact();
    }
  });

  /* ── Scroll spy: active section ── */
  const TRACKED = ['hero', 'services', 'projects', 'faq', 'book', 'contact'];

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
      scrollToSection(document.getElementById(item.dataset.section));
    });
  });
})();


/* ── HOUSE WIDGET — section-triggered build + popup messages ─── */
(function initHouseWidget() {
  if (typeof gsap === 'undefined') return;

  const fab      = document.getElementById('contact-fab');
  const hwSvg    = document.getElementById('hw-svg');
  if (!fab || !hwSvg) return;

  /* ── Tap/click the house → pop feedback + open the Let's Talk panel ──
     Also reveals the quick Messenger button early (normally it only pops
     in once scroll progress hits 90%) — once a visitor has found the
     house is interactive, Messenger stays available regardless of scroll. */
  const houseWidgetEl = document.getElementById('house-widget');
  let manuallyRevealed = false;
  if (houseWidgetEl) {
    const openContact = () => {
      houseWidgetEl.classList.remove('hw-pop');
      void houseWidgetEl.offsetWidth; /* restart animation on repeat clicks */
      houseWidgetEl.classList.add('hw-pop');
      manuallyRevealed = true;
      updateProgress();
      document.dispatchEvent(new CustomEvent('salmo:open-contact'));
    };
    houseWidgetEl.addEventListener('click', openContact);
    houseWidgetEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openContact();
      }
    });
    houseWidgetEl.addEventListener('animationend', () => houseWidgetEl.classList.remove('hw-pop'));
  }

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
    const reveal = raw >= 0.9 || manuallyRevealed;
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
        gsap.to(hwSvg, { filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))', duration: 0.6, delay: 0.9 });
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
