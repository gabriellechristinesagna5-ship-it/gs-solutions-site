/* ═══════════ HEADER SCROLL ═══════════ */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header && header.classList.toggle('scrolled', window.scrollY > 20);
});

/* ═══════════ MOBILE MENU ═══════════ */
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });
  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* ═══════════ SCROLL REVEAL ═══════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════════ ACTIVE NAV LINK ═══════════ */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

/* ═══════════ VALIDATION FORMULAIRE ═══════════ */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const errMsg = field.parentElement.querySelector('.error-msg');
      if (!field.value.trim()) {
        field.classList.add('error');
        if (errMsg) { errMsg.textContent = 'Ce champ est requis'; errMsg.style.display = 'block'; }
        valid = false;
      } else {
        field.classList.remove('error');
        if (errMsg) errMsg.style.display = 'none';
      }
    });
    const email = form.querySelector('#email');
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error');
      const errMsg = email.parentElement.querySelector('.error-msg');
      if (errMsg) { errMsg.textContent = 'Adresse email invalide'; errMsg.style.display = 'block'; }
      valid = false;
    }
       if (valid) {
      // Récupérer les données
      const nom = document.getElementById('nom').value.trim();
      const email = document.getElementById('email').value.trim();
      const tel = document.getElementById('tel').value.trim();
      const entreprise = document.getElementById('entreprise').value.trim();
      const service = document.getElementById('type').value;
      const budget = document.getElementById('budget').value;
      const delai = document.getElementById('delai').value;
      const message = document.getElementById('message').value.trim();

            // Construire le message WhatsApp (sans emojis)
      let wa = `*NOUVEAU DEVIS - GS Solutions*\n`;
      wa += `────────────────────\n\n`;
      wa += `*Nom :* ${nom}\n`;
      wa += `*Email :* ${email}\n`;
      if (tel) wa += `*Tel :* ${tel}\n`;
      if (entreprise) wa += `*Entreprise :* ${entreprise}\n`;
      wa += `\n*Service :* ${service}\n`;
      if (budget) wa += `*Budget :* ${budget}\n`;
      if (delai) wa += `*Delai :* ${delai}\n`;
      wa += `\n*Projet :*\n${message}`;

      // Ouvrir WhatsApp
      const numero = '221762309153';
      window.open(`https://wa.me/${numero}?text=${encodeURIComponent(wa)}`, '_blank');

      // Afficher la confirmation
      form.style.display = 'none';
      const ok = document.getElementById('formSuccess');
      if (ok) ok.style.display = 'block';
    } else {
      const firstError = form.querySelector('.error');
      firstError && firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const errMsg = field.parentElement.querySelector('.error-msg');
      if (errMsg) errMsg.style.display = 'none';
    });
  });
}
