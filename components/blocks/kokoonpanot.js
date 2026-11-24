import RichText, { onTaytetty } from '../RichText';
import { Ikoni, Kuva, Kuvaaja, Linkki, Painikkeet } from '../lava/ui';
import { Varusteet } from './cta';

export default function KokoonpanotBlock({ block, id }) {
  const kortit = (block.kok_kortit || []).filter((k) => k?.otsikko);
  const otsikkoId = `${id || 'kokoonpanot'}-otsikko`;
  return (
    <section className="sec wrap spot" id={id} aria-labelledby={otsikkoId}>
      <div className="ens-intro">
        {block.kok_kuva && (
          <div className="ens-photo">
            <Kuva src={block.kok_kuva} alt={block.kok_alt || ''} sizes="(max-width: 960px) 100vw, 40vw" kohdistus={block.kok_kohdistus} />
            <Kuvaaja teksti={block.kok_kuvateksti} />
          </div>
        )}
        <div className="ens-intro-text">
          <h2 className="scr h2" id={otsikkoId}>{block.kok_otsikko}</h2>
          {onTaytetty(block.kok_sisalto) && <div className="prose"><RichText content={block.kok_sisalto} /></div>}
          <Varusteet lista={block.kok_varusteet} />
          <Painikkeet lista={block.kok_painikkeet} />
        </div>
      </div>
      <div className="ens-grid">
        {kortit.map((k, i) => {
          const linkit = (k.linkit || []).filter((l) => l?.url);
          const runko = (
            <>
              {k.chip && <span className="chip-sm">{k.chip}</span>}
              <h3 className="scr">{k.otsikko}</h3>
              {onTaytetty(k.teksti) && <RichText content={k.teksti} />}
              {linkit.length > 0 && (
                <div className="ens-links">
                  {linkit.map((l, n) => <Linkki key={n} href={l.url}><Ikoni nimi={l.ikoni || 'verkko'} koko={16} viiva={1.7} />{l.teksti || l.url}</Linkki>)}
                </div>
              )}
            </>
          );
          if (k.tyyli === 'nostettu') {
            return (
              <article className="ens-card feat" key={i}>
                {k.kuva && <div className="ens-logo-wrap"><Kuva className="ens-logo" src={k.kuva} alt={k.alt || `${k.otsikko}-logo`} leveys={800} korkeus={400} sizes="320px" /></div>}
                <div className="ens-body">{runko}</div>
              </article>
            );
          }
          if (k.tyyli === 'mennyt') {
            return (
              <article className="ens-card past" key={i}>
                {k.kuva && <Kuva src={k.kuva} alt={k.alt || ''} leveys={480} korkeus={480} sizes="180px" />}
                <div className="ens-body">{runko}</div>
              </article>
            );
          }
          return <article className="ens-card" key={i}>{runko}</article>;
        })}
      </div>
    </section>
  );
}
