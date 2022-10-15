import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const KuvaBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  height: 'auto',
  [theme.breakpoints.up('lg')]: {
    height: 'calc(100vh + 240px)',
  },
  '& img': {
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
    [theme.breakpoints.up('lg')]: {
      height: '100%',
    },
    objectFit: 'cover',
    objectPosition: 'center top',
  },
}));

export default function KuvaBlock({ block }) {
  return (
    <KuvaBox sx={{ my: { xs: 6, lg: '200px' } }}>
      <img src={block.img} />
      {block.kuva_kuvateksti &&
        <Box sx={{ position: 'absolute', left: 0, bottom: { xs: '-15px', lg: '-20px' } }}>
          <Typography sx={{ fontSize: { xs: 11, lg: 14 }, color: '#666', p: '2px', lineHeight: 1 }}>{block.kuva_kuvateksti}</Typography>
        </Box>
      }
    </KuvaBox>
  )
}