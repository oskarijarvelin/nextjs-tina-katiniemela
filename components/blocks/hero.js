import { styled } from '@mui/material/styles';
import Image from '../Image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HeroBlock({ block }) {

  const HeroBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    overflowX: 'hidden',
    '& img': {
      height: '100% !important',
      objectFit: 'cover',
      width: '100%',
    }
  }));

  return (
    <HeroBox sx={{ minHeight: { xs: 'auto', lg: '100vh' }, height: { xs: 'auto', lg: '100%' }, overflow: 'hidden', mb: { xs: 6, lg: '200px' }, position: 'relative' }}>
      <Box sx={{ flex: { sm: '0 0 100%', lg: '0 0 50%' }, height: { xs: 'auto', lg: '100vh' }, pt: { xs: '56px', lg: 0 } }}>
        <Image src={block.bgImg} orientation="hero" alt={block.kuvateksti ? block.kuvateksti : ''} />
      </Box>
      <Box sx={{ flex: { sm: '0 0 100%', lg: '0 0 50%' }, display: 'flex', alignItems: 'center', mt: { xs: 0, lg: '64px' }, px: { xs: 4, lg: 14 }, textAlign: 'center', position: 'relative' }}>
        {block.kuvateksti &&
          <Box sx={{ position: 'absolute', left: 0, bottom: { xs: 'unset', lg: 0 }, top: { xs: 0, lg: 'unset' } }}>
            <Typography sx={{ fontSize: { xs: 11, lg: 14 }, color: '#777', px: { xs: '2px', lg: 0 }, py: '3px', lineHeight: 1, writingMode: { xs: 'unset', lg: 'vertical-rl' } }}>{block.kuvateksti}</Typography>
          </Box>
        }
        <Box>
          <Typography variant="h1" sx={{ fontSize: { xs: '5rem', lg: '8rem' }, mt: { xs: 8, lg: 0 }, mb: { xs: 4, lg: 8 } }}>{block.otsikko}</Typography>
          <Typography sx={{ mb: 4, fontSize: { sm: 22, lg: 25 } }}>{block.sisalto}</Typography>
        </Box>
      </Box>
    </HeroBox>
  )
}