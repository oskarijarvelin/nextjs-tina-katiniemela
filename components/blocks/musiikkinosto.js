// Etusivun Musiikki-osio: nostaa Musiikki-sivulta ajankohtaisen projektin, albumin ja musiikkivideot
import RichText, { onTaytetty } from '../RichText';
import { Kuva, Lisaa, Painike, Toisto } from '../lava/ui';

export default function MusiikkinostoBlock({ block, id, globaali }) {
  const m = globaali?.musiikki || {};
  const nosto = m.nosto;
  const albumi = m.albumi;
  const videot = (m.videot || []).slice(0, block.mn_videoita || 4);
  return (
    <section className="sec music" id={id} aria-labelledby="em-otsikko">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="scr h2" id="em-otsikko">{block.mn_otsikko || 'Musiikki'}</h2>
          <Lisaa url={block.mn_linkki_url || '/musiikki'} teksti={block.mn_linkki_teksti} />
        </div>
        {nosto?.nosto_otsikko && (
          <article className="feature" aria-labelledby="sama-otsikko">
            <div className="feature-head">
              {nosto.nosto_pieni_otsikko && <p className="lbl">{nosto.nosto_pieni_otsikko}</p>}
              <h3 className="scr" id="sama-otsikko">{nosto.nosto_otsikko}</h3>
            </div>
            <div className="feature-body">
              {onTaytetty(nosto.nosto_sisalto) && <div className="prose"><RichText content={nosto.nosto_sisalto} /></div>}
              {nosto.nosto_video && <Painike url={`/musiikki#${nosto.ankkuri || 'ajankohtaista'}`} teksti="Katso video" tyyli="haamu"><Toisto /></Painike>}
            </div>
          </article>
        )}
        <div className="music-grid">
          {albumi && (
            <div className="album">
              <div className="album-art">
                <span className="mini-vinyl" aria-hidden="true" />
                <Kuva src={albumi.kuva} alt={`${albumi.title} – kansikuva`} leveys={480} korkeus={480} sizes="240px" />
              </div>
              <div className="album-body">
                <p className="lbl muted">{[albumi.tyyppi, albumi.ajankohta].filter(Boolean).join(' · ')}</p>
                <h3>{albumi.title}</h3>
                <div className="ctas">
                  {albumi.spotify && <Painike url={albumi.spotify} teksti="Spotify"><Toisto /></Painike>}
                  {albumi.youtube && <Painike url={albumi.youtube} teksti="YouTube" tyyli="haamu" />}
                </div>
              </div>
            </div>
          )}
          {videot.length > 0 && (
            <div className="videos">
              <p className="lbl muted">Musiikkivideot</p>
              {videot.map((v, i) => {
                const [esittaja, nimi] = jaa(v.title);
                return (
                  <a className="video" href={v.url} target="_blank" rel="noopener noreferrer" key={i}>
                    <span className="play"><Toisto /></span>
                    <span className="video-text"><b>{nimi}</b><span>{[esittaja, v.ajankohta].filter(Boolean).join(' · ')}</span></span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// "Ronimus - Epäonnen huhtikuu" → ["Ronimus", "Epäonnen huhtikuu"]
export function jaa(otsikko) {
  const m = (otsikko || '').match(/^(.+?)\s+[-–]\s+(.+)$/);
  return m ? [m[1], m[2]] : ['', otsikko || ''];
}
