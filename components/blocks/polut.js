import { Kuva, Kuvaaja, Lisaa } from '../lava/ui';

export default function PolutBlock({ block, id }) {
  const polut = (block.polut_lista || []).filter(Boolean);
  if (!polut.length) return null;
  return (
    <section className="sec wrap" id={id} aria-label={polut.map((p) => p.otsikko).join(', ')}>
      <div className="paths">
        {polut.map((p, i) => (
          <article className="path" key={i}>
            <div className="path-media">
              <Kuva src={p.kuva} alt={p.alt || ''} sizes="(max-width: 1100px) 100vw, 34vw"
                kohdistus={p.kohdistus} kohdistusM={p.kohdistus_mobiili} zoomM={p.zoom_mobiili} />
              <span className="path-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <Kuvaaja teksti={p.kuvateksti} />
            </div>
            <h3 className="scr">{p.otsikko}</h3>
            {p.teksti && <p className="body">{p.teksti}</p>}
            <Lisaa url={p.linkki_url} teksti={p.linkki_teksti} />
          </article>
        ))}
      </div>
    </section>
  );
}
