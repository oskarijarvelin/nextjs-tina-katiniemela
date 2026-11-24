// Lyhyesti-kortit (esim. CV:n kohokohdat ja Laulunopettaja-sivun faktat)
export default function FaktatBlock({ block, id }) {
  const lista = (block.fak_lista || []).filter((f) => f?.otsikko);
  if (!lista.length) return null;
  const kortit = lista.map((f, i) => (
    <article className="hcard" key={i}>
      <p className="yr" aria-hidden="true">{f.arvo}{f.pieni && <small>{f.pieni}</small>}</p>
      <h3>{f.otsikko}</h3>
      {f.teksti && <p>{f.teksti}</p>}
    </article>
  ));
  if (block.fak_asettelu === 'cv') {
    return (
      <section className="sec wrap spot" id={id} aria-labelledby={`${id || 'faktat'}-otsikko`} style={{ paddingBottom: 0 }}>
        {block.fak_otsikko && <p className="lbl" id={`${id || 'faktat'}-otsikko`} style={{ marginBottom: 24 }}>{block.fak_otsikko}</p>}
        <div className="cv-high">{kortit}</div>
      </section>
    );
  }
  return <section className="wrap lo-facts" id={id} aria-label={block.fak_otsikko || 'Lyhyesti'}>{kortit}</section>;
}
