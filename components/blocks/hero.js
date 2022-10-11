import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function HeroBlock({block}) {

  const HeroBox = styled(Box)({
    position: 'relative',
    minHeight: '100vh',
    '& img': {
      position: 'absolute',
      top: 0,
      left: 0,
      objectFit: 'cover',
      objectPosition: 'top',
    }
  });

  return (
    <HeroBox>
      <img src={block.bgImg} width="100%" height="100%" />
      <Box sx={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pt: '64px' }}>
        <Container maxWidth="xl" sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Box sx={{ flex: '0 0 50%' }}>

          </Box>
          <Box sx={{ flex: '0 0 50%', display: 'flex', alignItems: 'center', pt: 8 }}>
            <Box>
              <Typography variant="h1" sx={{ mb: 8 }}>{block.otsikko}</Typography>
              <Typography sx={{ mb: 4, fontSize: 24 }}>{block.sisalto}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </HeroBox>
  )
}