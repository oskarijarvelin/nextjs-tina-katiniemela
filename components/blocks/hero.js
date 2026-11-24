import { Ikoni, Kuva, Kuvaaja, Linkki, Painikkeet } from '../lava/ui';

// Musiikki-sivun äänialto: kiinteä näennäissatunnainen sarja, jotta palvelin ja selain piirtävät saman
function rnd(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
const AALTO = Array.from({ length: 84 }, (_, i) => ({
  '--h': `${Math.round(18 + rnd(i) * 82)}%`, '--d': `-${(rnd(i + .5) * 1.6).toFixed(2)}s`, '--t': `${(0.97 + rnd(i + .9) * 0.8).toFixed(2)}s`,
}));

function Saatavuus({ teksti, style }) {
  if (!teksti) return null;
  return <p className="avail" style={style}><span className="avail-dot" aria-hidden="true" />{teksti}</p>;
}

const rivit = (teksti) => (teksti || '').split('\n').map((r, i, a) => <span key={i}>{r}{i < a.length - 1 && <br />}</span>);

export default function HeroBlock({ block, id }) {
  const linkit = (block.hero_linkit || []).filter((l) => l?.title);
  const pillerit = linkit.filter((l) => l.tyyli === 'pilleri');
  const napit = linkit.filter((l) => l.tyyli !== 'pilleri');
  const kuva = (
    <Kuva src={block.bgImg} alt={block.kuva_alt || ''} priority sizes="(max-width: 960px) 100vw, 60vw"
      kohdistus={block.kuva_kohdistus} kohdistusD={block.kuva_kohdistus_desktop} kohdistusM={block.kuva_kohdistus_mobiili} />
  );

  if (block.hero_tyyli === 'etusivu') {
    return (
      <section className="hero" id={id} aria-label={block.otsikko}>
        <div className="hero-media">{kuva}<Kuvaaja teksti={block.kuvateksti} /></div>
        <div className="hero-inner gutter">
          <div className="hero-text">
            {block.pieni_otsikko && <p className="lbl">{block.pieni_otsikko}</p>}
            <Saatavuus teksti={block.saatavuus} />
            <h1 className="scr" tabIndex={-1}>{block.otsikko}</h1>
            {block.sisalto && <p className="hero-lead">{block.sisalto}</p>}
            <Painikkeet lista={napit} />
          </div>
        </div>
        <span className="scroll-cue" aria-hidden="true"><i /></span>
      </section>
    );
  }

  const otsikkoId = `${id || 'sivu'}-h1`;
  return (
    <section className={`page-hero${block.aalto ? ' mus-hero' : ''}`} id={id} aria-labelledby={otsikkoId}>
      <div className="page-hero-text">
        <nav className="crumbs" aria-label="Murupolku">
          <Linkki href="/">Etusivu</Linkki><span aria-hidden="true">/</span><span aria-current="page">{block.murupolku || block.otsikko}</span>
        </nav>
        <h1 className="scr" id={otsikkoId} tabIndex={-1}>{block.otsikko}</h1>
        {block.sisalto && <p className="lead">{rivit(block.sisalto)}</p>}
        <Painikkeet lista={napit} />
        {pillerit.length > 0 && (
          <nav className="pills" aria-label={`${block.otsikko}: osiot`}>
            {pillerit.map((l, i) => <Linkki key={i} className="pill" href={l.url}>{l.title}</Linkki>)}
          </nav>
        )}
        <Saatavuus teksti={block.saatavuus} />
      </div>
      <div className="page-hero-media">{kuva}<Kuvaaja teksti={block.kuvateksti} /></div>
      {block.aalto && <div className="wave" aria-hidden="true">{AALTO.map((s, i) => <i key={i} style={s} />)}</div>}
    </section>
  );
}
