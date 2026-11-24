import HeroBlock from './blocks/hero';
import NauhaBlock from './blocks/nauha';
import PolutBlock from './blocks/polut';
import NostoBlock from './blocks/nosto';
import PalstaBlock from './blocks/palsta';
import KuvaBlock from './blocks/kuva';
import KeikatBlock from './blocks/keikat';
import MusiikkinostoBlock from './blocks/musiikkinosto';
import PalautteetBlock from './blocks/palautteet';
import FaktatBlock from './blocks/faktat';
import KokemusBlock from './blocks/kokemus';
import JulkaisutBlock from './blocks/julkaisut';
import VideotBlock from './blocks/videot';
import LainausBlock from './blocks/lainaus';
import OminaisuudetBlock from './blocks/ominaisuudet';
import HinnastoBlock from './blocks/hinnasto';
import CtaBlock from './blocks/cta';
import KokoonpanotBlock from './blocks/kokoonpanot';
import VaiheetBlock from './blocks/vaiheet';
import UkkBlock from './blocks/ukk';
import YhteystiedotBlock from './blocks/yhteystiedot';

const LOHKOT = {
  PageBlocksHero: HeroBlock,
  PageBlocksNauha: NauhaBlock,
  PageBlocksPolut: PolutBlock,
  PageBlocksNosto: NostoBlock,
  PageBlocksPalsta: PalstaBlock,
  PageBlocksKuva: KuvaBlock,
  PageBlocksKeikat: KeikatBlock,
  PageBlocksMusiikkinosto: MusiikkinostoBlock,
  PageBlocksPalautteet: PalautteetBlock,
  PageBlocksFaktat: FaktatBlock,
  PageBlocksKokemus: KokemusBlock,
  PageBlocksJulkaisut: JulkaisutBlock,
  PageBlocksVideot: VideotBlock,
  PageBlocksLainaus: LainausBlock,
  PageBlocksOminaisuudet: OminaisuudetBlock,
  PageBlocksHinnasto: HinnastoBlock,
  PageBlocksCta: CtaBlock,
  PageBlocksKokoonpanot: KokoonpanotBlock,
  PageBlocksVaiheet: VaiheetBlock,
  PageBlocksUkk: UkkBlock,
  PageBlocksLomake: YhteystiedotBlock,
  PageBlocksYhteystiedot: YhteystiedotBlock,
};

export default function Content({ blocks, rakennettu, globaali, oletusAihe }) {
  return (
    <>
      {blocks?.map((block, i) => {
        const Lohko = LOHKOT[block?.__typename];
        if (!Lohko) return null;
        return <Lohko key={i} block={block} id={block.ankkuri || undefined} rakennettu={rakennettu} globaali={globaali} oletusAihe={oletusAihe} />;
      })}
    </>
  );
}
