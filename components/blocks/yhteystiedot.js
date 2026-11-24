// Ota yhteyttä -osio: yhteystiedot asetuksista ja yhteydenottolomake.
// Käytetään sekä Yhteystiedot- että Lomake-lohkolle (lomakkeessa lisäksi oma johdanto ja kiitosteksti).
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import settings from '../../content/settings/index.json';
import RichText, { onTaytetty } from '../RichText';
import { SITE_URL } from '../../lib/sivusto';
import { Ikoni, Kuva, Kuvaaja } from '../lava/ui';

const AIHEET = [
  ['laulutunnit', 'Laulutunnit', 'mikki'],
  ['keikka', 'Keikka', 'nuotti'],
  ['lahjakortti', 'Lahjakortti', 'lahja'],
  ['muu', 'Muu', 'viesti'],
];

const TEKSTIT = {
  laulutunnit: { label: 'Toiveet ja sopivat ajat', hint: 'Esim. mitä haluaisit oppia ja mitkä päivät tai kellonajat sopivat sinulle.', nappi: 'Lähetä viesti', kiitos: 'Kiitos viestistäsi! Otan sinuun yhteyttä mahdollisimman pian, ja sovitaan sinulle sopiva aika.' },
  keikka: { label: 'Kerro tapahtumasta', hint: 'Esim. päivämäärä, paikkakunta, arvioitu kesto, yleisön koko, toivottu musiikki ja budjetti.', nappi: 'Lähetä tarjouspyyntö', kiitos: 'Kiitos tarjouspyynnöstä! Palaan asiaan sähköpostitse mahdollisimman pian.' },
  lahjakortti: { label: 'Viesti', hint: '', nappi: 'Lähetä viesti', kiitos: 'Kiitos viestistäsi! Vastaan sinulle mahdollisimman pian.' },
  muu: { label: 'Viesti', hint: '', nappi: 'Lähetä viesti', kiitos: 'Kiitos viestistäsi! Vastaan sinulle mahdollisimman pian.' },
};

// Vanhan Lomake-lohkon tyyppi (laulutunti/keikka) → lomakkeen aihe
export function normalisoiAihe(a) {
  if (a === 'laulutunti') return 'laulutunnit';
  return AIHEET.some(([k]) => k === a) ? a : null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function YhteystiedotBlock({ block, oletusAihe }) {
  const router = useRouter();
  const lomakeAihe = normalisoiAihe(block.lomake_tyyppi);
  const alkuAihe = lomakeAihe || normalisoiAihe(oletusAihe) || 'laulutunnit';
  const otsikko = block.yhteystiedot_otsikko || 'Ota yhteyttä';

  const [aihe, setAihe] = useState(alkuAihe);
  const [arvot, setArvot] = useState({ nimi: '', sahkoposti: '', puhelin: '', viesti: '', kotisivu: '' });
  const [virheet, setVirheet] = useState({});
  const [tila, setTila] = useState('lomake'); // lomake | lahetetaan | kiitos
  const [lahetysvirhe, setLahetysvirhe] = useState('');
  const kiitosRef = useRef(null);
  const nimiRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => { setAihe(alkuAihe); }, [alkuAihe]);
  useEffect(() => {
    const kuuntelija = (e) => { const a = normalisoiAihe(e.detail); if (a) { setAihe(a); setTila((t) => (t === 'kiitos' ? 'lomake' : t)); } };
    window.addEventListener('lava-aihe', kuuntelija);
    return () => window.removeEventListener('lava-aihe', kuuntelija);
  }, []);
  useEffect(() => { if (tila === 'kiitos') kiitosRef.current?.focus(); }, [tila]);

  const t = TEKSTIT[aihe] || TEKSTIT.muu;
  const naytaIntro = !!block.lomake_otsikko && aihe === lomakeAihe;
  const kiitos = (aihe === lomakeAihe && block.lomake_kiitos) || t.kiitos;

  const muuta = (kentta) => (e) => {
    setArvot((v) => ({ ...v, [kentta]: e.target.value }));
    if (virheet[kentta]) setVirheet((v) => ({ ...v, [kentta]: '' }));
  };

  async function laheta(e) {
    e.preventDefault();
    const uudet = {
      nimi: arvot.nimi.trim() ? '' : 'Kirjoita nimesi.',
      sahkoposti: EMAIL.test(arvot.sahkoposti.trim()) ? '' : 'Kirjoita sähköpostiosoite muodossa nimi@esimerkki.fi.',
    };
    setVirheet(uudet);
    if (uudet.nimi) { nimiRef.current?.focus(); return; }
    if (uudet.sahkoposti) { emailRef.current?.focus(); return; }
    setTila('lahetetaan');
    setLahetysvirhe('');
    try {
      const vastaus = await fetch('/api/lomake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tyyppi: aihe, nimi: arvot.nimi, email: arvot.sahkoposti, puhelin: arvot.puhelin,
          viesti: arvot.viesti, kotisivu: arvot.kotisivu, sivu: `${SITE_URL}${router.asPath.split('#')[0]}`,
        }),
      });
      const data = await vastaus.json().catch(() => ({}));
      if (!vastaus.ok) throw new Error(data.virhe || 'Lähetys epäonnistui.');
      setTila('kiitos');
    } catch (err) {
      setTila('lomake');
      setLahetysvirhe(`${err.message} Voit lähettää viestin myös suoraan osoitteeseen ${settings.sahkoposti}.`);
    }
  }

  function uusi() {
    setArvot({ nimi: '', sahkoposti: '', puhelin: '', viesti: '', kotisivu: '' });
    setVirheet({});
    setTila('lomake');
    setTimeout(() => nimiRef.current?.focus(), 0);
  }

  return (
    <section className="sec contact spot" id="yhteys" aria-labelledby="yhteys-otsikko">
      {/* Vanhat linkit (esim. /laulutunnit-jyvaskyla#varaa) osuvat yhä tähän osioon */}
      {block.ankkuri && block.ankkuri !== 'yhteys' && <span id={block.ankkuri} aria-hidden="true" />}
      <div className="wrap contact-grid">
        {settings.yhteys_kuva && (
          <div className="contact-photo">
            <Kuva src={settings.yhteys_kuva} alt={settings.yhteys_kuva_alt || ''} sizes="(max-width: 960px) 100vw, 40vw" />
            <Kuvaaja teksti={settings.yhteys_kuvateksti} />
          </div>
        )}
        <div className="contact-main">
          <h2 className="scr h2" id="yhteys-otsikko">{otsikko}</h2>
          <div className="clines">
            {settings.sahkoposti && (
              <div className="cline mail">
                <span className="cline-ico"><Ikoni nimi="sahkoposti" koko={18} /></span>
                <span className="cline-txt"><small>Sähköposti</small><a href={`mailto:${settings.sahkoposti}`} id="email-osoite" style={{ color: 'var(--fg)' }}>{settings.sahkoposti}</a></span>
                <button type="button" className="copy" data-copy={settings.sahkoposti} aria-label="Kopioi sähköpostiosoite">Kopioi</button>
              </div>
            )}
            {[['facebook', 'Facebook', settings.facebook_url, settings.facebook_nimi], ['instagram', 'Instagram', settings.instagram_url, settings.instagram_nimi], ['linkedin', 'LinkedIn', settings.linkedin_url, settings.linkedin_nimi]]
              .filter(([, , url]) => url)
              .map(([ikoni, nimi, url, naytto]) => (
                <a key={ikoni} className="cline" href={url} target="_blank" rel="noopener noreferrer">
                  <span className="cline-ico"><Ikoni nimi={ikoni} koko={18} /></span>
                  <span className="cline-txt"><small>{nimi}</small><span>{naytto || nimi}</span></span>
                </a>
              ))}
            {settings.sijainti && (
              <div className="cline">
                <span className="cline-ico"><Ikoni nimi="sijainti" koko={18} /></span>
                <span className="cline-txt"><small>Laulutunnit</small><span>{settings.sijainti}</span></span>
              </div>
            )}
          </div>
          {settings.yritys && <p className="company-line">{settings.yritys}</p>}

          <div className="form-card">
            {naytaIntro && tila !== 'kiitos' && (
              <div className="form-intro">
                <h3>{block.lomake_otsikko}</h3>
                {onTaytetty(block.lomake_sisalto) && <div className="body prose"><RichText content={block.lomake_sisalto} /></div>}
              </div>
            )}
            {tila !== 'kiitos' ? (
              <form onSubmit={laheta} noValidate>
                <fieldset>
                  <legend className="lbl muted">Asia</legend>
                  <div className="topics">
                    {AIHEET.map(([arvo, nimi, ikoni]) => (
                      <label className="chip" key={arvo}>
                        <input type="radio" name="asia" id={`asia-${arvo}`} value={arvo} checked={aihe === arvo} onChange={() => setAihe(arvo)} />
                        <span><Ikoni nimi={ikoni} koko={22} />{nimi}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="fields">
                  <div className={`fld${virheet.nimi ? ' invalid' : ''}`}>
                    <label htmlFor="nimi">Nimi *</label>
                    <input ref={nimiRef} id="nimi" name="nimi" type="text" autoComplete="name" required value={arvot.nimi} onChange={muuta('nimi')} aria-invalid={virheet.nimi ? 'true' : 'false'} aria-describedby="nimi-err" />
                    <p className="err" id="nimi-err" hidden={!virheet.nimi}>{virheet.nimi}</p>
                  </div>
                  <div className={`fld${virheet.sahkoposti ? ' invalid' : ''}`}>
                    <label htmlFor="sahkoposti">Sähköposti *</label>
                    <input ref={emailRef} id="sahkoposti" name="sahkoposti" type="email" autoComplete="email" required value={arvot.sahkoposti} onChange={muuta('sahkoposti')} aria-invalid={virheet.sahkoposti ? 'true' : 'false'} aria-describedby="sahkoposti-err" />
                    <p className="err" id="sahkoposti-err" hidden={!virheet.sahkoposti}>{virheet.sahkoposti}</p>
                  </div>
                  <div className="fld fld-full">
                    <label htmlFor="puhelin">Puhelin <span className="opt">(vapaaehtoinen)</span></label>
                    <input id="puhelin" name="puhelin" type="tel" autoComplete="tel" value={arvot.puhelin} onChange={muuta('puhelin')} />
                  </div>
                  <div className="fld fld-full">
                    <label htmlFor="viesti">{t.label}</label>
                    <textarea id="viesti" name="viesti" rows={5} value={arvot.viesti} onChange={muuta('viesti')} aria-describedby={t.hint ? 'viesti-hint' : undefined} />
                    {t.hint && <p className="hint" id="viesti-hint">{t.hint}</p>}
                  </div>
                  {/* Roskapostisuoja: ihmiset eivät näe eivätkä täytä tätä kenttää */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="kotisivu">Kotisivu</label>
                    <input id="kotisivu" name="kotisivu" type="text" tabIndex={-1} autoComplete="off" value={arvot.kotisivu} onChange={muuta('kotisivu')} />
                  </div>
                </div>
                <div className="form-foot">
                  <span className="req">* pakollinen tieto</span>
                  <button className="btn btn-primary" type="submit" disabled={tila === 'lahetetaan'}>
                    <span>{tila === 'lahetetaan' ? 'Lähetetään…' : t.nappi}</span><Ikoni nimi="nuoli" koko={18} viiva={1.8} />
                  </button>
                </div>
                {lahetysvirhe && <p className="form-status" role="alert">{lahetysvirhe}</p>}
              </form>
            ) : (
              <div className="thanks" ref={kiitosRef} tabIndex={-1}>
                <h3>Kiitos!</h3>
                <p className="body">{kiitos}</p>
                <button className="btn btn-ghost" type="button" onClick={uusi}>Kirjoita uusi viesti</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
