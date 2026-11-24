import RichText, { onTaytetty } from '../RichText';

export default function KokemusBlock({ block, id }) {
  const otsikkoId = `${id || 'kokemus'}-otsikko`;
  return (
    <div className="wrap">
      <section className="cv-group" id={id} aria-labelledby={otsikkoId}>
        <div className="cv-head">
          <h2 className="scr h2" id={otsikkoId}>{block.kokemus_otsikko}</h2>
          {onTaytetty(block.kokemus_sisalto) && <div className="prose"><RichText content={block.kokemus_sisalto} /></div>}
        </div>
        <ol className="tl">
          {(block.kokemus_lista || []).filter(Boolean).map((k, i) => (
            <li key={i}>
              <time>{k.ajankohta}</time>
              <div><h3>{k.title}</h3>{onTaytetty(k.kuvaus) && <RichText content={k.kuvaus} />}</div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
