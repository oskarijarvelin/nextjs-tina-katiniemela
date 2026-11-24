// Kuvallinen kehotusosio (esim. Tilaa keikalle, Varaa tutustumistunti)
import RichText, { onTaytetty } from '../RichText';
import { Ikoni, Kuva, Kuvaaja, Painike } from '../lava/ui';

export function Varusteet({ lista }) {
  const v = (lista || []).filter((x) => x?.teksti);
  if (!v.length) return null;
  return (
    <ul className="gear" aria-label="Mukana keikalla">
      {v.map((x, i) => <li key={i}><Ikoni nimi={x.ikoni || 'aanentoisto'} koko={28} viiva={1.5} /><span>{x.teksti}</span></li>)}
    </ul>
  );
}

export default function CtaBlock({ block, id }) {
  const otsikkoId = `${id || 'cta'}-otsikko`;
  return (
    <section className="gig-cta" id={id} aria-labelledby={otsikkoId}>
      {block.cta_kuva && (
        <div className="gig-cta-media">
          <Kuva src={block.cta_kuva} alt={block.cta_alt || ''} sizes="100vw" kohdistus={block.cta_kohdistus} kohdistusM={block.cta_kohdistus_mobiili} />
          <Kuvaaja teksti={block.cta_kuvateksti} />
        </div>
      )}
      <div className="gig-cta-text wrap">
        <div className="gig-cta-inner">
          {block.cta_saatavuus && <p className="avail" style={{ alignSelf: 'flex-start' }}><span className="avail-dot" aria-hidden="true" />{block.cta_saatavuus}</p>}
          <h2 className="scr h2" id={otsikkoId}>{block.cta_otsikko}</h2>
          {onTaytetty(block.cta_sisalto) && <div className="prose"><RichText content={block.cta_sisalto} /></div>}
          <Varusteet lista={block.cta_varusteet} />
          <Painike teksti={block.cta_painike_teksti} url={block.cta_painike_url} aihe={block.cta_painike_aihe} />
        </div>
      </div>
    </section>
  );
}
