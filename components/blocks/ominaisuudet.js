import { Ikoni } from '../lava/ui';

export default function OminaisuudetBlock({ block, id }) {
  const lista = (block.omi_lista || []).filter((o) => o?.otsikko);
  const otsikkoId = `${id || 'ominaisuudet'}-otsikko`;
  return (
    <section className="sec wrap lo-how-sec" id={id} aria-labelledby={block.omi_otsikko ? otsikkoId : undefined} style={{ paddingTop: 0 }}>
      {block.omi_otsikko && <div className="sec-title"><h2 className="scr h2" id={otsikkoId}>{block.omi_otsikko}</h2></div>}
      <div className="lo-how">
        {lista.map((o, i) => (
          <article className="how" key={i}>
            <Ikoni nimi={o.ikoni || 'tahti'} koko={30} viiva={1.5} />
            <h3>{o.otsikko}</h3>
            {o.teksti && <p>{o.teksti}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
