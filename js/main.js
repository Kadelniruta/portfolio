/* ═══════════════════════════════════
   PRELOADER
   ═══════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('done'), 600);
});

/* ═══════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════ */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button, .btn, .pill, .proj-card, .about-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

/* ═══════════════════════════════════
   SCROLL PROGRESS BAR
   ═══════════════════════════════════ */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (window.scrollY / h * 100) + '%';
});

/* ═══════════════════════════════════
   PARTICLES
   ═══════════════════════════════════ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resizeCanvas() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 2 + 0.5;
    this.dx = (Math.random() - 0.5) * 0.3;
    this.dy = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.25 + 0.05;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(6, 20, 27, ${this.opacity})`;
    ctx.fill();
  }
  update() {
    this.x += this.dx; this.y += this.dy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
}
for (let i = 0; i < 50; i++) particles.push(new Particle());
function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ═══════════════════════════════════
   NAVBAR
   ═══════════════════════════════════ */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ═══════════════════════════════════
   ACTIVE NAV ON SCROLL
   ═══════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 140;
  sections.forEach(s => {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + s.id));
    }
  });
});

/* ═══════════════════════════════════
   TYPING EFFECT
   ═══════════════════════════════════ */
const roles = ['Software Developer', 'Flutter Engineer', 'AI Enthusiast', 'Backend Developer', 'ML Researcher'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function typeEffect() {
  const word = roles[ri];
  if (!deleting) {
    typedEl.textContent = word.substring(0, ci + 1);
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(typeEffect, 1800); return; }
    setTimeout(typeEffect, 80);
  } else {
    typedEl.textContent = word.substring(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(typeEffect, 400); return; }
    setTimeout(typeEffect, 40);
  }
}
setTimeout(typeEffect, 1200);

/* ═══════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }});
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* ═══════════════════════════════════
   COUNTER ANIMATION
   ═══════════════════════════════════ */
document.querySelectorAll('.hero-stat .num').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseFloat(el.dataset.count);
        const dec = target % 1 !== 0;
        const dur = 2000, start = performance.now();
        (function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = dec ? (target * ease).toFixed(2) : Math.floor(target * ease);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = dec ? target.toFixed(2) : target + '+';
        })(start);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(el);
});

/* ═══════════════════════════════════
   TILT EFFECT ON PROJECT CARDS
   ═══════════════════════════════════ */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ═══════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════ */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check-circle"></i> Sent Successfully!';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; e.target.reset(); }, 3000);
});

/* ═══════════════════════════════════
   SMOOTH SCROLL
   ═══════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});
