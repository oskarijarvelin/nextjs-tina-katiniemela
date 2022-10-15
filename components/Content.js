import Box from '@mui/material/Box';
import HeroBlock from "./blocks/hero";
import KuvaBlock from "./blocks/kuva";
import PalstaBlock from "./blocks/palsta";
import KokemusBlock from "./blocks/kokemus";

export default function Content({ blocks }) {
  return (
    <>
      {blocks?.map((block, i) => (
        <Box key={i}>
          {(block.__typename == 'PageBlocksHero') &&
            <HeroBlock block={block} />
          }
          {(block.__typename == 'PageBlocksKuva') &&
            <KuvaBlock block={block} />
          }
          {(block.__typename == 'PageBlocksPalsta') &&
            <PalstaBlock block={block} />
          }
          {(block.__typename == 'PageBlocksKokemus') &&
            <KokemusBlock block={block} />
          }
        </Box>
      ))}
    </>
  )
}
