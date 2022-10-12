import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function HeroBlock({block}) {

  const HeroBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflowX: 'hidden',
    '& .hero-bg': {
      position: 'absolute',
      top: 0,
      left: 0,
      objectFit: 'cover',
      objectPosition: 'top left',
    },
    '&:after': {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        height: '80px',
      },
      [theme.breakpoints.down('lg')]: {
        height: '0px',
      },
      content: '""',
      backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
    },
    '& .hero-img': {
      position: 'relative',
    },
    '& .hero-img:after': {
      position: 'absolute',
      content: '""',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '20px',
      content: '""',
      backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
    }
  }));

  return (
    <HeroBox sx={{ minHeight: { xs: 'auto', lg: '100vh' } }}>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <img className="hero-bg" src={block.bgImg} width="100%" height="100%" />
      </Box>
      <Box sx={{ position: {xs: 'relative', lg: 'absolute' }, width: '100%', height: '100%', top: 0, left: 0, pt: '64px' }}>
        <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', height: '100%' }}>
          <Box sx={{ flex: {sm: '0 0 100%', lg: '0 0 50%' } }}>
            <Box className="hero-img" sx={{ display: { xs: 'flex', lg: 'none' }, ml: -2 }}>
              <img src={block.bgImg} width="200%" height="auto" />    
            </Box>
          </Box>
          <Box sx={{ flex: {sm: '0 0 100%', lg: '0 0 50%' }, display: 'flex', alignItems: 'center', px: { xs: 2, lg: 0 } }}>
            <Box>
              <Typography variant="h1" sx={{ fontSize: { xs: '5rem', lg: '8rem' }, mt: { xs: 4, lg: 0 }, mb: { xs: 4, lg: 8 } }}>{block.otsikko}</Typography>
              <Typography sx={{ mb: 4, pl: {xs: 0, lg: 2}, fontSize: { sm: 22, lg: 25 }, fontWeight: 300 }}>{block.sisalto}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </HeroBox>
  )
}