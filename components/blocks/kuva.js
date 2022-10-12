import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const KuvaBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    height: 'calc(100vh + 240px)',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center top',
    },
    '&:before': {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        height: '120px',
      },
      [theme.breakpoints.down('lg')]: {
        height: '20px',
      },
      content: '""',
      backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1))',
    },
    '&:after': {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        height: '120px',
      },
      [theme.breakpoints.down('lg')]: {
        height: '20px',
      },
      content: '""',
      backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
    },
}));

export default function KuvaBlock({block}) {
  return (
    <KuvaBox>
      <img src={block.img} />
    </KuvaBox>
  )
}