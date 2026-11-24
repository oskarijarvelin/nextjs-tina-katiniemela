import { Kuva, Kuvaaja } from '../lava/ui';

export default function KuvaBlock({ block, id }) {
  if (!block.img) return null;
  const kuva = (
    <figure className="wide-photo" id={block.kuva_lainaus ? undefined : id}>
      <Kuva src={block.img} alt={block.kuva_alt || ''} sizes="100vw" kohdistus={block.kuva_kohdistus} kohdistusM={block.kuva_kohdistus_mobiili} />
      <Kuvaaja teksti={block.kuva_kuvateksti} figcaption />
    </figure>
  );
  if (!block.kuva_lainaus) return kuva;
  const rivit = block.kuva_lainaus.split('\n');
  return (
    <div className="wide-wrap" id={id}>
      {kuva}
      <p className="wide-quote scr">{rivit.map((r, i) => <span key={i}>{r}{i < rivit.length - 1 && <br />}</span>)}</p>
    </div>
  );
}
