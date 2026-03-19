/* =========================================
   CLUTCH & CAFFEINE — script.js
   Gold Edition 🏆
   ========================================= */

// ---- SPLIT SCREEN LOADER ----
const splitLoader = document.createElement('div');
splitLoader.className = 'split-loader';
splitLoader.innerHTML = `
  <div class="split-top"></div>
  <div class="split-bottom"></div>
  <div class="split-loader-line"></div>
  <div class="split-loader-logo">CLUTCH<span>&</span>CAFFEINE</div>
`;
document.body.prepend(splitLoader);
document.body.style.overflow = 'hidden';
setTimeout(() => splitLoader.classList.add('open'), 600);
setTimeout(() => {
  document.body.style.overflow = '';
  splitLoader.style.pointerEvents = 'none';
  setTimeout(() => splitLoader.remove(), 500);
}, 1800);

// ---- GLITCH LOGO ----
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.setAttribute('data-text', navLogo.textContent);
  setInterval(() => {
    navLogo.classList.add('auto-glitch');
    setTimeout(() => navLogo.classList.remove('auto-glitch'), 600);
  }, 5000);
}

// ---- GOLD CURSOR TRAIL ----
const goldColors = ['#c9a84c','#e8c96a','#f5d97a','#d4a843','#ffd700','#c8960c','#e8b84b'];
let lastX = 0, lastY = 0;

document.addEventListener('mousemove', (e) => {
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const speed = Math.sqrt(dx * dx + dy * dy);
  lastX = e.clientX;
  lastY = e.clientY;
  if (speed < 2) return;
  const count = Math.min(4, Math.floor(speed / 8) + 1);
  for (let i = 0; i < count; i++) spawnGold(e.clientX, e.clientY);
});

function spawnGold(x, y) {
  const p = document.createElement('div');
  p.className = 'fire-particle';
  const size   = Math.random() * 12 + 5;
  const color  = goldColors[Math.floor(Math.random() * goldColors.length)];
  const dur    = Math.random() * 500 + 300;
  const spread = (Math.random() - 0.5) * 18;
  p.style.cssText = `
    left:${x + spread}px;
    top:${y + spread}px;
    width:${size}px;
    height:${size}px;
    background:radial-gradient(circle,${color} 0%,transparent 70%);
    animation-duration:${dur}ms;
    filter:blur(${Math.random() * 2 + 1}px);
  `;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), dur);
}

// ---- CUSTOM CURSOR ----
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (cursor && cursorRing) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });
  function lerpCursor() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(lerpCursor);
  }
  lerpCursor();
  document.querySelectorAll('a, button, .event-card, .pillar, .gallery-item').forEach(el => {
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

// ---- VIDEO TOGGLE ----
const heroVideo   = document.getElementById('heroVideo');
const videoToggle = document.getElementById('videoToggle');
const iconMuted   = document.getElementById('iconMuted');
const iconUnmuted = document.getElementById('iconUnmuted');
if (videoToggle && heroVideo) {
  videoToggle.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    iconMuted.style.display   = heroVideo.muted ? 'block' : 'none';
    iconUnmuted.style.display = heroVideo.muted ? 'none'  : 'block';
  });
}

// ---- SCROLL REVEAL ----
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .section-label').forEach(el => revealObs.observe(el));

document.querySelectorAll('.event-card').forEach((el, i) => {
  el.classList.add('reveal-scale');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObs.observe(el);
});
document.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.classList.add('reveal-scale');
  el.style.transitionDelay = `${i * 0.06}s`;
  revealObs.observe(el);
});
document.querySelectorAll('.pillar').forEach((el, i) => {
  el.classList.add('reveal-left');
  el.style.transitionDelay = `${i * 0.1}s`;
  revealObs.observe(el);
});
document.querySelector('.about-left')?.classList.add('reveal-left');
document.querySelector('.about-right')?.classList.add('reveal-right');
document.querySelector('.community-banner')?.classList.add('reveal');
document.querySelectorAll('.about-left, .about-right, .community-banner').forEach(el => revealObs.observe(el));

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
let numbersAnimated = false;
const numbersSection = document.getElementById('numbers');
if (numbersSection) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !numbersAnimated) {
      numbersAnimated = true;
      document.querySelectorAll('.number-val[data-target]').forEach(el => {
        animateCountUp(el, parseInt(el.dataset.target, 10));
      });
    }
  }, { threshold: 0.3 }).observe(numbersSection);
}

// ---- GALLERY LIGHTBOX ----
const galleryItems  = Array.from(document.querySelectorAll('.gallery-item'));
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
  currentIndex = i;
  lightboxImg.src = imgs[i].src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
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
  allNavLinks.forEach(a => { a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--white)' : ''; });
}, { passive: true });

// ---- PARALLAX ----
const heroGrid    = document.querySelector('.hero-grid');
const heroContent = document.querySelector('.hero-content');
const heroVid     = document.querySelector('.hero-video-wrap');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    if (heroGrid)    heroGrid.style.transform    = `translateY(${y * 0.2}px)`;
    if (heroVid)     heroVid.style.transform     = `translateY(${y * 0.15}px)`;
    if (heroContent) heroContent.style.transform = `translateY(${y * 0.08}px)`;
  }
}, { passive: true });

// ---- MAGNETIC BUTTONS ----
document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});
