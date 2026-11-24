// Lava-ilmeen yhteiset rakennuspalat: ikonit, kuvat, linkit ja painikkeet
import { Fragment } from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';

// Viivaikonit (24x24, stroke). Avain = Tinan ikonivalinnan arvo.
export const IKONIT = {
  facebook: '<path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
  sahkoposti: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  sijainti: '<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  aanentoisto: '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="15" r="3.5"/><circle cx="12" cy="6.5" r="1.6"/>',
  valot: '<path d="M6 3l12 0-3 8H9z"/><path d="M9 11l-3 10M15 11l3 10M12 11v10"/>',
  taustakangas: '<path d="M3 3h18"/><path d="M5 3v18c3-2 4-6 4-9S8 5 5 3z"/><path d="M19 3v18c-3-2-4-6-4-9s1-7 4-9z"/>',
  ihmiset: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.3c.5-.2 1-.3 1.5-.3 2.5 0 4.5 2 4.5 4.5"/>',
  kalenteri: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8 15l2.5 2.5L16 13"/>',
  peruutus: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M10 13.5l4 4M14 13.5l-4 4"/>',
  lasku: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  tahti: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
  sydan: '<path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z"/>',
  nuotti: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  lahja: '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13M12 8c-2-4-6-4-6-1.5S10 8 12 8zm0 0c2-4 6-4 6-1.5S14 8 12 8z"/>',
  mikki: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
  viesti: '<path d="M4 5h16v11H9l-5 4z"/>',
  verkko: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>',
  nuoli: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  alas: '<path d="m6 9 6 6 6-6"/>',
  ylos: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  valikko: '<path d="M4 7h16M4 12h16M4 17h10"/>',
};

// Tinan ikonivalinnat (arvo + suomenkielinen nimi)
export const IKONIVALINNAT = [
  ['aanentoisto', 'Äänentoisto'], ['valot', 'Valot'], ['taustakangas', 'Taustakangas'], ['ihmiset', 'Ihmiset'],
  ['kalenteri', 'Kalenteri'], ['peruutus', 'Peruutus'], ['lasku', 'Lasku'], ['sijainti', 'Sijainti'], ['tahti', 'Tähti'],
  ['sydan', 'Sydän'], ['nuotti', 'Nuotti'], ['lahja', 'Lahja'], ['mikki', 'Mikrofoni'], ['viesti', 'Viesti'],
  ['verkko', 'Verkkosivu'], ['facebook', 'Facebook'], ['instagram', 'Instagram'], ['linkedin', 'LinkedIn'], ['sahkoposti', 'Sähköposti'],
];

export function Ikoni({ nimi, koko = 24, viiva = 1.6, className }) {
  const sisus = IKONIT[nimi];
  if (!sisus) return null;
  return (
    <svg className={className} width={koko} height={koko} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={viiva}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: sisus }} />
  );
}

export const Nuoli = () => <Ikoni nimi="nuoli" koko={18} />;
export const Toisto = ({ koko = 14 }) => (
  <svg width={koko} height={koko} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z" /></svg>
);
export const Salmiakki = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M5 0l5 5-5 5-5-5z" /></svg>
);
export const Lainausmerkki = ({ leveys = 48, korkeus = 38 }) => (
  <svg className="qm" width={leveys} height={korkeus} viewBox="0 0 56 44" fill="currentColor" aria-hidden="true">
    <path d="M0 44V26C0 11 7 2 21 0l2 6c-7 2-11 7-11 14h10v24zm33 0V26c0-15 7-24 21-26l2 6c-7 2-11 7-11 14h10v24z" />
  </svg>
);

// Linkki: sisäiset osoitteet Next-linkkinä, ulkoiset uuteen välilehteen, ankkurit tavallisena linkkinä
export function Linkki({ href, children, ...props }) {
  if (!href) return <span {...props}>{children}</span>;
  if (href.startsWith('/') && !href.startsWith('//')) return <NextLink href={href} {...props}>{children}</NextLink>;
  if (/^https?:\/\//.test(href)) return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  return <a href={href} {...props}>{children}</a>;
}

// Painike. Aihe (laulutunnit/keikka/lahjakortti/muu) vie yhteydenottolomakkeeseen ja valitsee aiheen valmiiksi.
export function Painike({ url, teksti, tyyli, aihe, className = '', children }) {
  if (!teksti && !children) return null;
  const luokka = tyyli === 'haamu' ? 'btn-ghost' : tyyli === 'viiva' ? 'btn-line' : 'btn-primary';
  const kohde = url || (aihe ? '#yhteys' : '#');
  return (
    <Linkki href={kohde} className={`btn ${luokka} ${className}`.trim()} data-topic={aihe || undefined}>
      {children}{teksti}
    </Linkki>
  );
}

export function Painikkeet({ lista, className = 'ctas' }) {
  const napit = (lista || []).filter((p) => p?.title);
  if (!napit.length) return null;
  return (
    <div className={className}>
      {napit.map((p, i) => <Painike key={i} url={p.url} teksti={p.title} tyyli={p.tyyli || (i === 0 ? 'ensisijainen' : 'haamu')} aihe={p.aihe} />)}
    </div>
  );
}

export function Lisaa({ url, teksti }) {
  if (!teksti) return null;
  return <Linkki href={url} className="more">{teksti} <Nuoli /></Linkki>;
}

// Kuva next/imagella. Kohdistus (object-position) voidaan antaa erikseen desktopille ja puhelimelle.
export function Kuva({ src, alt = '', className = '', kohdistus, kohdistusD, kohdistusM, zoomM, leveys = 1600, korkeus = 1067, sizes = '(max-width: 960px) 100vw, 60vw', priority = false }) {
  if (!src) return null;
  const luokat = [className];
  const tyyli = {};
  if (kohdistus) { luokat.push('kp'); tyyli['--pos'] = kohdistus; }
  if (kohdistusD) { luokat.push('kp-d'); tyyli['--pos-d'] = kohdistusD; }
  if (kohdistusM) { luokat.push('kp-m'); tyyli['--pos-m'] = kohdistusM; }
  if (zoomM) { luokat.push('zm'); tyyli['--zm'] = zoomM; }
  return (
    <NextImage src={src} alt={alt} width={leveys} height={korkeus} sizes={sizes} priority={priority}
      className={luokat.filter(Boolean).join(' ') || undefined} style={tyyli} />
  );
}

export function Kuvaaja({ teksti, figcaption }) {
  if (!teksti) return null;
  return figcaption ? <figcaption className="credit">{teksti}</figcaption> : <p className="credit">{teksti}</p>;
}

// Juokseva nauha: lista toistetaan kahdesti saumatonta silmukkaa varten
export function Nauha({ tekstit, roolit }) {
  const lista = (tekstit || []).filter(Boolean);
  if (!lista.length) return null;
  // Lyhyt lista monistetaan, jotta puolikas täyttää leveänkin näytön; rata on kaksi identtistä puolikasta
  const toistot = Math.max(1, Math.ceil(7 / lista.length));
  const puolikas = Array.from({ length: toistot }).flatMap(() => lista);
  return (
    <div className={`marquee${roolit ? ' roles' : ''}`} aria-hidden="true">
      <div className="marquee-track">
        {[...puolikas, ...puolikas].map((t, i) => <Fragment key={i}><span>{t}</span><Salmiakki /></Fragment>)}
      </div>
    </div>
  );
}

// Suomalainen päivämäärä
export const KUUKAUDET = ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'];
export const VIIKONPAIVAT = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];

// Tinan päivämäärä tallentuu klo 10 UTC:ksi; luetaan päivä Suomen aikavyöhykkeellä
export function paivaOsat(iso) {
  const d = new Date(iso);
  const osat = new Intl.DateTimeFormat('fi-FI', { timeZone: 'Europe/Helsinki', year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long' }).formatToParts(d);
  const hae = (t) => osat.find((o) => o.type === t)?.value;
  const p = +hae('day'), k = +hae('month'), v = +hae('year');
  const vp = hae('weekday') || '';
  return { p, k, v, vp: vp.charAt(0).toUpperCase() + vp.slice(1), iso: `${v}-${String(k).padStart(2, '0')}-${String(p).padStart(2, '0')}` };
}

// "Paiste-lava Villa Rana, Jyväskylä" → nimi + paikka
export function jaaTapahtuma(teksti) {
  const s = (teksti || '').trim();
  const i = s.indexOf(',');
  return i > 0 ? [s.slice(0, i).trim(), s.slice(i + 1).trim()] : [s, ''];
}
