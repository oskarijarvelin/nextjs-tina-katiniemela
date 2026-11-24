import RichText, { onTaytetty } from '../RichText';
import { Ikoni, Kuva, Kuvaaja, Linkki, Painikkeet } from '../lava/ui';
import { Merkki } from './nosto';

const Sydan = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.6.8-1.4 2.3-2.6 4.4-2.6 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z" />
  </svg>
);

export default function PalstaBlock({ block, id }) {
  const otsikkoId = `${id || 'palsta'}-${(block.palsta_otsikko || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24)}`;
  const listat = (block.palsta_listat || []).filter((l) => l?.kohteet?.length);
  const edut = (block.palsta_edut || []).filter((e) => e?.otsikko);
  const tilastot = (block.palsta_tilastot || []).filter((t) => t?.arvo);
  const pillerit = (block.palsta_linkit || []).filter((l) => l?.title);
  const kuvaVasemmalla = !!block.palsta_reverse;
  const merkki = block.palsta_merkki_arvo;

  const teksti = (
    <div className="split-text-inner">
      {block.palsta_pieni_otsikko && <p className="lbl">{block.palsta_pieni_otsikko}</p>}
      {block.palsta_otsikko && <h2 className="scr h2" id={otsikkoId} style={{ fontSize: 'clamp(56px, 5.6vw, 88px)' }}>{block.palsta_otsikko}</h2>}
      {onTaytetty(block.palsta_sisalto) && <div className="prose"><RichText content={block.palsta_sisalto} /></div>}
      {listat.length > 0 && (
        <div className="styles">
          {listat.map((l, i) => (
            <div key={i} style={{ display: 'contents' }}>
              {l.otsikko && <h3 className="lbl muted">{l.otsikko}</h3>}
              <ul className={l.pehmea ? 'soft' : undefined}>
                {l.kohteet.filter(Boolean).map((k, j) => (k === l.suosikki
                  ? <li key={j} className="fav"><Sydan />{k}<span className="visually-hidden"> (rakkain aiheeni)</span></li>
                  : <li key={j}>{k}</li>))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {onTaytetty(block.palsta_sisalto_jalkeen) && <div className="prose"><RichText content={block.palsta_sisalto_jalkeen} /></div>}
      {edut.length > 0 && (
        <ul className="perks">
          {edut.map((e, i) => <li key={i}><Ikoni nimi={e.ikoni || 'tahti'} koko={26} viiva={1.5} /><strong>{e.otsikko}</strong>{e.teksti && <span>{e.teksti}</span>}</li>)}
        </ul>
      )}
      {tilastot.length > 0 && (
        <ul className="mini-stats">
          {tilastot.map((t, i) => <li key={i}><b>{t.arvo}</b><span>{t.teksti}</span></li>)}
        </ul>
      )}
      {block.palsta_allekirjoitus && <p className="sign scr">{block.palsta_allekirjoitus}</p>}
      <Painikkeet lista={block.palsta_painikkeet} />
      {pillerit.length > 0 && (
        <nav className="pills" aria-label={block.palsta_otsikko ? `${block.palsta_otsikko}: lisää` : 'Lisää'}>
          {pillerit.map((l, i) => <Linkki key={i} className="pill" href={l.url}>{l.title}</Linkki>)}
        </nav>
      )}
    </div>
  );

  if (!block.palsta_kuva) {
    return <section className="sec wrap" id={id} aria-labelledby={block.palsta_otsikko ? otsikkoId : undefined}>{teksti}</section>;
  }
  const media = (
    <div className="split-media">
      <Kuva src={block.palsta_kuva} alt={block.palsta_alt || ''} sizes="(max-width: 960px) 100vw, 50vw" kohdistus={block.palsta_kohdistus} />
      <Kuvaaja teksti={block.palsta_kuvateksti} />
      <Merkki arvo={merkki} teksti={block.palsta_merkki_teksti} />
    </div>
  );
  const tekstiPalsta = <div className="split-text">{teksti}</div>;
  return (
    <section className={`split ${kuvaVasemmalla ? 'text-right' : 'text-left'} plain${merkki ? ' has-badge' : ''}${merkki && kuvaVasemmalla ? ' lj-split' : ''}`}
      id={id} aria-labelledby={block.palsta_otsikko ? otsikkoId : undefined}>
      {kuvaVasemmalla ? <>{media}{tekstiPalsta}</> : <>{tekstiPalsta}{media}</>}
    </section>
  );
}
