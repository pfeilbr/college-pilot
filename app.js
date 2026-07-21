/* College Tours — shared app shell + renderers */
(function () {
  'use strict';
  const APP_VERSION = 'v8 · 2026-07-21';
  const SCHOOLS = window.SCHOOLS = window.SCHOOLS || {};
  const ORDER = window.SCHOOL_ORDER || Object.keys(SCHOOLS);
  const qs = (s, el) => (el || document).querySelector(s);
  const qsa = (s, el) => [...(el || document).querySelectorAll(s)];

  /* ---------- drawer ---------- */
  function buildDrawer(school) {
    const contact = school ? `
      <hr>
      <a class="ditem" href="${school.contact.maps}" rel="noopener"><span class="em">🗺️</span><span>Directions to campus<small>${school.contact.mapsLabel}</small></span></a>
      ${school.contact.tel ? `<a class="ditem" href="tel:${school.contact.tel}"><span class="em">📞</span><span>Call Admissions<small>${school.contact.telLabel}</small></span></a>` : ''}
      ${school.contact.email ? `<a class="ditem" href="mailto:${school.contact.email}"><span class="em">✉️</span><span>Email Admissions<small>${school.contact.email}</small></span></a>` : ''}
      <a class="ditem" href="${school.contact.tourUrl}" rel="noopener"><span class="em">🎟️</span><span>Book an official campus tour</span></a>
      <a class="ditem" href="${school.contact.siteUrl}" rel="noopener"><span class="em">🌐</span><span>${school.contact.siteLabel}</span></a>` : '';
    const schoolLinks = ORDER.filter(id => SCHOOLS[id]).map(id =>
      `<a class="ditem${school && school.id === id ? ' now' : ''}" href="school.html?s=${id}"><span class="em">🎓</span><span>${SCHOOLS[id].name}<small>${SCHOOLS[id].city}</small></span></a>`).join('');
    const el = document.createElement('div');
    el.innerHTML = `
<div class="backdrop" id="backdrop" hidden></div>
<aside class="drawer" id="drawer" aria-label="Menu" hidden>
  <div class="dhead"><span>Menu</span><button class="dclose" id="dclose" aria-label="Close menu">✕</button></div>
  <a class="ditem" href="index.html"><span class="em">🏠</span><span>All schools<small>College Tours home &amp; comparison</small></span></a>
  ${schoolLinks}
  <hr>
  <button class="ditem" id="btnUpdate"><span class="em">🔄</span><span>Update app<small id="updHint">Fetches the latest version of this guide</small></span></button>
  <button class="ditem" id="btnTheme"><span class="em">🎨</span><span>Theme: <b id="themeLabel">Auto</b><small>Tap to cycle auto → dark → light</small></span></button>
  <button class="ditem" id="btnInstall"><span class="em">📲</span><span>Add to home screen<small>Install this guide as an app</small></span></button>
  <button class="ditem" id="btnShare"><span class="em">🔗</span><span id="shareLabel">Share this guide</span></button>
  ${contact}
  <hr>
  <a class="ditem" href="https://github.com/pfeilbr/college-tours" rel="noopener"><span class="em">⚙️</span><span>Source on GitHub</span></a>
  <div class="dver">Version <span id="verLabel"></span> · data compiled July 2026</div>
</aside>`;
    while (el.firstChild) document.body.appendChild(el.firstChild);
    qs('#verLabel').textContent = APP_VERSION;

    const menuBtn = qs('#menuBtn'), drawer = qs('#drawer'), backdrop = qs('#backdrop');
    const openMenu = () => {
      drawer.hidden = false; backdrop.hidden = false;
      requestAnimationFrame(() => { drawer.classList.add('open'); backdrop.classList.add('open'); });
      menuBtn.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      drawer.classList.remove('open'); backdrop.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      setTimeout(() => { drawer.hidden = true; backdrop.hidden = true; }, 220);
    };
    menuBtn.addEventListener('click', openMenu);
    qs('#dclose').addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) closeMenu(); });

    qs('#btnUpdate').addEventListener('click', async () => {
      qs('#updHint').textContent = 'Updating…';
      try {
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map(r => r.unregister()));
        }
        if (window.caches) {
          const keys = await caches.keys();
          await Promise.all(keys.map(k => caches.delete(k)));
        }
      } catch (e) { }
      location.replace(location.pathname + (location.search ? location.search + '&' : '?') + 'u=' + Date.now());
    });

    const themeLabel = qs('#themeLabel');
    const applyTheme = t => {
      if (t === 'dark' || t === 'light') document.documentElement.dataset.theme = t;
      else { delete document.documentElement.dataset.theme; t = 'auto'; }
      themeLabel.textContent = t[0].toUpperCase() + t.slice(1);
    };
    applyTheme(localStorage.getItem('udTheme'));
    qs('#btnTheme').addEventListener('click', () => {
      const order = ['auto', 'dark', 'light'];
      const now = localStorage.getItem('udTheme') || 'auto';
      const next = order[(order.indexOf(now) + 1) % 3];
      if (next === 'auto') localStorage.removeItem('udTheme'); else localStorage.setItem('udTheme', next);
      applyTheme(next);
    });

    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; });
    qs('#btnInstall').addEventListener('click', () => {
      if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; return; }
      const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
      alert(ios
        ? 'In Safari: tap the Share button (square with arrow), then "Add to Home Screen".'
        : 'In your browser menu (⋮), choose "Add to Home Screen" or "Install app".');
    });

    qs('#btnShare').addEventListener('click', async () => {
      const data = { title: document.title, url: location.origin + location.pathname + location.search.replace(/[?&]u=\d+/, '') };
      if (navigator.share) { try { await navigator.share(data); } catch (e) { } }
      else {
        try {
          await navigator.clipboard.writeText(data.url);
          qs('#shareLabel').textContent = 'Link copied!';
          setTimeout(() => { qs('#shareLabel').textContent = 'Share this guide'; }, 2000);
        } catch (e) { }
      }
    });
  }

  /* ---------- theme applied ASAP (before drawer builds, to avoid flash) ---------- */
  const early = localStorage.getItem('udTheme');
  if (early === 'dark' || early === 'light') document.documentElement.dataset.theme = early;

  /* ---------- chart tooltips ---------- */
  function initTips() {
    const tip = qs('#tip');
    qsa('.seg[data-tip]').forEach(el => {
      const show = e => {
        tip.textContent = el.dataset.tip;
        tip.style.opacity = 1;
        const x = (e.touches ? e.touches[0].clientX : e.clientX);
        const y = (e.touches ? e.touches[0].clientY : e.clientY);
        tip.style.left = Math.min(x + 12, window.innerWidth - tip.offsetWidth - 8) + 'px';
        tip.style.top = (y - 36) + 'px';
      };
      el.addEventListener('mousemove', show);
      el.addEventListener('touchstart', show, { passive: true });
      el.addEventListener('mouseleave', () => tip.style.opacity = 0);
      el.addEventListener('touchend', () => setTimeout(() => tip.style.opacity = 0, 1500));
    });
  }

  /* ---------- scroll spy ---------- */
  function initSpy() {
    const nav = qs('nav.pills');
    if (!nav) return;
    const links = qsa('a', nav);
    if (!links.length) return;
    const secs = links.map(a => qs(a.getAttribute('href')));
    let cur = -1;
    const SAT = (() => { const d = document.createElement('div'); d.style.cssText = 'position:fixed;padding-top:env(safe-area-inset-top,0px)'; document.body.appendChild(d); const v = parseFloat(getComputedStyle(d).paddingTop) || 0; d.remove(); return v; })();
    const spy = () => {
      let i = secs.length - 1;
      while (i > 0 && window.scrollY + 130 + SAT < secs[i].offsetTop) i--;
      if (i === cur) return;
      cur = i;
      links.forEach((a, j) => a.classList.toggle('on', j === i));
      const a = links[i];
      nav.scrollTo({ left: Math.max(0, a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2), behavior: 'smooth' });
    };
    document.addEventListener('scroll', spy, { passive: true });
    spy();
  }

  /* ---------- school page renderer ---------- */
  function renderSchool() {
    const id = new URLSearchParams(location.search).get('s') || ORDER[0];
    const sc = SCHOOLS[id] || SCHOOLS[ORDER[0]];
    document.title = sc.name + ' — College Tours';
    document.documentElement.style.setProperty('--sc', sc.colors.sc);
    document.documentElement.style.setProperty('--sc-dark', sc.colors.scDark);

    qs('#barTitle').innerHTML = `<a href="index.html">${sc.name}</a><small>College Tours · ${sc.city}</small>`;
    qs('#pills').innerHTML = sc.sections.map(s => `<li><a href="#${s.id}">${s.nav}</a></li>`).join('');
    qs('#heroWrap').innerHTML = `
      <span class="loc">${sc.locChip}</span>
      <h1>${sc.heroTitle}</h1>
      <p class="sub">${sc.heroSub}</p>
      <div class="heroStats">${sc.heroStats.map(t => `<div class="hs"><b>${t.b}</b><span>${t.s}</span></div>`).join('')}</div>
      ${sc.visitCard ? `<div class="visitCard">${sc.visitCard}</div>` : ''}`;
    qs('#main').innerHTML = sc.sections.map(s => `
      <section id="${s.id}">
        <div class="kicker">${s.kicker}</div>
        <h2>${s.title}</h2>
        ${s.lead ? `<p class="lead">${s.lead}</p>` : ''}
        ${s.html}
      </section>`).join('');
    buildDrawer(sc);
    initTips();
    initSpy();
  }

  /* ---------- hub renderer ---------- */
  function renderHub() {
    const grid = qs('#schoolGrid');
    grid.innerHTML = ORDER.map(id => {
      const s = SCHOOLS[id];
      return `<a class="scard" href="school.html?s=${id}" style="--stripe:${s.colors.sc};--stripe-ink:${s.colors.sc}">
        <div class="stripe"></div>
        <div class="body">
          <h3>${s.name}</h3>
          <div class="cty">${s.city} · ${s.card.type}</div>
          <div class="blurb">${s.card.blurb}</div>
          <div class="mini">
            <div><b>${s.card.accept}</b><span>Accept rate</span></div>
            <div><b>${s.card.rank}</b><span>US News</span></div>
            <div><b>${s.card.cost}</b><span>Sticker cost/yr</span></div>
            <div><b>${s.card.sat}</b><span>SAT mid-50%</span></div>
          </div>
          <div class="go">Open guide →</div>
        </div></a>`;
    }).join('');

    const metrics = [
      ['Type', s => s.card.type],
      ['Acceptance rate', s => s.card.accept],
      ['SAT middle 50%', s => s.card.sat],
      ['US News rank', s => s.card.rank],
      ['Sticker cost / yr', s => s.card.cost],
      ['Undergrads', s => s.card.undergrads],
      ['Business program', s => s.card.biz],
      ['Grads placed (6 mo)', s => s.card.placed],
      ['4-yr grad rate', s => s.card.grad4],
      ['Greek life', s => s.card.greek],
      ['Sports', s => s.card.sports],
      ['Drive from Philly burbs', s => s.card.drive],
      ['Application deadlines', s => s.card.deadlines],
    ];
    qs('#cmpWrap').innerHTML = `<table class="cmp">
      <tr><th></th>${ORDER.map(id => `<th>${SCHOOLS[id].short}</th>`).join('')}</tr>
      ${metrics.map(([label, fn]) => `<tr><td>${label}</td>${ORDER.map(id => `<td>${fn(SCHOOLS[id]) || '—'}</td>`).join('')}</tr>`).join('')}
    </table>`;
    buildDrawer(null);
    initSpy();
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    if (qs('#schoolGrid')) renderHub(); else if (qs('#main')) renderSchool();
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
  });
})();
