/* College Pilot — shared app shell + renderers */
(function () {
  'use strict';
  const APP_VERSION = 'v13 · 2026-07-31';

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
      for (let i = 1; i <= 5; i++) btns += `<button data-cat="${cat}" data-v="${i}" class="${i <= v ? 'on' : ''}" aria-label="${cat}: ${i} star${i > 1 ? 's' : ''}">★</button>`;
      return `<div class="rateRow"><span>${cat}</span><span class="stars">${btns}</span></div>`;
    };
    return `
      <section id="mytake">
        <div class="kicker">Your call</div>
        <h2>My take on ${sc.short}</h2>
        <p class="lead">Rate it right after the tour, while it's fresh. Everything here is saved only on this device and feeds the Decision Board on the home page.</p>
        <div class="card">
          <div class="aidLbl">Verdict</div>
          <div class="aidChips" id="rateStatus">
            ${STATUSES.map(s => `<button data-k="${s.k}" class="${rec.status === s.k ? 'on' : ''}">${s.label}</button>`).join('')}
          </div>
          <div class="aidLbl" style="margin-top:16px">Rate what matters (tap the stars)</div>
          <div id="rateStars">${RATE_CATS.map(starsRow).join('')}</div>
          <div class="aidLbl" style="margin-top:16px">Notes from the visit</div>
          <textarea id="rateNote" class="rateNote" rows="4" placeholder="What stood out? Best moment of the tour? Dealbreakers? Food verdict?">${(rec.note || '').replace(/</g, '&lt;')}</textarea>
          <p class="src"><span id="rateSaved"></span> Saved automatically on this device only — nothing is uploaded. <button id="rateClear" class="linkBtn">Clear this school's ratings</button></p>
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
      qsa('#rateStatus button').forEach(x => x.classList.toggle('on', x.dataset.k === cur));
    }));
    qsa('#rateStars button').forEach(b => b.addEventListener('click', () => {
      const cat = b.dataset.cat, v = +b.dataset.v;
      upd(rec => { rec.stars[cat] = rec.stars[cat] === v ? 0 : v; });
      const cur = (loadR()[sc.id] || { stars: {} }).stars[cat] || 0;
      qsa(`#rateStars button[data-cat="${CSS.escape(cat)}"]`).forEach(x => x.classList.toggle('on', +x.dataset.v <= cur));
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
  function renderBoard() {
    const host = qs('#boardRows');
    if (!host) return;
    const all = loadR();
    const rated = ORDER.filter(id => SCHOOLS[id] && all[id] && (all[id].status || avgStars(all[id]) > 0 || (all[id].note || '').trim()));
    const unrated = ORDER.filter(id => SCHOOLS[id] && !rated.includes(id));
    const rank = { love: 0, maybe: 1, null: 2, pass: 3 };
    rated.sort((a, b) => (rank[all[a].status] ?? 2) - (rank[all[b].status] ?? 2) || avgStars(all[b]) - avgStars(all[a]));
    if (!rated.length) {
      host.innerHTML = '<div class="note">Nothing rated yet. Open any school\'s guide and scroll to <b>⭐ My Take</b> — verdicts, stars, and notes land here automatically.</div>';
    } else {
      host.innerHTML = rated.map((id, i) => {
        const s = SCHOOLS[id], r = all[id], avg = avgStars(r);
        const st = STATUSES.find(x => x.k === r.status);
        const cats = RATE_CATS.filter(c => r.stars && r.stars[c]);
        const best = cats.slice().sort((a, b) => r.stars[b] - r.stars[a])[0];
        const worst = cats.slice().sort((a, b) => r.stars[a] - r.stars[b])[0];
        return `<a class="aidRow" href="school.html?s=${id}" style="text-decoration:none;color:inherit${r.status === 'pass' ? ';opacity:.55' : ''}">
          <div class="dot" style="background:${s.colors.sc}"></div>
          <div class="nm">${r.status === 'love' && i === 0 ? '🏆 ' : ''}${s.name} ${st ? `<span class="badge ${r.status === 'pass' ? 'c' : 'f'}">${st.short}</span>` : ''}
            <small class="why">${best ? `Best: ${best} (${r.stars[best]}★)` : ''}${worst && worst !== best ? ` · Weakest: ${worst} (${r.stars[worst]}★)` : ''}${(r.note || '').trim() ? ` · “${r.note.trim().slice(0, 90).replace(/</g, '&lt;')}${r.note.trim().length > 90 ? '…' : ''}”` : ''}</small>
          </div>
          <div class="amt"><b>${avg ? avg.toFixed(1) + '★' : '—'}</b><small>${cats.length}/${RATE_CATS.length} rated</small></div>
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
  }

  /* ---------- school grid filters (pure helpers) ---------- */
  const normText = (s) => (s || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const isPublicType = (type) => /^Public/.test(type || '');
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
    renderBoard();
    buildDrawer(null);
    initSpy();
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    if (qs('#schoolGrid')) renderHub(); else if (qs('#main')) renderSchool();
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { });
  });
})();
