import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import settings from '../content/settings/index.json';
import { initLava } from '../lib/lava';
import { Ikoni, Linkki } from './lava/ui';

const SITE_URL = 'https://katiniemela.fi';

// Some-linkit asetuksista: [ikoni, url, näkyvä nimi]
export function someLinkit() {
  return [
    ['facebook', settings.facebook_url, settings.facebook_nimi || 'Facebook'],
    ['instagram', settings.instagram_url, settings.instagram_nimi || 'Instagram'],
    ['linkedin', settings.linkedin_url, settings.linkedin_nimi || 'LinkedIn'],
  ].filter(([, url]) => url);
}

const NIMET = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn' };

function onNykyinen(polku, url) {
  if (!url) return false;
  if (url === '/') return polku === '/';
  // Laulutunnit Jyväskylässä -laskeutumissivu kuuluu Laulunopettaja-osioon
  if (url === '/laulunopettaja' && polku.startsWith('/laulutunnit-jyvaskyla')) return true;
  return polku === url || polku.startsWith(url + '/') || polku.startsWith(url + '#');
}

export default function Layout({ title, description, children, ogImage }) {
  const router = useRouter();
  const polku = router.asPath.split('?')[0];
  const sivu = polku.split('#')[0];

  // Selainefektit käynnistetään jokaiselle sivulle erikseen
  useEffect(() => initLava(), [sivu]);

  const kuvaus = (description || '').replace(/\s+/g, ' ').trim();
  const currentUrl = `${SITE_URL}${sivu}`;
  const imageUrl = ogImage ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`) : `${SITE_URL}/favicon.png`;
  const nav = settings.mainnav?.nav || [];
  const somet = someLinkit();
  const vuosi = new Date().getFullYear();

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Kati Niemelä',
        alternateName: 'Kaniffi',
        description: 'Artisti, laulaja-lauluntekijä ja pop/jazz laulunopettaja',
        url: SITE_URL,
        image: imageUrl,
        jobTitle: ['Laulaja', 'Lauluntekijä', 'Laulunopettaja', 'Artisti'],
        knowsAbout: ['Musiikki', 'Laulu', 'Musiikkipedagogia', 'Pop', 'Jazz', 'Musiikkiteatteri'],
        sameAs: [settings.facebook_url, settings.instagram_url, settings.linkedin_url].filter(Boolean),
        address: { '@type': 'PostalAddress', addressLocality: 'Jyväskylä', addressCountry: 'FI' },
      },
      {
        '@type': 'WebSite',
        name: settings.sivuston_nimi,
        url: SITE_URL,
        description: kuvaus,
        inLanguage: 'fi',
        publisher: { '@type': 'Person', name: 'Kati Niemelä' },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={kuvaus} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={kuvaus} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content={settings.sivuston_nimi} />
        <meta property="og:locale" content="fi_FI" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={kuvaus} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="author" content="Kati Niemelä" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <a className="skip" href="#sisalto">Siirry sisältöön</a>
      <div className="progress" aria-hidden="true"><span /></div>

      <header className="site-head gutter">
        <Linkki className="logo" href="/">{settings.sivuston_nimi}</Linkki>
        <nav className="main-nav" id="main-nav" aria-label="Päävalikko">
          {nav.map((item, i) => (
            <Linkki key={i} href={item.url} aria-current={onNykyinen(polku, item.url) ? 'page' : undefined}>{item.title}</Linkki>
          ))}
        </nav>
        <div className="head-actions">
          <div className="social">
            {somet.map(([ikoni, url]) => (
              <a key={ikoni} href={url} target="_blank" rel="noopener noreferrer" aria-label={NIMET[ikoni]}><Ikoni nimi={ikoni} koko={20} /></a>
            ))}
          </div>
          {settings.varaa_teksti && <a className="btn btn-line btn-sm" href="#yhteys" data-topic="laulutunnit">{settings.varaa_teksti}</a>}
          <button className="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Avaa valikko">
            <Ikoni nimi="valikko" koko={24} />
          </button>
        </div>
      </header>

      <main id="sisalto">
        <div className="view" key={sivu}>{children}</div>
      </main>

      <footer className="site-foot">
        <span className="foot-mark" aria-hidden="true">Kaniffi</span>
        <div className="wrap foot-top">
          <div className="foot-brand">
            <Linkki className="logo" href="/">{settings.sivuston_nimi}</Linkki>
            {settings.rooli_teksti && <p className="lbl">{settings.rooli_teksti}</p>}
            {settings.alapalkki_painike && <a className="btn btn-line btn-sm" href="#yhteys" data-topic="laulutunnit">{settings.alapalkki_painike}</a>}
          </div>
          <nav className="foot-col" aria-label="Alavalikko">
            <p className="foot-h">Sivut</p>
            {nav.map((item, i) => <Linkki key={i} href={item.url}>{item.title}</Linkki>)}
          </nav>
          <div className="foot-col">
            <p className="foot-h">Seuraa</p>
            {somet.map(([ikoni, url, nimi]) => (
              <a key={ikoni} href={url} target="_blank" rel="noopener noreferrer"><Ikoni nimi={ikoni} koko={18} />{nimi}</a>
            ))}
          </div>
          <div className="foot-col">
            <p className="foot-h">Yhteystiedot</p>
            {settings.sahkoposti && <a href={`mailto:${settings.sahkoposti}`}><Ikoni nimi="sahkoposti" koko={18} />{settings.sahkoposti}</a>}
            {settings.sijainti && <p><Ikoni nimi="sijainti" koko={18} />{settings.sijainti}</p>}
            {settings.yritys && <p>{settings.yritys}</p>}
          </div>
        </div>
        <div className="wrap foot-bottom">
          <span>© {vuosi} {settings.yritys}</span>
          <button type="button" className="to-top"><Ikoni nimi="ylos" koko={16} viiva={1.8} />Takaisin ylös</button>
        </div>
      </footer>
    </>
  );
}
