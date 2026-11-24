import RichText, { onTaytetty } from '../RichText';
import { Kuva, Toisto } from '../lava/ui';
import { jaa } from './musiikkinosto';

export default function VideotBlock({ block, id }) {
  const lista = (block.videot_lista || []).filter((v) => v?.url);
  const otsikkoId = `${id || 'videot'}-otsikko`;
  return (
    <section className="sec wrap" id={id} aria-labelledby={otsikkoId}>
      <div className="vhead">
        <h2 className="scr h2" id={otsikkoId}>{block.videot_otsikko}</h2>
        {onTaytetty(block.videot_sisalto) && <div className="prose"><RichText content={block.videot_sisalto} /></div>}
      </div>
      <div className="vgrid">
        {lista.map((v, i) => {
          const [esittaja, nimi] = jaa(v.title);
          const typo = !v.kuva;
          return (
            <a className={`vcard${i === 0 ? ' big' : ''}${typo ? ' typo' : ''}`} href={v.url} target="_blank" rel="noopener noreferrer" key={i}>
              {typo ? <span className="typo-title" aria-hidden="true">{nimi.replace(/\s*-cover$/i, '')}</span>
                : <Kuva src={v.kuva} sizes={i === 0 ? '(max-width: 960px) 100vw, 60vw' : '(max-width: 960px) 50vw, 25vw'} />}
              <span className="vplay"><Toisto koko={20} /></span>
              <span className="vinfo"><b>{nimi}</b><span className="lbl">{[esittaja, v.ajankohta].filter(Boolean).join(' · ')}</span></span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
