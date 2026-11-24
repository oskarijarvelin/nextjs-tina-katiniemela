// Regressiotesti TinaCMS:n rich-text-sarjallistukselle (yarn test:mdx).
//
// @tinacms/mdx 1.x tallensi lihavoinnin reunan välilyönnin tähtien sisään ("**28.8. **Teksti"),
// jolloin lihavointi hajosi ja seuraava tallennus escapetti tähdet ("\*\*"). 2.x siirtää välilyönnin
// tähtien ulkopuolelle. Testi ajaa saman serializeMDX → parseMDX -kierroksen, jonka editori tekee
// tallentaessaan ja avatessaan sisällön.
import assert from 'node:assert/strict';
import { parseMDX, serializeMDX } from '@tinacms/mdx';

const kentta = { type: 'rich-text', name: 'palsta_sisalto', templates: [] };
const kuva = (url) => url;

const teksti = (text, extra = {}) => ({ type: 'text', text, ...extra });
const kappale = (...children) => ({ type: 'root', children: [{ type: 'p', children }] });

const tapaukset = [
  {
    nimi: 'välilyönti lihavoinnin lopussa',
    puu: kappale(teksti('28.8. ', { bold: true }), teksti('Yksityistilaisuus')),
    odotettu: '**28.8.** Yksityistilaisuus',
  },
  {
    nimi: 'välilyönti lihavoinnin alussa',
    puu: kappale(teksti('Keikka'), teksti(' 9.1.', { bold: true })),
    odotettu: 'Keikka **9.1.**',
  },
  {
    nimi: 'välilyönnit molemmin puolin',
    puu: kappale(teksti('A'), teksti(' B ', { bold: true }), teksti('C')),
    odotettu: 'A **B** C',
  },
  {
    nimi: 'tavallinen lihavointi',
    puu: kappale(teksti('2.8.', { bold: true }), teksti(' Yksityistilaisuus')),
    odotettu: '**2.8.** Yksityistilaisuus',
  },
];

const tekstisolmut = (solmu) =>
  solmu.type === 'text' ? [solmu] : (solmu.children || []).flatMap(tekstisolmut);

let virheet = 0;
for (const { nimi, puu, odotettu } of tapaukset) {
  try {
    const md = String(serializeMDX(puu, kentta, kuva)).trim();
    assert.equal(md, odotettu, 'sarjallistus');

    // Takaisin puuksi: lihavointi säilyy eikä tekstiin jää tähtiä
    const takaisin = parseMDX(md, kentta, kuva);
    const solmut = tekstisolmut(takaisin);
    assert.ok(solmut.some((s) => s.bold), 'lihavointi katosi jäsennyksessä');
    assert.ok(!solmut.some((s) => s.text.includes('*')), 'tähtiä jäi tekstiin');

    // Toinen tallennus tuottaa saman markdownin (ei \*\*-escapetusta)
    assert.equal(String(serializeMDX(takaisin, kentta, kuva)).trim(), md, 'toinen tallennus');
    console.log(`ok   ${nimi}: ${md}`);
  } catch (e) {
    virheet++;
    console.error(`FAIL ${nimi}: ${e.message}`);
  }
}

process.exit(virheet ? 1 : 0);
