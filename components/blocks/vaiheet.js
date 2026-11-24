import { Ikoni, Painike } from '../lava/ui';

export default function VaiheetBlock({ block, id }) {
  const lista = (block.vai_lista || []).filter((v) => v?.otsikko);
  const otsikkoId = `${id || 'vaiheet'}-otsikko`;
  return (
    <section className="sec wrap rule spot" id={id} aria-labelledby={otsikkoId}>
      <div className="sec-title"><h2 className="scr h2" id={otsikkoId}>{block.vai_otsikko}</h2></div>
      <ol className="steps journey">
        {lista.map((v, i) => (
          <li className={`step${v.korostettu ? ' feat' : ''}`} key={i}>
            {i > 0 && <span className="step-arrow" aria-hidden="true"><Ikoni nimi="nuoli" koko={16} viiva={2} /></span>}
            <b>{i + 1}.</b>
            {v.merkki && <p className="chip-sm">{v.merkki}</p>}
            <h3>{v.otsikko}</h3>
            {v.teksti && <p>{v.teksti}</p>}
          </li>
        ))}
      </ol>
      <Painike teksti={block.vai_painike_teksti} aihe={block.vai_painike_aihe || 'laulutunnit'} />
    </section>
  );
}
