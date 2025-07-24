/* ---------------- THEME ---------------- */
const btn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if(saved==='dark'||(!saved&&matchMedia('(prefers-color-scheme:dark)').matches)){
  document.body.classList.add('dark');
}
btn.onclick=()=>{
  document.body.classList.toggle('dark');
  localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'light');
};

/* ---------------- DATA ---------------- */
const data = JSON.parse(document.getElementById('resumeData').textContent);

/* ---------------- RENDER ---------------- */
render(data);  initReveal();  document.getElementById('year').textContent=new Date().getFullYear();

function render(d){
  q('#about').innerHTML   = `<h2>About <i class="fa-solid fa-user-gear"></i></h2><p>${d.profile.summary}</p>`;
  q('#skills').innerHTML  = `<h2>Skills <i class="fa-solid fa-screwdriver-wrench"></i></h2>
                             <ul class="skill-list">${d.skills.map(s=>`<li>${s}</li>`).join('')}</ul>`;
  q('#experience').innerHTML = `<h2>Experience <i class="fa-solid fa-briefcase"></i></h2>
    <div class="timeline">${d.experience.map(j=>`
      <div class="timeline-item">
        <h3>${j.title} – ${j.company}</h3><small>${j.period}</small>
        <p>${j.responsibilities.join('<br>')}</p>
      </div>`).join('')}</div>`;
  q('#education').innerHTML = `<h2>Education <i class="fa-solid fa-graduation-cap"></i></h2>
      <p><strong>${d.education.degree}</strong>, ${d.education.institution}
      (${d.education.period}) – CGPA ${d.education.cgpa}</p>`;
  q('#awards').innerHTML = `<h2>Awards <i class="fa-solid fa-award"></i></h2>
      <ul>${d.awards.map(a=>`<li><i class="fa-solid fa-certificate"></i> ${a}</li>`).join('')}</ul>`;
  q('#contact').innerHTML = `<h2>Contact <i class="fa-solid fa-paper-plane"></i></h2>
      <p><i class="fa-solid fa-location-dot"></i> ${d.contact.location}</p>
      <p><i class="fa-solid fa-phone"></i> <a href="tel:${d.contact.phone}">${d.contact.phone}</a></p>
      <p><i class="fa-solid fa-envelope"></i> <a href="mailto:${d.contact.email}">${d.contact.email}</a></p>
      <p><i class="fa-brands fa-linkedin"></i> <a href="${d.contact.linkedin}" target="_blank">LinkedIn</a></p>`;
}

/* ---------------- HELPERS ---------------- */
function q(s){return document.querySelector(s);}

/* ---------------- SCROLL REVEAL ---------------- */
function initReveal(){
  if(window.ScrollReveal){
    ScrollReveal().reveal('.reveal',{distance:'60px',duration:600,easing:'ease-out',origin:'bottom'});
  }else{
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  }
}
