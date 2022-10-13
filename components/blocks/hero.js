import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HeroBlock({block}) {

  const HeroBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    overflowX: 'hidden',
    '& img': {
      objectFit: 'cover',
    }
  }));

  return (
    <HeroBox sx={{ minHeight: { xs: 'auto', lg: '100vh' }, overflow: 'hidden', mb: {xs: 6, lg: '200px'} }}>
      <Box sx={{ flex: {sm: '0 0 100%', lg: '0 0 50%' }, pt: { xs: '64px', lg: 0 } }}>
        <img src={block.bgImg} width="100%" height="100%" />
      </Box>
      <Box sx={{ flex: {sm: '0 0 100%', lg: '0 0 50%' }, display: 'flex', alignItems: 'center', mt: { xs: 0, lg: '64px' }, px: {xs: 4, lg: 14 }, textAlign: 'center' }}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: { xs: '5rem', lg: '8rem' }, mt: { xs: 4, lg: 0 }, mb: { xs: 4, lg: 8 } }}>{block.otsikko}</Typography>
          <Typography sx={{ mb: 4, fontSize: { sm: 22, lg: 25 }, fontWeight: 300 }}>{block.sisalto}</Typography>
        </Box>
      </Box>
    </HeroBox>
  )
}