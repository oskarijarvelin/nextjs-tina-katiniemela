import { TinaMarkdown } from 'tinacms/dist/rich-text';

// TinaCMS 1.x:n editori tallentaa lihavoinnin virheellisesti, jos lihavoitu valinta alkaa tai
// päättyy välilyöntiin: "**28.8. **Yksityistilaisuus". Tällaista markdownia ei tulkita
// lihavoinniksi, vaan tähdet jäävät näkyviin tekstiin (seuraavalla tallennuksella myös
// escapetettuina "\*\*"). Bugi on korjattu vasta @tinacms/mdx 2.x:ssä.
//
// Tämä kääre korjaa näkyvän lopputuloksen: tekstisolmuissa olevat kirjaimelliset **…**-parit
// muutetaan lihavoinneiksi ja reunojen välilyönnit siirretään lihavoinnin ulkopuolelle.

const PARI = /\*\*([^*\n]*?[^\s*][^*\n]*?)\*\*|\*\*(\s*[^\s*])\*\*/g;

function korjaaTeksti(node) {
  const text = node.text;
  if (typeof text !== 'string' || !text.includes('**')) return [node];
  const tulos = [];
  let viimeisin = 0;
  for (const m of text.matchAll(PARI)) {
    const sisalto = m[1] ?? m[2];
    const alku = sisalto.match(/^\s*/)[0];
    const loppu = sisalto.match(/\s*$/)[0];
    const ennen = text.slice(viimeisin, m.index) + alku;
    if (ennen) tulos.push({ ...node, text: ennen });
    tulos.push({ ...node, text: sisalto.trim(), bold: true });
    if (loppu) tulos.push({ ...node, text: loppu });
    viimeisin = m.index + m[0].length;
  }
  if (viimeisin === 0) return [node];
  const jalkeen = text.slice(viimeisin);
  if (jalkeen) tulos.push({ ...node, text: jalkeen });
  return tulos;
}

export function korjaaLihavoinnit(node) {
  if (!node || typeof node !== 'object') return node;
  if (node.type === 'text') return node;
  if (!Array.isArray(node.children)) return node;
  return {
    ...node,
    children: node.children.flatMap((lapsi) =>
      lapsi?.type === 'text' ? korjaaTeksti(lapsi) : [korjaaLihavoinnit(lapsi)]
    ),
  };
}

export default function RichText({ content, ...props }) {
  if (!content) return null;
  return <TinaMarkdown content={korjaaLihavoinnit(content)} {...props} />;
}

// Tina palauttaa tyhjänkin rikastekstikentän tyhjänä dokumenttina; tämä kertoo, onko kentässä oikeaa sisältöä
export function onTaytetty(content) {
  if (!content) return false;
  if (typeof content === 'string') return content.trim().length > 0;
  const teksti = (n) => (n?.type === 'text' ? (n.text || '').trim() : (n?.children || []).map(teksti).join(''));
  return teksti(content).length > 0 || JSON.stringify(content).includes('"type":"img"');
}
