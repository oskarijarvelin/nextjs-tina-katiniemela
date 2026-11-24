// Diskografia: ensimmäinen albumi isona vinyylinä, muut julkaisut vuosittain
import RichText, { onTaytetty } from '../RichText';
import { Kuva, Painike, Toisto } from '../lava/ui';

function tekstiksi(ast) {
  const kerää = (n) => (n?.type === 'text' ? n.text : (n?.children || []).map(kerää).join(n?.type === 'p' ? '\n' : ''));
  return (ast ? kerää(ast) : '').trim();
}

export default function JulkaisutBlock({ block, id }) {
  const lista = (block.julkaisut_lista || []).filter((j) => j?.title);
  const albumi = lista.find((j) => (j.tyyppi || '').toLowerCase() === 'albumi');
  const muut = lista.filter((j) => j !== albumi);
  const vuodet = [];
  muut.forEach((j) => {
    const v = j.ajankohta || '';
    let ryhma = vuodet.find((r) => r.v === v);
    if (!ryhma) { ryhma = { v, julkaisut: [] }; vuodet.push(ryhma); }
    ryhma.julkaisut.push(j);
  });
  const otsikkoId = `${id || 'diskografia'}-otsikko`;
  return (
    <section className="sec band" id={id} aria-labelledby={otsikkoId}>
      <div className="wrap">
        <h2 className="scr h2" id={otsikkoId} style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}>{block.julkaisut_otsikko}</h2>
        {onTaytetty(block.julkaisut_sisalto) && <div className="prose" style={{ marginBottom: 32 }}><RichText content={block.julkaisut_sisalto} /></div>}
        {albumi && (
          <article className="album-feature" aria-labelledby="albumi-otsikko">
            <div className="vinyl-stage">
              <div className="vinyl" aria-hidden="true"><div className="vinyl-disc"><Kuva src={albumi.kuva} leveys={480} korkeus={480} sizes="160px" /></div></div>
              <div className="sleeve tilt"><Kuva src={albumi.kuva} alt={`${albumi.title} – kansikuva`} leveys={800} korkeus={800} sizes="(max-width: 960px) 80vw, 420px" /></div>
            </div>
            <div className="album-info">
              <p className="lbl">{[albumi.tyyppi, albumi.ajankohta].filter(Boolean).join(' · ')}</p>
              <h3 className="scr" id="albumi-otsikko">{albumi.title}</h3>
              <div className="ctas">
                {albumi.spotify && <Painike url={albumi.spotify} teksti="Spotify"><Toisto /></Painike>}
                {albumi.youtube && <Painike url={albumi.youtube} teksti="YouTube" tyyli="haamu" />}
              </div>
              {onTaytetty(albumi.kuvaus) && <div className="prose"><RichText content={albumi.kuvaus} /></div>}
              {albumi.kappaleet?.length > 0 && (
                <ol className="tracklist">
                  {albumi.kappaleet.map((k, i) => {
                    const nimi = (k.title || '').replace(/^\d+\.\s*/, '');
                    return <li key={i}><b>{String(i + 1).padStart(2, '0')}</b><span>{nimi}</span>{k.meta && <small>{k.meta}</small>}</li>;
                  })}
                </ol>
              )}
            </div>
          </article>
        )}
        <div className="dyears">
          {vuodet.map((r) => (
            <div className="dyear" key={r.v}>
              <p className="dyear-num">{r.v}</p>
              <div className="discs">
                {r.julkaisut.map((j, i) => {
                  const linkki = j.spotify || j.youtube;
                  const krediitit = tekstiksi(j.kuvaus);
                  return (
                    <article className="disc" key={i}>
                      <a className="disc-cover tilt" href={linkki || '#'} target="_blank" rel="noopener noreferrer" aria-label={`Kuuntele ${j.title}${j.spotify ? ' Spotifyssa' : ''}`}>
                        <Kuva src={j.kuva} alt={`${j.title} – kansikuva`} leveys={480} korkeus={480} sizes="(max-width: 560px) 40vw, 168px" />
                        <span className="vplay"><Toisto koko={20} /></span>
                      </a>
                      {j.tyyppi && <p className="lbl muted">{j.tyyppi}</p>}
                      <h3>{j.title}</h3>
                      {krediitit && <p className="credits">{krediitit}</p>}
                      <div className="disc-links">
                        {j.spotify && <a href={j.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>}
                        {j.youtube && <a href={j.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>}
                      </div>
                      {j.kappaleet?.length > 0 && (
                        <details className="tracks">
                          <summary>Kappaleet ({j.kappaleet.length}) <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></summary>
                          <ol>{j.kappaleet.map((k, n) => <li key={n}>{k.title}{k.meta && <small>{k.meta}</small>}</li>)}</ol>
                        </details>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
