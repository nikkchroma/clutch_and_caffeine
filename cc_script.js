/* =========================================
   CLUTCH & CAFFEINE — script.js
   CYBERPUNK EDITION ⚡
   ========================================= */

// ---- SPLIT SCREEN LOADER ----
const loader = document.createElement('div');
loader.style.cssText = `
  position:fixed;inset:0;z-index:99999;background:#050505;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  font-family:'Orbitron',sans-serif;gap:20px;
`;
loader.innerHTML = `
  <div style="font-size:clamp(1.5rem,4vw,3rem);font-weight:900;letter-spacing:0.2em;color:#f0eeea;">
    CLUTCH<span style="color:#c9a84c">&</span>CAFFEINE
  </div>
  <div style="width:240px;height:1px;background:#1a1a1a;position:relative;overflow:hidden;">
    <div id="loaderBar" style="position:absolute;top:0;left:0;height:100%;width:0;background:#c9a84c;transition:width 1.2s ease;"></div>
  </div>
  <div style="font-family:'Share Tech Mono',monospace;font-size:0.65rem;letter-spacing:0.15em;color:#555;">
    INITIALIZING SYSTEM...
  </div>
`;
document.body.prepend(loader);
document.body.style.overflow = 'hidden';

setTimeout(() => { document.getElementById('loaderBar').style.width = '100%'; }, 100);
setTimeout(() => {
  loader.style.transition = 'opacity 0.6s ease';
  loader.style.opacity = '0';
  setTimeout(() => { loader.remove(); document.body.style.overflow = ''; }, 600);
}, 1600);

// ---- LIVE CLOCK ----
function updateClock() {
  const el = document.getElementById('sysTime');
  if (el) {
    const now = new Date();
    el.textContent = now.toTimeString().slice(0, 8);
  }
}
updateClock();
setInterval(updateClock, 1000);

// ---- TYPING ANIMATION ----
const phrases = [
  'ENGINES. COFFEE. CHAOS.',
  'SUNRISE RIDES. MIDNIGHT RUNS.',
  'STRANGERS PULL UP. FAMILY LEAVES.',
  'NOT AN EVENT. A CULTURE.',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typeText');

function type() {
  if (!typeEl) return;
  const current = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 70);
}
setTimeout(type, 1800);

// ---- CUSTOM CURSOR ----
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (cursor && cursorRing) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });
  function lerpCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(lerpCursor);
  }
  lerpCursor();
  document.querySelectorAll('a, button, .ecc, .pillar-card, .gcg-item, .c-stat').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('active'); cursorRing.classList.add('active'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); cursorRing.classList.remove('active'); });
  });
}

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ---- MOBILE NAV ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

// ---- SVG LINE ANIMATION ----
const svgObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const line = e.target.querySelector('.svg-line');
      if (line) line.classList.add('animated');
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.section-svg').forEach(svg => svgObserver.observe(svg));

// ---- 3D TILT EFFECT ----
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    const rotX = y * -12;
    const rotY = x *  12;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
    card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    setTimeout(() => { card.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease'; }, 500);
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

// ---- SCROLL REVEAL ----
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.about-layout, .section-header, .events-cyber-grid, .gallery-cyber-grid, .community-cyber').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  revealObs.observe(el);
});

document.querySelectorAll('.ecc').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`;
  revealObs.observe(el);
});

document.querySelectorAll('.gcg-item').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'scale(0.95)';
  el.style.transition = `opacity 0.6s ease ${i * 0.06}s, transform 0.6s ease ${i * 0.06}s`;
  revealObs.observe(el);
});

document.querySelectorAll('.pillar-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
  revealObs.observe(el);
});

document.querySelectorAll('.c-stat').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
  revealObs.observe(el);
});

// ---- COUNT UP ----
function animateCountUp(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
    else el.textContent = Math.floor(start).toLocaleString();
  }, 16);
}

let statsAnimated = false;
const communitySection = document.getElementById('community');
if (communitySection) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.c-stat-num[data-target]').forEach(el => {
        animateCountUp(el, parseInt(el.dataset.target, 10));
      });
    }
  }, { threshold: 0.3 }).observe(communitySection);
}

// ---- GALLERY LIGHTBOX ----
const galleryItems  = Array.from(document.querySelectorAll('.gcg-item'));
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');
let currentIndex    = 0;

function getImages() {
  return galleryItems.map(i => i.querySelector('img')).filter(img => img && img.naturalWidth > 0);
}
function openLightbox(i) {
  const imgs = getImages();
  if (!imgs.length) return;
  currentIndex = i; lightboxImg.src = imgs[i].src;
  lightbox.classList.add('active'); document.body.style.overflow = 'hidden';
}
function closeLightbox() { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
function showPrev() { const imgs = getImages(); currentIndex = (currentIndex - 1 + imgs.length) % imgs.length; lightboxImg.src = imgs[currentIndex].src; }
function showNext() { const imgs = getImages(); currentIndex = (currentIndex + 1) % imgs.length; lightboxImg.src = imgs[currentIndex].src; }

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    const imgs = getImages();
    const img = item.querySelector('img');
    const idx = imgs.indexOf(img);
    if (idx >= 0) openLightbox(idx);
  });
});
lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', showPrev);
lightboxNext?.addEventListener('click', showNext);
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// ---- ACTIVE NAV ----
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  allNavLinks.forEach(a => { a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold)' : ''; });
}, { passive: true });

// ---- GLITCH NAV LOGO ----
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  setInterval(() => {
    navLogo.style.textShadow = '2px 0 #00ffff, -2px 0 #ff00aa';
    setTimeout(() => { navLogo.style.textShadow = ''; }, 120);
  }, 4000);
}
