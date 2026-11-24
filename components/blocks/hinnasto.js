import RichText, { onTaytetty } from '../RichText';
import { Ikoni, Lisaa, Painike } from '../lava/ui';

export default function HinnastoBlock({ block, id }) {
  const kortit = (block.hin_kortit || []).filter((k) => k?.otsikko);
  const ehdot = (block.hin_ehdot || []).filter((e) => e?.otsikko);
  const otsikkoId = `${id || 'hinnasto'}-otsikko`;
  return (
    <section className="sec band" id={id} aria-labelledby={otsikkoId}>
      <div className="wrap">
        <div className="sec-title"><h2 className="scr h2" id={otsikkoId}>{block.hin_otsikko || 'Hinnasto'}</h2></div>
        <div className="price-cards">
          {kortit.map((k, i) => (
            <article className={`pc${k.korostettu ? ' feat' : ''}`} key={i}>
              {k.chip && <p className="chip-sm">{k.chip}</p>}
              <h3>{k.otsikko}</h3>
              <p className="amt">{k.hinta}<span>{k.yksikko}</span></p>
              {k.alv && <p className="vat">{k.alv}</p>}
              {k.painike_teksti && <Painike teksti={k.painike_teksti} aihe={k.painike_aihe || 'laulutunnit'} />}
            </article>
          ))}
        </div>
        {onTaytetty(block.hin_lahja_teksti) && (
          <div className="gift">
            <Ikoni nimi="lahja" koko={34} viiva={1.4} />
            <div className="prose"><RichText content={block.hin_lahja_teksti} /></div>
            {block.hin_lahja_painike && <Painike teksti={block.hin_lahja_painike} aihe="lahjakortti" tyyli="haamu" className="btn-sm" />}
          </div>
        )}
        {block.hin_paikka_teksti && (
          <div className="lj-place">
            <Ikoni nimi="sijainti" koko={22} viiva={1.5} />
            <p>{block.hin_paikka_teksti}</p>
            <Lisaa url={block.hin_paikka_url} teksti={block.hin_paikka_linkki} />
          </div>
        )}
        {ehdot.length > 0 && (
          <div className="terms lo-terms">
            {ehdot.map((e, i) => (
              <div key={i}>
                <h3><Ikoni nimi={e.ikoni || 'kalenteri'} koko={20} />{e.otsikko}</h3>
                {e.teksti && <p>{e.teksti}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
