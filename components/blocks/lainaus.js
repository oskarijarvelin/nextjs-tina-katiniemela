export default function LainausBlock({ block, id }) {
  if (!block.lai_teksti) return null;
  return (
    <section className="quote wrap spot lo-quote" id={id} aria-label="Lainaus">
      <figure><blockquote className="scr">{block.lai_teksti}</blockquote></figure>
    </section>
  );
}
