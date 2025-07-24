// Typing effect for the profile summary
const typingElement = document.getElementById('typing');
const typingTexts = [
  'DevOps Engineer',
  'CI/CD | Cloud | Automation',
  'AWS | Azure | GCP | Kubernetes',
  'Python | Bash | Terraform | Ansible'
];
let typingIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const current = typingTexts[typingIndex];
  if (isDeleting) {
    typingElement.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingTexts.length;
      setTimeout(type, 600);
    } else {
      setTimeout(type, 40);
    }
  } else {
    typingElement.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(type, 1200);
    } else {
      setTimeout(type, 90);
    }
  }
}
type();

// Animate skill bars
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.skill-bar-inner').forEach(bar => {
    const skill = bar.getAttribute('data-skill');
    setTimeout(() => {
      bar.style.width = skill + '%';
    }, 400);
  });
});

// Experience details toggle
const expToggles = document.querySelectorAll('.exp-toggle');
expToggles.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.experience-item');
    item.classList.toggle('active');
    btn.textContent = item.classList.contains('active') ? 'Hide Details' : 'Show Details';
  });
});

// Theme toggle (light/dark)
const themeBtn = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeBtn.innerHTML = `<i class="fas fa-${dark ? 'sun' : 'moon'}"></i>`;
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
themeBtn.addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark'));
});

// --- Project Modal Popup ---
const projectDetails = [
  {
    title: 'CI/CD Automation Platform',
    details: `<ul><li>Designed and implemented multi-stage CI/CD pipelines using Jenkins, Harness, and ArgoCD.</li><li>Automated build, test, and deployment for microservices and monoliths.</li><li>Integrated notifications and real-time monitoring.</li></ul>`
  },
  {
    title: 'Cloud Infra Provisioning',
    details: `<ul><li>Provisioned scalable AWS and Azure infrastructure using Terraform and Ansible.</li><li>Automated server configuration, security, and cost optimization.</li><li>Enabled blue/green and canary deployments.</li></ul>`
  },
  {
    title: 'Kubernetes Monitoring Suite',
    details: `<ul><li>Deployed Prometheus, Grafana, and New Relic for real-time monitoring and alerting.</li><li>Created custom dashboards and automated alerting for SRE teams.</li><li>Optimized cluster performance and resource usage.</li></ul>`
  }
];
const modal = document.getElementById('projectModal');
const modalDetails = document.getElementById('modalDetails');
const closeModal = document.querySelector('.close-modal');
document.querySelectorAll('.project-details-btn').forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    modalDetails.innerHTML = `<h3>${projectDetails[idx].title}</h3>${projectDetails[idx].details}`;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// --- Testimonials Carousel ---
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let testimonialIdx = 0;
function showTestimonial(idx) {
  testimonials.forEach((t, i) => t.classList.toggle('active', i === idx));
}
prevBtn.addEventListener('click', () => {
  testimonialIdx = (testimonialIdx - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIdx);
});
nextBtn.addEventListener('click', () => {
  testimonialIdx = (testimonialIdx + 1) % testimonials.length;
  showTestimonial(testimonialIdx);
});
showTestimonial(testimonialIdx);

// --- Back to Top Button ---
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Splash Screen Loader ---
const splash = document.getElementById('splashScreen');
window.addEventListener('load', () => {
  setTimeout(() => {
    splash.style.opacity = 0;
    setTimeout(() => splash.style.display = 'none', 500);
  }, 1200);
});

// --- Scroll Reveal Animation ---
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section, .projects-list, .testimonial-carousel').forEach(el => {
    el.classList.add('reveal');
  });
  revealOnScroll();
});

// --- Enhanced Contact Form Validation ---
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
contactForm.addEventListener('input', function(e) {
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  let valid = true;
  if (!name) valid = false;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) valid = false;
  if (!message) valid = false;
  contactForm.querySelector('button[type="submit"]').disabled = !valid;
});
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formMessage.textContent = 'Sending...';
  setTimeout(() => {
    formMessage.textContent = 'Thank you for reaching out! I will get back to you soon.';
    contactForm.reset();
    contactForm.querySelector('button[type="submit"]').disabled = true;
  }, 1200);
});

// --- Animated Counters ---
function animateCounter(id, end, duration) {
  const el = document.getElementById(id);
  let start = 0;
  const step = Math.ceil(end / (duration / 20));
  function update() {
    start += step;
    if (start > end) start = end;
    el.textContent = start;
    if (start < end) setTimeout(update, 20);
  }
  update();
}
window.addEventListener('DOMContentLoaded', () => {
  animateCounter('expCounter', 4, 900); // 4+ years
  animateCounter('projCounter', 15, 900); // 15+ projects
  animateCounter('certCounter', 5, 900); // 5+ certifications
}); 
