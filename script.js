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

// Contact form feedback (no backend, just UI)
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formMessage.textContent = 'Sending...';
  setTimeout(() => {
    formMessage.textContent = 'Thank you for reaching out! I will get back to you soon.';
    contactForm.reset();
  }, 1200);
}); 
