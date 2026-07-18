const typedTexts = [
  'Full-Stack Developer',
  'Data Analytics Learner',
  'Tech Enthusiast'
];
let textIndex = 0, charIndex = 0, isDeleting = false;
const typedElement = document.getElementById('typed-text');

function typeEffect() {
  const current = typedTexts[textIndex];
  if (isDeleting) {
    typedElement.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedElement.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let speed = isDeleting ? 35 : 75;
  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typedTexts.length;
    speed = 500;
  }
  setTimeout(typeEffect, speed);
}
typeEffect();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const navDotLinks = document.querySelectorAll('.nav-dots a');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = 'hero';
  sections.forEach(section => {
    const top = section.offsetTop - 200;
    if (window.scrollY >= top) current = section.id;
  });
  navDotLinks.forEach(dot => {
    dot.classList.toggle('active', dot.getAttribute('href') === '#' + current);
  });
});

navDotLinks.forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(dot.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };
    updateCounter();
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) statsObserver.observe(statsGrid);

function animateSkillBars() {
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      skillsObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

const skillsGridEl = document.querySelector('.skills-grid');
if (skillsGridEl) skillsObserver.observe(skillsGridEl);

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
    .then(res => {
      if (res.ok) {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Thanks for reaching out! I\'ll reply within 24 hours.';
        contactForm.reset();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      formStatus.className = 'form-status error';
      formStatus.textContent = 'Couldn\'t send. Email me at junaiddev48@gmail.com instead.';
    })
    .finally(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    });
});

const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let cursorX = -100, cursorY = -100;
let ringX = -100, ringY = -100;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursorDot.style.left = cursorX + 'px';
  cursorDot.style.top = cursorY + 'px';
});

document.querySelectorAll('a, button, .btn, .hamburger, .theme-toggle, .nav-dots a, .back-to-top, input, textarea, .project-card, .cert-card, .skill-category, .contact-direct a').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.classList.add('hover');
    cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('hover');
    cursorRing.classList.remove('hover');
  });
});

function animateCursor() {
  ringX += (cursorX - ringX) * 0.15;
  ringY += (cursorY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = progress + '%';
});

const themeToggle = document.getElementById('themeToggle');
const toggleKnob = themeToggle.querySelector('.toggle-knob');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  toggleKnob.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  toggleKnob.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let width, height, time = 0;
let mouseX = 0, mouseY = 0;
let energyWaves = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

canvas.addEventListener('click', (e) => {
  for (let i = 0; i < 3; i++) {
    energyWaves.push({
      x: e.clientX,
      y: e.clientY,
      radius: 10,
      maxRadius: Math.max(width, height) * 0.4,
      life: 1,
      speed: 2 + Math.random() * 1.5
    });
  }
});

class GridNode {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.baseGlow = Math.random() * 0.3 + 0.1;
    this.pulseOffset = Math.random() * Math.PI * 2;
  }
}

const gridNodes = [];
const GRID_SIZE = 35;
const GRID_DEPTH = 25;
const SPACING = 40;

for (let z = -GRID_DEPTH; z <= 0; z++) {
  for (let x = -GRID_SIZE; x <= GRID_SIZE; x++) {
    gridNodes.push(new GridNode(x, z, z));
  }
}

function project3D(x, y, z) {
  const focal = 400;
  const perspective = focal / (focal + z);
  const screenX = width / 2 + x * SPACING * perspective + (mouseX - width / 2) * 0.05 * perspective;
  const screenY = height / 2 + y * SPACING * perspective * 0.6 - z * SPACING * 0.3 * perspective;
  return { x: screenX, y: screenY, scale: perspective };
}

function drawHypergrid() {
  const gridAlpha = 0.15;

  for (let z = -GRID_DEPTH; z <= 0; z++) {
    const zWobble = Math.sin(z * 0.3 + time * 0.02) * 3;
    for (let x = -GRID_SIZE; x < GRID_SIZE; x++) {
      const p1 = project3D(x, zWobble, z);
      const p2 = project3D(x + 1, zWobble, z);
      if (p1.scale > 0.02) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        const alpha = p1.scale * gridAlpha * (1 + z / GRID_DEPTH);
        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.lineWidth = p1.scale * 0.5;
        ctx.stroke();
      }
    }
  }

  for (let x = -GRID_SIZE; x <= GRID_SIZE; x++) {
    const xWobble = Math.sin(x * 0.3 + time * 0.025) * 2;
    let prevP = null;
    for (let z = -GRID_DEPTH; z <= 0; z++) {
      const zWobble = Math.sin(z * 0.3 + time * 0.02) * 3;
      const p = project3D(x + xWobble, zWobble, z);
      if (prevP && p.scale > 0.02) {
        ctx.beginPath();
        ctx.moveTo(prevP.x, prevP.y);
        ctx.lineTo(p.x, p.y);
        const alpha = p.scale * gridAlpha * (1 + z / GRID_DEPTH);
        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.lineWidth = p.scale * 0.5;
        ctx.stroke();
      }
      prevP = p;
    }
  }
}

function drawGridNodes() {
  gridNodes.forEach(node => {
    const wobble = Math.sin(node.x * 0.3 + time * 0.02) * 3;
    const zWobble = Math.sin(node.z * 0.3 + time * 0.02) * 3;
    const p = project3D(node.x, wobble, node.z);
    if (p.scale < 0.02) return;

    const glow = node.baseGlow + Math.sin(time * 0.03 + node.pulseOffset) * 0.1;
    const alpha = Math.max(0, glow * p.scale * 0.8 * (1 + node.z / GRID_DEPTH));

    const distFromMouse = Math.sqrt((p.x - mouseX) ** 2 + (p.y - mouseY) ** 2);
    const mouseGlow = Math.max(0, (1 - distFromMouse / 200)) * 0.4;
    const totalGlow = alpha + mouseGlow;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.scale * (1.5 + mouseGlow * 3), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(6, 182, 212, ${totalGlow})`;
    ctx.fill();

    if (totalGlow > 0.1) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.scale * (4 + mouseGlow * 8), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${totalGlow * 0.12})`;
      ctx.fill();
    }
  });
}

function drawEnergyWaves() {
  for (let i = energyWaves.length - 1; i >= 0; i--) {
    const w = energyWaves[i];
    w.radius += w.speed;
    w.life -= 0.008;

    if (w.life <= 0) {
      energyWaves.splice(i, 1);
      continue;
    }

    ctx.beginPath();
    ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(6, 182, 212, ${w.life * 0.4})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(w.x, w.y, w.radius * 0.7, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(99, 102, 241, ${w.life * 0.2})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

const horizonStars = [];
for (let i = 0; i < 200; i++) {
  horizonStars.push({
    x: Math.random() * width,
    y: Math.random() * height * 0.6,
    size: Math.random() * 1.2 + 0.2,
    opacity: Math.random() * 0.3 + 0.05,
    twinkle: Math.random() * Math.PI * 2
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  const bgGrad = ctx.createRadialGradient(width / 2, height * 0.3, 0, width / 2, height * 0.3, Math.max(width, height) * 0.7);
  bgGrad.addColorStop(0, 'rgba(99, 102, 241, 0.04)');
  bgGrad.addColorStop(0.4, 'rgba(6, 182, 212, 0.015)');
  bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  horizonStars.forEach(s => {
    s.twinkle += 0.015;
    const pulse = s.opacity * (0.4 + 0.6 * Math.sin(s.twinkle));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(148, 163, 184, ${pulse})`;
    ctx.fill();
  });

  drawHypergrid();
  drawGridNodes();
  drawEnergyWaves();

  const cursorTrail = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 120);
  cursorTrail.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
  cursorTrail.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
  cursorTrail.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = cursorTrail;
  ctx.fillRect(0, 0, width, height);

  time += 1;
  requestAnimationFrame(animate);
}
animate();

/* ===== AI Chat ===== */
const API_URL = '/api/chat';
let chatHistory = {};

function addChatMessage(containerId, text, isUser) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${isUser ? 'user' : 'bot'}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function showTyping(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg bot';
  typingDiv.id = 'typing-' + containerId;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.innerHTML = '<i class="fas fa-robot"></i>';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble typing-indicator';
  bubble.innerHTML = '<span></span><span></span><span></span>';

  typingDiv.appendChild(avatar);
  typingDiv.appendChild(bubble);
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
}

function hideTyping(containerId) {
  const el = document.getElementById('typing-' + containerId);
  if (el) el.remove();
}

async function sendChatMessage(inputId, containerId) {
  const input = document.getElementById(inputId);
  const message = input.value.trim();
  if (!message) return;

  input.value = '';
  addChatMessage(containerId, message, true);

  showTyping(containerId);

  const sendBtn = input.parentElement.querySelector('button');
  if (sendBtn) sendBtn.disabled = true;
  input.disabled = true;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    hideTyping(containerId);

    if (res.ok && data.reply) {
      addChatMessage(containerId, data.reply, false);
    } else {
      addChatMessage(containerId, "Sorry, I couldn't process that. Try again later.", false);
    }
  } catch {
    hideTyping(containerId);
    addChatMessage(containerId, "Couldn't reach the AI. Email me at junaiddev48@gmail.com instead.", false);
  } finally {
    if (sendBtn) sendBtn.disabled = false;
    input.disabled = false;
    input.focus();
  }
}

/* FAB toggle */
const fabToggle = document.getElementById('fabToggle');
const fabPanel = document.getElementById('fabPanel');
const fabClose = document.getElementById('fabClose');

if (fabToggle) {
  fabToggle.addEventListener('click', () => {
    fabPanel.classList.toggle('open');
  });
}
if (fabClose) {
  fabClose.addEventListener('click', () => {
    fabPanel.classList.remove('open');
  });
}

/* Send on button click */
document.getElementById('sectionChatSend')?.addEventListener('click', () => {
  sendChatMessage('sectionChatInput', 'sectionChatMessages');
});
document.getElementById('fabChatSend')?.addEventListener('click', () => {
  sendChatMessage('fabChatInput', 'fabChatMessages');
});

/* Send on Enter key */
document.getElementById('sectionChatInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendChatMessage('sectionChatInput', 'sectionChatMessages');
});
document.getElementById('fabChatInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendChatMessage('fabChatInput', 'fabChatMessages');
});

/* Suggestion buttons */
document.querySelectorAll('.suggestion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.getAttribute('data-q');
    document.getElementById('sectionChatInput').value = q;
    sendChatMessage('sectionChatInput', 'sectionChatMessages');
  });
});
