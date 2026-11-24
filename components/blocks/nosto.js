import RichText, { onTaytetty } from '../RichText';
import Video, { youtubeId } from '../Video';
import { Kuva, Kuvaaja, Painikkeet } from '../lava/ui';

export function Merkki({ arvo, teksti }) {
  if (!arvo) return null;
  const rivit = (teksti || '').split('\n');
  return (
    <div className="badge" aria-hidden="true">
      <strong>{arvo}</strong>
      {teksti && <span>{rivit.map((r, i) => <span key={i} style={{ margin: 0 }}>{r}{i < rivit.length - 1 && <br />}</span>)}</span>}
    </div>
  );
}

export default function NostoBlock({ block, id }) {
  const video = youtubeId(block.nosto_video);
  const kuva = video ? null : block.nosto_kuva;
  const merkki = !video && block.nosto_merkki_arvo;
  // Kuva oikealla = teksti vasemmalla (luonnoksen text-left)
  const kuvaOikealla = block.nosto_reverse !== false;
  const otsikkoId = `${id || 'nosto'}-otsikko`;
  const media = (video || kuva) && (
    <div className={`split-media${video ? ' has-video' : ''}`}>
      {video ? <Video video={video} title={block.nosto_otsikko} /> : (
        <>
          <Kuva src={kuva} alt={block.nosto_alt || ''} sizes="(max-width: 960px) 100vw, 50vw" kohdistus={block.nosto_kohdistus} />
          <Kuvaaja teksti={block.nosto_kuvateksti} />
        </>
      )}
      {merkki && <Merkki arvo={block.nosto_merkki_arvo} teksti={block.nosto_merkki_teksti} />}
    </div>
  );
  const teksti = (
    <div className="split-text">
      <div className="split-text-inner">
        {block.nosto_pieni_otsikko && (
          <p className="lbl">{block.nosto_taajuus && <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>}{block.nosto_pieni_otsikko}</p>
        )}
        <h2 className="scr h2" id={otsikkoId} style={{ fontSize: 'clamp(60px, 6vw, 84px)' }}>{block.nosto_otsikko}</h2>
        {onTaytetty(block.nosto_sisalto) && <div className="prose"><RichText content={block.nosto_sisalto} /></div>}
        <Painikkeet lista={block.nosto_painikkeet} />
      </div>
    </div>
  );
  if (!media) {
    return <section className="sec wrap" id={id} aria-labelledby={otsikkoId}>{teksti}</section>;
  }
  return (
    <section className={`split ${kuvaOikealla ? 'text-left' : 'text-right'}${merkki ? ' has-badge' : ''}${merkki && !kuvaOikealla ? ' lj-split' : ''}`} id={id} aria-labelledby={otsikkoId}>
      {kuvaOikealla ? <>{teksti}{media}</> : <>{media}{teksti}</>}
    </section>
  );
}
