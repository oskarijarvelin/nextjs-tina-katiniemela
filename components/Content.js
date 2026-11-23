import Box from '@mui/material/Box';
import HeroBlock from "./blocks/hero";
import KuvaBlock from "./blocks/kuva";
import PalstaBlock from "./blocks/palsta";
import KokemusBlock from "./blocks/kokemus";
import JulkaisutBlock from "./blocks/julkaisut";
import VideotBlock from "./blocks/videot";
import NostoBlock from "./blocks/nosto";
import LomakeBlock from "./blocks/lomake";
import UkkBlock from "./blocks/ukk";
import KeikatBlock from "./blocks/keikat";
import YhteystiedotBlock from "./blocks/yhteystiedot";

const LOHKOT = {
  PageBlocksHero: HeroBlock,
  PageBlocksKuva: KuvaBlock,
  PageBlocksPalsta: PalstaBlock,
  PageBlocksKokemus: KokemusBlock,
  PageBlocksJulkaisut: JulkaisutBlock,
  PageBlocksVideot: VideotBlock,
  PageBlocksNosto: NostoBlock,
  PageBlocksLomake: LomakeBlock,
  PageBlocksUkk: UkkBlock,
  PageBlocksKeikat: KeikatBlock,
  PageBlocksYhteystiedot: YhteystiedotBlock,
};

export default function Content({ blocks, rakennettu }) {
  return (
    <>
      {blocks?.map((block, i) => {
        const Lohko = LOHKOT[block?.__typename];
        if (!Lohko) return null;
        // Ankkuri mahdollistaa linkit tyyliin /musiikki#videot; scrollMarginTop jättää tilaa kiinteälle yläpalkille
        return (
          <Box key={i} id={block.ankkuri || undefined} sx={{ scrollMarginTop: '72px' }}>
            <Lohko block={block} rakennettu={rakennettu} />
          </Box>
        );
      })}
    </>
  )
}
