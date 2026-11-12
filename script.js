/* Menu mobile */
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

/* Utilitaires */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const tagsHtml = list => (list || []).map(t => `<span>${esc(t)}</span>`).join('');

/* Coordonnées (data.js) */
document.querySelectorAll('[data-link]').forEach(a => {
  const k = a.dataset.link;
  if (k === 'email') a.href = 'mailto:' + CONTACT.email;
  else if (k === 'tel') a.href = 'tel:+212' + CONTACT.telephone.replace(/^0/, '');
  else if (CONTACT[k]) a.href = CONTACT[k];
});

/* Statistiques (GoatCounter, optionnel) */
function trackEvent(path, title) {
  try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path, title, event: true }); } catch (e) {}
}
(function initStats() {
  const code = (STATS && STATS.goatcounter || '').trim();
  if (!code) return;
  const sc = document.createElement('script');
  sc.async = true;
  sc.src = 'https://gc.zgo.at/count.js';
  sc.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
  document.head.appendChild(sc);
  const num = v => parseInt(String(v).replace(/\D/g, ''), 10) || 0;
  function countUp(el, to) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || to < 2) { el.textContent = to.toLocaleString('fr-FR'); return; }
    const t0 = performance.now(), dur = 1400;
    (function step(t) {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))).toLocaleString('fr-FR');
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  fetch(`https://${code}.goatcounter.com/counter/TOTAL.json`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(d => {
      const strip = document.getElementById('stats-strip');
      strip.hidden = false;
      const vis = num(d.count_unique), views = num(d.count);
      const run = () => { countUp(document.getElementById('stat-visitors'), vis); countUp(document.getElementById('stat-visits'), views); };
      new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { run(); o.disconnect(); } }, { threshold: .4 }).observe(strip);
    }).catch(() => {});
})();

/* Carrousel générique : flèches, points, clavier, balayage, défilement automatique */
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
function initCarousel(root, count, onShow, opts = {}) {
  const q = sel => root.querySelector(sel);
  const dots = q('.car-dots'), media = q('.car-media');
  const autoMs = REDUCED ? 0 : (opts.autoplay || 0);
  let i = 0, moved = false, startX = null, busy = false;
  let elapsed = 0, last = null, hold = 0, hovering = false, inView = true;
  const bar = document.createElement('div');
  bar.className = 'car-progress'; bar.innerHTML = '<span></span>';
  if (autoMs) root.appendChild(bar);
  const fill = bar.firstChild;
  for (let n = 0; n < count; n++) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'tk-dot'; b.setAttribute('aria-label', `Projet ${n + 1} sur ${count}`);
    b.addEventListener('click', () => { manual(); show(n, false, n > i ? 'next' : 'prev'); });
    dots.appendChild(b);
  }
  function manual() { hold = performance.now() + 7000; elapsed = 0; }
  function show(n, instant, dir) {
    i = (n + count) % count;
    elapsed = 0;
    const apply = () => {
      onShow(i);
      q('.car-count').textContent = `${i + 1} / ${count}`;
      dots.querySelectorAll('.tk-dot').forEach((d, k) => { d.classList.toggle('active', k === i); d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
    };
    if (instant || REDUCED) { apply(); return; }
    busy = true;
    root.dataset.dir = dir || 'next';
    root.classList.add('swapping');
    setTimeout(() => {
      apply();
      root.classList.remove('swapping');
      root.classList.add('entering');
      void root.offsetWidth;
      root.classList.remove('entering');
      busy = false;
    }, 220);
  }
  const go = d => { if (busy) return; manual(); show(i + d, false, d > 0 ? 'next' : 'prev'); };
  q('.car-prev').addEventListener('click', () => go(-1));
  q('.car-next').addEventListener('click', () => go(1));
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });
  media.addEventListener('pointerdown', e => { startX = e.clientX; moved = false; manual(); });
  media.addEventListener('pointerup', e => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 45) { moved = true; go(dx < 0 ? 1 : -1); }
    startX = null;
  });
  media.addEventListener('pointercancel', () => { startX = null; });
  media.addEventListener('dragstart', e => e.preventDefault());
  show(0, true);

  /* Défilement automatique : s'arrête au survol, au toucher, au focus, hors écran */
  if (autoMs) {
    root.addEventListener('mouseenter', () => { hovering = true; });
    root.addEventListener('mouseleave', () => { hovering = false; });
    root.addEventListener('focusin', () => { hovering = true; });
    root.addEventListener('focusout', () => { hovering = false; });
    new IntersectionObserver(es => { inView = es[0].isIntersecting; }, { threshold: .45 }).observe(root);
    (function tick(ts) {
      const playing = inView && !hovering && !busy && !document.hidden && ts > hold && !dlgIsOpen();
      if (last !== null && playing) elapsed += ts - last;
      last = ts;
      fill.style.transform = `scaleX(${Math.min(1, elapsed / autoMs)})`;
      root.classList.toggle('is-paused', !playing);
      if (elapsed >= autoMs) { elapsed = 0; show(i + 1, false, 'next'); }
      requestAnimationFrame(tick);
    })(performance.now());
  }
  return { current: () => i, wasSwipe: () => { const m = moved; moved = false; return m; } };
}
function dlgIsOpen() { const d = document.getElementById('project-dialog'); return !!(d && d.open); }

/* Carrousel Freelance (premier projet visible dès l'ouverture) */
(function initFreelance() {
  const root = document.getElementById('fl-carousel');
  if (!root || !FREELANCE.length) return;
  const q = sel => root.querySelector(sel);
  const img = q('.fl-image');
  const car = initCarousel(root, FREELANCE.length, n => {
    const p = FREELANCE[n];
    img.src = p.image; img.alt = p.alt;
    q('.fl-type').textContent = p.type;
    q('.fl-title').textContent = p.titre;
    q('.fl-text').innerHTML = (p.paragraphes || [p.resume]).map(t => `<p>${esc(t)}</p>`).join('');
    q('.fl-tags').innerHTML = tagsHtml(p.tags);
  }, { autoplay: 6000 });
  q('.fl-image-btn').addEventListener('click', () => {
    if (car.wasSwipe()) return;
    openProject(FREELANCE[car.current()].id);
  });
})();

/* Carrousel Tinkercad */
(function initTinkercad() {
  const root = document.getElementById('tinkercad');
  if (!root || !TINKERCAD.length) return;
  const q = s => root.querySelector(s);
  const imgLink = q('.tk-image-link'), img = q('.tk-image');
  const car = initCarousel(root, TINKERCAD.length, n => {
    const p = TINKERCAD[n];
    img.src = p.image; img.alt = p.alt;
    imgLink.href = p.lien; q('.tk-link').href = p.lien;
    imgLink.setAttribute('aria-label', `${p.titre} — ouvrir sur Tinkercad`);
    q('.tk-title').textContent = p.titre;
    q('.tk-sub').textContent = p.sous;
    q('.tk-text').textContent = p.texte;
    q('.tk-tags').innerHTML = tagsHtml(p.tags);
  }, { autoplay: 7000 });
  imgLink.addEventListener('click', e => {
    if (car.wasSwipe()) { e.preventDefault(); return; }
    trackEvent('tinkercad/' + TINKERCAD[car.current()].titre, 'Tinkercad : ' + TINKERCAD[car.current()].titre);
  });
})();

/* Cartes projets */
function renderCards(list, container) {
  list.forEach(p => {
    const clickable = !!(p.galerie || p.video || p.paragraphes);
    const card = document.createElement('article');
    card.className = 'project-card reveal ' + (container.children.length % 2 ? 'from-right' : 'from-left') + (clickable ? ' is-clickable' : '');
    card.style.transitionDelay = (container.children.length % 2) * 120 + 'ms';
    let media;
    if (p.image) {
      media = `<div class="project-image project-photo ${p.fit === 'cover' ? 'cover' : ''}"><img src="${esc(p.image)}" alt="${esc(p.alt || p.titre)}" loading="lazy" onerror="this.remove()">${p.badge ? `<span class="video-badge">${esc(p.badge)}</span>` : ''}${p.galerie && p.galerie.length > 1 ? `<span class="image-caption count-badge">${p.galerie.length} images</span>` : ''}</div>`;
    } else {
      media = `<div class="project-image image-placeholder"><p>${esc(p.apercu || 'Visuel à venir')}</p></div>`;
    }
    card.innerHTML = `${media}
    <div class="project-content">
      <div class="project-meta"><p class="project-type">${esc(p.type)}</p><span class="date-pill">${esc(p.date)}</span></div>
      <h3>${esc(p.titre)}</h3>
      <p>${esc(p.resume)}</p>
      <div class="tags">${tagsHtml(p.tags)}</div>
      ${clickable ? `<button class="card-more" type="button" data-id="${esc(p.id)}">Voir le détail <span>→</span></button>` : ''}
    </div>`;
    if (clickable) card.addEventListener('click', e => { if (!e.target.closest('a')) openProject(p.id); });
    container.appendChild(card);
  });
}
const grid = document.getElementById('project-grid');
renderCards(PROJETS, grid);

/* Fenêtre de détail d'un projet */
const dlg = document.getElementById('project-dialog');
const dlgBody = document.getElementById('dlg-body');
let lastFocus = null;

function openProject(id, fromHash) {
  const p = PROJETS.concat(FREELANCE).find(x => x.id === id);
  if (!p) return;
  lastFocus = document.activeElement;
  const gal = p.galerie || (p.image && !p.video ? [{ src: p.image, legende: p.alt }] : []);
  let h = `<p class="project-type">${esc(p.type)} <span class="date-pill">${esc(p.date)}</span></p><h3 id="dlg-title">${esc(p.titre)}</h3>`;
  if (p.video) {
    h += `<div class="video-wrap"><iframe src="https://www.youtube-nocookie.com/embed/${esc(p.video)}?rel=0" title="Vidéo de démonstration : ${esc(p.titre)}" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>`;
  }
  if (gal.length) {
    h += `<figure class="gal-main"><img id="gal-img" src="${esc(gal[0].src)}" alt="${esc(gal[0].legende)}"><figcaption id="gal-cap">${esc(gal[0].legende)}</figcaption></figure>`;
    if (gal.length > 1) {
      h += `<div class="gal-thumbs">` + gal.map((g, k) => `<button type="button" class="gal-thumb${k === 0 ? ' active' : ''}" data-k="${k}" aria-label="Image ${k + 1} : ${esc(g.legende)}"><img src="${esc(g.src)}" alt="" loading="lazy"></button>`).join('') + `</div>`;
    }
  }
  (p.paragraphes || [p.resume]).forEach(t => { h += `<p class="dlg-text">${esc(t)}</p>`; });
  (p.listes || []).forEach(l => {
    h += `<h4>${esc(l.titre)}</h4><ul class="dlg-list">${l.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  });
  h += `<div class="tags">${tagsHtml(p.tags)}</div>`;
  if (p.credit) h += `<p class="dlg-credit">${esc(p.credit.texte)} <a href="${esc(p.credit.lien)}" target="_blank" rel="noreferrer">${esc(p.credit.libelle)} ↗</a></p>`;
  if (p.liens && p.liens.length) h += `<div class="dlg-links">${p.liens.map(l => `<a class="btn secondary small" href="${esc(l.url)}" target="_blank" rel="noreferrer">${esc(l.label)} <span>↗</span></a>`).join('')}</div>`;
  dlgBody.innerHTML = h;
  dlgBody.scrollTop = 0;
  dlgBody.querySelectorAll('.gal-thumb').forEach(b => b.addEventListener('click', () => {
    const g = gal[+b.dataset.k];
    document.getElementById('gal-img').src = g.src;
    document.getElementById('gal-img').alt = g.legende;
    document.getElementById('gal-cap').textContent = g.legende;
    dlgBody.querySelectorAll('.gal-thumb').forEach(x => x.classList.toggle('active', x === b));
  }));
  if (!dlg.open) dlg.showModal();
  document.body.classList.add('no-scroll');
  if (!fromHash) history.replaceState(null, '', '#p-' + id);
  trackEvent('projet/' + id, p.titre);
}
function closeDialog() { if (dlg.open) dlg.close(); }
dlg.addEventListener('close', () => {
  dlgBody.innerHTML = '';           /* arrête la vidéo */
  document.body.classList.remove('no-scroll');
  if (location.hash.startsWith('#p-')) history.replaceState(null, '', location.pathname + location.search + '#projets');
  if (lastFocus && lastFocus.focus) lastFocus.focus();
});
dlg.querySelector('.dlg-close').addEventListener('click', closeDialog);
dlg.addEventListener('click', e => { if (e.target === dlg) closeDialog(); });
grid.addEventListener('click', e => {
  const b = e.target.closest('.card-more');
  if (b) { e.stopPropagation(); openProject(b.dataset.id); }
});
if (location.hash.startsWith('#p-')) openProject(location.hash.slice(3), true);

/* Certificats */
const certGrid = document.getElementById('cert-grid');
if (!CERTIFICATS.length) {
  certGrid.innerHTML = `<div class="cert-empty reveal"><span class="cert-icon">✦</span><h3>Certificats à venir</h3><p>Cette section présentera mes formations et certificats (organisme, date, compétences acquises) au fur et à mesure de leur ajout.</p></div>`;
} else {
  CERTIFICATS.forEach(c => {
    const isPdf = /\.pdf$/i.test(c.fichier || '');
    const el = document.createElement('article');
    el.className = 'cert-card reveal';
    const thumb = c.image || (!isPdf ? c.fichier : '');
    el.innerHTML = `${thumb ? `<a class="cert-thumb" href="${esc(c.fichier || thumb)}" target="_blank" rel="noreferrer"><img src="${esc(thumb)}" alt="Certificat : ${esc(c.nom)}" loading="lazy"></a>` : ''}
      <div class="cert-content"><div class="project-meta"><p class="project-type">${esc(c.organisme)}</p><span class="date-pill">${esc(c.date)}</span></div><h3>${esc(c.nom)}</h3>
      ${c.competences && c.competences.length ? `<div class="tags">${tagsHtml(c.competences)}</div>` : ''}
      ${c.fichier ? `<a class="card-more" href="${esc(c.fichier)}" target="_blank" rel="noreferrer">${isPdf ? 'Voir le certificat (PDF)' : 'Voir en grand'} <span>↗</span></a>` : ''}</div>`;
    certGrid.appendChild(el);
  });
}

/* Animations au défilement */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.getElementById('year').textContent = new Date().getFullYear();

/* Barre de progression du défilement */
const progress = document.getElementById('scroll-progress');
function onScroll() {
  const h = document.documentElement;
  progress.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`;
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Lien actif dans le menu selon la section visible */
const navLinks = [...document.querySelectorAll('.nav a')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(sec => spy.observe(sec));

/* Mots qui défilent dans l'en-tête */
(function rotator() {
  const el = document.getElementById('rotator');
  const words = ['PCB Design', 'FPGA', 'RF', 'IC Design', 'conception électronique'];
  if (!el || REDUCED) return;
  let k = 0;
  setInterval(() => {
    el.classList.add('out');
    setTimeout(() => { k = (k + 1) % words.length; el.textContent = words[k]; el.classList.remove('out'); }, 350);
  }, 2400);
})();
