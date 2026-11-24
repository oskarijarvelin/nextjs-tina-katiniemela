// Oppilaiden palautteet. Palautteet ovat yhdessä paikassa (Tina: Oppilaiden palautteet), ja lohko näyttää ne
// joko vaihtuvana nostona (karuselli) tai korttiruudukkona, jossa nostettu palaute on isona.
import { useMemo } from 'react';
import RichText from '../RichText';
import { Lainausmerkki } from '../lava/ui';

const alkukirjain = (nimi) => (nimi || '?').trim().charAt(0).toUpperCase();

// Pitkästä palautteesta näytetään aluksi kaksi kappaletta, loput "Lue koko palaute" -kohdasta
function jaaKappaleet(ast) {
  const lapset = ast?.children || [];
  return [{ ...ast, children: lapset.slice(0, 2) }, lapset.length > 2 ? { ...ast, children: lapset.slice(2) } : null];
}

export default function PalautteetBlock({ block, id, globaali }) {
  const kaikki = (globaali?.palautteet || []).filter((p) => p?.nimi);
  const tyyppi = block.pal_nakyma || 'karuselli';
  const otsikkoId = `${id || 'palautteet'}-otsikko`;
  const [alku, loppu] = useMemo(() => jaaKappaleet(kaikki.find((p) => p.nostettu)?.teksti), [kaikki]);
  if (!kaikki.length) return null;

  if (tyyppi === 'kortit') {
    const iso = kaikki.find((p) => p.nostettu) || kaikki[0];
    const muut = kaikki.filter((p) => p !== iso);
    return (
      <section className="sec wrap spot" id={id} aria-labelledby={block.pal_otsikko ? otsikkoId : undefined} aria-label={block.pal_otsikko ? undefined : 'Oppilaiden palautteet'}>
        {block.pal_otsikko && <div className="sec-title"><h2 className="scr h2" id={otsikkoId}>{block.pal_otsikko}</h2></div>}
        <div className="reviews">
          <figure className="rcard big">
            <Lainausmerkki leveys={56} korkeus={44} />
            <blockquote>
              {iso.teksti ? (
                <>
                  <div className="hl-wrap"><RichText content={alku} /></div>
                  {loppu && (
                    <details className="readmore">
                      <summary><span className="closed">Lue koko palaute</span><span className="opened">Näytä vähemmän</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></summary>
                      <RichText content={loppu} />
                    </details>
                  )}
                </>
              ) : <p className="hl">{iso.lainaus}</p>}
            </blockquote>
            <figcaption><span className="ini" aria-hidden="true">{alkukirjain(iso.nimi)}</span><span><b>{iso.nimi}</b>{iso.kuvaus && <small>{iso.kuvaus}</small>}</span></figcaption>
          </figure>
          {muut.length > 0 && (
            <div className="reviews-side">
              {muut.map((p, i) => (
                <figure className="rcard" key={i}>
                  <Lainausmerkki leveys={40} korkeus={32} />
                  <blockquote><p>{p.lainaus}</p></blockquote>
                  <figcaption><span className="ini" aria-hidden="true">{alkukirjain(p.nimi)}</span><span><b>{p.nimi}</b>{p.kuvaus && <small>{p.kuvaus}</small>}</span></figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  const tunnus = id || 'aani';
  return (
    <section className={`sec wrap spot${block.pal_otsikko ? '' : ' home-voices'}`} id={id} aria-labelledby={block.pal_otsikko ? otsikkoId : undefined} aria-label={block.pal_otsikko ? undefined : 'Oppilaiden palautteet'}>
      {block.pal_otsikko && <div className="sec-title center"><h2 className="scr h2" id={otsikkoId}>{block.pal_otsikko}</h2></div>}
      <div className="voices">
        <div className="voices-stage">
          {kaikki.map((p, i) => (
            <figure className="voice" id={`${tunnus}-${i + 1}`} key={i}>
              <Lainausmerkki />
              <blockquote><p>{p.lainaus}</p></blockquote>
              <figcaption className="lbl muted">{p.nimi}</figcaption>
            </figure>
          ))}
        </div>
        <div className="voices-nav" role="group" aria-label="Valitse palaute" hidden>
          {kaikki.map((p, i) => (
            <button type="button" aria-controls={`${tunnus}-${i + 1}`} aria-pressed={i === 0 ? 'true' : 'false'} key={i}>
              <span className="ini" aria-hidden="true">{alkukirjain(p.nimi)}</span>{p.nimi}<i className="bar" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
