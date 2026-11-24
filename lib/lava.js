// Lava-ilmeen selainefektit (siirretty HTML-luonnoksesta). initLava() käynnistää efektit
// nykyiselle sivulle ja palauttaa siivousfunktion, jota kutsutaan sivun vaihtuessa.

const REVEAL = '.sec-title, .sec-head, .path, .gig, .year, .order, .feature, .album, .video, .disc, .tl li, .ens, .step, .q, .faq details, .price-layout > *, .split-text-inner, .ens-card, .gear li, .ens-intro-text, .how, .pc, .gift, .rcard, .gig-cta .gear li, .dyear-num, .mini-stats li, .sign, .wide-quote, .perks li, .voices, .faq-side, .lj-place, .styles, .lo-quote blockquote, .hcard, .cv-head, .ticket-wrap, .pcard, .pyear-head, .gig-cta-inner, .vcard, .album-feature > *, .contact-photo, .contact-main > .h2, .cline, .form-card, .quote figure, .foot-brand, .foot-col';

export function initLava() {
  const ac = new AbortController();
  const sig = { signal: ac.signal };
  const siivoa = [() => ac.abort()];
  const vahemmanLiiketta = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hiiri = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Valikko ---------- */
  const head = document.querySelector('.site-head');
  const btn = document.querySelector('.menu-btn');
  function setMenu(open) {
    if (!head || !btn) return;
    head.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Sulje valikko' : 'Avaa valikko');
  }
  setMenu(false);
  btn?.addEventListener('click', () => setMenu(!head.classList.contains('open')), sig);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && head?.classList.contains('open')) { setMenu(false); btn.focus(); }
  }, sig);
  head?.querySelectorAll('.main-nav a').forEach((a) => a.addEventListener('click', () => setMenu(false), sig));

  /* ---------- Aiheen esivalinta: [data-topic]-linkit valitsevat lomakkeen aiheen ---------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('[data-topic]');
    if (a) window.dispatchEvent(new CustomEvent('lava-aihe', { detail: a.getAttribute('data-topic') }));
  }, sig);

  /* ---------- Kopioi sähköposti, takaisin ylös ---------- */
  document.querySelectorAll('.copy').forEach((b) => {
    b.addEventListener('click', () => {
      const teksti = b.getAttribute('data-copy');
      const valmis = (viesti) => { b.textContent = viesti; setTimeout(() => { b.textContent = 'Kopioi'; }, 2000); };
      const valitseTeksti = () => {
        const el = document.getElementById('email-osoite');
        if (!el) return;
        const r = document.createRange(); r.selectNodeContents(el);
        const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        valmis('Valittu');
      };
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(teksti).then(() => valmis('Kopioitu'), valitseTeksti);
      else valitseTeksti();
    }, sig);
  });
  document.querySelector('.to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: vahemmanLiiketta ? 'instant' : 'smooth' });
    document.querySelector('main h1')?.focus({ preventScroll: true });
  }, sig);

  /* ---------- Edistymispalkki ja lasipalkki ---------- */
  const palkki = document.querySelector('.progress span');
  let tikki = false;
  function vieritys() {
    if (tikki) return;
    tikki = true;
    requestAnimationFrame(() => {
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      if (palkki) palkki.style.transform = `scaleX(${max > 0 ? Math.min(1, d.scrollTop / max) : 0})`;
      head?.classList.toggle('scrolled', d.scrollTop > 80);
      tikki = false;
    });
  }
  window.addEventListener('scroll', vieritys, { passive: true, signal: ac.signal });
  vieritys();

  const heroes = document.querySelectorAll('.hero, .page-hero');

  /* ---------- Kimallusvana hiiren perässä ---------- */
  if (!vahemmanLiiketta && hiiri) {
    const tyyli = getComputedStyle(document.documentElement);
    const savyt = ['--accent', '--gold-hi', '--fg'].map((v) => tyyli.getPropertyValue(v).trim());
    heroes.forEach((el) => {
      const c = document.createElement('canvas');
      c.className = 'trail';
      c.setAttribute('aria-hidden', 'true');
      el.appendChild(c);
      siivoa.push(() => c.remove());
      const ctx = c.getContext('2d');
      let w = 0, h = 0, kipinat = [], raf = 0, edellinen = null;
      const koko = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = el.clientWidth; h = el.clientHeight;
        c.width = w * dpr; c.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      const lisaa = (x, y, dx, dy) => {
        const r = Math.random();
        kipinat.push({
          x: x + (Math.random() - .5) * 8, y: y + (Math.random() - .5) * 8,
          vx: dx * .02 + (Math.random() - .5) * .5, vy: dy * .02 + (Math.random() - .5) * .5 + .15,
          s: r < .14 ? 1.1 + Math.random() * .6 : .35 + Math.random() * .85,
          valo: r < .14, ika: 0, max: 46 + Math.random() * 44,
          vari: savyt[r < .3 ? 0 : (r < .8 ? 1 : 2)], vaihe: Math.random() * 6, tahti: .12 + Math.random() * .1,
        });
        if (kipinat.length > 220) kipinat.shift();
      };
      const piirra = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineCap = 'round';
        for (let i = kipinat.length - 1; i >= 0; i--) {
          const k = kipinat[i];
          k.ika++;
          if (k.ika > k.max) { kipinat.splice(i, 1); continue; }
          k.x += k.vx; k.y += k.vy; k.vx *= .96; k.vy = k.vy * .96 + .008;
          const t = k.ika / k.max;
          const tuike = .55 + .45 * Math.sin(k.ika * k.tahti * 2 + k.vaihe);
          const a = Math.max(0, (1 - t) * (1 - t) * tuike);
          ctx.globalAlpha = a; ctx.fillStyle = k.vari; ctx.strokeStyle = k.vari; ctx.shadowColor = k.vari; ctx.shadowBlur = 6;
          ctx.beginPath(); ctx.arc(k.x, k.y, k.s, 0, Math.PI * 2); ctx.fill();
          if (k.valo) {
            const d = k.s * 7 * tuike * (1 - t * .6);
            ctx.shadowBlur = 0; ctx.lineWidth = .5; ctx.globalAlpha = a * .7;
            ctx.beginPath(); ctx.moveTo(k.x - d, k.y); ctx.lineTo(k.x + d, k.y); ctx.moveTo(k.x, k.y - d * 1.3); ctx.lineTo(k.x, k.y + d * 1.3); ctx.stroke();
          }
        }
        ctx.globalAlpha = 1; ctx.shadowBlur = 0;
        raf = kipinat.length ? requestAnimationFrame(piirra) : 0;
      };
      el.addEventListener('pointermove', (e) => {
        if (w !== el.clientWidth || h !== el.clientHeight) koko();
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        if (edellinen) {
          const dx = x - edellinen.x, dy = y - edellinen.y;
          const n = Math.min(6, Math.floor(Math.sqrt(dx * dx + dy * dy) / 9));
          if (!n) return;
          for (let i = 1; i <= n; i++) lisaa(edellinen.x + dx * i / n, edellinen.y + dy * i / n, dx, dy);
        }
        edellinen = { x, y };
        if (!raf) raf = requestAnimationFrame(piirra);
      }, sig);
      el.addEventListener('pointerleave', () => { edellinen = null; }, sig);
      siivoa.push(() => cancelAnimationFrame(raf));
    });
  }

  /* ---------- Kultapöly heroissa ---------- */
  if (!vahemmanLiiketta && 'IntersectionObserver' in window) {
    heroes.forEach((host) => {
      const c = document.createElement('canvas');
      c.className = 'dust';
      c.setAttribute('aria-hidden', 'true');
      host.insertBefore(c, host.querySelector('.hero-inner, .page-hero-text'));
      siivoa.push(() => c.remove());
      const ctx = c.getContext('2d');
      let w = 0, h = 0, hiukkaset = [], nakyy = false, raf = 0;
      const uusi = (alussa) => ({
        x: Math.random() * w, y: alussa ? Math.random() * h : h + 10,
        r: 0.6 + Math.random() * 1.6, vy: 0.08 + Math.random() * 0.22, a: 0.25 + Math.random() * 0.6,
        tw: 0.6 + Math.random() * 1.4, ph: Math.random() * Math.PI * 2, kulta: Math.random() < 0.7,
      });
      const koko = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = host.clientWidth; h = host.clientHeight;
        if (!w || !h) return;
        c.width = w * dpr; c.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const maara = Math.min(70, Math.round(w * h / 16000));
        hiukkaset = Array.from({ length: maara }, () => uusi(true));
      };
      const piirra = (t) => {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < hiukkaset.length; i++) {
          const p = hiukkaset[i];
          p.y -= p.vy;
          p.x += Math.sin(t * 0.0004 + p.ph) * 0.12;
          if (p.y < -10) { hiukkaset[i] = uusi(false); continue; }
          const alpha = p.a * (0.45 + 0.55 * Math.sin(t * 0.0018 * p.tw + p.ph));
          if (alpha <= 0) continue;
          const vari = p.kulta ? '226, 184, 102' : '255, 241, 204';
          ctx.fillStyle = `rgba(${vari},${(alpha * 0.18).toFixed(3)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(${vari},${alpha.toFixed(3)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
        raf = requestAnimationFrame(piirra);
      };
      const io = new IntersectionObserver((entries) => {
        nakyy = entries[0].isIntersecting;
        if (nakyy) { if (!w || w !== host.clientWidth || h !== host.clientHeight) koko(); if (!raf) raf = requestAnimationFrame(piirra); }
        else if (raf) { cancelAnimationFrame(raf); raf = 0; }
      });
      io.observe(host);
      window.addEventListener('resize', () => { if (nakyy) koko(); }, sig);
      siivoa.push(() => { io.disconnect(); cancelAnimationFrame(raf); });
    });
  }

  /* ---------- Palautteet: vaihtuva nosto ---------- */
  document.querySelectorAll('.voices').forEach((box) => {
    const kuvat = box.querySelectorAll('.voice');
    const napit = box.querySelectorAll('.voices-nav button');
    const nav = box.querySelector('.voices-nav');
    if (!kuvat.length) return;
    let nyt = 0, ajastin = 0, kayssa = !vahemmanLiiketta;
    const nayta = (i) => {
      nyt = i;
      kuvat.forEach((f, j) => { f.classList.toggle('on', j === i); f.setAttribute('aria-hidden', j === i ? 'false' : 'true'); });
      napit.forEach((b, j) => {
        b.setAttribute('aria-pressed', j === i ? 'true' : 'false');
        const bar = b.querySelector('.bar'); bar?.classList.remove('run');
        if (j === i && kayssa && bar) { void bar.offsetWidth; bar.classList.add('run'); }
      });
      clearTimeout(ajastin);
      if (kayssa && kuvat.length > 1) ajastin = setTimeout(() => nayta((nyt + 1) % kuvat.length), 8000);
    };
    napit.forEach((b, j) => b.addEventListener('click', () => { kayssa = false; nayta(j); }, sig));
    box.addEventListener('focusin', () => { if (kayssa) { kayssa = false; nayta(nyt); } }, sig);
    if (nav) nav.hidden = false;
    box.classList.add('ready');
    nayta(0);
    siivoa.push(() => clearTimeout(ajastin));
  });

  /* ---------- Kansien kallistus ---------- */
  if (!vahemmanLiiketta && hiiri) {
    document.querySelectorAll('.tilt').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.classList.add('tilting');
        el.style.transform = `perspective(800px) rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg) translateY(-6px)`;
        el.style.setProperty('--gx', `${((x + .5) * 100).toFixed(1)}%`);
        el.style.setProperty('--gy', `${((y + .5) * 100).toFixed(1)}%`);
      }, sig);
      el.addEventListener('pointerleave', () => { el.classList.remove('tilting'); el.style.transform = ''; }, sig);
    });
  }

  /* ---------- Osioiden nousu näkyviin ---------- */
  if ('IntersectionObserver' in window && !vahemmanLiiketta) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add('in');
        io.unobserve(el);
        setTimeout(() => { el.style.transitionDelay = ''; }, 1400);
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll(REVEAL).forEach((el) => {
      if (el.classList.contains('in')) return;
      const i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
      el.classList.add('rv');
      io.observe(el);
    });
    siivoa.push(() => io.disconnect());
  }

  return () => siivoa.forEach((f) => { try { f(); } catch (e) { /* ohitetaan */ } });
}
