import { styled } from '@mui/material/styles';
import Image from '../Image';
import PillLink from '../PillLink';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HeroBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  position: 'relative',
  overflowX: 'hidden',
  '& .image': {
    height: '100%',
  },
  '& img': {
    height: '100% !important',
    objectFit: 'cover',
    width: '100%',
  },
});

export default function HeroBlock({ block }) {
  // Pitkä yksittäinen sana (esim. "Laulunopettaja") ei mahdu puolikkaaseen palstaan isolla fontilla,
  // joten skaalataan fonttia pienemmäksi, kun otsikon pisin sana on pitkä.
  const longestWord = Math.max(0, ...(block.otsikko || '').split(/\s+/).map((w) => w.length));
  const longTitle = longestWord > 10;

  return (
    <HeroBox sx={{ minHeight: { xs: 'auto', lg: '100vh' }, height: { xs: 'auto', lg: '100%' }, overflow: 'hidden', mb: { xs: 6, lg: '200px' } }}>
      <Box sx={{ flex: { xs: '0 0 100%', lg: '0 0 50%' }, minWidth: 0, height: 'auto', pt: { xs: '56px', lg: 0 } }}>
        {block.bgImg && (
          <Image src={block.bgImg} orientation="hero" alt={block.kuvateksti ? block.kuvateksti : ''} />
        )}
      </Box>
      <Box sx={{ flex: { xs: '0 0 100%', lg: '0 0 50%' }, minWidth: 0, display: 'flex', alignItems: 'center', mt: { xs: 0, lg: '64px' }, px: { xs: 4, lg: 14 }, textAlign: 'center', position: 'relative' }}>
        {block.kuvateksti &&
          <Box sx={{ position: 'absolute', left: 0, bottom: { xs: 'unset', lg: 0 }, top: { xs: 0, lg: 'unset' } }}>
            <Typography sx={{ fontSize: { xs: 11, lg: 14 }, color: '#777', px: { xs: '2px', lg: 0 }, py: '3px', lineHeight: 1, writingMode: { xs: 'unset', lg: 'vertical-rl' } }}>{block.kuvateksti}</Typography>
          </Box>
        }
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: longTitle ? { xs: '3.6rem', sm: '5rem', lg: '5.5rem', xl: '7rem' } : { xs: '5rem', lg: '8rem' },
              overflowWrap: 'break-word',
              mt: { xs: 8, lg: 0 },
              mb: { xs: 4, lg: 8 },
            }}
          >
            {block.otsikko}
          </Typography>
          {block.sisalto && (
            <Typography sx={{ mb: 4, fontSize: { sm: 22, lg: 25 }, whiteSpace: 'pre-line' }}>{block.sisalto}</Typography>
          )}
          {block.hero_linkit?.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mb: 4 }}>
              {block.hero_linkit.map((linkki, i) => (
                <PillLink key={i} href={linkki.url} filled={i === 0 && block.hero_linkit.length === 1}>
                  {linkki.title}
                </PillLink>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </HeroBox>
  );
}
