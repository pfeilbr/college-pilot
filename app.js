/* College Pilot — shared app shell + renderers */
(function () {
  'use strict';
  const APP_VERSION = 'v14 · 2026-07-31';

  /* ---------- ratings store (localStorage, device-only) ---------- */
  const RATE_CATS = ['Business program', 'Campus & dorms', 'Location', 'Cost fit', 'Social scene', 'Sports & spirit', 'Food & dining', 'Gut feel'];
  const STATUSES = [
    { k: 'love', label: '❤️ Shortlist it', short: '❤️ Shortlisted' },
    { k: 'maybe', label: '🤔 Undecided', short: '🤔 Undecided' },
    { k: 'pass', label: '❌ Pass', short: '❌ Passed' }
  ];
  const RKEY = 'college-pilot-ratings';
  try { // one-time migration from the app's earlier name
    if (!localStorage.getItem(RKEY) && localStorage.getItem('shortlist-ratings')) {
      localStorage.setItem(RKEY, localStorage.getItem('shortlist-ratings'));
      localStorage.removeItem('shortlist-ratings');
    }
  } catch (e) { }
  const loadR = () => { try { return JSON.parse(localStorage.getItem(RKEY) || '{}'); } catch (e) { return {}; } };
  const saveR = (r) => { try { localStorage.setItem(RKEY, JSON.stringify(r)); } catch (e) { } };
  const avgStars = (rec) => {
    if (!rec || !rec.stars) return 0;
    const v = Object.values(rec.stars).filter(Boolean);
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0;
  };

  /* BACKUP:PURE:START — sanitizeImport/mergeRatings are pure (no DOM, no closure
     state beyond their own args) so tests/backup.test.js can extract and run this
     block on its own. Keep them that way. */
  const SCHEMA_VERSION = 1;
  const NOTE_MAX = 4000;
  /* Validate + sanitize an imported ratings export. Never trusts the file: bad
     JSON, a missing/wrong envelope, unknown school ids, out-of-range stars, and
     non-string notes are all rejected or dropped rather than applied. */
  function sanitizeImport(raw, schools, cats, statuses) {
    let data;
    try { data = JSON.parse(raw); } catch (e) { return { ok: false, error: 'That file is not valid JSON.' }; }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return { ok: false, error: 'That file is not a College Pilot ratings export.' };
    if (data.app !== 'college-pilot') return { ok: false, error: 'That file is not a College Pilot ratings export.' };
    if (data.version !== SCHEMA_VERSION) return { ok: false, error: 'That export is from an unsupported version of College Pilot.' };
    if (!data.ratings || typeof data.ratings !== 'object' || Array.isArray(data.ratings)) return { ok: false, error: 'That file has no ratings in it.' };
    const ratings = Object.create(null);
    const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
    for (const id of Object.keys(data.ratings)) {
      if (!own(schools, id)) continue; // 'constructor'/'__proto__' are truthy on any object
      const rec = data.ratings[id];
      if (!rec || typeof rec !== 'object' || Array.isArray(rec)) continue;
      const clean = { stars: {}, note: '', status: null };
      if (rec.stars && typeof rec.stars === 'object' && !Array.isArray(rec.stars)) {
        for (const cat of cats) {
          const v = rec.stars[cat];
          if (Number.isInteger(v) && v >= 1 && v <= 5) clean.stars[cat] = v;
        }
      }
      if (typeof rec.note === 'string') clean.note = rec.note.slice(0, NOTE_MAX);
      if (statuses.some(s => s.k === rec.status)) clean.status = rec.status;
      if (clean.status || Object.keys(clean.stars).length || clean.note.trim()) ratings[id] = clean;
    }
    return { ok: true, ratings };
  }
  /* Merge a sanitized import into the current ratings map. keepExisting=true
     leaves schools rated on both sides untouched; false lets the import win. */
  function mergeRatings(existing, incoming, keepExisting) {
    const merged = Object.assign({}, existing);
    let imported = 0, skipped = 0;
    for (const id of Object.keys(incoming)) {
      if (merged[id] && keepExisting) { skipped++; continue; }
      merged[id] = incoming[id];
      imported++;
    }
    return { merged, imported, skipped };
  }
  /* BACKUP:PURE:END */

  /* WEIGHTS:PURE:START — sanitizeWeights/weightedAvgStars/bestWorstCats/rankSchools
     are pure (no DOM, no closure state beyond their own args) so tests/weights.test.js
     can extract and run this block on its own. Keep them that way. */
  const WKEY = 'college-pilot-weights';
  const DEFAULT_WEIGHT = 1;
  const WEIGHT_LEVELS = [
    { v: 0, label: 'Ignore' },
    { v: 1, label: 'Normal' },
    { v: 2, label: 'Important' },
    { v: 3, label: 'Critical' }
  ];
  /* Validate + sanitize a stored/parsed weights blob: unknown categories are
     dropped, and a missing, out-of-range, or non-integer value falls back to
     the default weight — never throws, never trusts the blob. */
  function sanitizeWeights(raw, cats) {
    raw = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};
    const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
    const clean = {};
    cats.forEach(cat => {
      const v = own(raw, cat) ? raw[cat] : DEFAULT_WEIGHT;
      clean[cat] = (Number.isInteger(v) && v >= 0 && v <= 3) ? v : DEFAULT_WEIGHT;
    });
    return clean;
  }
  const weightOf = (weights, cat) => {
    const w = weights && weights[cat];
    return (Number.isInteger(w) && w >= 0 && w <= 3) ? w : DEFAULT_WEIGHT;
  };
  const weightsAreDefault = (weights, cats) => cats.every(c => weightOf(weights, c) === DEFAULT_WEIGHT);
  /* Weighted mean of a school's rated categories. A category weighted to 0 is
     excluded from the average entirely — not counted as a zero score. If every
     rated category on a school happens to be weighted 0, falls back to the
     plain mean of those categories rather than reporting a meaningless 0. With
     every category left at the default weight (1) this is exactly the flat
     mean — the compatibility guarantee for existing rankings. */
  function weightedAvgStars(rec, weights, cats) {
    if (!rec || !rec.stars) return 0;
    const rated = cats.filter(c => rec.stars[c]);
    if (!rated.length) return 0;
    const active = rated.filter(c => weightOf(weights, c) > 0);
    const pool = active.length ? active : rated; // all-zero fallback: treat as unweighted
    let sum = 0, wsum = 0;
    pool.forEach(c => { const w = active.length ? weightOf(weights, c) : 1; sum += rec.stars[c] * w; wsum += w; });
    return wsum ? sum / wsum : 0;
  }
  /* Best/weakest categories by weighted contribution (stars × weight) — a
     category weighted to 0 never shows up as "best" or "weakest" unless every
     rated category on the school is weighted 0, in which case raw stars decide. */
  function bestWorstCats(rec, weights, cats) {
    if (!rec || !rec.stars) return { best: null, worst: null, ratedCount: 0 };
    const rated = cats.filter(c => rec.stars[c]);
    if (!rated.length) return { best: null, worst: null, ratedCount: 0 };
    const active = rated.filter(c => weightOf(weights, c) > 0);
    const pool = active.length ? active : rated;
    const score = c => rec.stars[c] * (active.length ? weightOf(weights, c) : 1);
    const sorted = pool.slice().sort((a, b) => score(b) - score(a));
    return { best: sorted[0], worst: sorted[sorted.length - 1], ratedCount: rated.length };
  }
  /* Rank school ids: verdict first (love > maybe > unrated-but-touched > pass),
     then weighted average descending. Pure — every input is an argument, no
     dependency on closure state, so it can run standalone in a vm sandbox. */
  function rankSchools(order, schools, ratings, weights, cats) {
    const rank = { love: 0, maybe: 1, null: 2, pass: 3 };
    const isRated = id => schools[id] && ratings[id] &&
      (ratings[id].status || weightedAvgStars(ratings[id], weights, cats) > 0 || (ratings[id].note || '').trim());
    const rated = order.filter(isRated);
    rated.sort((a, b) => (rank[ratings[a].status] ?? 2) - (rank[ratings[b].status] ?? 2) ||
      weightedAvgStars(ratings[b], weights, cats) - weightedAvgStars(ratings[a], weights, cats));
    return rated;
  }
  /* WEIGHTS:PURE:END */
  const loadW = () => { try { return sanitizeWeights(JSON.parse(localStorage.getItem(WKEY) || '{}'), RATE_CATS); } catch (e) { return sanitizeWeights({}, RATE_CATS); } };
  const saveW = (w) => { try { localStorage.setItem(WKEY, JSON.stringify(w)); } catch (e) { } };

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
<aside class="drawer" id="drawer" aria-label="Menu" role="dialog" aria-modal="true" hidden>
  <div class="dhead"><span>Menu</span><button class="dclose" id="dclose" aria-label="Close menu">✕</button></div>
  <a class="ditem" href="index.html"><span class="em">🏠</span><span>All schools<small>College Pilot home · Decision Board · comparison</small></span></a>
  ${schoolLinks}
  <hr>
  <button class="ditem" id="btnUpdate"><span class="em">🔄</span><span>Update app<small id="updHint">Fetches the latest version of this guide</small></span></button>
  <button class="ditem" id="btnTheme"><span class="em">🎨</span><span>Theme: <b id="themeLabel">Auto</b><small>Tap to cycle auto → dark → light</small></span></button>
  <button class="ditem" id="btnInstall"><span class="em">📲</span><span>Add to home screen<small>Install this guide as an app</small></span></button>
  <button class="ditem" id="btnShare"><span class="em">🔗</span><span id="shareLabel">Share this guide</span></button>
  ${contact}
  <hr>
  <a class="ditem" href="https://github.com/pfeilbr/college-pilot" rel="noopener"><span class="em">⚙️</span><span>Source on GitHub</span></a>
  <div class="dver">Version <span id="verLabel"></span> · data compiled July 2026</div>
</aside>`;
    while (el.firstChild) document.body.appendChild(el.firstChild);
    qs('#verLabel').textContent = APP_VERSION;

    const menuBtn = qs('#menuBtn'), drawer = qs('#drawer'), backdrop = qs('#backdrop');
    const drawerFocusables = () => qsa('a[href], button:not([disabled])', drawer);
    let lastFocus = null;
    const openMenu = () => {
      lastFocus = document.activeElement;
      drawer.hidden = false; backdrop.hidden = false;
      requestAnimationFrame(() => { drawer.classList.add('open'); backdrop.classList.add('open'); });
      menuBtn.setAttribute('aria-expanded', 'true');
      const f = drawerFocusables(); if (f.length) f[0].focus();
    };
    const closeMenu = () => {
      drawer.classList.remove('open'); backdrop.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      setTimeout(() => { drawer.hidden = true; backdrop.hidden = true; }, 220);
      (lastFocus || menuBtn).focus();
    };
    menuBtn.addEventListener('click', openMenu);
    qs('#dclose').addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !drawer.hidden) closeMenu(); });
    drawer.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const f = drawerFocusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

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
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const spy = () => {
      let i = secs.length - 1;
      while (i > 0 && window.scrollY + 130 + SAT < secs[i].offsetTop) i--;
      if (i === cur) return;
      cur = i;
      links.forEach((a, j) => { a.classList.toggle('on', j === i); if (j === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      const a = links[i];
      nav.scrollTo({ left: Math.max(0, a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2), behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    document.addEventListener('scroll', spy, { passive: true });
    spy();
  }

  /* ---------- school page renderer ---------- */
  function renderSchool() {
    const id = new URLSearchParams(location.search).get('s') || ORDER[0];
    const sc = SCHOOLS[id] || SCHOOLS[ORDER[0]];
    document.title = sc.name + ' — College Pilot';
    document.documentElement.style.setProperty('--sc', sc.colors.sc);
    document.documentElement.style.setProperty('--sc-dark', sc.colors.scDark);

    qs('#barTitle').innerHTML = `<a href="index.html">${sc.name}</a><small>College Pilot · ${sc.city}</small>`;
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
      </section>`).join('') + buildRateSection(sc);
    qs('#pills').insertAdjacentHTML('beforeend', '<li><a href="#mytake">⭐ My Take</a></li>');
    wireRateSection(sc);
    buildDrawer(sc);
    initTips();
    initSpy();
  }

  /* ---------- per-school "My Take" rating section ---------- */
  function buildRateSection(sc) {
    const rec = loadR()[sc.id] || {};
    const starsRow = (cat) => {
      const v = (rec.stars && rec.stars[cat]) || 0;
      let btns = '';
      for (let i = 1; i <= 5; i++) {
        const tab = (v ? i === v : i === 1) ? '0' : '-1';
        btns += `<button data-cat="${cat}" data-v="${i}" class="${i <= v ? 'on' : ''}" role="radio" aria-checked="${i === v}" tabindex="${tab}" aria-label="${cat}: ${i} star${i > 1 ? 's' : ''}">★</button>`;
      }
      return `<div class="rateRow"><span>${cat}</span><span class="stars" role="radiogroup" aria-label="${cat}">${btns}</span></div>`;
    };
    return `
      <section id="mytake">
        <div class="kicker">Your call</div>
        <h2>My take on ${sc.short}</h2>
        <p class="lead">Rate it right after the tour, while it's fresh. Everything here is saved only on this device and feeds the Decision Board on the home page.</p>
        <div class="card">
          <div class="aidLbl">Verdict</div>
          <div class="aidChips" id="rateStatus">
            ${STATUSES.map(s => `<button data-k="${s.k}" class="${rec.status === s.k ? 'on' : ''}" aria-pressed="${rec.status === s.k}">${s.label}</button>`).join('')}
          </div>
          <div class="aidLbl" style="margin-top:16px">Rate what matters (tap the stars)</div>
          <div id="rateStars">${RATE_CATS.map(starsRow).join('')}</div>
          <div class="aidLbl" style="margin-top:16px">Notes from the visit</div>
          <textarea id="rateNote" class="rateNote" rows="4" placeholder="What stood out? Best moment of the tour? Dealbreakers? Food verdict?">${(rec.note || '').replace(/</g, '&lt;')}</textarea>
          <p class="src"><span id="rateSaved" aria-live="polite"></span> Saved automatically on this device only — nothing is uploaded. <button id="rateClear" class="linkBtn">Clear this school's ratings</button></p>
        </div>
      </section>`;
  }

  function wireRateSection(sc) {
    const upd = (fn) => {
      const all = loadR();
      const rec = all[sc.id] || (all[sc.id] = { stars: {}, note: '', status: null });
      if (!rec.stars) rec.stars = {};
      fn(rec, all);
      all[sc.id] = rec; saveR(all);
      const el = qs('#rateSaved'); if (el) { el.textContent = '✓ Saved.'; setTimeout(() => el.textContent = '', 1500); }
    };
    qsa('#rateStatus button').forEach(b => b.addEventListener('click', () => {
      upd(rec => { rec.status = rec.status === b.dataset.k ? null : b.dataset.k; });
      const cur = (loadR()[sc.id] || {}).status;
      qsa('#rateStatus button').forEach(x => { x.classList.toggle('on', x.dataset.k === cur); x.setAttribute('aria-pressed', x.dataset.k === cur); });
    }));
    qsa('#rateStars button').forEach(b => b.addEventListener('click', () => {
      const cat = b.dataset.cat, v = +b.dataset.v;
      upd(rec => { rec.stars[cat] = rec.stars[cat] === v ? 0 : v; });
      const cur = (loadR()[sc.id] || { stars: {} }).stars[cat] || 0;
      qsa(`#rateStars button[data-cat="${CSS.escape(cat)}"]`).forEach(x => {
        const xv = +x.dataset.v;
        x.classList.toggle('on', xv <= cur);
        x.setAttribute('aria-checked', xv === cur);
        x.tabIndex = (cur ? xv === cur : xv === 1) ? 0 : -1;
      });
    }));
    qsa('#rateStars .stars').forEach(group => group.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      const btns = qsa('button', group);
      const idx = btns.indexOf(document.activeElement);
      if (idx === -1) return;
      e.preventDefault();
      let next = idx;
      if (e.key === 'ArrowRight') next = Math.min(idx + 1, btns.length - 1);
      else if (e.key === 'ArrowLeft') next = Math.max(idx - 1, 0);
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = btns.length - 1;
      if (next === idx) return;
      btns[next].focus();
      btns[next].click();
    }));
    const note = qs('#rateNote');
    let t = null;
    note.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => upd(rec => { rec.note = note.value.slice(0, 4000); }), 400); });
    qs('#rateClear').addEventListener('click', () => {
      if (!confirm('Clear ratings and notes for ' + sc.name + '?')) return;
      const all = loadR(); delete all[sc.id]; saveR(all);
      location.reload();
    });
  }

  /* ---------- hub Decision Board ---------- */
  /* Same rated/ranked-schools list feeds both the board markup and the copy
     summary, so the ordering never drifts between the two. */
  function rankedBoard(all) {
    return rankSchools(ORDER, SCHOOLS, all, loadW(), RATE_CATS);
  }

  /* Plain-text Decision Board summary for pasting into a family text thread. */
  function buildBoardSummary() {
    const all = loadR();
    const rated = rankedBoard(all);
    if (!rated.length) return '';
    /* Use the same weights the board ranks by, so the pasted summary can't
       report a star average that contradicts the order it lists schools in. */
    const weights = loadW();
    const custom = !weightsAreDefault(weights, RATE_CATS);
    const lines = [`College Pilot — Decision Board (${new Date().toLocaleDateString()})`, ''];
    if (custom) {
      const stressed = RATE_CATS.filter(c => weightOf(weights, c) !== 1)
        .map(c => `${c}: ${(WEIGHT_LEVELS.find(l => l.v === weightOf(weights, c)) || {}).label}`);
      lines.push('Ranked with custom weights — ' + stressed.join(', '), '');
    }
    rated.forEach((id, i) => {
      const s = SCHOOLS[id], r = all[id], avg = weightedAvgStars(r, weights, RATE_CATS);
      const st = STATUSES.find(x => x.k === r.status);
      const { best, worst } = bestWorstCats(r, weights, RATE_CATS);
      lines.push(`${i + 1}. ${s.name}${st ? ' — ' + st.short : ''}${avg ? ' — ' + avg.toFixed(1) + '★' : ''}`);
      if (best) lines.push(`   Best: ${best} (${r.stars[best]}★)${worst && worst !== best ? `  ·  Weakest: ${worst} (${r.stars[worst]}★)` : ''}`);
      if ((r.note || '').trim()) lines.push('   Note: ' + r.note.trim().replace(/\s+/g, ' '));
      lines.push('');
    });
    return lines.join('\n').trim();
  }

  /* Export / import / copy — everything still stays local; import only ever
     writes sanitizeImport's cleaned output, never the raw file. */
  function wireBoardBackup() {
    const exportBtn = qs('#boardExport'), importInput = qs('#boardImport'), copyBtn = qs('#boardCopy'), msg = qs('#boardBackupMsg');
    if (!exportBtn || !importInput || !copyBtn || exportBtn.dataset.wired) return;
    exportBtn.dataset.wired = '1';
    const setMsg = t => { if (msg) msg.textContent = t; };

    exportBtn.addEventListener('click', () => {
      const all = loadR();
      if (!Object.keys(all).length) { setMsg('Nothing rated yet — nothing to export.'); return; }
      const envelope = { app: 'college-pilot', version: SCHEMA_VERSION, exported: new Date().toISOString(), ratings: all };
      const blob = new Blob([JSON.stringify(envelope, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `college-pilot-ratings-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
      setMsg(`Exported ${Object.keys(all).length} school(s) to a .json file.`);
    });

    importInput.addEventListener('change', () => {
      const file = importInput.files && importInput.files[0];
      importInput.value = '';
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const res = sanitizeImport(String(reader.result), SCHOOLS, RATE_CATS, STATUSES);
        if (!res.ok) { setMsg('Import failed: ' + res.error); return; }
        const ids = Object.keys(res.ratings);
        if (!ids.length) { setMsg('That file had no usable ratings in it.'); return; }
        const existing = loadR();
        const conflicts = ids.filter(id => existing[id]);
        const keepExisting = conflicts.length
          ? confirm(`${conflicts.length} school${conflicts.length === 1 ? ' is' : 's are'} rated on both this device and in the file. OK = keep this device's ratings for ${conflicts.length === 1 ? 'it' : 'them'}. Cancel = let the imported file win.`)
          : true;
        const { merged, imported, skipped } = mergeRatings(existing, res.ratings, keepExisting);
        saveR(merged);
        setMsg(`Imported ${imported} school${imported === 1 ? '' : 's'}, skipped ${skipped}.`);
        renderBoard();
      };
      reader.onerror = () => setMsg('Import failed: could not read that file.');
      reader.readAsText(file);
    });

    copyBtn.addEventListener('click', async () => {
      const text = buildBoardSummary();
      if (!text) { setMsg('Nothing rated yet — nothing to copy.'); return; }
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('no clipboard api');
        await navigator.clipboard.writeText(text);
        setMsg('Summary copied to clipboard.');
      } catch (e) {
        setMsg('Could not copy automatically — showing it instead, copy it manually.');
        window.prompt('Copy this summary:', text);
      }
    });
  }

  /* Weight-what-matters panel: one row of Ignore/Normal/Important/Critical
     chips per RATE_CATS category, stored under WKEY and applied by
     rankedBoard/renderBoard via weightedAvgStars/bestWorstCats/rankSchools. */
  const buildWeightRow = (cat, weights) => {
    const w = weightOf(weights, cat);
    return `<div class="rateRow"><span>${cat}</span><span class="aidChips" role="radiogroup" aria-label="${cat} weight">${WEIGHT_LEVELS.map(l =>
      `<button data-cat="${cat}" data-w="${l.v}" class="${w === l.v ? 'on' : ''}" aria-pressed="${w === l.v}">${l.label}</button>`).join('')}</span></div>`;
  };
  function wireWeightsPanel() {
    const host = qs('#boardWeightRows');
    if (!host) return;
    const weights = loadW();
    // Rebuilt fresh on every renderBoard() call (same pattern as #boardRows
    // itself), so listeners are attached directly to each button rather than
    // via delegation on the host — no risk of stale/duplicate handlers.
    host.innerHTML = RATE_CATS.map(c => buildWeightRow(c, weights)).join('');
    const badge = qs('#boardWeightsBadge');
    if (badge) badge.hidden = weightsAreDefault(weights, RATE_CATS);
    qsa('button[data-cat]', host).forEach(b => b.addEventListener('click', () => {
      const w = loadW();
      w[b.dataset.cat] = +b.dataset.w;
      saveW(w);
      renderBoard();
    }));
    const reset = qs('#boardWeightsReset');
    if (reset && !reset.dataset.wired) {
      reset.dataset.wired = '1';
      reset.addEventListener('click', () => { saveW(sanitizeWeights({}, RATE_CATS)); renderBoard(); });
    }
  }

  function renderBoard() {
    const host = qs('#boardRows');
    if (!host) return;
    const all = loadR();
    const weights = loadW();
    const customWeights = !weightsAreDefault(weights, RATE_CATS);
    const rated = rankedBoard(all);
    const unrated = ORDER.filter(id => SCHOOLS[id] && !rated.includes(id));
    if (!rated.length) {
      host.innerHTML = '<div class="note">Nothing rated yet. Open any school\'s guide and scroll to <b>⭐ My Take</b> — verdicts, stars, and notes land here automatically.</div>';
    } else {
      host.innerHTML = rated.map((id, i) => {
        const s = SCHOOLS[id], r = all[id], avg = weightedAvgStars(r, weights, RATE_CATS);
        const st = STATUSES.find(x => x.k === r.status);
        const { best, worst, ratedCount } = bestWorstCats(r, weights, RATE_CATS);
        return `<a class="aidRow" href="school.html?s=${id}" style="text-decoration:none;color:inherit${r.status === 'pass' ? ';opacity:.55' : ''}">
          <div class="dot" style="background:${s.colors.sc}"></div>
          <div class="nm">${r.status === 'love' && i === 0 ? '🏆 ' : ''}${s.name} ${st ? `<span class="badge ${r.status === 'pass' ? 'c' : 'f'}">${st.short}</span>` : ''}
            <small class="why">${best ? `Best: ${best} (${r.stars[best]}★)` : ''}${worst && worst !== best ? ` · Weakest: ${worst} (${r.stars[worst]}★)` : ''}${(r.note || '').trim() ? ` · “${r.note.trim().slice(0, 90).replace(/</g, '&lt;')}${r.note.trim().length > 90 ? '…' : ''}”` : ''}</small>
          </div>
          <div class="amt"><b>${avg ? avg.toFixed(1) + '★' : '—'}</b><small>${ratedCount}/${RATE_CATS.length} rated${customWeights ? ' · ⚖ weighted' : ''}</small></div>
        </a>`;
      }).join('');
    }
    const un = qs('#boardUnrated');
    if (un) un.innerHTML = unrated.length
      ? 'Not rated yet: ' + unrated.map(id => `<a href="school.html?s=${id}#mytake">${SCHOOLS[id].short}</a>`).join(' · ')
      : 'Every school is rated — time to decide. 🎓';
    const clr = qs('#boardClear');
    if (clr && !clr.dataset.wired) {
      clr.dataset.wired = '1';
      clr.addEventListener('click', () => {
        if (!confirm('Clear ALL ratings and notes on this device?')) return;
        localStorage.removeItem(RKEY); renderBoard();
      });
    }
    wireWeightsPanel();
    wireBoardBackup();
  }

  /* ---------- school grid filters (pure helpers) ---------- */
  const normText = (s) => (s || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  /* "State-related" is Pennsylvania's designation for its public universities
     (Penn State, Pitt) — they are public, and the Aid Estimator already counts
     them among "the nine public/state schools". */
  const isPublicType = (type) => /^(Public|State-related)/.test(type || '');
  const VULGAR_FRACS = { '¼': .25, '½': .5, '¾': .75 };
  const parseDriveHours = (str) => {
    if (typeof str !== 'string') return null;
    const m = str.trim().replace(/^~/, '').match(/^(\d+)?\s*([¼½¾])?/);
    const whole = m && m[1] ? parseInt(m[1], 10) : 0;
    const frac = m && m[2] ? VULGAR_FRACS[m[2]] : 0;
    const hrs = whole + frac;
    return hrs > 0 ? hrs : null;
  };
  const driveBand = (hrs) => hrs == null ? null : hrs < 2 ? 'lt2' : hrs < 4 ? '2to4' : '4plus';

  const FKEY = 'college-pilot-filters';
  const VALID_TYPE = ['public', 'private'], VALID_DRIVE = ['lt2', '2to4', '4plus'], VALID_VERDICT = ['love', 'maybe', 'unrated'];
  const FILTER_DEFAULTS = () => ({ q: '', type: [], drive: [], verdict: [], hidePassed: false });
  const sanitizeFilters = (raw) => {
    raw = raw && typeof raw === 'object' ? raw : {};
    const arr = (v, valid) => Array.isArray(v) ? v.filter(x => valid.includes(x)) : [];
    return {
      q: typeof raw.q === 'string' ? raw.q.slice(0, 200) : '',
      type: arr(raw.type, VALID_TYPE),
      drive: arr(raw.drive, VALID_DRIVE),
      verdict: arr(raw.verdict, VALID_VERDICT),
      hidePassed: raw.hidePassed === true
    };
  };
  const loadFilters = () => { try { return sanitizeFilters(JSON.parse(localStorage.getItem(FKEY) || '{}')); } catch (e) { return FILTER_DEFAULTS(); } };
  const saveFilters = (f) => { try { localStorage.setItem(FKEY, JSON.stringify(f)); } catch (e) { } };

  /* fails open: a school only drops out on a POSITIVE mismatch, never because a card string was unparseable */
  const schoolMatchesFilters = (s, rec, f) => {
    if (f.q) {
      const hay = normText([s.name, s.short, s.city, s.card.blurb].join(' '));
      if (!hay.includes(normText(f.q))) return false;
    }
    if (f.type.length && !f.type.includes(isPublicType(s.card.type) ? 'public' : 'private')) return false;
    if (f.drive.length) {
      const band = driveBand(parseDriveHours(s.card.drive));
      if (band && !f.drive.includes(band)) return false;
    }
    const status = (rec && rec.status) || null;
    if (f.hidePassed && status === 'pass') return false;
    if (f.verdict.length) {
      const key = status === 'love' ? 'love' : status === 'maybe' ? 'maybe' : status === 'pass' ? 'pass' : 'unrated';
      if (!f.verdict.includes(key)) return false; // 'pass' is never a VALID_VERDICT key, so it's excluded whenever a verdict chip is active
    }
    return true;
  };

  const TYPE_CHIPS = [{ k: 'public', label: 'Public' }, { k: 'private', label: 'Private' }];
  const DRIVE_CHIPS = [{ k: 'lt2', label: 'Under 2 hr' }, { k: '2to4', label: '2–4 hr' }, { k: '4plus', label: '4+ hr' }];
  const VERDICT_CHIPS = [{ k: 'love', label: '❤️ Shortlisted' }, { k: 'maybe', label: '🤔 Undecided' }, { k: 'unrated', label: '⚪ Not yet rated' }];

  /* ---------- compare-table helpers ---------- */
  const FRACS = { '¼': 0.25, '½': 0.5, '¾': 0.75 };
  const parseLeadingNumber = str => {
    if (typeof str !== 'string') return null;
    const m = str.match(/(\d[\d,]*(?:\.\d+)?)([¼½¾])?|([¼½¾])/);
    if (!m) return null;
    if (m[1]) return parseFloat(m[1].replace(/,/g, '')) + (m[2] ? FRACS[m[2]] : 0);
    return FRACS[m[3]];
  };
  const cmpWinners = (fn, dir, guard) => {
    const vals = ORDER.map(id => {
      const raw = fn(SCHOOLS[id]);
      return guard && !guard.test(raw || '') ? null : parseLeadingNumber(raw);
    });
    const real = vals.filter(v => v != null);
    if (!real.length) return new Set();
    const target = dir === 'min' ? Math.min(...real) : Math.max(...real);
    return new Set(ORDER.filter((id, i) => vals[i] === target));
  };

  /* ---------- hub renderer ---------- */
  function renderHub() {
    const grid = qs('#schoolGrid');
    const emptyEl = qs('#schoolGridEmpty'), countEl = qs('#schoolFilterCount');
    const searchEl = qs('#schoolSearch'), searchClearEl = qs('#schoolSearchClear');
    const typeWrap = qs('#filterType'), driveWrap = qs('#filterDrive'), verdictWrap = qs('#filterVerdict');
    const resetBtn = qs('#schoolFilterReset');
    let filters = loadFilters();

    const paintChips = () => {
      const chipHtml = (list, key) => list.map(c => `<button type="button" data-k="${c.k}" class="${filters[key].includes(c.k) ? 'on' : ''}">${c.label}</button>`).join('');
      if (typeWrap) typeWrap.innerHTML = chipHtml(TYPE_CHIPS, 'type');
      if (driveWrap) driveWrap.innerHTML = chipHtml(DRIVE_CHIPS, 'drive');
      if (verdictWrap) verdictWrap.innerHTML = chipHtml(VERDICT_CHIPS, 'verdict') +
        `<button type="button" data-hide-passed="1" class="${filters.hidePassed ? 'on' : ''}">🙈 Hide passed</button>`;
      if (searchEl) searchEl.value = filters.q;
      if (searchClearEl) searchClearEl.hidden = !filters.q;
    };

    const paintGrid = () => {
      const all = loadR(); // re-read so a verdict set on a school page shows up here too
      const shown = ORDER.filter(id => SCHOOLS[id] && schoolMatchesFilters(SCHOOLS[id], all[id], filters));
      grid.innerHTML = shown.map(id => {
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
      if (countEl) countEl.textContent = `Showing ${shown.length} of ${ORDER.length} schools`;
      if (emptyEl) emptyEl.hidden = shown.length !== 0;
      grid.hidden = shown.length === 0;
    };

    const applyFilters = () => { saveFilters(filters); paintChips(); paintGrid(); };

    if (typeWrap) typeWrap.addEventListener('click', e => {
      const b = e.target.closest('button[data-k]'); if (!b) return;
      const k = b.dataset.k;
      filters.type = filters.type.includes(k) ? filters.type.filter(x => x !== k) : [...filters.type, k];
      applyFilters();
    });
    if (driveWrap) driveWrap.addEventListener('click', e => {
      const b = e.target.closest('button[data-k]'); if (!b) return;
      const k = b.dataset.k;
      filters.drive = filters.drive.includes(k) ? filters.drive.filter(x => x !== k) : [...filters.drive, k];
      applyFilters();
    });
    if (verdictWrap) verdictWrap.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.hidePassed) { filters.hidePassed = !filters.hidePassed; applyFilters(); return; }
      const k = b.dataset.k; if (!k) return;
      filters.verdict = filters.verdict.includes(k) ? filters.verdict.filter(x => x !== k) : [...filters.verdict, k];
      applyFilters();
    });
    let searchT = null;
    if (searchEl) searchEl.addEventListener('input', () => {
      if (searchClearEl) searchClearEl.hidden = !searchEl.value;
      clearTimeout(searchT);
      searchT = setTimeout(() => { filters.q = searchEl.value.slice(0, 200); applyFilters(); }, 200);
    });
    if (searchClearEl) searchClearEl.addEventListener('click', () => {
      searchEl.value = ''; filters.q = ''; searchEl.focus(); applyFilters();
    });
    if (resetBtn) resetBtn.addEventListener('click', () => { filters = FILTER_DEFAULTS(); applyFilters(); });

    paintChips();
    paintGrid();

    const metrics = [
      ['Type', s => s.card.type],
      ['Acceptance rate', s => s.card.accept],
      ['SAT middle 50%', s => s.card.sat],
      ['US News rank', s => s.card.rank],
      ['Sticker cost / yr', s => s.card.cost, 'min', 'Lowest sticker cost / yr shown'],
      ['Undergrads', s => s.card.undergrads],
      ['Business program', s => s.card.biz],
      ['Grads placed (6 mo)', s => s.card.placed, 'max', 'Highest reported placement rate', /%/],
      ['4-yr grad rate', s => s.card.grad4, 'max', 'Highest graduation rate', /%/],
      ['Greek life', s => s.card.greek],
      ['Sports', s => s.card.sports],
      ['Drive from Philly burbs', s => s.card.drive, 'min', 'Shortest drive from the Philly burbs'],
      ['Application deadlines', s => s.card.deadlines],
    ];
    const winners = metrics.map(([, fn, dir, , guard]) => dir ? cmpWinners(fn, dir, guard) : null);
    qs('#cmpWrap').innerHTML = `<table class="cmp">
      <thead><tr><th class="cmp-corner"></th>${ORDER.map(id => `<th data-col="${id}" tabindex="0" role="button" aria-pressed="false" aria-label="Highlight the ${SCHOOLS[id].short} column">${SCHOOLS[id].short}</th>`).join('')}</tr></thead>
      <tbody>${metrics.map(([label, fn, , why], i) => `<tr><td>${label}</td>${ORDER.map(id => {
        const raw = fn(SCHOOLS[id]);
        const win = winners[i] && winners[i].has(id);
        const attrs = win ? ` class="cmp-best" title="${why}" aria-label="${why} — ${SCHOOLS[id].short}"` : '';
        return `<td data-col="${id}"${attrs}>${raw || '—'}</td>`;
      }).join('')}</tr>`).join('')}</tbody>
    </table>
    <p class="src">★ marks the best value in a row where "better" is objective (lowest cost, highest grad/placement rate, shortest drive). Acceptance rate isn't marked that way — easier to get into isn't the same as "better." Tap or hover a school's name to trace its column down the table.</p>`;
    const wrap = qs('#cmpWrap');
    if (!wrap.dataset.wired) {
      wrap.dataset.wired = '1';
      let pinned = null;
      const highlight = id => qsa('[data-col]', wrap).forEach(el => el.classList.toggle('cmp-active', el.dataset.col === id));
      const toggle = th => {
        pinned = pinned === th.dataset.col ? null : th.dataset.col;
        qsa('th[data-col]', wrap).forEach(t => t.setAttribute('aria-pressed', String(t.dataset.col === pinned)));
        highlight(pinned);
      };
      wrap.addEventListener('mouseover', e => { const th = e.target.closest('th[data-col]'); if (th) highlight(th.dataset.col); });
      wrap.addEventListener('mouseleave', () => highlight(pinned));
      wrap.addEventListener('click', e => { const th = e.target.closest('th[data-col]'); if (th) toggle(th); });
      wrap.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const th = e.target.closest('th[data-col]');
        if (!th) return;
        e.preventDefault(); toggle(th);
      });
    }
    renderBoard();
    buildDrawer(null);
    initSpy();
  }

  /* ---------- offline indicator ---------- */
  /* A small, unobtrusive marker so a stale page reads as "offline", not
     "broken". Only touches the DOM when navigator.onLine actually exists. */
  function initOfflineIndicator() {
    try {
      if (typeof navigator === 'undefined' || !('onLine' in navigator)) return;
      const badge = document.createElement('div');
      badge.className = 'cp-offline';
      badge.setAttribute('role', 'status');
      badge.setAttribute('aria-live', 'polite');
      badge.hidden = true;
      badge.textContent = '📴 Offline — showing the saved copy';
      document.body.appendChild(badge);
      const sync = () => { badge.hidden = navigator.onLine; };
      sync();
      window.addEventListener('online', sync);
      window.addEventListener('offline', sync);
    } catch (e) { }
  }

  /* ---------- update-available toast ---------- */
  /* Dismissible, out of the way — this is a guide someone is mid-tour on,
     not a nag. Reload is opt-in: it tells the waiting worker to
     skipWaiting(), then reloads once the new worker takes control. */
  function showUpdateToast(onReload) {
    try {
      if (qs('.cp-update-toast')) return;
      const el = document.createElement('div');
      el.className = 'cp-update-toast';
      el.setAttribute('role', 'status');
      el.innerHTML = `<span>A new version of this guide is ready.</span>
        <button type="button" class="cp-update-btn">Reload</button>
        <button type="button" class="cp-update-dismiss" aria-label="Dismiss">✕</button>`;
      document.body.appendChild(el);
      qs('.cp-update-btn', el).addEventListener('click', () => onReload());
      qs('.cp-update-dismiss', el).addEventListener('click', () => el.remove());
    } catch (e) { }
  }

  function initServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    try {
      navigator.serviceWorker.register('sw.js').then((reg) => {
        if (!reg) return;
        const watchInstalling = (worker) => {
          if (!worker) return;
          worker.addEventListener('statechange', () => {
            // 'installed' + an existing controller means this is an update,
            // not the very first install — the new worker is now parked in
            // registration.waiting.
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateToast(() => worker.postMessage({ type: 'SKIP_WAITING' }));
            }
          });
        };
        if (reg.waiting && navigator.serviceWorker.controller) {
          showUpdateToast(() => reg.waiting.postMessage({ type: 'SKIP_WAITING' }));
        }
        reg.addEventListener('updatefound', () => watchInstalling(reg.installing));
      }).catch(() => { });

      let reloading = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (reloading) return;
        reloading = true;
        location.reload();
      });
    } catch (e) { }
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    if (qs('#schoolGrid')) renderHub(); else if (qs('#main')) renderSchool();
    initOfflineIndicator();
    initServiceWorker();
  });
})();
