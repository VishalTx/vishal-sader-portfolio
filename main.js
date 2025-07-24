/* ---------- GLOBAL CONSTANTS ---------- */
const DATA_URL = 'data/resume.json';
const YEAR_SPAN = document.getElementById('year');

/* ---------- THEME PERSISTENCE ---------- */
const themeBtn = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme');          // 'dark' | 'light' | null
if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.body.classList.add('dark');
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

/* ---------- POPULATE FOOTER YEAR ---------- */
YEAR_SPAN.textContent = new Date().getFullYear();

/* ---------- FETCH JSON & RENDER ---------- */
fetch(DATA_URL)
  .then(res => res.json())
  .then(renderSite)
  .then(initScrollReveal)
  .catch(err => console.error('Data load error', err));

/* ---------- RENDER FUNCTIONS ---------- */
function renderSite(data) {
  renderAbout(data.profile);
  renderSkills(data.skills);
  renderExperience(data.experience);
  renderEducation(data.education);
  renderAwards(data.awards);
  renderContact(data.contact);
}

function renderAbout(profile) {
  document.querySelector('#about').innerHTML = `
    <h2>About Me <i class="fa-solid fa-user-gear"></i></h2>
    <p>${profile.summary}</p>
  `;
}

function renderSkills(skills) {
  const list = skills.map(s => `<li><i class="fa-solid fa-check"></i> ${s}</li>`).join('');
  document.querySelector('#skills').innerHTML = `
    <h2>Technical Skills <i class="fa-solid fa-gear"></i></h2>
    <ul class="skill-list">${list}</ul>
  `;
}

function renderExperience(roles) {
  const html = roles.map(r => `
    <div class="timeline-item">
      <h3>${r.title} – ${r.company}</h3>
      <small>${r.period}</small>
      <p>${r.responsibilities.join('<br>')}</p>
    </div>
  `).join('');
  document.querySelector('#experience').innerHTML = `
    <h2>Professional Experience <i class="fa-solid fa-briefcase"></i></h2>
    <div class="timeline">${html}</div>
  `;
}

function renderEducation(edu) {
  document.querySelector('#education').innerHTML = `
    <h2>Education <i class="fa-solid fa-graduation-cap"></i></h2>
    <p><strong>${edu.degree}</strong>, ${edu.institution} (${edu.period}) – CGPA ${edu.cgpa}</p>
  `;
}

function renderAwards(list) {
  const rows = list.map(a => `<li><i class="fa-solid fa-award"></i> ${a}</li>`).join('');
  document.querySelector('#awards').innerHTML = `
    <h2>Certifications & Awards <i class="fa-solid fa-certificate"></i></h2>
    <ul>${rows}</ul>
  `;
}

function renderContact(info) {
  document.querySelector('#contact').innerHTML = `
    <h2>Get in Touch <i class="fa-solid fa-envelope-open-text"></i></h2>
    <p><i class="fa-solid fa-location-dot"></i> ${info.location}</p>
    <p><i class="fa-solid fa-phone"></i> <a href="tel:${info.phone}">${info.phone}</a></p>
    <p><i class="fa-solid fa-envelope"></i> <a href="mailto:${info.email}">${info.email}</a></p>
    <p><i class="fa-brands fa-linkedin"></i> <a href="${info.linkedin}" target="_blank">LinkedIn profile</a></p>
  `;
}

/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal() {
  if (window.ScrollReveal) {
    ScrollReveal().reveal('.reveal', { distance:'60px', duration:600, easing:'ease-out', origin:'bottom' });
  } else {
    // Fallback if library failed: add visible class instantly
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
}
