// Sivukohtainen rakenteinen data (JSON-LD) Tina-lohkojen pohjalta
import settings from '../content/settings/index.json';
import { tekstiksi } from '../components/RichText';

const SITE_URL = 'https://katiniemela.fi';
const abs = (u) => (!u ? undefined : u.startsWith('http') ? u : `${SITE_URL}${u}`);

export function sivunRakenne({ blocks = [], title, description, polku }) {
  const solmut = [];
  const hero = blocks.find((b) => b?.__typename === 'PageBlocksHero');
  const url = `${SITE_URL}${polku === '/' ? '/' : polku}`;

  // Murupolku alasivuille (sama kuin sivun näkyvä murupolku)
  if (polku !== '/') {
    solmut.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Etusivu', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: hero?.murupolku || hero?.otsikko || title, item: url },
      ],
    });
  }

  // Usein kysyttyä → FAQPage
  const ukk = blocks.filter((b) => b?.__typename === 'PageBlocksUkk').flatMap((b) => (b.ukk_lista || []).filter((k) => k?.kysymys));
  if (ukk.length) {
    solmut.push({
      '@type': 'FAQPage',
      mainEntity: ukk.map((k) => ({ '@type': 'Question', name: k.kysymys, acceptedAnswer: { '@type': 'Answer', text: tekstiksi(k.vastaus).trim() } })),
    });
  }

  // Hinnasto (laulutunnit) → paikallinen palvelu, hintahaarukka luetaan hintakorteista
  const hinnasto = blocks.find((b) => b?.__typename === 'PageBlocksHinnasto');
  if (hinnasto) {
    const eurot = (hinnasto.hin_kortit || []).filter((k) => (k?.yksikko || '').includes('€')).map((k) => parseFloat(String(k.hinta).replace(',', '.'))).filter((n) => !isNaN(n) && n > 0);
    solmut.push({
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#laulutunnit`,
      name: `${settings.yritys} – laulutunnit`,
      description: (description || '').replace(/\s+/g, ' ').trim() || undefined,
      url,
      image: abs(hero?.bgImg),
      email: settings.sahkoposti,
      address: { '@type': 'PostalAddress', addressLocality: 'Jyväskylä', addressRegion: 'Keski-Suomi', addressCountry: 'FI' },
      areaServed: { '@type': 'City', name: 'Jyväskylä' },
      priceRange: eurot.length ? (Math.min(...eurot) === Math.max(...eurot) ? `${Math.min(...eurot)} €` : `${Math.min(...eurot)}–${Math.max(...eurot)} €`) : undefined,
      founder: { '@type': 'Person', name: 'Kati Niemelä' },
      sameAs: [settings.facebook_url, settings.instagram_url].filter(Boolean),
    });
  }
  return JSON.parse(JSON.stringify(solmut));
}
