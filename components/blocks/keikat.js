import { useEffect, useState } from 'react';
import RichText, { onTaytetty } from '../RichText';
import { KUUKAUDET, Kuva, Kuvaaja, Lisaa, Painike, jaaTapahtuma, paivaOsat } from '../lava/ui';

// Keikat jaetaan tuleviin ja menneisiin rakennushetken mukaan; selain tarkistaa päivän uudelleen
function useTanaan(rakennettu) {
  const [tanaan, setTanaan] = useState(() => paivaOsat(rakennettu || new Date().toISOString()).iso);
  useEffect(() => { setTanaan(paivaOsat(new Date().toISOString()).iso); }, []);
  return tanaan;
}

function jarjesta(lista) {
  return (lista || []).filter((k) => k?.pvm).map((k) => ({ ...k, osat: paivaOsat(k.pvm) }))
    .sort((a, b) => a.osat.iso.localeCompare(b.osat.iso));
}

function Liput({ tulevat }) {
  return (
    <div className="tickets">
      {tulevat.map((k, i) => {
        const [nimi, paikka] = jaaTapahtuma(k.tapahtuma);
        const { p, k: kk, v, vp } = k.osat;
        return (
          <div className={`ticket-wrap${i === 0 ? ' next' : ''}`} key={i}>
            <article className="ticket">
              <div className="ticket-main">
                <span className="ticket-mark" aria-hidden="true">Kaniffi</span>
                <div className="ticket-info">
                  <p className="lbl">{i === 0 ? 'Seuraava keikka' : 'Tuleva keikka'}</p>
                  <h3 className="scr">{nimi}</h3>
                  <p className="ticket-date">{vp} {p}.{kk}.{v}{paikka ? ` · ${paikka}` : ''}</p>
                  {k.lisatieto && <p className="ticket-date" style={{ color: 'var(--accent)' }}>{k.lisatieto}</p>}
                  {k.linkki && <a className="more" href={k.linkki} target="_blank" rel="noopener noreferrer">Lisätietoja</a>}
                </div>
              </div>
              <div className="ticket-stub" aria-hidden="true"><span className="wd">{vp}</span><b>{p}</b><span className="my">{KUUKAUDET[kk - 1]} {v}</span></div>
            </article>
          </div>
        );
      })}
    </div>
  );
}

function Menneet({ menneet, otsikko }) {
  if (!menneet.length) return null;
  const vuodet = {};
  menneet.forEach((k) => { (vuodet[k.osat.v] = vuodet[k.osat.v] || []).push(k); });
  return (
    <>
      <h2 className="scr h2" style={{ marginBottom: 'clamp(24px, 3vw, 40px)' }}>{otsikko || 'Menneet keikat'}</h2>
      {Object.keys(vuodet).sort((a, b) => b - a).map((v) => (
        <div className="pyear" key={v}>
          <div className="pyear-head"><span className="year-num">{v}</span><span className="lbl muted">{vuodet[v].length} {vuodet[v].length === 1 ? 'keikka' : 'keikkaa'}</span></div>
          <ul className="pgrid">
            {vuodet[v].map((k, i) => {
              const [nimi, paikka] = jaaTapahtuma(k.tapahtuma);
              return (
                <li className="pcard" key={i}>
                  <time dateTime={k.osat.iso} aria-label={`${k.osat.p}.${k.osat.k}.${k.osat.v}`}><span className="pd">{k.osat.p}.{k.osat.k}.</span></time>
                  <div className="pinfo"><b>{nimi}</b>{paikka && <span>{paikka}</span>}{k.lisatieto && <small>{k.lisatieto}</small>}</div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

export default function KeikatBlock({ block, id, rakennettu, globaali }) {
  const tanaan = useTanaan(rakennettu);
  // Keikkalista on Keikat-sivulla; etusivu ja muut näkymät lukevat sen sieltä
  const lista = jarjesta(block.keikat_lista?.length ? block.keikat_lista : globaali?.keikat);
  const tulevat = lista.filter((k) => k.osat.iso >= tanaan);
  const menneet = lista.filter((k) => k.osat.iso < tanaan);
  const nakyma = block.keikat_nakyma || 'keikkasivu';

  if (nakyma === 'etusivu') {
    return (
      <section className="sec wrap spot" id={id} aria-labelledby="ek-otsikko">
        <div className="gigs">
          <div>
            <div className="sec-title"><h2 className="scr h2" id="ek-otsikko">{block.keikat_otsikko || 'Tulevat keikat'}</h2></div>
            {tulevat.length ? (
              <ul className="gig-list">
                {tulevat.slice(0, 4).map((k, i) => {
                  const [nimi, paikka] = jaaTapahtuma(k.tapahtuma);
                  return (
                    <li className="gig" key={i}>
                      <div className="gig-date"><b>{k.osat.p}</b><span className="lbl muted">{KUUKAUDET[k.osat.k - 1]} {k.osat.v}</span></div>
                      <div className="gig-title">{nimi}<small>{[k.osat.vp, paikka].filter(Boolean).join(' · ')}</small></div>
                    </li>
                  );
                })}
              </ul>
            ) : <p className="body" style={{ marginBottom: 24 }}>{block.keikat_tyhja}</p>}
            <Lisaa url={block.keikat_linkki_url || '/keikat'} teksti={block.keikat_linkki_teksti || 'Menneet keikat'} />
          </div>
          {block.tilaa_otsikko && (
            <aside className="order" aria-labelledby="ek-tilaa">
              {block.tilaa_kuva && (
                <div className="order-media">
                  <Kuva src={block.tilaa_kuva} alt={block.tilaa_alt || ''} sizes="(max-width: 960px) 100vw, 40vw" kohdistus={block.tilaa_kohdistus} />
                  <Kuvaaja teksti={block.tilaa_kuvateksti} />
                </div>
              )}
              <div className="order-body">
                <h3 className="scr" id="ek-tilaa">{block.tilaa_otsikko}</h3>
                {onTaytetty(block.tilaa_sisalto) && <div className="prose"><RichText content={block.tilaa_sisalto} /></div>}
                <Painike teksti={block.keikat_cta_teksti} url={block.keikat_cta_url} aihe="keikka" />
              </div>
            </aside>
          )}
        </div>
      </section>
    );
  }

  if (nakyma === 'menneet') {
    return <section className="sec wrap" id={id} aria-label={block.keikat_menneet_otsikko || 'Menneet keikat'}><Menneet menneet={menneet} otsikko={block.keikat_menneet_otsikko} /></section>;
  }

  return (
    <>
      <section className="sec wrap spot" id={id} aria-labelledby="tulevat-otsikko">
        <div className="sec-title"><h2 className="scr h2" id="tulevat-otsikko">{block.keikat_otsikko || 'Tulevat keikat'}</h2></div>
        {tulevat.length ? <Liput tulevat={tulevat} /> : <p className="body">{block.keikat_tyhja}</p>}
        <Painike teksti={block.keikat_cta_teksti} url={block.keikat_cta_url} aihe="keikka" />
      </section>
      {nakyma === 'kaikki' && <section className="sec wrap" aria-label="Menneet keikat"><Menneet menneet={menneet} otsikko={block.keikat_menneet_otsikko} /></section>}
    </>
  );
}
