// Sivujen yhteinen data: muiden dokumenttien sisältö, jota lohkot nostavat (keikkalista, musiikki, palautteet)
import { client } from '../tina/__generated__/client';

async function hae(fn) {
  try { return await fn(); } catch (e) { return null; }
}

export async function haeGlobaali() {
  const [keikat, musiikki, palautteet] = await Promise.all([
    hae(() => client.queries.page({ relativePath: 'keikat.md' })),
    hae(() => client.queries.page({ relativePath: 'musiikki.md' })),
    hae(() => client.queries.palautteet({ relativePath: 'index.md' })),
  ]);
  const keikkaLohko = keikat?.data?.page?.blocks?.find((b) => b?.__typename === 'PageBlocksKeikat' && b.keikat_lista?.length);
  const mBlocks = musiikki?.data?.page?.blocks || [];
  const nosto = mBlocks.find((b) => b?.__typename === 'PageBlocksNosto') || null;
  const julkaisut = mBlocks.find((b) => b?.__typename === 'PageBlocksJulkaisut');
  const albumi = julkaisut?.julkaisut_lista?.find((j) => (j?.tyyppi || '').toLowerCase() === 'albumi') || null;
  const videot = mBlocks.find((b) => b?.__typename === 'PageBlocksVideot')?.videot_lista || [];
  // JSON-sarjallistettavaksi (undefined → null)
  return JSON.parse(JSON.stringify({
    keikat: keikkaLohko?.keikat_lista || [],
    musiikki: { nosto, albumi, videot },
    palautteet: palautteet?.data?.palautteet?.palautteet || [],
  }));
}
