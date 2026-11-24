import RichText, { onTaytetty } from '../RichText';
import { Ikoni, Painike } from '../lava/ui';

export default function UkkBlock({ block, id }) {
  const lista = (block.ukk_lista || []).filter((k) => k?.kysymys);
  const otsikkoId = `${id || 'ukk'}-otsikko`;
  return (
    <section className="sec band" id={id} aria-labelledby={otsikkoId}>
      <div className="wrap faq-layout">
        <div className="faq-side">
          <h2 className="scr h2" id={otsikkoId}>{block.ukk_otsikko}</h2>
          {onTaytetty(block.ukk_sisalto) && <div className="prose"><RichText content={block.ukk_sisalto} /></div>}
          <Painike teksti={block.ukk_painike_teksti} aihe={block.ukk_painike_aihe || 'laulutunnit'} />
        </div>
        <div className="faq faq-cards">
          {lista.map((k, i) => (
            <details key={i}>
              <summary>{k.kysymys}<Ikoni nimi="plus" koko={22} /></summary>
              <RichText content={k.vastaus} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
