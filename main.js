/* ---------- CONSTANTS ---------- */
const DATA_URL = 'resume.json';
const yearSpan = document.getElementById('year');

/* ---------- THEME ---------- */
const themeBtn = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme');
if(storedTheme==='dark'||(!storedTheme&&matchMedia('(prefers-color-scheme:dark)').matches)){
  document.body.classList.add('dark');
}
themeBtn.onclick = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');
};

/* ---------- FOOTER YEAR ---------- */
yearSpan.textContent = new Date().getFullYear();

/* ---------- FETCH & RENDER ---------- */
fetch(DATA_URL).then(r=>r.json()).then(render).then(initReveal)
              .catch(e=>console.error('Resume load error',e));

function render(d){
  about(d.profile); skills(d.skills);
  experience(d.experience); education(d.education);
  awards(d.awards); contact(d.contact);
}

function about(p){
  qs('#about').innerHTML=`
    <h2>About <i class="fa-solid fa-user-gear"></i></h2>
    <p>${p.summary}</p>`;
}

function skills(arr){
  qs('#skills').innerHTML=`
    <h2>Skills <i class="fa-solid fa-screwdriver-wrench"></i></h2>
    <ul class="skill-list">${arr.map(s=>`<li>${s}</li>`).join('')}</ul>`;
}

function experience(arr){
  qs('#experience').innerHTML=`
    <h2>Experience <i class="fa-solid fa-briefcase"></i></h2>
    <div class="timeline">
      ${arr.map(j=>`
        <div class="timeline-item">
          <h3>${j.title} – ${j.company}</h3>
          <small>${j.period}</small>
          <p>${j.responsibilities.join('<br>')}</p>
        </div>`).join('')}
    </div>`;
}

function education(e){
  qs('#education').innerHTML=`
    <h2>Education <i class="fa-solid fa-graduation-cap"></i></h2>
    <p><strong>${e.degree}</strong>, ${e.institution}
       (${e.period}) – CGPA ${e.cgpa}</p>`;
}

function awards(list){
  qs('#awards').innerHTML=`
    <h2>Certifications &amp; Awards <i class="fa-solid fa-award"></i></h2>
    <ul>${list.map(a=>`<li><i class="fa-solid fa-certificate"></i> ${a}</li>`).join('')}</ul>`;
}

function contact(c){
  qs('#contact').innerHTML=`
    <h2>Contact <i class="fa-solid fa-paper-plane"></i></h2>
    <p><i class="fa-solid fa-location-dot"></i> ${c.location}</p>
    <p><i class="fa-solid fa-phone"></i> <a href="tel:${c.phone}">${c.phone}</a></p>
    <p><i class="fa-solid fa-envelope"></i> <a href="mailto:${c.email}">${c.email}</a></p>
    <p><i class="fa-brands fa-linkedin"></i> <a href="${c.linkedin}" target="_blank">LinkedIn</a></p>`;
}

function qs(sel){return document.querySelector(sel)}

/* ---------- SCROLLREVEAL ---------- */
function initReveal(){
  if(window.ScrollReveal){
    ScrollReveal().reveal('.reveal',{distance:'60px',duration:600,easing:'ease-out',origin:'bottom'});
  }else{
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  }
}
