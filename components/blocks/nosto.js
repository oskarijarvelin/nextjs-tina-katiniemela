import RichText from '../RichText';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Image from '../Image';
import PillLink from '../PillLink';

const NostoBox = styled(Box)({
  '& .image, & .image img': {
    height: '100% !important',
    objectFit: 'cover',
  },
  '& a:not(.linkki)': {
    color: '#AAA',
    textDecoration: 'underline',
  },
  '& a:not(.linkki):hover': {
    color: '#FFF',
  },
});

export default function NostoBlock({ block }) {
  const kuva = block.nosto_kuva;
  return (
    <NostoBox sx={{ my: { xs: 6, lg: '160px' } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: block.nosto_reverse ? 'row-reverse' : 'row' },
            backgroundColor: 'background.paper',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {kuva && (
            <Box sx={{ flex: { md: '0 0 42%' }, minHeight: { xs: 220, md: 360 }, position: 'relative' }}>
              <Image src={kuva} orientation="palsta" alt={block.nosto_kuvateksti || block.nosto_otsikko || ''} />
              {block.nosto_kuvateksti && (
                <Typography sx={{ position: 'absolute', left: 6, bottom: 4, fontSize: 11, color: 'rgba(255,255,255,.7)', textShadow: '0 0 4px #000' }}>
                  {block.nosto_kuvateksti}
                </Typography>
              )}
            </Box>
          )}
          <Box sx={{ flex: 1, minWidth: 0, p: { xs: 4, md: 6, lg: 8 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: kuva ? 'left' : 'center' }}>
            {block.nosto_pieni_otsikko && (
              <Typography sx={{ fontSize: 13, letterSpacing: '.18em', textTransform: 'uppercase', color: '#ffd28a', mb: 1 }}>
                {block.nosto_pieni_otsikko}
              </Typography>
            )}
            <Typography variant="h2" sx={{ fontSize: { xs: '3.2rem', lg: '4.5rem' }, lineHeight: 1.15, mb: 2, overflowWrap: 'break-word' }}>
              {block.nosto_otsikko}
            </Typography>
            {block.nosto_sisalto && <RichText content={block.nosto_sisalto} />}
            {block.nosto_painikkeet?.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3, justifyContent: kuva ? 'flex-start' : 'center' }}>
                {block.nosto_painikkeet.filter((p) => p?.url).map((p, i) => (
                  <PillLink key={i} className="linkki" href={p.url} filled={i === 0}>
                    {p.title}
                  </PillLink>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </NostoBox>
  );
}
